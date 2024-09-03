import React, { useState } from "react";
import ProductScrollHorizontalList from "../../../components/common/ProductScrollHorizontalList";

const TabView = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="relative m-12 w-full max-w-4xl rounded-md mx-auto p-12 bg-gray-50 dark:bg-gray-900 text-white overflow-hidden">
            {/* Label PPOB dan Nomor 1 */}
            <div className="absolute top-0 left-0 mt-2 ml-2">
                <span className="bg-indigo-600 text-white py-1 px-3 rounded-md text-lg font-bold">1</span>
                <span className="ml-2 bg-gray-800 text-white py-1 px-3 rounded-full text-lg font-bold">Pilih Kategori</span>
            </div>

            {/* Tab Labels */}
            <ProductScrollHorizontalList className="p-4">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`whitespace-nowrap py-2 px-4 rounded-md text-lg font-medium transition-colors ${activeTab === index
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </ProductScrollHorizontalList>

            {/* Tab Content */}
            <div className="mt-8">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`${activeTab === index ? "block" : "hidden"
                            } text-center`}
                    >
                        <img
                            src={tab.image}
                            alt={tab.label}
                            className="mx-auto w-64 h-64 object-cover rounded-md"
                        />
                        <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
                            {tab.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabView;
