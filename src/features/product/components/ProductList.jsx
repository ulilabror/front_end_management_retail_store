import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import ProductCard from '../../../components/common/ProductCard';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // State untuk halaman saat ini
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(page); // Ambil halaman berdasarkan state
                setProducts((prevProducts) => [...prevProducts, ...data.data.products]);
                setPagination(data.data.pagination);
                setLoading(false);
                setIsFetchingMore(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                setIsFetchingMore(false);
            }
        };

        loadProducts();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetchingMore && pagination.next_page_url) {
                setIsFetchingMore(true);
                setPage((prevPage) => prevPage + 1); // Muat halaman berikutnya
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetchingMore, pagination]);

    if (loading && page === 1) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error.message}</p>;

    return (
        <div className="bg-gray-100 dark:bg-gray-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
            {isFetchingMore && <p>Loading more products...</p>}
        </div>
    );
}
