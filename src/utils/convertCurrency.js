async function convertCurrency(amount) {
  try {
    const req = await fetch(
      'https://v6.exchangerate-api.com/v6/f1683ff5cb87fe03ad121ea0/latest/USD',
    );
    const res = await req.json();
    // console.log("Currency res ------> ", res);
 
    if (res.result !== 'success') {
      throw new Error(res['error-type'] || 'Failed to fetch exchange rates');
    }
 
    return {
      usd: Math.round(res.conversion_rates.USD * amount),
      eur: Math.round(res.conversion_rates.EUR * amount),
      dzd: Math.round(res.conversion_rates.DZD * amount),
    };
  } catch (error) {
    console.error('Error converting currency:', error.message);
    throw error;
  }
}
 
export default convertCurrency;