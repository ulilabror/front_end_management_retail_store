import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BarcodeScanner } from 'react-barcode-scanner';
import 'react-barcode-scanner/polyfill';
import { useAuth } from '../../auth/hooks/useAuth';
import { postAddProduct } from '../services/productService';

export default function FormAddProduct() {
    const { register, handleSubmit, reset } = useForm();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [barcodeResult, setBarcodeResult] = useState(null); // State untuk menyimpan hasil pemindaian barcode
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    // Handle file change
    const handleFileChange = (e) => {
        setSelectedFiles([...e.target.files]);
    };

    // Handle form submission
    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // Create form data to include files
            const formData = new FormData();
            formData.append('product_name', data.product_name);
            formData.append('product_type', data.product_type);
            formData.append('product_label', data.product_label);
            formData.append('product_sku', data.product_sku);
            formData.append('product_description', data.product_description);
            formData.append('price', data.price);

            // Append selected files
            selectedFiles.forEach((file, index) => {
                formData.append(`files[${index}]`, file);
            });

            // Append barcode result (if available)
            if (barcodeResult) {
                console.log(barcodeResult)
                formData.append('product_barcode', barcodeResult);
            }

            // Send the data to the API endpoint
            const response = await postAddProduct(token, formData)



            // Handle response
            if (response.status === 200) {
                alert('Product successfully added!');
                reset();
                setSelectedFiles([]);
                setBarcodeResult('');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Add New Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Product Name */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                    <input
                        type="text"
                        {...register('product_name', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        placeholder="Enter product name"
                    />
                </div>

                {/* Product Type */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Product Type</label>
                    <input
                        type="text"
                        {...register('product_type', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        placeholder="Enter product type"
                    />
                </div>

                {/* Product Label */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Product Label</label>
                    <input
                        type="text"
                        {...register('product_label', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        placeholder="Enter product label"
                    />
                </div>

                {/* Product SKU */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Product SKU</label>
                    <input
                        type="text"
                        {...register('product_sku', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        placeholder="Enter product SKU"
                    />
                </div>

                {/* Barcode Scanner */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Barcode Scanner</label>
                    <BarcodeScanner
                        options={{ formats: ['code_128'] }}
                        onCapture={(code) => setBarcodeResult(code.rawValue)} // Set hasil barcode ke state
                    // onErrorCapture={(err) => console.error('Barcode scan error:', err)}
                    />
                </div>

                {/* Barcode Result */}
                {barcodeResult && (
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Detected Barcode</label>
                        <p className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                            {barcodeResult}
                        </p>
                    </div>
                )}

                {/* Product Description */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Product Description</label>
                    <textarea
                        {...register('product_description', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        placeholder="Enter product description"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Price</label>
                    <input
                        type="number"
                        {...register('price', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        placeholder="Enter product price"
                    />
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Product Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-md text-white font-semibold ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
