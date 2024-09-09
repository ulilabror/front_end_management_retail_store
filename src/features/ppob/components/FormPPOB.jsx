import React from "react";

const FormPPOB = ({ formFields, onFormChange }) => {
    const handleInputChange = (e, index) => {

        // Kirim data input dengan format titik
        onFormChange({ [`formFields[${index}]`]: e.target.value });

        // Update input field dengan format
        document.getElementById(`input-${index}`).value = e.target.value;
    };

    return (
        <div className="w-full max-w-xl mx-auto p-4">
            <div className="space-y-4">
                {formFields.map((field, index) => (
                    <input
                        key={index}
                        id={`input-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder={`Masukkan ${field}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default FormPPOB;
