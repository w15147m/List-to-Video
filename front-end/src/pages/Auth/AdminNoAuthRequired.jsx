import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminNoAuthRequired = ({ children }) => {
  const { user } = useContext(AuthContext); 
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default AdminNoAuthRequired;