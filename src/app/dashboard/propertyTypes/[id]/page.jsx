'use client';
import React, { use, useEffect, useState,useMemo  } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import {getAllPropertyTypesAdmin, updatePropertyType} from '@/redux/slices/propertyTypeSlice';
import {uploadImage} from '@/redux/slices/UploadsSlice';
const EditpropertyTypePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  const {adminList, loading} = useSelector((state) => state.propertyTypes);
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [img, setImg] = useState('');

  // fetch property types if needed
  useEffect(() => {
    if (adminList.length === 0) {
      dispatch(getAllPropertyTypesAdmin());
    }
  }, [dispatch, adminList]);



  const propertyType = useMemo(() => {
    return adminList.find((p) => p._id === id);
  }, [adminList, id]);
  
  
  useEffect(() => {
    if (propertyType) {
      setNameEn(propertyType.name.en || '');
      setNameAr(propertyType.name.ar || '');
      setImg(propertyType.image || '');
    }
  }, [propertyType]);
  
  // set form values after property type is found
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

    const res = await dispatch(
      updatePropertyType({
        id: propertyType._id,
        updatedData: {
          name: {
            en: nameEn,
            ar: nameAr,
          },
          image: img,
        },
      })
    );

    if (res.meta.requestStatus === 'fulfilled') {
      router.push('/dashboard/propertyTypes'); // Navigate back after saving
    } else {
      toast.error('Failed to update Property Type');
    }
    
  }
  

  return (
    <Box>
      <Box maxWidth="700px" mx="auto" mt={5}>
        <Typography variant="h5" mb={2}>Edit Property Type</Typography>

        {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
        
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


          <Stack spacing={2}>
            <TextField
              label="Name (English)"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              fullWidth
            />
            <TextField
              label="Name (Arabic)"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              fullWidth
            />
<Button
  type="submit"
  variant="contained"
  color="primary"
  disabled={loading}
>
  {loading ? 'Saving...' : 'Save Changes'}
</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default EditpropertyTypePage