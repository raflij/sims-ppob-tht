import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/registrationSlice';

import Authlayout from '../layout/AuthLayout'
import Input from '../components/Input'
import Button from '../components/Button'

const RegisterPage = () => {
    const dispatch = useDispatch();

    const successMessage = useSelector((state) => state.registration.successMessage);
    const errorMessage = useSelector((state) => state.registration.error);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        try {
            const newData = {
                email: data.email,
                first_name: data.fName,
                last_name: data.lName,
                password: data.password,
            }
            await dispatch(registerUser(newData));
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
                    <h1 className='font-semibold text-2xl text-center'>Lengkapi data untuk<br /> membuat akun</h1>
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
                            type="text"
                            name="fName"
                            placeholder="nama depan"
                            icon="mdi:user-outline"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "nama depan harus diisi",
                            }}
                        />
                        <Input
                            type="text"
                            name="lName"
                            placeholder="nama belakang"
                            icon="mdi:user-outline"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "nama belakang harus diisi",
                            }}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="buat password"
                            icon="mdi:password-outline"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "password harus diisi",
                                minLength: {
                                    value: 8,
                                    message: "password minimal 8 karakter"
                                }
                            }}
                        />
                        <Input
                            type="password"
                            name="repassword"
                            placeholder="konfirmasi password"
                            icon="mdi:password-outline"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "konfirmasi password harus diisi",
                                validate: (value) => value === watch("password") || "password tidak sama"

                            }}
                        />
                        <Button label='Registrasi' />
                    </div>
                </form>
                <div className='flex justify-center'>
                    <span className='text-xs text-gray-500'>sudah punya akun? login <Link to="/login"><span className='font-bold text-red-600'>di sini</span></Link>
                    </span>
                </div>
            </div>
            {successMessage && (
                <div className='relative w-full mt-4 px-10'>
                    <div className='px-4 py-2 rounded bg-green-50'>
                        <span className='text-sm text-green-600'>{successMessage}</span>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className='relative w-full mt-4 px-10'>
                    <div className='px-4 py-2 rounded bg-red-50'>
                        <span className='text-sm text-red-600'>{errorMessage}</span>
                    </div>
                </div>
            )}
        </Authlayout>
    )
}

export default RegisterPage