import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Input = ({ icon, type, name, placeholder, register, errors, label, validationSchema, value }) => {
    const [showPassword, setShowPassword] = useState(false);

    const hasError = () => errors && errors[name];

    const handleInputChange = (e) => {
        const iconElement = e.target.parentNode.querySelector('.icon');
        const inputValue = e.target.value;

        iconElement.classList.toggle('text-stone-800', inputValue);
        iconElement.classList.toggle('text-stone-300', !inputValue);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <label className="block">
            {label && (
                <span className="text-zinc-700 text-sm font-medium capitalize">{label}</span>
            )}
            <div className={`relative ${label ? 'mt-2' : ''}`}>
                <span className={`absolute inset-y-0 left-0 pl-3 flex items-center ${hasError() ? 'text-red-400' : 'text-stone-300'} icon`}>
                    <Icon icon={icon} />
                </span>
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    id={name}
                    name={name}
                    autoComplete="off"
                    className={`text-sm pl-9 text-stone-800 placeholder-stone-300 block
                      ${type === 'password' ? 'password' : ''}
                      w-full rounded border  
                    ${hasError() ? 'border-red-400' : 'border-stone-200/60'} focus:outline-none focus:ring-0
                    ${hasError() ? 'focus:ring-red-400 focus:border-red-400' : 'focus:ring-blue-400 focus:border-blue-400'}`}
                    placeholder={placeholder}
                    {...register(name, validationSchema, {})}
                    onChange={handleInputChange}
                    value={value}
                />
                {type === 'password' && (
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-300"
                        onClick={(e) => {
                            e.preventDefault();
                            handleShowPassword();
                        }}
                    >
                        <Icon icon={showPassword ? 'mdi:eye' : 'iconamoon:eye-light'} />
                    </div>
                )}
            </div>
            {hasError() && (
                <div className="flex justify-end">
                    <span className="text-xs text-red-600 absolute mt-1">{errors[name].message}</span>
                </div>
            )}
        </label>
    );
};

export default Input;