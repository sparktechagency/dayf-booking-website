import getFormatNumber from "@/utils/getFormatNumber";

// utils/currency.ts
export async function getExchangeRates() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Check localStorage
  const stored = localStorage.getItem("exchangeRates");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.date === today) {
      return parsed.rates; // ✅ use cached rates
    }
  }

  // Otherwise, fetch fresh
  const req = await fetch(
    "https://v6.exchangerate-api.com/v6/f1683ff5cb87fe03ad121ea0/latest/USD"
  );
  const res = await req.json();

  if (res.result !== "success") {
    throw new Error(res["error-type"] || "Failed to fetch exchange rates");
  }

  const rates = res.conversion_rates;

  // Save to localStorage with today’s date
  localStorage.setItem("exchangeRates", JSON.stringify({ date: today, rates }));

  return rates;
}

// Convert function
export async function convertCurrency(amount, currency) {
  const formatCurrency = currency?.slice(0, 3).toUpperCase();
  const rates = await getExchangeRates();
  console.log("formatCurrency: ", formatCurrency);
  console.log("rates: ", rates);
  if (!rates[formatCurrency])
    throw new Error(`Currency ${formatCurrency} not supported`);

  const finalPrice = Math.round(rates[formatCurrency] * amount);
  return getFormatNumber(finalPrice);
}
