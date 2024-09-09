import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Layout from "../../../components/layouts/Layout";
import ProductCategory from "../components/ProductCategory";
import ProductDetail from "../components/ProductDetail";
import Section from '../../../components/common/Section';
import Container from '../../../components/layouts/Container';
import { fetchProductById, fetchSearchProducts } from '../services/productService';
import ProductList from '../components/ProductList';
import LoadingScreen from '../../../components/common/loadingScreen';

export default function ProductDetailPage() {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data.data); // Set product data
            } catch (err) {
                setError('Product not found');
            }
        };

        loadProduct();
    }, [id]);

    const loadMoreProducts = useCallback(async () => {
        if (!hasMore) return; // Do not load if there's no more data

        try {
            const data = await fetchSearchProducts({ page, type: product?.product_type });
            console.log(data)
            if (data.data.products.length === 0) {

                setHasMore(false); // If no more products, stop loading
            } else {
                setRelatedProducts((prevProducts) => [...prevProducts, ...data.data.products]);
                setPage(prevPage => prevPage + 1); // Increase page for next fetch
            }
        } catch (error) {
            console.error('Error loading more products:', error);
            setHasMore(false);
        }
    }, [page, product?.product_type, hasMore]);

    useEffect(() => {
        // Load initial related products
        if (product?.product_type) {
            loadMoreProducts();
        }
    }, [product?.product_type, loadMoreProducts]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
                loadMoreProducts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreProducts, hasMore]);

    if (error) {
        return (
            <Layout>
                <Section>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                            {error}
                        </h2>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            The product you are looking for does not exist or has been removed.
                        </p>
                    </div>
                </Section>
            </Layout>
        );
    }

    if (!product) {
        return <LoadingScreen />
    }

    return (
        <Layout>
            <Container>
                <ProductDetail product={product} /> {/* Pass the specific product */}
                <ProductCategory title={product.product_type} products={relatedProducts} /> {/* Load related products */}
                <ProductList />
            </Container>
        </Layout>
    );
}
