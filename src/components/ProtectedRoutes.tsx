import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ 
  children, 
  allowedRole 
}: { 
  children: React.ReactNode, 
  allowedRole: string 
}) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Agar galat role hai toh uske default portal par redirect karo
    const fallbackPath = role === 'admin' ? "/admin-portal" : "/user-portal";
    return <Navigate to={fallbackPath} replace />;
  }

  // Children ko Fragment mein wrap karna TypeScript error prevent karta hai
  return <>{children}</>;
};