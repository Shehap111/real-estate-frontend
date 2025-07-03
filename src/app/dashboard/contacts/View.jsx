import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";

const ViewMessage = ({ open, onClose, message }) => {
  if (!message) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Message Details</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography>
            <strong>Name:</strong> {message.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {message.email}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {message.phone}
          </Typography>
          <Typography>
            <strong>Message:</strong> {message.message}
          </Typography>
          {/* <Typography>
            <strong>Status:</strong>{" "}
            {message.isRead ? (
              <Chip label="Read" color="default" />
            ) : (
              <Chip label="Unread" color="success" />
            )}
          </Typography> */}
          <Typography>
            <strong>Created At:</strong>{" "}
            {new Date(message.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewMessage;
