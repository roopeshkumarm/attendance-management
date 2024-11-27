'use client';
import React, { useState, useEffect } from 'react';
import { login } from "../../lib/supabaseAuth";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            router.push('/dashboard');
        }
    }, []);

    const handleSuccess = async () => {
        await router.push('/dashboard/student');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await login(email, password);
            console.log(data);
            await handleSuccess();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const redirectToSignup = () => {
        router.push('/signup');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                {loading ? (
                    <div className="text-center mb-4">Loading...</div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-medium mb-2">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-600 text-sm font-medium mb-2">Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-700 mb-4"
                            >
                                Login
                            </button>
                        </form>
                        <button
                            onClick={redirectToSignup}
                            className="w-full py-2 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400"
                        >
                            Signup
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
