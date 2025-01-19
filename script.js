document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeather(city);
    }
});

let searchHistory = [];

function fetchWeather(city) {
    const apiKey = 'MY_API_KEY'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
                updateSearchHistory(city);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Something went wrong. Please try again later.');
        });
}

function displayWeather(data) {
    document.getElementById('cityName').innerText = `Weather in ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `${data.main.temp}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}.png`;

    document.getElementById('weatherInfo').style.display = 'block';
}

function updateSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        if (searchHistory.length > 5) {
            searchHistory.shift();  
        }
        renderSearchHistory();
    }
}

function renderSearchHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';  // Clear previous history list
    searchHistory.forEach(city => {
        const li = document.createElement('li');
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-search');
        li.appendChild(icon);
        li.innerText = city;
        li.onclick = () => fetchWeather(city);
        historyList.appendChild(li);
    });
}

function toggleHistoryVisibility() {
    const historySection = document.getElementById('historySection');
    historySection.style.display = historySection.style.display === 'none' ? 'block' : 'none';
}
