import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // ✅ use AuthContext
import { Navigate } from 'react-router-dom';

const AdminRequireAut = ({ children }) => {
  const { user } = useContext(AuthContext); // ✅ correct context

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRequireAut;
