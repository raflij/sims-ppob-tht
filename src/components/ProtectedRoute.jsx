import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserApi } from '../services/api';
import { logout } from '../redux/persistedAuthenticationSlice';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.persistedAuthentication.token);

    const handleLogout = async () => {
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {

        if (!token) {
            handleLogout();
        }
        if (token) {
            UserApi.fetchProfile(token)
                .then((response) => {
                    if (response.status === 200) {
                    }
                })
                .catch((error) => {
                    handleLogout();
                });
        }
    }, [dispatch, token, navigate, handleLogout]);

    return children;
}

export default ProtectedRoute;
