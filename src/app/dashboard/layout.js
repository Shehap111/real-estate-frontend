'use client';
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import { useSelector } from "react-redux";

export default function AdminLayout({ children }) {
  const language = useSelector((state) => state.language.language);
  const isRTL = language === "ar";

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // يمنع الريندر على السيرفر

  return (
    <ProtectedAdminRoute>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
      </div>
    </ProtectedAdminRoute>
  );
}
