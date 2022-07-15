/* CSS JS CONST*/
const menuTrigger = document.querySelector('.mobile-menu-trigger');
const menuClose = document.querySelector('.close-mobile-menu');
const menuContent = document.querySelector('.nav-links');
const navbar = document.querySelector('.top-header');
const loader = document.querySelector('.loader');

/*CSS JS Open Mobile Menu*/
menuTrigger.onclick = () => {
    menuContent.style.left = '0';
}

/*CSS JS Close Mobile Menu*/
menuClose.onclick = () => {
    menuContent.style.left = '-500px';
}

            
/*Loader*/
loader.style.left = '100%';



//JS Vars
const temp = document.querySelector('.temp');
const cityName = document.querySelector('.city-name');
const weatherDesc = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const precipitation = document.querySelector('.precipitation');
const wind = document.querySelector('.wind');
const feelsLike = document.querySelector('.feels-like');
const visibility = document.querySelector('.visibility');
const aqi = document.querySelector('.aqi');
const toCelcius = document.querySelector('.celcius');
const toFahren = document.querySelector('.fahrenheit');
const searchArea = document.querySelector('.search-area');
const searchBtn = document.querySelector('.btn');
const wImage = document.querySelector('.w-image');
const backgroundImg = document.querySelector('.main-app');


//JS Others
//Date
let date = new Date();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']




//APIs
getIP();
//Get Client IP Address
function getIP() {
    fetch('https://www.cloudflare.com/cdn-cgi/trace')
        .then(response => response.text())
        .then(data => {
            let ip = (data.slice(data.indexOf('p=') + 2, data.indexOf('ts')));
            getWeather(ip);
        });
}

//Get Weather Data using Ip Address
function getWeather(ip) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=3bd9a27cda37433980e115228221107&q=${ip}&aqi=yes`)
        .then(response => response.json())
        .then(data => {
        

            //Assigning Data TO HTML
            temp.innerHTML = (data.current.temp_c).toFixed(0) + '<span>°</span>';
            cityName.innerHTML = data.location.name + ', ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
            weatherDesc.innerHTML = data.current.condition.text;
            humidity.innerHTML = 'Humidity: '  + data.current.humidity + '%';
            precipitation.innerHTML = 'Rainfall: ' + data.current.precip_mm + 'mm';
            wind.innerHTML = 'Wind: ' + data.current.wind_kph + ' km/h';
            feelsLike.innerHTML = 'Feels Like: ' + (data.current.feelslike_c).toFixed() + '<sup>°</sup>';
            visibility.innerHTML = 'Visibility: ' + data.current.vis_km + 'km';
            aqi.innerHTML = 'AQI PM2.5:  ' + (data.current.air_quality.pm2_5).toFixed(0)

            if ((data.current.condition.text).search('rain') > 0) {
                wImage.src = 'images/rain.png';
                backgroundImg.style.background = "url('images/rain.jpg')";
                backgroundImg.style.backgroundSize = 'cover';
            } else if ((data.current.condition.text).search('cloudy') > 0) {
                wImage.src = 'images/cloud.png';
                backgroundImg.style.background = "url('images/clouds.jpg')";
                backgroundImg.style.backgroundSize = 'cover';
            } else if ((data.current.condition.text).search('Sunny') >= 0) {
                wImage.src = 'images/sun.png';
                backgroundImg.style.background = "url('images/day.jpg')";
                backgroundImg.style.backgroundSize = 'cover';
            } else {
                wImage.src = 'images/sun.png';
            }

            toFahren.onclick = () => {
                temp.innerHTML = (data.current.temp_f).toFixed(0) + '<span>°</span>';
                toCelcius.style.fontSize = '18px';
                toFahren.style.fontSize = '28px';
            }

            toCelcius.onclick = () => {
                temp.innerHTML = (data.current.temp_c).toFixed(0) + '<span>°</span>';
                toCelcius.style.fontSize = '28px';
                toFahren.style.fontSize = '18px';
            }

            searchBtn.onclick = () => {
                if (searchArea.value == 0) {
                    alert('Please Enter A Valid City Name');
                } else {
                    let city = searchArea.value.toLowerCase();
                    getWeather(city);
                    menuContent.style.left = '-500px';
                    if (loader.style.left == '-20%') {
                        loader.style.left = '100%';
                    } else {
                        loader.style.left = '-20%';
                    }
                }
            }





        })
}



