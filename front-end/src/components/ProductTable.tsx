import {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Delete, Restore, ShoppingBag } from '@mui/icons-material';
const ProductTable = ({ products, onEdit, onDelete, onRecover,onWithdraw }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Garantie</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product :any) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.warranty_years}</TableCell>
                <TableCell>
                { product.available && (
                    <Tooltip title="modifier">
                        <IconButton onClick={() => onEdit(product)} color="primary">
                        <Edit />
                        </IconButton>
                    </Tooltip>
 
                )}
                { product.available && (
                    <Tooltip title="supprimer">
                        <IconButton onClick={() => onDelete(product)} color="primary">
                            <Delete />
                        </IconButton>
                    </Tooltip>
                )}
                {!product.available && (
                    <Tooltip title="déposer">
                        <IconButton onClick={() => onRecover(product)} color="primary">
                        <Restore />
                        </IconButton>
                    </Tooltip>
                )}
                { product.available && (
                    <Tooltip title="retirer">
                        <IconButton onClick={() => onWithdraw(product)} color="primary">
                            <ShoppingBag />
                        </IconButton>
                    </Tooltip>
                )}
            </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={() => {}}
      />
    </>
  );
};

export default ProductTable;
