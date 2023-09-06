import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { UserApi } from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setBalance } from '../redux/mainSlice';

import Input from '../components/Input'
import MainLayout from '../layout/MainLayout'
import CardUser from '../components/CardUser'
import CardTopUp from '../components/CardTopUp';
import Button from '../components/Button'
import ButtonTopupMenu from '../components/ButtonTopupMenu';
import ModalMessage from '../components/ModalMessage';
import formatUang from '../utils/formatUang';

const TopupPage = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showModalResult, setShowModalResult] = useState(false);
    const [response, setResponse] = useState('');
    const [nominal, setNominal] = useState('');

    const token = useSelector((state) => state.persistedAuthentication.token);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        setNominal(data.top_up_amount)
        if (showModal === false) {
            setShowModalResult(false);
            setShowModal(true);
        } else {
            try {
                const response = await UserApi.topup(token, data);
                if (response.status === 200) {
                    setResponse('success');
                    UserApi.fetchBalance(token).then((response) => dispatch(setBalance(response.data.data)));
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setResponse('gagal');
                } else if (error.response && error.response.status === 401) {
                    setResponse('unauthorized');
                } else {
                    setResponse('Terjadi kesalahan');
                }
            } finally {
                setShowModalResult(true);
            }
        }
    };



    const handleModalClose = () => {
        setShowModal(false);
    };
    return (
        <MainLayout>
            <CardUser />
            <div className='relative my-6 max-w-[1248px] mx-auto'>
                <h2>Silahkan masukan</h2>
                <h1 className='font-semibold text-2xl'>Nominal Topup</h1>
            </div>
            <form method='post' action='' onSubmit={handleSubmit(onSubmit)}>
                <div className='relative flex items-center flex-wrap gap-4 my-6 max-w-[1248px] mx-auto'>
                    <div className='grow grid grid-cols-1 gap-7'>
                        <div className=''>
                            <Input
                                type="text"
                                name="top_up_amount"
                                placeholder="masukkan nominal Top Up"
                                icon="uil:wallet"
                                errors={errors}
                                register={register}
                                validationSchema={{
                                    required: "masukkan nominal Top Up",
                                    pattern: {
                                        value: /^[0-9]*\.?[0-9]+$/,
                                        message: "masukkan nominal Top Up yang benar"
                                    },
                                    min: {
                                        value: 10000,
                                        message: "minimum nominal Top Up adalah 10.000"
                                    },
                                    max: {
                                        value: 1000000,
                                        message: "maximum nominal Top Up adalah 1.000.000"
                                    }
                                }}
                            />
                        </div>
                        <div className='w-full'>
                            <Button label='Top Up' />
                        </div>
                    </div>
                    <div className='flex-none grid grid-cols-3 gap-y-7 gap-x-4'>
                        <ButtonTopupMenu value="10000" onClick={(event) => { event.preventDefault(); setValue("top_up_amount", 10000); }} />
                        <ButtonTopupMenu value="20000" onClick={(event) => { event.preventDefault(); setValue("top_up_amount", 20000); }} />
                        <ButtonTopupMenu value="50000" onClick={(event) => { event.preventDefault(); setValue("top_up_amount", 50000); }} />
                        <ButtonTopupMenu value="100000" onClick={(event) => { event.preventDefault(); setValue("top_up_amount", 100000); }} />
                        <ButtonTopupMenu value="250000" onClick={(event) => { event.preventDefault(); setValue("top_up_amount", 250000); }} />
                        <ButtonTopupMenu value="500000" onClick={(event) => { event.preventDefault(); setValue("top_up_amount", 500000); }} />
                    </div>
                </div>
            </form>
            <ModalMessage show={showModal} onClose={handleModalClose}>
                {showModalResult ? (
                    <CardTopUp response={response} nominal={nominal} />
                ) :
                    (
                        <form method='post' action='' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col items-center'>
                                <img src="/assets/img/Logo.png" alt="Logo" className='w-[40px] h-[40px]' />
                                <h1 className='mt-4  text-sm'>Anda yakin untuk Top Up sebesar</h1>
                                <h1 className='text-2xl font-semibold'>Rp{formatUang(nominal)} ?</h1>
                                <button className='text-red-500 font-medium mt-5  text-sm'>Ya, lanjutkan Top Up</button>
                                <button className='text-medium text-gray-300 mt-4  text-sm' onClick={handleModalClose}>Batalkan</button>
                            </div>
                        </form >

                    )}
            </ModalMessage >
        </MainLayout >
    )
}

export default TopupPage
