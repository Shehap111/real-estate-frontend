"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, token } = useSelector((state) => state.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginAdmin({ email, password }));

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/dashboard"); // بعد اللوجين يروح للداشبورد
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" mb={3}>
          Admin Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
