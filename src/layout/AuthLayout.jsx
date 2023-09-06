import React from 'react'

const Authlayout = ({ children }) => {
    return (
        <div className='relative min-h-screen flex mx-auto'>
            <div className='relative basis-1/2 flex flex-col justify-center items-center'>
                {children}
            </div>
            <div className="relative basis-1/2 max-h-screen w-auto flex justify-center">
                <img src='/assets/img/Illustrasi Login.png' alt='' className='h-full' />
            </div>
        </div>
    )
}

export default Authlayout
