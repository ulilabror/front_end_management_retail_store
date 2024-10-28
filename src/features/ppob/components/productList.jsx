import React, { useEffect, useState } from "react";
import { fetchSearchProducts } from "../../product/services/productService";
import CurrencyFormatter from "../../../utils/CurrencyFormatter";

export const ProductList = ({ type, label }) => {
    // State untuk menyimpan produk, loading, dan error
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSKU, setSelectedSKU] = useState(""); // State untuk menyimpan SKU yang dipilih

    // Fetch products saat komponen mount atau ketika props `type` atau `label` berubah
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Memulai loading
                setLoading(true);
                setError(null);

                // Panggil API untuk mendapatkan produk berdasarkan type dan label
                const response = await fetchSearchProducts({ label, type });
                setProducts(response.data.products); // Asumsi API mengembalikan data di `response.data.products`

                // Set loading false setelah data berhasil diambil
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message || "Something went wrong");
                setLoading(false); // Set loading false jika error
            }
        };

        fetchProducts();
    }, [type, label]); // Re-run efek jika `type` atau `label` berubah

    // Handler untuk radio button
    const handleSelectProduct = (sku) => {
        setSelectedSKU(sku);
    };

    // Tampilkan loading, error, atau produk
    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <label
                            key={index}
                            onClick={() => handleSelectProduct(product.product_sku)} // Card klik memicu perubahan pilihan
                            className={`cursor-pointer bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out ${
                                selectedSKU === product.product_sku ? 'border border-indigo-600' : ''
                            }`}
                        >
                            <div>
                                {/* Product Information */}
                                <h3 className="text-lg font-semibold mt-2 dark:text-gray-200">{product.product_name}</h3>
                                <p className="text-gray-900 dark:text-gray-400 mt-1">SKU: {product.product_sku}</p>
                                <p className="text-gray-900 dark:text-gray-300 mt-2">Price: {CurrencyFormatter(product.price)}</p>
                            </div>

                            <div className="mt-4">
                                {/* Radio Button Hidden */}
                                <input
                                    type="radio"
                                    value={product.product_sku}
                                    checked={selectedSKU === product.product_sku}
                                    onChange={() => handleSelectProduct(product.product_sku)}
                                    className="hidden"
                                />
                                <span className="text-gray-900 dark:text-gray-100">Select this product</span>
                            </div>
                        </label>
                    ))
                ) : (
                    <p>No products found for the given type and label.</p> // Jika tidak ada produk ditemukan
                )}
            </div>
        </div>
    );
};
