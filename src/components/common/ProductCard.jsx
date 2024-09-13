import currencyFormatter from "../../utils/CurrencyFormatter";
export default function ProductCard({ product }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 w-64 flex-shrink-0">
            {product.files.length > 0 ? (
                <img
                    src={product.files[0]}
                    alt={product.product_name}
                    className="w-full h-48 object-cover rounded-md"
                />
            ) : (
                // Default SVG icon when no image is available
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-24 h-24 text-gray-400 dark:text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8.25V6.75a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6.75v13.5A2.25 2.25 0 0118.75 22.5H5.25A2.25 2.25 0 013 20.25v-1.5M3 8.25h18m-10.5 7.5H9m4.5 0h-3M9 15.75H7.5M15 15.75h-1.5M9 18h-1.5m4.5 0h-3M15 18h-1.5m4.5 0h-1.5"
                        />
                    </svg>
                </div>
            )}
            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                {product.product_name}
            </h3>
            <p className="mt-1 text-gray-700 dark:text-gray-300">SKU: {product.product_sku}</p>
            <p className="mt-1 text-gray-700 dark:text-gray-300"> {currencyFormatter(product.price)}</p>
            <a
                href={`/product/${product.id}`}
                className="mt-4 block text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
                View Details
            </a>
        </div>
    );
}
