'use client';
import React, {useState} from 'react'
import { uploadImage, clearImage } from '@/redux/slices/UploadsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {createPropertyType} from '@/redux/slices/propertyTypeSlice';
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const page = () => {
const dispatch = useDispatch();

const { imageUrl, loading, error } = useSelector((state) => state.uploads);

    const [nameEn, setNameEn] = useState("");
    const [nameAr, setNameAr] = useState("");
    const [img, setImg] = useState("");
    const [success, setSuccess] = useState(false);
    

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


    const PropertyTypeData = {
        name: {
          en: nameEn,
          ar: nameAr,
        },
        image: img,
    };
    

    const res = await dispatch(createPropertyType(PropertyTypeData));
    if (res.meta.requestStatus === 'fulfilled') {
        setSuccess(true);
        setNameEn("");
        setNameAr("");
        setImg("");
        setTimeout(() => {
            dispatch(clearImage());
            setSuccess(false);
        }, 1000);
    }

}
    
  return (

    <Box maxWidth="700px" mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Add Property Type</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Property Type added successfully!</Alert>}

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
          label="Property Type Name (English)"
          fullWidth
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Property Type Name (Arabic)"
          fullWidth
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add Property Type"}
        </Button>
      </form>
    </Box>
  )
}

export default page