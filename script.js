import ApiFetch from "./ApiFetch.js"
import Constants from "./Constants.js";
const CardHolderDiv = document.getElementsByClassName('CardHolder')[0];
console.log(Constants.length)

for (let index = 0; index < Constants.length; index++) {
    const newDivCard = document.createElement("div")
    newDivCard.className = "Card";
    for (let i = 1; i < 4; i++) {
        const newDivCardContent = document.createElement("div")
        newDivCardContent.className = `CardContent${i}`
        newDivCard.insertBefore(newDivCardContent, newDivCard[i - 1])
    }
    CardHolderDiv.insertBefore(newDivCard, CardHolderDiv.children[index]);
}


for (let index = 0; index < Constants.length; index++) {
    const DivCardContent1 = document.getElementsByClassName("CardContent1")[index]
    const newImg = document.createElement("img")
    newImg.src = Constants[index].icon
    const newName = document.createElement("p")
    newName.textContent = Constants[index].name
    DivCardContent1.insertBefore(newName, DivCardContent1.firstChild)
    DivCardContent1.insertBefore(newImg, DivCardContent1.children[1])
}

  
    async function UpdateWeatherData(city) {
        if (!city) {
            alert("please enter a city name");
            return;
        }
        try{
            const WeatherData= await ApiFetch(city);
            if (WeatherData.cod !== 200) {
                alert("City not found. Please try another location.");
                return;
            }
            const today = new Date();
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    const sunriseTime = new Date(WeatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const sunsetTime = new Date(WeatherData.sys.sunset * 1000).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
            let DivCardContent2 = document.getElementsByClassName("CardContent2")[0]
            DivCardContent2.textContent = WeatherData.main.humidity + '%'
            DivCardContent2 = document.getElementsByClassName("CardContent2")[1]
            DivCardContent2.textContent = WeatherData.wind.speed+'m/s'
            DivCardContent2 = document.getElementsByClassName("CardContent2")[2]
    DivCardContent2.textContent = WeatherData.main.pressure+'hPa';
    DivCardContent2 = document.getElementsByClassName("CardContent2")[3]
    DivCardContent2.textContent = WeatherData.main.temp_max +'°C'
    DivCardContent2 = document.getElementsByClassName("CardContent2")[4]
    DivCardContent2.textContent = `${WeatherData.main.feels_like}°C`
    DivCardContent2 = document.getElementsByClassName("CardContent2")[5]
    DivCardContent2.textContent = WeatherData.clouds.all + '%'
    
    
let isCelsius = true; 
let currentTempC = null;
const TempButton = document.getElementById("TempConversion");
TempButton.addEventListener("click", () => {
    if (currentTempC === null) return;

    if (isCelsius) {
        const tempF = (currentTempC * 9/5) + 32;
        TempDiv.innerHTML = `${tempF.toFixed(1)}&deg;F`;
        TempButton.innerText = "°F <-> °C";
    } else {
        TempDiv.innerHTML = `${currentTempC}&deg;C`;
        TempButton.innerText = "°C <-> °F";
    }

    isCelsius = !isCelsius;
});


    
    
    let newPara = document.createElement('p')
    const DivSection2LeftPaneldocument = document.getElementsByClassName("Section2LeftPanel")[0]
    DivSection2LeftPaneldocument.innerHTML=''
    DivSection2LeftPaneldocument.insertBefore(newPara, DivSection2LeftPaneldocument[0])
    newPara.textContent = `${WeatherData.name},${WeatherData.sys.country}`
    document.getElementById("SunriseTime").textContent = sunriseTime; // e.g. "05:30 AM"
    document.getElementById("SunsetTime").textContent = sunsetTime;
    const formattedDate = today.toLocaleDateString('en-IN', options);
    newPara.className="SelectedCountry"
    newPara = document.createElement('p')
    DivSection2LeftPaneldocument.insertBefore(newPara, DivSection2LeftPaneldocument[1])
    newPara.textContent = formattedDate
    newPara.className="TodaysDate"  
currentTempC = WeatherData.main.temp
    let TempDiv=document.getElementsByClassName("Section3LeftPanel")[0]
    TempDiv.innerHTML=`${currentTempC}&deg;C`
    let WeatherDescription =document.getElementsByClassName("Section4LeftPanel")[0]
    WeatherDescription.innerHTML=WeatherData.weather[0].description
    
}catch (err) {
    console.error("API Error:", err);
    alert("Something went wrong fetching weather data.");
}
}

function loadInitialWeather() {
    const defaultCity = "Delhi"; // Set your default city
    UpdateWeatherData(defaultCity);
}

// Call it once on page load
window.addEventListener('DOMContentLoaded', loadInitialWeather);
document.getElementById("submitButton").addEventListener("click", function(e) {
    e.preventDefault();
    const city = document.getElementById("userInput").value.trim();
    UpdateWeatherData(city);
});


