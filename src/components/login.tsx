import React from 'react';
import { Link } from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";

import { useAccount } from '@/hooks';

export const Login = () => {

    const navigate = useNavigate();
    const { handlePostLogin, storeAccount } = useAccount();
    const { loading } = storeAccount;

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const email = event.target.email.value;
            const password = event.target.password.value;
            const response = await handlePostLogin({ email, password });
            await unwrapResult(response);
            navigate(-1);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className="p-5 w-full flex justify-center items-center flex-col min-h-screen"
        >
            <Link to="/" className="relative bottom-12">
                <img
                    className="w-24 h-24"
                    src="https://res.cloudinary.com/dycmdfgj3/image/upload/v1654408868/logo3_zukhh0.png"
                />
            </Link>
            <form
                onSubmit={onSubmit}
                className="w-full flex flex-col gap-6"
            >
                <div>
                    <label className="block mb-2 text-lg font-medium text-gray-900">E-mail</label>
                    <input
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:to-pink-600 focus:border-pink-500 block w-full p-2.5 focus:outline-none"
                        placeholder="Email..."
                    />
                </div>
                <div>
                    <label className="block mb-2 text-lg font-medium text-gray-900">Password</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:to-pink-600 focus:border-pink-500 block w-full p-2.5 focus:outline-none"
                        placeholder="Password..."
                        name="password"
                        type="password"
                    />
                </div>
                <button
                    disabled={loading}
                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                    {
                        loading ? "Loading..." : "Đăng nhập"
                    }
                </button>
                <a href="https://kaito-music.vercel.app" className="text-center" target="_blank">Đăng ký!</a>

            </form>
        </div>
    )
}

