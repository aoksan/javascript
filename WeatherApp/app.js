// ! Must use Arrow Functions
// ! Learn reference


// API
const apiKey = 'e186ad6a3dfd570c47cac2780b4b6d96';
const submit = $("#CityNameForm");
const cityInput = $("#cityInput");
const WeatherSection = $("#results");


let weatherDataArray = []
let IsCityExists = true
let tempdata = []
// const


runEvents()

function runEvents() {
    submit.on("submit", SubmitForm)
    document.addEventListener("DOMContentLoaded", reloadCards())
    // deleteButton.on("click", deleteCard)
    WeatherSection.on("click", ".btn-close", function() {
        const card = $(this).closest(".col");
        const uniqueID = card.attr("id")
        card.remove()
        removeWeatherDataFromLocalStorage(uniqueID)
    });
}

function SubmitForm(e) {
    e.preventDefault();
    city = cityInput.val();
    addWeatherDatatoLocalStorageAndUI(city);
}


function addWeatherDatatoLocalStorageAndUI(city) {
    getWeather(city).then((data) => {
        const city = data.name
        let dateTime = new Date(data.dt * 1000)
        const date = dateTime.toLocaleString("en-GB", { month: "2-digit", day: "2-digit" })
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
        const uniqueID = `${city}-${date}`; // Or use any other unique identifier

        // Hello Guys
        const weatherData = {
            uniqueID,
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
        CreateWeatherCard();
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
function CreateWeatherCard(weather) {
    weather = RetrieveWeatherDataFromLocalStorage();
    arn = weather.length - 1;
    if (cityInput.val() != "" && IsCityExists != false) {
        $(`<div id="${weather.uniqueID}" class="col">
            <div class="card mt-3">
            <div class="card-header text-bg-secondary
            justify-content-between d-flex"> <img href="${"https://openweathermap.org/img/wn/" + weather.IconWeather + "@2x.png"}" style="width:24px">${weather[arn].city} - ${weather[arn].date}
            <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <ul class="list-group list-group-flush list-group-item bg-light">
            <li class="list-group-item bg-light">${_.startCase(weather[arn].LongWeather)} - ${weather[arn].temperature}&#8451</li>
            <li class="list-group-item bg-light">Sunrise: ${weather[arn].sunrise} - Sunset: ${weather[arn].sunset}</li>
            </ul>
            </div>
            </div>`).prependTo(WeatherSection)
    }
}


function reloadCards() {
    weather = RetrieveWeatherDataFromLocalStorage();
    weather.forEach(weather => {
        $(`<div id="${weather.uniqueID}" class="col">
                <div class="card mt-3" >
                <div class="card-header text-bg-secondary
                justify-content-between d-flex"><img href="${"https://openweathermap.org/img/wn/" + weather.IconWeather + "@2x.png"}" style="width:24px"> ${weather.city} - ${weather.date}
                <button type="button" class="btn-close" aria-label="Close"></button>
                </div>
                <ul class="list-group list-group-flush list-group-item bg-light">
                <li class="list-group-item bg-light"> ${_.startCase(weather.LongWeather)} - ${weather.temperature}&#8451</li>
                <li class="list-group-item bg-light">Sunrise: ${weather.sunrise} - Sunset: ${weather.sunset}</li>
                </ul>
                </div>
                </div>`).prependTo(WeatherSection)
    });
}

function removeWeatherDataFromLocalStorage(uniqueID) {
    // Retrieve the weather data array from localStorage
    let weather = RetrieveWeatherDataFromLocalStorage();

    // Filter out the data for the unique ID you want to remove
    weather = weather.filter(data => data.id !== uniqueID);

    // Save the updated array back to localStorage
    localStorage.setItem('weatherDataArray', JSON.stringify(weatherDataArray));

    console.log(`Weather data for ID ${uniqueID} removed from localStorage`);
}