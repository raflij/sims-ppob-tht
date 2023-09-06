import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { UserApi } from '../services/api';
import { setProfile } from '../redux/mainSlice';
import { logout } from '../redux/persistedAuthenticationSlice';
import { Icon } from '@iconify/react';

import MainLayout from '../layout/MainLayout'
import Input from '../components/Input'
import Button, { ButtonReverseStyle } from '../components/Button'

const ProfilePage = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.main.profile);
  const token = useSelector((state) => state.persistedAuthentication.token);

  const [switchEdit, setSwitchEdit] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null); // Added state for selected image

  const handleImageChange = async (event) => {
    setErrorMessage('');

    const file = event.target.files?.[0];

    if (file && file.size <= 100 * 1024) {
      setSelectedImage(file);
      try {
        const formData = new FormData();
        formData.append('file', file); // Use 'file' here instead of 'selectedImage'
        const response = await UserApi.uploadImage(token, formData);
        if (response.status === 200) {
          const responseData = response.data;
          dispatch(setProfile(responseData.data));
          setSuccessMessage(responseData.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.message);
        } else if (error.response && error.response.status === 401) { // Fix this line
          handleLogout();
        } else {
          setErrorMessage('Terjadi kesalahan');
        }
      }
    } else {
      setErrorMessage('ukuran foto maksimum 100kb');
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });


  const onSubmit = async (data) => {
    try {
      setSuccessMessage('')
      setErrorMessage('')
      const response = await UserApi.updateProfile(token, data);
      if (response.status === 200) {
        dispatch(setProfile(response.data.data))
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('gagal');
      } else if (error.response && error.response.status === 401) {
        setErrorMessage('unauthorized');
      } else {
        setErrorMessage('Terjadi kesalahan');
      }
    }
  };

  useEffect(() => {
    if (token) {
      if (Object.keys(profile).length === 0) UserApi.fetchProfile(token).then((response) => {
        dispatch(setProfile(response.data.data))
      });
    }
    if (profile) {
      setValue('email', profile.email)
      setValue('first_name', profile.first_name)
      setValue('last_name', profile.last_name)
    }
  }, [dispatch, token, profile]);

  const handleSwitchToEdit = () => {
    setSwitchEdit(!switchEdit);
  }

  const handleLogout = () => {
    dispatch(logout());
    return <Navigate to="/login" />
  };
  return (
    <MainLayout>
      <div className='relative py-6 max-w-[1248px] mx-auto'>
        <div className='relative flex flex-col w-[600px] mx-auto'>
          <div className='relative flex justify-center'>
            <div className="relative w-[98px] h-[98px]">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Profile"
                  className="h-full w-full rounded-full"
                />
              ) : profile.profile_image === 'https://minio.nutech-integrasi.app/take-home-test/null' ? (
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
              <span
                className="absolute bottom-0 right-0 rounded-full border border-gray-400 bg-white z-10 p-1"
                onClick={() => fileInputRef.current.click()}
                style={{ cursor: 'pointer' }}
              >
                <Icon icon="ri:pencil-fill" width="12" height="12" />
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
            </div>
          </div>
          <h1 className='mt-2 font-semibold text-2xl text-center'>{profile.first_name} {profile.last_name}</h1>
          <form method='post' action='' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-5 mt-6'>
              {successMessage && (
                <div className='relative'>
                  <div className='px-4 py-2 rounded bg-green-50'>
                    <span className='text-sm text-green-600'>{successMessage}</span>
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className='relative'>
                  <div className='px-4 py-2 rounded bg-red-50'>
                    <span className='text-sm text-red-600'>{errorMessage}</span>
                  </div>
                </div>
              )}
              <Input
                type="text"
                name="email"
                label="email"
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
                value={profile.email || ''}
              />
              <Input
                type="text"
                name="first_name"
                label="nama depan"
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
                name="last_name"
                label="nama belakang"
                placeholder="nama belakang"
                icon="mdi:user-outline"
                errors={errors}
                register={register}
                validationSchema={{
                  required: "nama belakang harus diisi",
                }}
              />
              {switchEdit ? (
                <>
                  <Button label="Simpan" />
                  <ButtonReverseStyle label="Batalkan" onClick={(e) => { e.preventDefault(); handleSwitchToEdit(); }} />
                </>
              ) : (
                <>
                  <ButtonReverseStyle label="Edit Profile" onClick={(e) => { e.preventDefault(); handleSwitchToEdit(); }} />
                  <Button label="Logout" onClick={(e) => { e.preventDefault(); handleLogout(); }} />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProfilePage
