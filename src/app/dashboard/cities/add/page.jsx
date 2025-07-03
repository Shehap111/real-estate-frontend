"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCity } from "@/redux/slices/citySlice";
import { useRouter } from "next/navigation";

const NewCity = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.cities);

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cityData = {
      name: {
        en: nameEn,
        ar: nameAr,
      },
    };

    const res = await dispatch(createCity(cityData));

    if (res.meta.requestStatus === "fulfilled") {
      setSuccess(true);
      setNameEn("");
      setNameAr("");
      setTimeout(() => router.push("/dashboard/cities"), 1000);
    }
  };

  return (
    <Box maxWidth="700px" mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Add New City</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>City added successfully!</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="City Name (English)"
          fullWidth
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          margin="normal"
        />
        <TextField
          label="City Name (Arabic)"
          fullWidth
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add City"}
        </Button>
      </form>
    </Box>
  );
};

export default NewCity;
