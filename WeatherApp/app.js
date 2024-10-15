// ! Must use Arrow Functions
// ! Learn reference


// API
const apiKey = 'e186ad6a3dfd570c47cac2780b4b6d96';
const submit = $("#CityNameForm");
const cityInput = $("#cityInput")
// const


runEvents()

function runEvents() {
  submit.on("submit", SubmitForm)
}

function SubmitForm(e) {
  e.preventDefault();
  const city = cityInput.val();
  getWeather(city)
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
      getWeatherData(latitude, longitude)
    } else {
      // todo make it alert
      console.log("No geodata found for the provided city.");
    }
  } catch (error) {
    console.error("Error fetching geodata:", error);
  }
}

async function getWeatherData(latitude, longitude) {

  const weather = await $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
  console.log('weather  : ', weather);

  // if (weather) {

  // } else {
  //   // todo make it alert
  //   console.log("No weather data had been found for the provided city.");
  // }
}

// Todo Style
{/* <div id="status" class="col">
<div class="card mt-3">
  <div class="card-header text-bg-success justify-content-between d-flex">City 
    <button type="button" class="btn-close" disabled aria-label="Close"></button>
  </div>
  <ul class="list-group list-group-flush list-group-item bg-light">
    <li class="list-group-item bg-light">Weather - Temp</li>
    <li class="list-group-item bg-light">Sunrise - Sunset</li>
  </ul>
</div>
</div> */}