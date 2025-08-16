export default function getFormatPrice(price) {
    // Handle invalid inputs
    if (price == null || isNaN(price) || price === "") return "N/A";

    // Handle zero case
    if (price === 0) return "$0";

    // Convert to number and handle negative numbers
    const isNegative = price < 0;
    const absPrice = Math.abs(Number(price));
    
    // Define thresholds and suffixes
    const thresholds = [
        { limit: 1_000_000_000, suffix: "B", divisor: 1_000_000_000 },
        { limit: 1_000_000, suffix: "M", divisor: 1_000_000 },
        { limit: 1_000, suffix: "K", divisor: 1_000 },
        { limit: 0, suffix: "", divisor: 1 }
    ];

    // Find appropriate format
    const { suffix, divisor } = thresholds.find(t => absPrice >= t.limit);
    
    // Format the number with 1 decimal place for K/M/B, full number for smaller values
    let formatted;
    if (suffix) {
        formatted = (absPrice / divisor).toFixed(1).replace(/\.0$/, "") + suffix;
    } else {
        formatted = absPrice.toFixed(0);
    }

    // Add thousand separators for numbers without suffix
    if (!suffix) {
        formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Add currency symbol and negative sign if applicable
    return `${isNegative ? "-" : ""}$${formatted}`;
}