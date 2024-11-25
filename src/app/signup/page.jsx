// src/app/signup/page.jsx
'use client';
import React, { useState } from 'react';
import { signup } from "../../lib/supabaseAuth";
import { useRouter } from 'next/navigation';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData.email, formData.password)
            .then(() => {
                router.push('/login'); // Redirect to login on success
            })
            .catch((error) => {
                if (error.message.includes('already registered')) {
                    setErrorMessage('User already registered. Please login.');
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            });
    };

    const redirectToLogin = () => {
        router.push('/login'); // Navigate to login page
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg relative">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>
                {errorMessage && (
                    <div className="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-700 mb-4"
                    >
                        Signup
                    </button>
                </form>
                <button
                    onClick={redirectToLogin}
                    className="w-full py-2 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default SignupPage;
