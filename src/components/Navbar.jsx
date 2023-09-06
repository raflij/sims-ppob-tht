import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/persistedAuthenticationSlice';
import NavbarMenu from './NavbarMenu';

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        return <Navigate to="/login" />
    };
    return (
        <div className='relative border-b border-b-stone-200 py-4'>
            <div className='max-w-[1248px] flex justify-between items-center mx-auto'>
                <Link to="/">
                    <div className='flex items-center space-x-4'>
                        <i className=''>
                            <img src="/assets/img/Logo.png" alt="Logo" />
                        </i>
                        <h1 className='font-bold text-lg'>SIMS PPOB</h1>
                    </div>
                </Link>
                <div className='flex items-center space-x-8'>
                    <NavbarMenu to="/topup" label="Top Up" />
                    <NavbarMenu to="/transaction" label="Transaction" />
                    <NavbarMenu to="/akun" label="Akun" />
                    <button className='font-medium text-sm' onClick={handleLogout}>Logout</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar
