/* 
 * Originally Created: February 12, 2022
 * Modified: July 10, 2022
 * Name: Saad N
 * Description: Contains the key components of the weather app. Utilizes the openweathermap api to retrieve and display the data 
**/

// Create variable that stores the key and base of the api
const api = {
    key: "af4c2c258f1e4863dfed14a84f04bff5",
    base: "https://api.openweathermap.org/data/2.5/"
}

// Create variable that stores the first element that matches .search-box
const searchbox = document.querySelector('.search-box');

// Add an eventlistener that allows the user to type into the searchbox
searchbox.addEventListener('keypress', setQuery);

// Using the keycodes, when the user presses enter it goes to the getResults function to find possible match
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

// Fetches for specific nformation regarding the query, and displays it through the displayResults function
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResults);
}

// Displays the results if able to fetch possible data
function displayResults(weather) {
    console.log(weather);

    // Finds .location .city and sets the text
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Gets current time using new Date()
    // Finds .location .date and sets the text through dateBuilder function
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    // Finds .current .temp and sets the text rounding the temperature
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    // Finds .current .weather and sets the text to whatever was retrived through the api
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    // Finds .hi-low and sets the text to the highest temp and lowest temp rounding the temperature values
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

// Given the current date, builds the date
function dateBuilder(d) {

    // Constants
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    // Return the date
    return `${day} ${date} ${month} ${year}`;
}