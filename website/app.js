/* Global Variables */
const apikey = "7afd84c02094c130b8f230b1f37439f8";
const weatherBaseUrl = "http://api.openweathermap.org/data/2.5/weather?zip="

const serverBaseUrl = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', Loaded);

function Loaded() {

    const generate = document.getElementById('generate');

    generate.addEventListener('click', generateClick);

    // fetch recent data and redner to screen on startup
    updateUi();
}

async function generateClick() {

    const zip = document.getElementById('zip');

    const zipcode = zip.value;

    await getWeatherData(zipcode).then(saveWeatherData).then(updateUi);
}

async function getWeatherData(zipcode) {

    const response = await fetch(`${weatherBaseUrl}${zipcode},in&appid=${apikey}`);

    return await response.json();
}

function getCurrentDate() {
    const d = new Date();
    return `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;
  }

async function saveWeatherData(data) {

    const temp = data.main.temp;
    const dt = getCurrentDate();
    const feelings = document.getElementById('feelings').value;

    const obj = {
        temperature: temp,
        date: dt,
        user_response: feelings
    };

    await fetch(`${serverBaseUrl}/saveData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
}

async function updateUi() {

    const response = await fetch(`${serverBaseUrl}/data`);

    const data = await response.json();

    const dateEle = document.getElementById('date');
    const tempEle = document.getElementById('temp');
    const respEle = document.getElementById('content');

    dateEle.innerText = data.date;
    tempEle.innerText = data.temperature;
    respEle.innerText = data.user_response;
}
