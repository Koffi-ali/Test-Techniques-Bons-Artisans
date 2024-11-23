import ProductTable from './components/ProductTable';
import Title  from './components/Title';
import React, { useState, useEffect } from 'react';
import { Button, Container, Box} from '@mui/material';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  recoverProduct,
} from './services/apiService';
import Alert from './components/Alert';
import ProductFormModal from'./components/ProductFormModal'
import ConfirmModal from './components/ConfirmModal'
const App = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<string | null>(null)
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'restore' | 'withdraw' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    // Fetch des produits au chargement
    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
          setAlertType('error')
          setAlert('Problème de serveur')
      }
    };
  const handleAddProduct = async (product: any) => {
    try {
      await createProduct(product);
      setAlertType('success')
      setAlert('Produit ajouté')
    } catch (error) {
        setAlertType('error')
        setAlert('Le produit existe déjà')
    } finally {
        setModalOpen(false);
        fetchProducts()
    }
  };

  const handleEditProduct = async (product: any) => {
    try {
      await updateProduct(product._id, product);
      setAlertType('success')
      setAlert('Produit modifié')
    } catch (error) {
      setAlertType('error')
      setAlert('Le produit existe déjà')
    } finally {
        setEditingProduct(null);
        setModalOpen(false);
        fetchProducts()
    }
  };
  const handleDeleteProduct = async () => {
    if(selectedProduct) {
      try {
        await deleteProduct(selectedProduct._id);
      } catch (error) {
          setAlertType('error')
          setAlert('Impossible de supprimer le produit')
      } finally {
        setSelectedProduct(null);
        setConfirmOpen(false);
        fetchProducts();
        setAlertType('success')
        setAlert('Produit supprimé')
      }
    }
  };
  const handleRecoverProduct = async () => {
    if(selectedProduct) {
      try {
        await recoverProduct(selectedProduct._id);
      } catch (error) {
        setAlertType('error')
        setAlert('Impossible de récupérer le produit')
      } finally {
        setSelectedProduct(null);
        setConfirmOpen(false);
        setAlertType('success')
        setAlert(actionType==='restore'? 'Produit déposé' : 'Produit récupérer')
        fetchProducts()
      }
    };
  }
  const openConfirmModal = (product: any, type: 'delete' | 'restore'  |'withdraw') => {
    setSelectedProduct(product);
    setActionType(type);
    setConfirmOpen(true);
  };

  const handleTitle = (action : 'delete' | 'restore' |'withdraw' | null) :string => {
    if(action === 'delete') return 'Supprimer le produit'
    else if(action === 'restore') return 'Rendre le produit'
    else if(action === 'withdraw') return 'Récupérer le produit'
    else return ''
  }
  const handleMessage = (action : 'delete' | 'restore' |'withdraw' | null,selectedProduct : any ) => {
    if(action ==='delete') return `Êtes-vous sûr de vouloir supprimer le produit "${selectedProduct?.name}" ?`
    else if(action === 'restore') return `Êtes-vous sûr de vouloir rendre le produit "${selectedProduct?.name}" ?`
    else if(action === 'withdraw') return `Êtes-vous sûr de vouloir récupérer le produit "${selectedProduct?.name}" ?`
    else return ''
  }

  const handleConfirm = (action : 'delete' | 'restore' | 'withdraw' | null) => {
    if(action ==='delete') return handleDeleteProduct
    else if(action ==='restore' || 'withdraw' ) return handleRecoverProduct
    else return () => {}
  }
  return (
    <div className="App">
       {alert && <Alert message={alert} type={alertType} onClose={() => setAlert(null)} />}
        <Container>
          <Title/>
          <Box sx= {{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditingProduct(null);
                setModalOpen(true);
              }}
            >
            Ajouter Produit
          </Button>
          </Box>
          <ProductTable
            products={products}
            onEdit={(product : any) => {
              setEditingProduct(product);
              setModalOpen(true);
            }}
            onDelete={(product :any) => openConfirmModal(product, 'delete')}
            onRecover={(product :any) => openConfirmModal(product, 'restore')}
            onWithdraw={(product :any) => openConfirmModal(product, 'withdraw')}
          />
          {isModalOpen && (
        <ProductFormModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          initialData={editingProduct}
        />
      )}
      {isConfirmOpen && (
        <ConfirmModal
          open={isConfirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirm(actionType)}
          title={handleTitle(actionType)}
          message={handleMessage(actionType, selectedProduct)}
        />
      )}
        </Container>
    </div>
  );
}

export default App;
