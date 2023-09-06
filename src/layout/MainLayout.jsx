import React from 'react'
import Navbar from '../components/Navbar'

const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default MainLayout
