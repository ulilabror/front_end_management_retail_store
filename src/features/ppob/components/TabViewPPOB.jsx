import React, { useState } from "react";
import ProductScrollHorizontalList from "../../../components/common/ProductScrollHorizontalList";
import FormPPOB from "./FormPPOB";
import { ProductList } from "./productList"; // Import ProductList

const TabView = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedSublabel, setSelectedSublabel] = useState({});
    const [formData, setFormData] = useState("");

    const handleSublabelChange = (tabIndex, sublabel) => {
        setSelectedSublabel((prevSelected) => ({
            ...prevSelected,
            [tabIndex]: sublabel,
        }));
    };

    const handleFormChange = (updatedValue) => {
        setFormData((prevData) => ({
            ...prevData,
            ...updatedValue,
        }));
    };

    const getFormattedFormData = () => {
        return Object.entries(formData)
            .map(([_, value]) => value)
            .join('.');
    };

    return (
        <div className="relative m-12 w-full max-w-4xl rounded-md mx-auto p-12 bg-gray-50 dark:bg-gray-900 text-white overflow-hidden">
            <div className="absolute top-0 left-0 mt-2 ml-2">
                <span className="bg-indigo-600 text-white py-1 px-3 rounded-md text-lg font-bold">
                    1
                </span>
                <span className="ml-2 bg-gray-800 text-white py-1 px-3 rounded-full text-lg font-bold">
                    Pilih Kategori
                </span>
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
                        className={`${activeTab === index ? "block" : "hidden"} text-center`}
                    >
                        {/* Sublabels as Radio Card Inputs */}
                        {tab.sublabel && tab.sublabel.length > 0 && (
                            <div className="mt-4 flex flex-wrap justify-center gap-1">
                                {tab.sublabel.map((sublabel, subIndex) => (
                                    <label
                                        key={subIndex}
                                        className={`block text-gray-100 w-48 p-2 text-center rounded-lg cursor-pointer border-2 transition-colors ${selectedSublabel[index] === sublabel
                                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-600 dark:text-white"
                                            : "border-gray-300 bg-white dark:bg-gray-800 dark:text-gray-300"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`sublabel-${index}`}
                                            value={sublabel}
                                            checked={selectedSublabel[index] === sublabel}
                                            onChange={() => handleSublabelChange(index, sublabel)}
                                            className="hidden"
                                        />
                                        <span className="text-lg text-black dark:text-white font-medium">{sublabel}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {/* FormPPOB for the selected tab */}
                        {tab.forms && tab.forms.length > 0 && (
                            <div className="mt-8">
                                <FormPPOB formFields={tab.forms} onFormChange={handleFormChange} />
                            </div>
                        )}


                    </div>
                ))}
            </div>

            {/* Menampilkan ProductList sesuai dengan tab dan sublabel yang dipilih */}
            <div className="mt-8">
                {tabs[activeTab] && selectedSublabel[activeTab] && (
                    <ProductList
                        label={tabs[activeTab].label} // Gunakan label dari tab aktif
                        type={selectedSublabel[activeTab]} // Gunakan sublabel dari tab aktif
                    />
                )}
            </div>

            {/* Debug: Display formatted formData for testing */}
            <div className="mt-8 bg-white p-4 rounded-lg text-gray-800">
                <h3>Formatted Data Input:</h3>
                <pre>{getFormattedFormData()}</pre>
            </div>
        </div>
    );
};

export default TabView;
