const tempField = document.querySelector(".weather1")
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiField = document.querySelector(".weather3 img")
const weatherField = document.querySelector(".weather3 span")
const searchField = document.querySelector(".searchField")
const form = document.querySelector("form")
const bg = document.querySelector(".container")

const feel = document.querySelector(".feels")
const humid = document.querySelector(".humid")
const speed = document.querySelector(".speed")

let target = "Mumbai" //Default Location

//Function to fetch data from API
const fetchData = async(target) =>{

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=4ee257d935764b0aa7b110401222212&q=${target}`

    const response = await fetch(url);
    
    const data = await response.json();
        
    //Destructuring
    const {current:{
        temp_c,feelslike_c,humidity,wind_kph,
        condition:{
            text,icon
        }},
        location:{
            name,localtime
        }} = data;

    updateDom(temp_c,name,icon,text,localtime,feelslike_c,humidity,wind_kph)

    } catch (error) {
        alert("Location Not Found")
        console.log(error)
    }
}

//Function to update DOM
function updateDom(temperature,city,emoji,text,time,feelslike,humidity,wind_kph){

    tempField.innerHTML = `${temperature}<sup>°</sup><span style="font-size:3rem">C</span>`;
    cityField.innerText = city;
    emojiField.src = emoji;
    weatherField.innerText = text;
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];

    const hour = Number.parseInt(exactTime.split(":")[0])
    if(hour >= 18 || hour <=6){
        bg.classList.add("night")
        bg.classList.remove("day")
    }else{
        bg.classList.add("day")
        bg.classList.remove("night")
    }
    const day = new Date().getDay();
    

    dateField.innerText = `${exactTime} - ${getDayName(day)} ${exactDate}`;

    speed.innerHTML = `Wind Speed : ${wind_kph} km/h`
    humid.innerHTML = `Humidity : ${humidity}%`
    feel.innerHTML = `Feels like : ${feelslike}<sup>°</sup>C`
}

//Function to search Location
function search(e){
    e.preventDefault()

    target = searchField.value
    fetchData(target)
}

form.addEventListener("submit",search)


fetchData(target)

//Function to get name of day
function getDayName(num){
const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Wednesday",
    "Saturday"
] 
return day[num];
}


