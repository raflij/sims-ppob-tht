import React from 'react'
import { Navigate } from 'react-router-dom'
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import formatUang from '../utils/formatUang';

const CardTransaction = ({ type, nominal, date, description }) => {


  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, 'HH:mm');
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, 'd MMMM yyyy');
  }
  return (
    <div className='rounded border border-gray-200 p-4 flex items-center'>
      <div className='grow flex flex-col'>
        <div className={`flex items-center ${type === 'TOPUP' ? 'text-green-500' : 'text-red-600'}`}>
          <span className='mr-1'>
            <Icon icon="ic:baseline-plus" width="16" height="16" />
          </span>
          <h1 className='text-xl font-medium'> Rp.{formatUang(nominal)}</h1>
        </div>
        <div className='flex items-center text-sm space-x-2 mt-1 text-gray-300'>
          <span className=''>{formatDate(date)}</span>
          <span className=''>{formatTime(date)} WIB</span>
        </div>
      </div>
      <div className='flex-none'>
        <h1 className='text-sm'>
          {description}
        </h1>
      </div>
    </div>
  )
}

export default CardTransaction
