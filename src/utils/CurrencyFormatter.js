// currencyFormatter.js

const currencyFormatter = (value, currency = "IDR", locale = "id-ID") => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return value; // Return the original value if an error occurs
  }
};

export default currencyFormatter;
