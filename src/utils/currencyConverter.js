/**
 * Converts an amount from one currency to another using provided rates.
 * Rates should be an object where keys are currency codes and values are rate relative to base.
 * Example: rates = { USD: 1, EUR: 0.85 }
 *
 * @param {number} amount - Amount in fromCurrency.
 * @param {string} fromCurrency - Currency code of the original amount.
 * @param {string} toCurrency - Currency code to convert to.
 * @param {{ [key: string]: number }} rates - Exchange rates object relative to a base currency.
 * @returns {number} Converted amount in toCurrency.
 */
export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  if (!rates[fromCurrency] || !rates[toCurrency]) {
    console.warn(`Missing rate for ${fromCurrency} or ${toCurrency}`);
    return amount;
  }
  // Normalize to base currency unit, then convert
  const amountInBase = amount / rates[fromCurrency];
  return amountInBase * rates[toCurrency];
}

/**
 * Convert from USD to a target currency.
 * @param {number} amountUSD - Amount in USD.
 * @param {string} toCurrency - Target currency code.
 * @param {{ [key: string]: number }} rates
 * @returns {number}
 */
export function convertFromUSD(amountUSD, toCurrency, rates) {
  return convertCurrency(amountUSD, "USD", toCurrency, rates);
}

/**
 * Fetch latest exchange rates from exchangerate.host.
 * @param {string} baseCurrency - Base currency code (default 'USD').
 * @returns {Promise<{ [key: string]: number }>}
 */
export async function fetchExchangeRates(baseCurrency = "USD") {
  const response = await fetch(
    `https://api.exchangerate.host/latest?base=${baseCurrency}`
  );
  const data = await response.json();
  if (!data.rates) throw new Error("Failed to load exchange rates");
  return data.rates;
}
