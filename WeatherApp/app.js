// ! Must use Arrow Functions
// ! Learn reference


// API
const apiKey = 'e186ad6a3dfd570c47cac2780b4b6d96';
const submit = $("#CityNameForm");
const cityInput = $("#cityInput");
const WeatherSection = $("#results")
let weatherDataArray = []
let IsCityExists = true
// const


runEvents()

function runEvents() {
    submit.on("submit", SubmitForm)
}

function SubmitForm(e) {
    e.preventDefault();
    city = cityInput.val();
    addWeatherDatatoLocalStorage(city)
    CreateWeatherCard()
}


function addWeatherDatatoLocalStorage(city) {
    getWeather(city).then((data) => {
        const city = data.name
        const date = data.dt
        let sunriseTime = new Date(data.sys.sunrise * 1000)
        const sunrise = sunriseTime.toLocaleString("en-GB", { hour: "numeric", minute: "2-digit" });
        let sunsetTime = new Date(data.sys.sunset * 1000)
        const sunset = sunsetTime.toLocaleString("en-GB", { hour: "numeric", minute: "2-digit" });
        const temperature = data.main.temp
        const temperature_min = data.main.temp_min
        const temperature_max = data.main.temp_max
        const UTC = data.timezone
        const LongWeather = data.weather[0].description
        const Weather = data.weather[0].main
        const IDWeather = data.weather[0].id
        const IconWeather = data.weather[0].icon
        // Hello Guys
        const weatherData = {
            city,
            date,
            sunrise,
            sunset,
            temperature,
            temperature_min,
            temperature_max,
            UTC,
            LongWeather,
            Weather,
            IDWeather,
            IconWeather
        };

        RetrieveWeatherDataFromLocalStorage(weatherDataArray);
        // Add the new data to the array
        weatherDataArray.push(weatherData);

        // Store the updated array in localStorage
        localStorage.setItem('weatherDataArray', JSON.stringify(weatherDataArray));

        console.log('Weather data saved to localStorage:', weatherDataArray);
    })

}


function RetrieveWeatherDataFromLocalStorage() {
    // Retrieve existing data from localStorage or initialize an empty array if none exists
    weatherDataArray = JSON.parse(localStorage.getItem("weatherDataArray")) || [];
    return weatherDataArray;
}

async function getWeather(timezone) {
    if (!timezone) {
        // todo make it alert
        console.log("City name (timezone) is required.");
        return;
    }

    try {
        const geodatas = await $.getJSON(`https://api.openweathermap.org/geo/1.0/direct?q=${timezone}&limit=${1}&appid=${apiKey}`)
        const geodata = geodatas[0]
        if (geodata) {
            const latitude = geodata.lat;
            const longitude = geodata.lon;
            return getWeatherData(latitude, longitude)
        } else {
            // todo make it alert
            console.log("No geodata found for the provided city.");
            return IsCityExists = false;
        }
    } catch (error) {
        console.error("Error fetching geodata:", error);
    }
}

async function getWeatherData(latitude, longitude) {

    const weather = await $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    return weather

    // if (weather) {

    // } else {
    //   // todo make it alert
    //   console.log("No weather data had been found for the provided city.");
    // }
}

// Todo Style
function CreateWeatherCard() {
    weather = RetrieveWeatherDataFromLocalStorage();
    arn = weather.length - 1;
    if (cityInput.val() != "" && IsCityExists != false) {

        $(`<div id="status" class="col">
            <div class="card mt-3">
            <div class="card-header text-bg-secondary
            justify-content-between d-flex">${weather[arn].city} 
            <button type="button" class="btn-close" disabled aria-label="Close"></button>
            </div>
            <ul class="list-group list-group-flush list-group-item bg-light">
            <li class="list-group-item bg-light">${_.startCase(weather[arn].LongWeather)} - ${weather[arn].temperature}&#8451</li>
            <li class="list-group-item bg-light">Sunrise: ${weather[arn].sunrise} - Sunset: ${weather[arn].sunset}</li>
            </ul>
            </div>
            </div>`).prependTo(WeatherSection)
    }
}


