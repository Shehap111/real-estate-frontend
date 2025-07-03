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
  import Image from "next/image";
  
  const ViewPropertyType = ({ open, onClose, type }) => {
    if (!type) return null;
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{type.name?.en || "Property Type Details"}</DialogTitle>
  
        <Box display="flex" justifyContent="center" p={2}>
          <Image
            src={type.image}
            alt={type.name?.en}
            width={200}
            height={200}
            style={{ borderRadius: 8 }}
          />
        </Box>
  
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>
              <strong>Name (EN):</strong> {type.name?.en}
            </Typography>
            <Typography>
              <strong>Name (AR):</strong> {type.name?.ar}
            </Typography>
            <Typography>
              <strong>Created At:</strong>{" "}
              {new Date(type.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Updated At:</strong>{" "}
              {new Date(type.updatedAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Status:</strong>{" "}
              {type.isActive ? (
                <Chip label="Active" color="success" />
              ) : (
                <Chip label="Inactive" color="error" />
              )}
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
  
  export default ViewPropertyType;
  