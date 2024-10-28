import React, { useState } from 'react';

export default function PaymentMethods() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const paymentOptions = {
        bank: [
            { name: 'Bank BCA', value: 'bca' },
            { name: 'Bank Mandiri', value: 'mandiri' },
            { name: 'Bank BNI', value: 'bni' },
            { name: 'Bank BRI', value: 'bri' },
        ],
        eWallet: [
            { name: 'GoPay', value: 'gopay' },
            { name: 'LinkAja', value: 'linkaja' },
            { name: 'OVO', value: 'ovo' },
            { name: 'Dana', value: 'dana' },
        ],
        qris: [
            { name: 'QRIS Payment', value: 'qris' }
        ],
    };

    const renderPaymentMethods = () => {
        if (!selectedCategory) return null;

        return paymentOptions[selectedCategory].map((option) => (
            <label
                key={option.value}
                onClick={() => setSelectedPayment(option.value)}
                className={`cursor-pointer p-4 mt-4 rounded-lg border mx-4 ${
                    selectedPayment === option.value ? 'border-indigo-500 bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'
                }`}
            >
                <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={selectedPayment === option.value}
                    onChange={() => setSelectedPayment(option.value)}
                    className="hidden"
                />
                <span className="text-gray-900 dark:text-gray-100">{option.name}</span>
            </label>
        ));
    };

    return (
        <div className="relative m-12 w-full max-w-4xl rounded-md mx-auto p-12 bg-gray-50 dark:bg-gray-900 text-white overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Choose Payment Category
            </h2>

            {/* Payment Category Buttons */}
            <div className="flex space-x-4 mb-6">
                {Object.keys(paymentOptions).map((category) => (
                    <button
                        key={category}
                        className={`py-2 px-4 rounded-md border ${
                            selectedCategory === category ? 'bg-gray-300 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-900'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category === 'bank' ? 'Bank Virtual' : category === 'eWallet' ? 'E-Wallet' : 'QRIS'}
                    </button>
                ))}
            </div>

            {/* Payment Methods Section */}
            {selectedCategory && (
                <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-4">Metode Pembayaran</h3>
            )}

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
