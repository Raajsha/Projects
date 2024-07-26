const apiKey = `5f976ac25e07488ea5d652555ac594d7`;
const baseUrl = 'https://api.weatherbit.io/v2.0/current';

document.getElementById('Search').addEventListener('click', fetchWeather);
document.getElementById('toggleTemp').addEventListener('click', toggleTemperature);
document.getElementById('currentLocation').addEventListener('click', getCurrentLocation);

let isCelsius = true;

function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return;

    fetch(`${baseUrl}?key=${apiKey}&city=${city}`)
        .then(response => response.json())
        .then(current => {
            console.log(current);
            displayWeather(current);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(current) {
    document.getElementById('cityName').textContent=`City: ${current.data[0].city_name}`;
    document.getElementById('temp').textContent = `Temperature: ${current.data[0].app_temp} °C`;
    document.getElementById('conditions').textContent = `Description: ${current.data[0].weather.description}`;
    document.getElementById('humidity').textContent = `Humidity: ${current.data[0].rh}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${current.data[0].wind_spd} m/s`;
}

function toggleTemperature() {
    const tempElement = document.getElementById('temp');
    let temp = parseFloat(tempElement.textContent.split(' ')[1]);

    if (isCelsius) {
        temp = temp * 9/5 + 32;
        tempElement.textContent = `Temperature: ${temp.toFixed(2)} °F`;
    } else {
        temp = (temp - 32) * 5/9;
        tempElement.textContent = `Temperature: ${temp.toFixed(2)} °C`;
    }

    isCelsius = !isCelsius;
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            fetch(`${baseUrl}?lat=${latitude}&lon=${longitude}&key=${apiKey}`)
                .then(response => response.json())
                .then(current => {
                    displayWeather(current);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
} 