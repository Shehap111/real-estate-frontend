import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Rating,
} from "@mui/material";
  import Image from "next/image";

  const View = ({ open, onClose, property }) => {
    if (!property) return null;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{property.title?.en || "Property Details"}</DialogTitle>

    <Box display="flex" justifyContent="center" p={2}>
        <Image
          src={property.images[0]}
          alt={property.title?.en}
          width={200}
          height={200}
        />
    </Box>

        <DialogContent dividers>
          <Typography sx={{ mb: 1 }}>{property.description?.en}</Typography>
  
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography><strong>Location:</strong> {property.location?.en}</Typography>
            <Typography><strong>Operation:</strong> {property.operationType}</Typography>
            <Typography><strong>Price:</strong> ${property.price}</Typography>
            <Typography><strong>Area:</strong> {property.area} m²</Typography>
            <Typography><strong>Bedrooms:</strong> {property.bedrooms}</Typography>
            <Typography><strong>Bathrooms:</strong> {property.bathrooms}</Typography>
            <Typography><strong>Video URL:</strong> {property.videoUrl}</Typography>
            <Typography><strong>Map Location:</strong> {property.mapLocation}</Typography>
            <Typography><strong>Slug:</strong> {property.slug}</Typography>
            <Typography><strong>Created At:</strong> {new Date(property.createdAt).toLocaleString()}</Typography>
            <Typography><strong>Status:</strong> {property.isActive ? "✅ Active" : "❌ Inactive"}</Typography>
  
            <Box display="flex" alignItems="center" gap={1}>
              <Typography><strong>Rating:</strong></Typography>
              <Rating value={property.rating} readOnly precision={0.1} />
              <Typography>{property.rating}</Typography>
            </Box>
          </Box>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={onClose} variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  export default View;