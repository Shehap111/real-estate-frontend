'use client';
import React, {useEffect  , useMemo, useState} from 'react'
import { createProperty } from '@/redux/slices/propertySlice';
import {getAllCities} from '@/redux/slices/citySlice';
import {getAllPropertyTypesAdmin} from '@/redux/slices/propertyTypeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Select, InputLabel , MenuItem, Grid ,IconButton, Rating  } from "@mui/material";

import Image from 'next/image';
import {uploadImage, uploadImage360} from '@/redux/slices/UploadsSlice';

const AddProperty = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { loading , error } = useSelector((state) => state.property);
    const { list , loading: citiesLoading } = useSelector((state) => state.cities);
    const { adminList , loading: typesLoading } = useSelector((state) => state.propertyTypes);
    // state for form inputs
    const [titleEn, setTitleEn] = useState("");
    const [titleAr, setTitleAr] = useState("");
    const [descriptionAr, setDescriptionAr] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [locationAr, setLocationAr] = useState("");
    const [locationEn, setLocationEn] = useState("");
    const [slug, setSlug] = useState("");
    const [img, setImg] = useState([]);
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [area, setArea] = useState("");
    const [operationType, setOperationType] = useState(""); // rent or sale
    const [videoUrl, setVideoUrl] = useState(""); 
    const [img360, setImg360] = useState(""); 
    const [mapLocation, setMapLocation] = useState(""); // map Location
    const [price, setPrice] = useState("");
    const [rating , setRating] = useState(0); // rating
    const [cityId, setCityId] = useState("");
    const [propertyTypeId, setPropertyTypeId] = useState("");

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        dispatch(getAllCities());
        dispatch(getAllPropertyTypesAdmin());
    }, []);


const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
        dispatch(uploadImage(file)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
            setImg((prev) => [...prev, res.payload]);
        }
        });
    });
    };
      
const handleImage360Change = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  dispatch(uploadImage360(file)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") {
      setImg360(res.payload);
    }
  });
};
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const propertyData = {
            title: {
                en: titleEn,
                ar: titleAr,
            },
            description: {
                en: descriptionEn,
                ar: descriptionAr,
            },
            location: {
                en: locationEn,
                ar: locationAr,
            },
            slug: slug,
            images: img,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            area: area,
            operationType: operationType,
            videoUrl: videoUrl,
            mapLocation: mapLocation,
            price: price,
            rating: rating || 0,
            cityId: cityId,
            propertyTypeId: propertyTypeId,
            image360:img360
        }
        const res = await dispatch(createProperty(propertyData));
        if (res.meta.requestStatus === 'fulfilled') {
            setSuccess(true);
            setTimeout(() => {
                router.push('/dashboard/property');
                setSuccess(false);
            }, 1000);
        }

    }


  return (
      <div>
          <h1>Add Property</h1>

          <Box maxWidth="700px" mx="auto" mt={5}>
            <TextField
              label="Property Name (EN)"
              variant="outlined"
              fullWidth
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Property Name (AR)"
              variant="outlined"
              fullWidth
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              sx={{ mb: 2 }}
              />
              
            <TextField
              label="Property Description (EN)"
              variant="outlined"
              fullWidth
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              sx={{ mb: 2 }}
              multiline
              rows={3}
            />
            <TextField
              label="Property Description (AR)"
              variant="outlined"
              fullWidth
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              sx={{ mb: 2 }}
              multiline
              rows={3}
            />

            <TextField
              label="Property Location (EN)"
              variant="outlined"
              fullWidth
              value={locationEn}
              onChange={(e) => setLocationEn(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Property Location (AR)"
              variant="outlined"
              fullWidth
              value={locationAr}
              onChange={(e) => setLocationAr(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Property Slug"
              variant="outlined"
              fullWidth
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              sx={{ mb: 2 }}
            />
              
<TextField
  label="Property Bedrooms"
  variant="outlined"
  fullWidth
  type="number"
  inputProps={{ min: 0 }}
  value={bedrooms}
  onChange={(e) => {
    const value = Number(e.target.value);
    if (value >= 0) setBedrooms(value);
  }}
  sx={{ mb: 2 }}
/>

<TextField
  label="Property Bathrooms"
  variant="outlined"
  fullWidth
  type="number"
  inputProps={{ min: 0 }}
  value={bathrooms}
  onChange={(e) => {
    const value = Number(e.target.value);
    if (value >= 0) setBathrooms(value);
  }}
  sx={{ mb: 2 }}
/>

<TextField
  label="Property Area (in sq meters)"
  variant="outlined"
  fullWidth
  type="number"
  inputProps={{ min: 0 }}
  value={area}
  onChange={(e) => {
    const value = Number(e.target.value);
    if (value >= 0) setArea(value);
  }}
  sx={{ mb: 2 }}
/>

 
        
<TextField
  label="Property Video URL"
  variant="outlined"
  fullWidth
  value={videoUrl}
  onChange={(e) => setVideoUrl(e.target.value)}
  sx={{ mb: 2 }}
  />
<TextField
  label="Property Map Location"
  variant="outlined"
  fullWidth
  value={mapLocation}
  onChange={(e) => setMapLocation(e.target.value)}
  sx={{ mb: 2 }}
/>
<TextField
  label="Property Price"
  variant="outlined"
  fullWidth
  type="number"
  inputProps={{ min: 0 }} // يمنع إدخال قيمة سالبة من الواجهة
  value={price}
  onChange={(e) => {
    const value = Number(e.target.value);
    if (value >= 0) setPrice(value); // فقط لو الرقم موجب
  }}
  sx={{ mb: 2 }}
/>

<Box display="flex" alignItems="center" gap={1}>
  <Rating
    name="admin-rating"
    value={rating}
    precision={0.1}
    onChange={(event, newValue) => setRating(newValue)}
  />
  <Typography>{rating || 0}</Typography>
</Box>

   
              
<InputLabel id="operation-type-label">Operation Type</InputLabel>
  <Select
    labelId="operation-type-label"
    label="Operation Type"
    fullWidth
    value={operationType}
    onChange={(e) => setOperationType(e.target.value)}
  >
    <MenuItem value="rent">Rent</MenuItem>
    <MenuItem value="sale">Sale</MenuItem>
  </Select>
<InputLabel id="property-type-label">Property Type</InputLabel>
<Select
    labelId="property-type-label"
    label="Property Type"
    variant="outlined"
    fullWidth
    value={propertyTypeId}
    onChange={(e) => setPropertyTypeId(e.target.value)}
    sx={{ mb: 2 }}
    >   
    {typesLoading ? (
        <MenuItem value="">Loading...</MenuItem>
    ) : (
        adminList.map((type) => (
            <MenuItem key={type._id} value={type._id}>
                {type.name.en}
            </MenuItem>
        ))
    )}
</Select>
<InputLabel id="city-label">City</InputLabel>
<Select
    labelId="city-label"
    label="City"
    variant="outlined"
    fullWidth
    value={cityId}
    onChange={(e) => setCityId(e.target.value)}
    sx={{ mb: 2 }}
    >
        {citiesLoading ? (
            <MenuItem value="">Loading...</MenuItem>
        ) : (
            list.map((city) => (
                <MenuItem key={city._id} value={city._id}>
                    {city.name.en}
                </MenuItem>
            ))
        )}
</Select>
              

<InputLabel shrink>360° Image</InputLabel>
  <input
    type="file"
    accept="image/*"
    onChange={handleImage360Change}
    style={{ marginTop: "10px" }}
  />
  <Box mt={2} mb={5}>
    <Typography variant="subtitle2" gutterBottom>360° Preview:</Typography>
    <Box
      component="img"
      src={img360}
      alt="box for image 360  "
      sx={{ width: "100%", maxWidth: 400, borderRadius: 2, boxShadow: 1 }}
    />
  </Box>         


<input
  type="file"
  accept="image/*"
  multiple
  placeholder='adsadsadsads'
  onChange={handleImageChange}
/>
              

<Grid container spacing={2} sx={{ my: 2 }}>
  {img.map((imgUrl, i) => (
    <Grid item xs={6} sm={3} key={i}>
      <Box position="relative">

              
<IconButton
  size="small"
  color="error"
  onClick={() => setImg((prev) => prev.filter((_, index) => index !== i))}
  sx={{ position: 'absolute', top: 4, right: 4, zIndex: 1 }}
>
  🗑️
</IconButton>


        <Box
          sx={{
            width: '100%',
            height: 140,
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #ccc',
          }}
        >
          <img
            src={imgUrl}
            alt={`preview-${i}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>




            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Create Property"}
            </Button>
          </Box>
    </div>
  )
}

export default AddProperty