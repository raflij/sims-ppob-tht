import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authenticationSlice';

import Authlayout from '../layout/AuthLayout'
import Input from '../components/Input'
import Button from '../components/Button'

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const errorMessage = useSelector((state) => state.authentication.error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await dispatch(loginUser(data));
            if (response) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Authlayout>

            <div className='relative flex flex-col w-80 space-y-6'>
                <div className='flex justify-center space-x-4'>
                    <i className=''>
                        <img src="/assets/img/Logo.png" alt="Logo" />
                    </i>
                    <h1 className='font-bold text-xl'>SIMS PPOB</h1>
                </div>
                <div className=''>
                    <h1 className='font-semibold text-2xl text-center'>Masuk atau buat akun<br /> untuk memulai</h1>
                </div>
                <form method='post' action='' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 gap-7'>
                        <Input
                            type="text"
                            name="email"
                            placeholder="masukkan email anda"
                            icon="mdi:at"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "email harus diisi",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "email tidak valid"
                                }
                            }}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="masukkan password anda"
                            icon="mdi:password-outline"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "password harus diisi",
                            }}
                        />
                        <Button label='Masuk' />
                    </div>
                </form>
                <div className='flex justify-center'>
                    <span className='text-xs text-gray-500'>belum punya akun? registrasi <Link to="/register"><span className='font-bold text-red-600'>di sini</span></Link>
                    </span>
                </div>
            </div>
            {errorMessage && (
                <div className='relative w-full px-10'>
                    <div className='absolute w-full mt-16'>
                    <div className='px-4 py-2 rounded bg-red-50'>
                        <span className='text-sm text-red-600'>{errorMessage}</span>
                    </div>
                    </div>
                </div>
            )}
        </Authlayout>
    )
}

export default LoginPage
