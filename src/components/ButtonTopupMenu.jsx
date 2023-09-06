import React from 'react'

const ButtonTopupMenu = ({value, onClick}) => {
  return (
    <button className='text-sm border rounded py-2 px-4' onClick={onClick}>Rp{value}</button>
  )
}

export default ButtonTopupMenu
