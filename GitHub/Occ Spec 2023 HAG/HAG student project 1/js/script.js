// JavaScript Document to connect to API and retrieve data




let weather = {
  apiKey: "be56e41796b3f19d948f97c2d971384b", // API key required to gain authorisation to connect to the OpenWeatherMap API;. 
  fetchWeather: function (city) {    //Calls on the fetchweather function to get the city name the user entered in the search bar on the weather_forecast.html page. 
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )  //Using the connection link provided by the API provider, the city name taken from the function and the API key defined above a link is generated to connect to the API. 
      .then((response) => { //Validates the connection by if a response was recieved, if not then error message saying that there is no weather data will be sent to the user
        if (!response.ok) {
          alert("Invalid Location entered, try again");
          throw new Error("Invalid Location entered, try again");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));   
  },
  displayWeather: function (data) {  //Creates a new function which will be used to access all the required information from the data stored in the API, to be formatted and output in the HTML page. 
    const { name } = data; //Takes the location name from the API data
    const { icon, description } = data.weather[0];  //Takes the icon for whatever the weather condition is and the description of the weather from the API. 
    const { temp, humidity } = data.main; //Gets the temperature and humidity levels from the API. 
    const { speed } = data.wind; //Gets wind speed data from the API. 
    document.querySelector(".city").innerText = "Weather in " + name; //Formats the city name to be used in the HTML file, by adding weather in followed by the cities name. 
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";  //Defines the link for where the icons for the weather description are stored. These are external and through the API provider. 
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";   // Saves temperature as temp as formats with a celcius symbol, for output in html file. 
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";  //  Saves humidity as humdity and formatts with a perfcentage sign to be shown to the user
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading"); //Takes away the loading symbol from screen as soon as weather data becomes available, 
   
	//Functions relating to the search bar that the user can use to search for location, and the initial loadup of the API when the page is first loaded.   
	  
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("London");

