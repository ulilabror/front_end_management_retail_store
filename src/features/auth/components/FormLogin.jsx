import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi antar route

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, loading } = useAuth();
    const navigate = useNavigate(); // Hook untuk navigasi

    const [showPopup, setShowPopup] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);

        if (error) {
            setShowPopup(true);
            setIsButtonDisabled(true);
        }
    };

    useEffect(() => {
        if (isButtonDisabled) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            if (countdown === 0) {
                clearInterval(timer);
                setIsButtonDisabled(false);
                setCountdown(3);
            }

            return () => clearInterval(timer);
        }
    }, [isButtonDisabled, countdown]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-md shadow-md">
                                <p className="text-red-500">{error}</p>
                                <button
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={loading || isButtonDisabled}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading || isButtonDisabled ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {loading
                                ? 'Loading...'
                                : isButtonDisabled
                                    ? `Wait ${countdown}...`
                                    : 'Sign In'}
                        </button>

                        {/* Tombol Daftar */}
                        <button
                            type="button"
                            onClick={() => navigate('/register')} // Navigasi ke route /register
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Daftar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormLogin;
