import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider } from '@mui/material';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal = ({ open, onClose, onConfirm, title, message } : ConfirmModalProps ) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <Divider sx={{ margin: '8px 0' }} />
      <DialogContent>{message}</DialogContent>
      <Divider sx={{ margin: '8px 0' }} />
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
