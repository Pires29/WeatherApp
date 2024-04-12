// 369687e1ad152952a1cc57c08dc77ec4

const checkButton = document.getElementById("submit");


const url_geo = "http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid=369687e1ad152952a1cc57c08dc77ec4";
const url_data = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=369687e1ad152952a1cc57c08dc77ec4";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const apiCountryURL = "https://flagsapi.com/${countryCode}/shiny/64.png";

async function getWeatherData(){

        city_value = document.getElementById("input").value;
        console.log(city_value);
        const response_geo = await fetch(url_geo.replace("{city}", city_value));
        const data_geo = await response_geo.json();
        console.log(data_geo);

        const lat = data_geo[0].lat;
        const lon = data_geo[0].lon;

        const url_data_new = url_data.replace("{lat}", lat).replace("{lon}", lon);

        const response = await fetch(url_data_new);
        const data = await response.json();
        console.log(data)
        return {data, data_geo};
}

async function showWeatherData(){
    try{

        document.getElementById("error").style.display = "none";

        const {data, data_geo} = await getWeatherData();

        // Mostrar Temperatura

        document.getElementById("temp").innerHTML = parseInt(data.main.temp) + "°C";

        // Mostrar Nome da Cidade
        document.getElementById("city_name").innerHTML = data_geo[0].name;

        // Mostrar Estado do Céu (com primeira letra maiscula)

        const description = data.weather[0].description;
        const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);
        document.getElementById("state_weather").innerHTML = formattedDescription;

        // Mostrar Velocidade do Vento

        document.getElementById("vento").innerHTML = data.wind.speed.toFixed(1) + " " + "km/h";

        // Mostrar Humidade

        document.getElementById("humidade").innerHTML = data.main.humidity + "%";

        // Mostrar Direção do Vento

        document.getElementById("direcao").innerHTML = data.main.pressure + " " + "hPa";

        // Mostrar Icon

        const icon = data.weather[0].icon
        document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${icon}.png`;

        // Mudar BG Image
        document.getElementById("background-image").style.backgroundImage = `url("${apiUnsplash + city_value}")`;
        
        // Mudar Bandeira

        document.getElementById("country").setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
    } catch (error){
        showErrorMessage();
    }

}

function showErrorMessage(){
    document.getElementById("error").style.display = "block";
}

function hideInformation(){
    document.getElementById("error").style.display = "none";
}

checkButton.onclick = async function(){
    showWeatherData();
}
