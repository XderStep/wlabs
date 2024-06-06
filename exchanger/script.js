document.addEventListener('DOMContentLoaded', () => {
    const exchangeRatesContainer = document.getElementById('exchange-rates');
    const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    const UPDATE_INTERVAL = 60000; // 60 seconds

    const renderExchangeRates = (rates) => {
        exchangeRatesContainer.innerHTML = rates
            .map(rate => `<p><strong>${rate.txt}:</strong> ${rate.rate} UAH</p>`)
            .join('');
    };

    const fetchExchangeRates = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            renderExchangeRates(data);
        } catch (error) {
            exchangeRatesContainer.innerHTML = '<p>Не вдалося отримати курси валют. Будь-ласка спробуйте пізніше.</p>';
            console.error('Помилка отримання курсів валют:', error);
        }
    };

    fetchExchangeRates();
    setInterval(fetchExchangeRates, UPDATE_INTERVAL);
});
