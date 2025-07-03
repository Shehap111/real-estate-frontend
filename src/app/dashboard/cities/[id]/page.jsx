'use client';
import React, { useEffect, useState } from 'react';
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
import { updateCity, getAllCities } from '@/redux/slices/citySlice';
import { toast } from 'react-toastify';

const EditCityPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  const { list, loading } = useSelector((state) => state.cities);
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');

  // fetch cities if needed
  useEffect(() => {
    if (list.length === 0) {
      dispatch(getAllCities());
    }
  }, [dispatch, list]);

  // get the current city from list
  const city = list.find((c) => c._id === id);

  // set form values after city is found
  useEffect(() => {
    if (city) {
      setNameEn(city.name.en || '');
      setNameAr(city.name.ar || '');
    }
  }, [city]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      updateCity({
        id: city._id,
        cityData: {
          name: {
            en: nameEn,
            ar: nameAr,
          },
        },
      })
    );

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('City updated successfully');
      router.push('/dashboard/cities'); // رجوع بعد الحفظ
    } else {
      toast.error(res.payload || 'Failed to update city');
    }
  };

  if (!city) return <Typography>Loading city data...</Typography>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" mb={3}>
        Edit City
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="City Name (English)"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          required
        />
        <TextField
          label="اسم المدينة (بالعربية)"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          required
          dir="rtl"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </Stack>
    </Box>
  );
};

export default EditCityPage;
