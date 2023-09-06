import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { UserApi } from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import {
    setBalance
} from '../redux/mainSlice';
import Input from '../components/Input'
import MainLayout from '../layout/MainLayout'
import CardUser from '../components/CardUser'
import CardService from '../components/CardService';
import Button from '../components/Button'
import ModalMessage from '../components/ModalMessage';
import formatUang from '../utils/formatUang';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showModalResult, setShowModalResult] = useState(false);
    const [response, setResponse] = useState('');

    const token = useSelector((state) => state.persistedAuthentication.token);
    const selectedService = useSelector((state) => state.main.selectedService);
    const balance = useSelector((state) => state.main.balance);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});


    const onSubmit = async () => {
        if (showModal === false) {
            setShowModalResult(false);
            setShowModal(true);
        } else {
            try {
                const response = await UserApi.payment(token, selectedService);
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


    let name;
    switch (selectedService.service_code) {
        case 'PAJAK':
            name = 'PBB'
            break;
        case 'PLN':
            name = 'Listrik'
            break;
        case 'PDAM':
            name = 'PDAM'
            break;
        case 'PULSA':
            name = 'Pulsa'
            break;
        case 'PGN':
            name = 'PGN'
            break;
        case 'MUSIK':
            name = 'Musik'
            break;
        case 'TV':
            name = 'TV Langganan'
            break;
        case 'PAKET_DATA':
            name = 'Paket Data'
            break;
        case 'VOUCHER_GAME':
            name = 'Voucher Game'
            break;
        case 'VOUCHER_MAKANAN':
            name = 'Voucher Makanan'
            break;
        case 'QURBAN':
            name = 'Kurban'
            break;
        case 'ZAKAT':
            name = 'Zakat'
            break;
        default:
            name = 'invalid'
    }
    return (
        <MainLayout>
            <CardUser />
            <div className='relative my-6 max-w-[1248px] mx-auto'>
                <h2>PemBayaran</h2>
                <div className='flex items-center'>
                    <img src={selectedService.service_icon} alt={name} className='w-[28px] h-[28px]' />
                    <h1 className='font-semibold text-2xl ml-1'>{name}</h1>
                </div>
            </div>
            <form method='post' action='' onSubmit={handleSubmit(onSubmit)}>
                <div className='relative grow grid grid-cols-1 gap-7 py-6 max-w-[1248px] mx-auto'>
                    <Input
                        type="text"
                        name="service_amount"
                        icon="uil:wallet"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "masukkan nominal Pembayaran",
                            validate: value => selectedService.service_tariff < balance.balance || "balance tidak mencukupi",
                        }}
                        value={formatUang(selectedService.service_tariff)}
                    />
                    <Button label='Bayar' />
                </div>
            </form>
            <ModalMessage show={showModal} onClose={handleModalClose}>
                {showModalResult ? (
                    <CardService response={response} nominal={selectedService.service_tariff} name={name} />
                ) :
                    (
                        <form method='post' action='' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col items-center'>
                                <img src="/assets/img/Logo.png" alt="Logo" className='w-[40px] h-[40px]' />
                                <h1 className='mt-4 text-sm'>Beli {name} senilai</h1>
                                <h1 className='text-2xl font-semibold'>Rp{formatUang(selectedService.service_tariff)} ?</h1>
                                <button className='text-red-500 font-medium mt-5  text-sm'>Ya, lanjutkan Bayar</button>
                                <button className='text-medium text-gray-300 mt-4  text-sm' onClick={handleModalClose}>Batalkan</button>
                            </div>
                        </form >

                    )}
            </ModalMessage >
        </MainLayout >
    )
}

export default PaymentPage
