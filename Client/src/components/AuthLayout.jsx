import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/Layout.css';

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // redirect to login
    }
  }, []);

  return (
    <div className="layout-container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;