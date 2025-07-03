"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ProtectedAdminRoute = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state) => state.admin.token);

  if (!token) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h6" mb={2}>
          Access Denied – You must be logged in as Admin.
        </Typography>
        <Button variant="contained" onClick={() => router.push("/admin/login")}>
          Go to Admin Login
        </Button>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
