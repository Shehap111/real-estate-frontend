'use client'
import {getAllBlogsAdmin, updateBlog} from '@/redux/slices/blogSlices';
import {useParams , useRouter} from 'next/navigation';
import React , {useEffect , useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import {uploadImage} from '@/redux/slices/UploadsSlice';
import RichTextEditor from '../RichTextEditor';




const page = () => {
const { id } = useParams();
const router = useRouter();
const dispatch = useDispatch();
const {  loading, error, adminBlogs } = useSelector((state) => state.blog);

    // State to manage the blog being edited 
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
    
    
    
useEffect(() => {
    if ( adminBlogs.length === 0) {
        dispatch(getAllBlogsAdmin());
    }
}, [adminBlogs, dispatch]);
    
//    const blog = adminBlogs.find((b) => b._id === id);
    const blog = useMemo(() => {
        return adminBlogs.find((b) => b._id === id);
    }, [adminBlogs, id]);


    // Populate the state with the blog data
    useEffect(() => {
        if (blog) {
            setTitleEn(blog.title.en);
            setTitleAr(blog.title.ar);
            setDescriptionEn(blog.description.en);
            setDescriptionAr(blog.description.ar);
            setContentEn(blog.content.en);
            setContentAr(blog.content.ar);
            setMetaTitleEn(blog.metaTitle.en);
            setMetaTitleAr(blog.metaTitle.ar);
            setMetaDescriptionEn(blog.metaDescription.en);
            setMetaDescriptionAr(blog.metaDescription.ar);
            setImg(blog.image);
            setAuthor(blog.author);
            setSlug(blog.slug);
        }
    }, [blog, id]);
    
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
        const updatedData = {
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
        }
        const res = await dispatch(updateBlog({id, updatedData}));
        if (res.meta.requestStatus === "fulfilled") {
            setTimeout(() => {
                router.push("/dashboard/blog");
            }, 1000);
        } else {
            console.error("Error updating blog:", res.payload);
        }
    }


return (
    <div>
        
        <Box maxWidth="700px" mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Add Blog Post</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
  label="Blog Description (English)"
  fullWidth
  value={descriptionEn}
  onChange={(e) => setDescriptionEn(e.target.value)}
  margin="normal"
  multiline
  rows={3}
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
          {loading ? "Saving..." : "Update Blog"}
        </Button>
      </form>
    </Box>

    </div>
  )
}

export default page