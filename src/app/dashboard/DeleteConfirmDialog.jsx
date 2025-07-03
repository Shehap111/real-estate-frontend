'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const DeleteConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item?',
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
