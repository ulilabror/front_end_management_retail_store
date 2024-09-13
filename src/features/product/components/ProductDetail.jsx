import { Pagination, Scrollbar, Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useAuth } from '../../../features/auth/hooks/useAuth'; // Assuming you have this hook for auth
import currencyFormatter from '../../../utils/CurrencyFormatter';

export default function ProductDetail({ product }) {
    const { token } = useAuth();

    if (!product) {
        return (
            <section className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
                <div className="text-center text-gray-700 dark:text-gray-300">
                    <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                    <p className="text-lg">We couldn't find the product you're looking for.</p>
                </div>
            </section>
        );
    }

    const renderProductImage = () => {
        if (product.files && product.files.length > 1) {
            // Multiple images - Swiper component
            return (
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                    scrollbar={{ draggable: true }}
                    className="w-full h-64"
                >
                    {product.files.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`${product.product_name} ${index + 1}`}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            );
        } else if (product.files && product.files.length === 1) {
            // Single image
            return (
                <img
                    src={product.files[0]}
                    alt={product.product_name}
                    className="w-full h-64 object-cover rounded-lg"
                />
            );
        } else {
            // No images - render default SVG/icon
            return (
                <div className="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-gray-500 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7h18M3 12h18M3 17h18M5 9l7-5 7 5"
                        />
                    </svg>
                </div>
            );
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            {renderProductImage()}

            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{product.product_name}</h1>
            <p className="mt-2 text-xl text-gray-700 dark:text-gray-300">{currencyFormatter(parseInt(product.price))}</p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{product.product_description}</p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Created by: {product.created_by}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Created at: {new Date(product.created_at).toLocaleDateString()}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Updated at: {new Date(product.updated_at).toLocaleDateString()}</p>

            {/* Conditionally render buttons if user is logged in */}
            {token && (
                <div className="mt-6 flex space-x-4">
                    <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md">
                        Buy Now
                    </button>
                    <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">
                        Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
}
