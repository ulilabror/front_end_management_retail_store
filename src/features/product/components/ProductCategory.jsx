import React from 'react';
import ProductScrollHorizontalList from '../../../components/common/ProductScrollHorizontalList';
import ProductCard from '../../../components/common/ProductCard';

export default function ProductCategory({ title, products }) {
    return (
        <div className="container mx-auto px-4 my-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
            <ProductScrollHorizontalList>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ProductScrollHorizontalList>
        </div>
    );
}
