import React from 'react';
import { Navigate } from 'react-router-dom';

export default function GuradedRoute({ children }) {
    const isLoggedin = sessionStorage.getItem('user') ? true : false;
    return isLoggedin ? children : <Navigate to='/login' />;
}
