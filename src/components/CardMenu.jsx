import React from 'react'

const MenuCard = ({ img, label, onClick  }) => {
    return (
        <button type='submit' className='flex flex-col justify-center items-center max-w-[70px]' onClick={onClick}>
            <img src={img} alt={label} />
            <span className='mt-1 text-center text-sm'>{label}</span>
        </button>
    )
}

export default MenuCard
