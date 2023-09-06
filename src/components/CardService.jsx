import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import formatUang from '../utils/formatUang';

const CardService = ({ response, name, nominal }) => {
    return (
        <>
            {response === "success" ? (
                <div className='flex flex-col items-center'>
                    <span className='flex justify-center items-center rounded-full bg-emerald-500 w-[52px] h-[52px] text-white'>
                        <Icon icon="ic:round-check" width="28" height="28" />
                    </span>
                    <h1 className='mt-3 text-sm'>Pembayaran {name} sebesar</h1>
                    <h1 className='text-2xl font-semibold'>Rp{formatUang(nominal)}</h1>
                    <h1 className='mt-1 text-sm'>berhasil!</h1>
                    <Link to="/">
                        <button className='text-medium font-medium text-red-600 mt-4  text-sm'>Kembali ke Beranda</button>
                    </Link>
                </div>
            ) : (

                <div className='flex flex-col items-center'>
                    <span className='flex justify-center items-center rounded-full bg-red-500 w-[52px] h-[52px] text-white'>
                        <Icon icon="humbleicons:times" width="28" height="28" />
                    </span>
                    <h1 className='mt-3 text-sm'>Pembayaran {name} sebesar</h1>
                    <h1 className='text-2xl font-semibold'>Rp{formatUang(nominal)}</h1>
                    <h1 className='mt-1 text-sm'>gagal</h1>
                    <Link to="/">
                        <button className='text-medium font-medium text-red-600 mt-4  text-sm'>Kembali ke Beranda</button>
                    </Link>
                </div>
            )}
        </>
    )
}

export default CardService
