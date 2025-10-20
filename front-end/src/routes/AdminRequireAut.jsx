// src/routes/ProtectedAdminRoutes.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminRequireAut from "../pages/Auth/AdminRequireAut";

const ProtectedAdminRoutes = () => {
  return (
    <AdminRequireAut>
      <Outlet /> 
    </AdminRequireAut>
  );
};

export default ProtectedAdminRoutes;
