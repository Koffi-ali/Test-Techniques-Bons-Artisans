import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';

const ProductFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData = {},
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Modifier un produit' : 'Ajouter un produit'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nom"
          {...register('name', { required: 'Le nom est requis' })}
          error={!!errors.name}
          helperText={errors.name?.message as any}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Type"
          {...register('type', { required: 'Le type est requis' })}
          error={!!errors.type}
          helperText={errors.type?.message as any}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Prix"
          type="number"
          {...register('price', { required: 'Le prix est requis', valueAsNumber: true })}
          error={!!errors.price}
          helperText={errors.price?.message as any}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Note"
          type="number"
          {...register('rating', { required: 'La note est requise', valueAsNumber: true })}
          error={!!errors.rating}
          helperText={errors.rating?.message as any}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Garantie (années)"
          type="number"
          {...register('warranty_years', { required: 'La garantie est requise', valueAsNumber: true })}
          error={!!errors.warranty_years}
          helperText={errors.warranty_years?.message as any}
          fullWidth
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Retour</Button>
        <Button onClick={handleSubmit(handleFormSubmit)}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormModal;
