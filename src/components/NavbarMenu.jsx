import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const NavbarMenu = ({ label, to }) => {
    const location = useLocation();
    return (
        <Link to={to}>
            <div className={`font-medium text-sm ${location === to ? 'text-red-600' : ''}`}>{label}</div>
        </Link>
    )
}

export default NavbarMenu
