document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '7268e03d06b64986aae63558242108';
  
  async function fetchWeatherData(cityName) {
      const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`;
      const weatherContainer = document.getElementById('weatherContainer2');
      
      try {
          const response = await fetch(apiEndpoint);
          const weatherData = await response.json();
          console.log(weatherData);
          
          weatherContainer.innerHTML = ''; 
          
          weatherData.forecast.forecastday.forEach(element => {
              console.log(element);
              weatherContainer.innerHTML += `
                  <div class="weatherContainer">
                      <div class="weather">
                          <img src="https:${element.day.condition.icon}">
                      </div>
                      <div class="weather">
                          <span class="label"><strong>Date:</strong></span>
                          <span class="value"><strong><br>${element.date}</strong></span>
                      </div>
                      <div class="weather">
                          <span class="label"><strong>Weather Information:</strong></span>
                          <span class="value"><strong><br>${element.day.condition.text}</strong></span>
                      </div>
                      <div class="weather">
                          <span class="label"><strong>Temperature:</strong></span>
                          <span class="value"><strong><br>${element.day.avgtemp_c}°C</strong></span>
                      </div>
                      <div class="weather">
                          <span class="label"><strong>Humidity:</strong></span>
                          <span class="value"><strong><br>${element.day.avghumidity}%</strong></span>
                      </div>
                  </div>
              `;
          });
      } catch (error) {
          weatherContainer.innerHTML = `<p>Unable to retrieve weather data: ${error.message}</p>`;
      }
  }

  fetchWeatherData('Iligan');

  document.getElementById('searchButton').addEventListener('click', () => {  
      const cityInput = document.getElementById('cityInput').value;  
      if (cityInput) {
          document.querySelector('.location-label').innerText = cityInput;
          fetchWeatherData(cityInput);
      } else {
          alert('Please enter a city name');
      }
  });
});