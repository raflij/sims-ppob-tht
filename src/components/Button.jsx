import React from 'react'

const Button = ({ label, disabled, onClick }) => {
  return (
    <button type='submit' disabled={disabled} onClick={onClick} className='w-full flex justify-center items-center py-2 bg-red-600 rounded text-white font-medium text-sm'>
      {label}
    </button>
  )
}

export const ButtonReverseStyle = ({ label, disabled, onClick }) => {
  return (
    <button type='submit' disabled={disabled} onClick={onClick} className='w-full flex justify-center items-center py-2 text-red-600 rounded border border-red-600 font-medium text-sm'>
      {label}
    </button>
  )
}

export default Button