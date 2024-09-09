import React, { useState } from 'react';

export default function PaymentMethods() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const bankOptions = [
        { name: 'Bank BCA', value: 'bca' },
        { name: 'Bank Mandiri', value: 'mandiri' },
        { name: 'Bank BNI', value: 'bni' },
        { name: 'Bank BRI', value: 'bri' }
    ];

    const eWalletOptions = [
        { name: 'GoPay', value: 'gopay' },
        { name: 'LinkAja', value: 'linkaja' },
        { name: 'OVO', value: 'ovo' },
        { name: 'Dana', value: 'dana' }
    ];

    const renderPaymentMethods = () => {
        if (selectedCategory === 'bank') {
            return bankOptions.map((bank) => (
                <div
                    key={bank.value}
                    className={`p-4 mt-4 rounded-lg border ${selectedPayment === bank.value ? 'border-indigo-500 bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                >
                    <input
                        type="radio"
                        name="paymentMethod"
                        value={bank.value}
                        checked={selectedPayment === bank.value}
                        onChange={() => setSelectedPayment(bank.value)}
                        className="mr-2"
                    />
                    <label className="text-gray-900 dark:text-gray-100">{bank.name}</label>
                </div>
            ));
        } else if (selectedCategory === 'eWallet') {
            return eWalletOptions.map((wallet) => (
                <div
                    key={wallet.value}
                    className={`p-4 mt-4 rounded-lg border ${selectedPayment === wallet.value ? 'border-indigo-500 bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                >
                    <input
                        type="radio"
                        name="paymentMethod"
                        value={wallet.value}
                        checked={selectedPayment === wallet.value}
                        onChange={() => setSelectedPayment(wallet.value)}
                        className="mr-2"
                    />
                    <label className="text-gray-900 dark:text-gray-100">{wallet.name}</label>
                </div>
            ));
        } else if (selectedCategory === 'qris') {
            return (
                <div className="p-4 mt-4 rounded-lg border border-indigo-500 bg-gray-200 dark:bg-gray-700">
                    <p className="text-gray-900 dark:text-gray-100">QRIS Payment</p>
                    {/* Add your QRIS logic here */}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="relative m-12 w-full max-w-4xl rounded-md mx-auto p-12 bg-gray-50 dark:bg-gray-900 text-white overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Choose Payment Category
            </h2>

            {/* Payment Category Buttons */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`py-2 px-4 rounded-md border ${selectedCategory === 'bank' ? 'bg-gray-300 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-900'
                        }`}
                    onClick={() => setSelectedCategory('bank')}
                >
                    Bank Virtual
                </button>
                <button
                    className={`py-2 px-4 rounded-md border ${selectedCategory === 'eWallet' ? 'bg-gray-300 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-900'
                        }`}
                    onClick={() => setSelectedCategory('eWallet')}
                >
                    E-Wallet
                </button>
                <button
                    className={`py-2 px-4 rounded-md border ${selectedCategory === 'qris' ? 'bg-gray-300 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-900'
                        }`}
                    onClick={() => setSelectedCategory('qris')}
                >
                    QRIS
                </button>
            </div>

            {/* Render Payment Methods */}
            {renderPaymentMethods()}

            {/* Pay Now Button */}
            <div className="mt-6">
                <button
                    className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => alert(`Paying with ${selectedPayment || 'no payment method selected'}`)}
                >
                    Pay now
                </button>
            </div>
        </div>
    );
}
