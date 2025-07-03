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

const ViewBlog = ({ open, onClose, blog }) => {
  if (!blog) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Blog Details</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Blog Image */}
          {blog.image && (
            <Box display="flex" justifyContent="center">
              <Image
                src={blog.image}
                alt="Blog Image"
                width={300}
                height={200}
                style={{ borderRadius: 8 }}
              />
            </Box>
          )}

          {/* Titles */}
          <Typography><strong>Title (EN):</strong> {blog.title?.en}</Typography>
          <Typography><strong>Title (AR):</strong> {blog.title?.ar}</Typography>

          {/* Descriptions */}
          <Typography><strong>Description (EN):</strong> {blog.description?.en}</Typography>
          <Typography><strong>Description (AR):</strong> {blog.description?.ar}</Typography>

          {/* Content */}
          <Typography><strong>Content (EN):</strong> {blog.content?.en}</Typography>
          <Typography><strong>Content (AR):</strong> {blog.content?.ar}</Typography>

          {/* Meta */}
          <Typography><strong>Meta Title (EN):</strong> {blog.metaTitle?.en}</Typography>
          <Typography><strong>Meta Title (AR):</strong> {blog.metaTitle?.ar}</Typography>
          <Typography><strong>Meta Description (EN):</strong> {blog.metaDescription?.en}</Typography>
          <Typography><strong>Meta Description (AR):</strong> {blog.metaDescription?.ar}</Typography>

          {/* Others */}
          <Typography><strong>Slug:</strong> {blog.slug}</Typography>
          <Typography><strong>Author:</strong> {blog.author}</Typography>

          <Typography>
            <strong>Status:</strong>{" "}
            {blog.isActive ? (
              <Chip label="Active" color="success" />
            ) : (
              <Chip label="Inactive" color="default" />
            )}
          </Typography>

          <Typography>
            <strong>Created At:</strong>{" "}
            {new Date(blog.createdAt).toLocaleString()}
          </Typography>

          <Typography>
            <strong>Updated At:</strong>{" "}
            {new Date(blog.updatedAt).toLocaleString()}
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

export default ViewBlog;
