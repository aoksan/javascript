const apiKey = 'e186ad6a3dfd570c47cac2780b4b6d96';  // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`);
    const data = await response.json();
    
    if (data.cod === '404') {
        alert('City not found!');
        return;
    }

    displayWeather(data);
}


function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    const { name, main, weather, wind } = data;

    weatherDisplay.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Description: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}

async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        if (data.cod === '404') {
            weatherDisplay.innerHTML = '<p>City not found!</p>';
            return;
        }

        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = '<p>Error fetching data!</p>';
    }
}
