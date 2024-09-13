import React, { useEffect, useState } from "react";
import { fetchSearchProducts } from "../../product/services/productService";

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
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <div>
                                {/* Image */}
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                {/* Product Information */}
                                <h3 className="text-lg font-semibold mt-2 dark:text-gray-200">{product.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">SKU: {product.product_sku}</p>
                                <p className="text-gray-700 dark:text-gray-300 mt-2">Price: ${product.price}</p>
                            </div>
                            <div className="mt-4">
                                {/* Radio Button */}
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value={product.product_sku}
                                        checked={selectedSKU === product.product_sku}
                                        onChange={() => handleSelectProduct(product.product_sku)}
                                        className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400 transition duration-150 ease-in-out"
                                    />
                                    <span className="dark:text-gray-300">Select this product</span>
                                </label>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found for the given type and label.</p> // Jika tidak ada produk ditemukan
                )}
            </div>
        </div>
    );
};
