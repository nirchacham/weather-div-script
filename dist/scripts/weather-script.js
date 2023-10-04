var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to create the weather div
function createWeatherDiv(targetDivId) {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherDiv = document.createElement("div");
        weatherDiv.classList.add("weather-div");
        // Create input for city
        const inputElement = document.createElement("input");
        inputElement.id = "cityInput";
        inputElement.placeholder = "Enter city or coordinates";
        weatherDiv.appendChild(inputElement);
        // Create button for getting the city weather
        const searchBtn = document.createElement("button");
        searchBtn.textContent = "Get weather!";
        searchBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const cityInput = document.getElementById("cityInput");
            const cityValue = cityInput.value.trim();
            if (cityValue) {
                try {
                    const apiData = yield getWeatherInsightsFromApi(cityValue);
                    const avgDatasets = yield calculateDailyAverages(apiData);
                    displayDailyAverages(avgDatasets, temperatureContainer);
                }
                catch (error) {
                    console.error("Error: ", error.message);
                    alert("An error occurred while fetching weather data, possibly entered unvalid city.");
                }
            }
            else {
                alert("Please enter a city!");
            }
        }));
        weatherDiv.appendChild(searchBtn);
        // Create a container for displaying average temperatures
        const temperatureContainer = document.createElement("div");
        temperatureContainer.classList.add("temperature-container");
        temperatureContainer.id = "temperature-container";
        weatherDiv.appendChild(temperatureContainer);
        // Inject the weather div into the target div or body if there isn't target div
        if (targetDivId) {
            const targetDiv = document.getElementById(targetDivId);
            if (targetDiv) {
                targetDiv.appendChild(weatherDiv);
            }
            else {
                document.body.appendChild(weatherDiv);
            }
        }
        else {
            document.body.appendChild(weatherDiv);
        }
    });
}
// Function to calculate the average temperature and description for each day
function calculateDailyAverages(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const dailyAverages = {};
        data.forEach((item, index) => {
            // Determine the day based on the index (use modulo 7)
            const dayIndex = index % 7;
            const day = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ][dayIndex];
            // Calculate the average temperature and description for the day
            const temperature = item.temp;
            const description = item.weather.description;
            const icon = item.weather.icon;
            // Sum the temperature and keep counting of how many weeks in order to be generic.
            // Calculate while running on the days, the average temperature for each day.
            if (!dailyAverages[day]) {
                dailyAverages[day] = { temperature, description, icon, count: 1 };
            }
            else {
                const currentDay = dailyAverages[day];
                dailyAverages[day] = {
                    temperature: Math.round((currentDay.temperature + temperature) / (currentDay.count + 1)),
                    description: currentDay.description,
                    icon: currentDay.icon,
                    count: currentDay.count + 1,
                };
            }
        });
        return dailyAverages;
    });
}
// Function to display daily averages
function displayDailyAverages(averages, container) {
    container.innerHTML = ""; // Clear previous content
    for (const day in averages) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day-container");
        // Create an element for weather image
        const weatherImg = document.createElement("img");
        weatherImg.src = `icons/${averages[day].icon}.png`;
        weatherImg.alt = averages[day].icon;
        weatherImg.classList.add("weather-img");
        // Create an element for day weather description
        const dayDescription = document.createElement("p");
        dayDescription.textContent = averages[day].description;
        dayDescription.classList.add("weather-description");
        // Create an element for day name
        const dayName = document.createElement("p");
        dayName.textContent = day;
        dayName.classList.add("day-name");
        // Create an element for day temperature
        const temperature = document.createElement("p");
        temperature.textContent = `${averages[day].temperature}°C`;
        temperature.classList.add("day-temperature");
        // Append elements to the day's div
        dayElement.appendChild(dayName);
        dayElement.appendChild(weatherImg);
        dayElement.appendChild(dayDescription);
        dayElement.appendChild(temperature);
        container.appendChild(dayElement);
    }
}
function getWeatherInsightsFromApi(locationInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
        const weatherBitApi = "745d1a1a39f9464d818b7b14104d5a7a";
        let apiUrlSuffix = "";
        if (/^-?\d+\.\d+,-?\d+\.\d+$/.test(locationInput)) {
            const [lat, lon] = locationInput.split(",");
            // If the locationInput matches lat,lon format
            apiUrlSuffix = `?lat=${lat}&lon=${lon}`;
        }
        else {
            // Otherwise, assuming it's a city name
            apiUrlSuffix = `?city=${locationInput}`;
        }
        try {
            const result = yield fetch(`${apiUrl}${apiUrlSuffix}&days=14&key=${weatherBitApi}`);
            if (!result.ok) {
                throw new Error("Request failed");
            }
            const weatherData = yield result.json();
            console.log("Data: ", weatherData);
            return weatherData ? weatherData.data : [];
        }
        catch (error) {
            console.error("Error in fetching data: ", error);
            throw new Error("Error occurred while fetching data from the API");
        }
    });
}
// Initialize the weather div
createWeatherDiv(); // Test without target div
export {};
// createWeatherDiv("target-div") // Test with target div
