const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");

// Function to get weather from backend
async function getWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            weatherDisplay.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        weatherDisplay.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${Math.round(data.main.temp)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].main}</p>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = "<p>Something went wrong. Try again.</p>";
        console.error(error);
    }
}

// Event listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});