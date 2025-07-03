import React from "react";
import Sidebar from "./Sidebar";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

export default function AdminLayout({ children }) {
  return (
    <ProtectedAdminRoute>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
      </div>
    </ProtectedAdminRoute>
  );
}
