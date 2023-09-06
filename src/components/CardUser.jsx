import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { UserApi } from '../services/api';
import {
    setBalance,
    setProfile,
    setShowBalance
} from '../redux/mainSlice';
import formatUang from '../utils/formatUang';


const UserCard = () => {
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.main.profile);
    const balance = useSelector((state) => state.main.balance);
    const showBalance = useSelector((state) => state.main.showBalance);
    const token = useSelector((state) => state.persistedAuthentication.token);

    useEffect(() => {
        if (token) {
            if (!balance) UserApi.fetchBalance(token).then((response) => dispatch(setBalance(response.data.data)));
            if (Object.keys(profile).length === 0) UserApi.fetchProfile(token).then((response) => dispatch(setProfile(response.data.data)));
        }
    }, [dispatch, token]);

    const handleShowBalance = () => {
        dispatch(setShowBalance(!showBalance));
    };
    return (
        <div className='flex flex-wrap items-start py-6 max-w-[1248px] mx-auto'>
            <div className='grow flex flex-col items-start'>
                <div className='grow'>
                    <div className='w-[70px] h-[70px]'>
                        {profile.profile_image === 'https://minio.nutech-integrasi.app/take-home-test/null' ? (
                            <img
                                src="/assets/img/Profile Photo.png"
                                alt="Profile"
                                className="h-full w-full"
                            />
                        ) : (
                            <img
                                src={profile.profile_image}
                                alt="Profile"
                                className="h-full w-full rounded-full"
                            />
                        )}
                    </div>
                </div>
                <div className='grow mt-4 text-lg'>Selamat datang,</div>
                <div className='grow'>
                    <h1 className='text-2xl font-semibold capitalize'>{profile.first_name} {profile.last_name}</h1>
                </div>

            </div>
            <div className="relative none rounded-xl  "
            >
                <div className='absolute z-10 p-5 flex flex-col text-white'>
                    <div className='grow'>Saldo Anda</div>
                    <div className='grow text-3xl font-semibold mt-3'>Rp {showBalance ? formatUang(balance.balance) : '*******'}</div>
                    <div className='grow text-sm mt-6 hover:cursor-pointer hover:underline' onClick={handleShowBalance}>Lihat Saldo</div>
                </div>
                <img src='/assets/img/Background Saldo.png' alt='' className='relative z-0' />
            </div>
        </div>
    )
}

export default UserCard
