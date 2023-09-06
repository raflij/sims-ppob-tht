import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserApi } from '../services/api';
import {
    setServices,
    setBanners,
    setSelectedService
} from '../redux/mainSlice';

import MainLayout from '../layout/MainLayout'
import CardUser from '../components/CardUser'
import CardMenu from '../components/CardMenu'
import CardBanner from '../components/CardBanner';

const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const services = useSelector((state) => state.main.services);
    const servicesList = [
        'PAJAK',
        'PLN',
        'PULSA',
        'PDAM',
        'PGN',
        'TV',
        'MUSIK',
        'VOUCHER_GAME',
        'VOUCHER_MAKANAN',
        'QURBAN',
        'ZAKAT',
        'PAKET_DATA',
    ];

    const sortedServices = services.slice().sort((a, b) => {
        const indexA = servicesList.indexOf(a.service_code);
        const indexB = servicesList.indexOf(b.service_code);
        return indexA - indexB;
    });

    const banners = useSelector((state) => state.main.banners);

    const token = useSelector((state) => state.persistedAuthentication.token);

    useEffect(() => {
        if (token) {
            if(Object.keys(services).length === 0) UserApi.fetchServices(token).then((response) => dispatch(setServices(response.data.data)));
            if(Object.keys(banners).length === 0) UserApi.fetchBanners(token).then((response) => dispatch(setBanners(response.data.data)));
        }
    }, [dispatch, token]);
    const handlePembayaran = (hasil) => {
        dispatch(setSelectedService(hasil))
        navigate('/service');
    }
    return (
        <MainLayout>
            <CardUser />
            <div className='relative flex justify-center items-start flex-wrap gap-8 py-6 max-w-[1248px] mx-auto'>
                {sortedServices.map((hasil, i) => {
                    let name;
                    switch (hasil.service_code) {
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
                        <CardMenu key={i} img={hasil.service_icon} label={name} onClick={() => handlePembayaran(hasil)} />
                    )
                })}
            </div>
            <div className='relative py-4 max-w-[1248px] mx-auto'>
                <h2 className='text-sm font-medium'>Temukan promo menarik</h2>
                <div className='mt-4 flex items-start gap-6'>
                    {banners.map((hasil, i) => (
                        <CardBanner key={i} img={hasil.banner_image} alt={hasil.banner_name} />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default MainPage
