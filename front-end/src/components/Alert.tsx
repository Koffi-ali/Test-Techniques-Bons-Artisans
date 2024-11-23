import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const Alert = ({ message, onClose, type }: { message: string; onClose: () => void , type: any}) => (
  <Snackbar open={true} autoHideDuration={3000} onClose={onClose}>
    <MuiAlert onClose={onClose} severity={type} variant="filled">
      {message}
    </MuiAlert>
  </Snackbar>
);

export default Alert;
