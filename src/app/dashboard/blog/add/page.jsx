'use client'
import {createBlog} from '@/redux/slices/blogSlices';
import {uploadImage} from '@/redux/slices/UploadsSlice';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import RichTextEditor from '../RichTextEditor';

const page = () => {
const dispatch = useDispatch();
const router = useRouter();
    const {loading, error, success} = useSelector((state) => state.blog);
    // state for adding a new blog 
    const [titleEn, setTitleEn] = useState("");
    const [titleAr, setTitleAr] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [descriptionAr, setDescriptionAr] = useState("");
    const [contentEn, setContentEn] = useState("");
    const [contentAr, setContentAr] = useState("");
    const [metaTitleEn, setMetaTitleEn] = useState("");
    const [metaTitleAr, setMetaTitleAr] = useState("");
    const [metaDescriptionEn, setMetaDescriptionEn] = useState("");
    const [metaDescriptionAr, setMetaDescriptionAr] = useState("");
    const [img, setImg] = useState("");
    const [author, setAuthor] = useState("");
    const [slug, setSlug] = useState("");





const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        dispatch(uploadImage(file)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
            setImg(res.payload); // نحفظ URL الصورة في state
        }
        });
    }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const blogData = {
            title: {
                en: titleEn,
                ar: titleAr,
            },
            description: {
                en: descriptionEn,
                ar: descriptionAr,
            },
            content: {
                en: contentEn,
                ar: contentAr,
            },
            metaTitle: {
                en: metaTitleEn,
                ar: metaTitleAr,
            },
            metaDescription: {
                en: metaDescriptionEn,
                ar: metaDescriptionAr,
            },
            image: img,
            author: author,
            slug: slug
        };
        const res = await dispatch(createBlog(blogData));
        if (res.meta.requestStatus === "fulfilled") {
            setTimeout(() => {
                router.push("/dashboard/blog");
            }, 1000);
        } else {
            console.error("Error creating blog:", res.payload);
        }

    }
    
  return (
      <div>

    <Box maxWidth="700px" mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Add Blog Post</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Blog Post added successfully!</Alert>}

    <form onSubmit={handleSubmit}>
              
    <Box my={2}>
  <Button
    variant="outlined"
    component="label"
    fullWidth
    sx={{ mb: 1 }}
  >
    {img ? "Change Image" : "Upload Image"}
    <input
      type="file"
      accept="image/*"
      hidden
      onChange={handleImageChange}
    />
  </Button>

  {img && (
    <Box
      sx={{
        width: "100%",
        height: 180,
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #ccc",
        mb: 2,
      }}
    >
      <img
        src={img}
        alt="Preview"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  )}
</Box>


        <TextField
          label="Blog Name (English)"
          fullWidth
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Blog Name (Arabic)"
          fullWidth
          value={titleAr}
          onChange={(e) => setTitleAr(e.target.value)}
          margin="normal"
                  />
        <TextField
          label="Blog Description (Arabic)"
          fullWidth
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          margin="normal"
                  />
        <TextField
          label="Blog Description (Arabic)"
          fullWidth
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          margin="normal"
          multiline
          rows={3}            
                  />

<RichTextEditor
  label="Blog Content (English)"
  value={contentEn}
  onChange={setContentEn}
/>

<RichTextEditor
  label="Blog Content (Arabic)"
  value={contentAr}
  onChange={setContentAr}
  isRTL
/>
        <TextField
          label="Blog Slug"
          fullWidth
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          margin="normal"
    />    
        <TextField
          label="Meta Title (English)"
          fullWidth
          value={metaTitleEn}
          onChange={(e) => setMetaTitleEn(e.target.value)}
          margin="normal"
    />
        <TextField
          label="Meta Title (Arabic)"
          fullWidth
          value={metaTitleAr}
          onChange={(e) => setMetaTitleAr(e.target.value)}
          margin="normal"
    />
        <TextField
          label="Meta Description (English)"
          fullWidth
          value={metaDescriptionEn}
          onChange={(e) => setMetaDescriptionEn(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />  
        <TextField
          label="Meta Description (Arabic)"
          fullWidth
          value={metaDescriptionAr}
          onChange={(e) => setMetaDescriptionAr(e.target.value)}
          margin="normal"
          multiline
          rows={3}          
        />           
    <TextField
          label="Author"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="normal"
        />           
                         
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add Blog Type"}
        </Button>
      </form>
    </Box>

      </div>
      



  )
}

export default page