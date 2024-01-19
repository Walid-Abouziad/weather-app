let searchInput = document.getElementById("search");
let subscribeInput = document.getElementById("Email");

document.getElementById("submit").addEventListener("click" , function(){
    clearSearch();
})
function clearSearch (){
    searchInput.value ="";
}

document.getElementById("subscribe").addEventListener("click" , function(){
    clearSubscribe();
})
function clearSubscribe (){
    subscribeInput.value ="";
}

function sucssessCallbak(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    region = lat + "," + long ;
    getData(region)
}
function errorCallback() {
    getData(30.033333+","+31.233334)
}

const options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0,
};

navigator.geolocation.getCurrentPosition(sucssessCallbak , errorCallback ,options);



let links = document.querySelectorAll(".nav-link")

for ( i=0 ; i<links.length ; i++ ){
    links[i].addEventListener("click" , function(e){ 
        let country = e.target.innerHTML;
        getData(country);       
    })
}
getData("region");


async function getData(region){

    let dataReq = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=87a083f477f1440a91212110232912&q=${region}&days=3`);
    let{location,current,forecast:{forecastday}} = await dataReq.json();
    displayData(location , current , forecastday);  



    
    
    document.getElementById("search").addEventListener("keyup", (a) => {
        getData(a.target.value);
    }); 
}
function displayData(location , current , forecastday){
    let cols = "";
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        cols+=`
        <div class="p-0 col-md-4 weth-item">
            <div class="current-body">
            <div class="container d-flex justify-content-between align-items-center  wethContentHead py-2">
                <h2 class="date-content">${weekday[new Date(forecastday[0].date).getDay()]}</h2>
                <h2 class="date-content">${[new Date(forecastday[0].date).getDate()]}<span>${monthNames[new Date(forecastday[0].date).getMonth()]}</span></h2>
            </div>                
                <div >
                    <h1 class="ms-2">${location.name}</h1>
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="current-temp">${current.temp_c}<span> &#8451;</span></h3>
                        <img src="${current.condition.icon}" width="90" alt"">                        
                    </div>
                    </div>
                    <p class="ms-2">${current.condition.text}</p>
                    <div class="d-flex justify-content-around pb-3">
                        <div class="d-flex">
                            <img src="/images/icon-umberella.png" width="20" height="20" alt"">
                            <span class="mx-2">${forecastday[2].day.daily_chance_of_rain}<span> %</span></span>
                        </div>
                        <div class="d-flex">
                            <img src="/images/icon-wind.png" width="20" height="20" alt"">
                            <span class="mx-2">${current.wind_kph}<span> km/h</span></span>
                        </div>
                        <div class="d-flex">
                            <img src="/images/icon-compass.png" width="20" height="20" alt"">
                            <span class="mx-2">${current.wind_dir}</span>                        
                        </div>
                    </div>                           
                </div>   
            </div>
        </div>
        <div class="p-0 col-md-4 weth-item">
            <div class="text-center h-100">
                <div class="container wethContentHead-middle py-2">
                    <h2 class="date-content">${weekday[new Date(forecastday[1].date).getDay()]}</h2>
                </div>
                
                <div class="middle-body">
                    <img class= "my-4" src="${forecastday[1].day.condition.icon}" width="60" height="60" alt"">
                    <h3 class="high-temp">${forecastday[0].day.maxtemp_c}<span> &#8451;</span></h3>
                    <h6 class="high-temp">${forecastday[1].day.mintemp_c}<span>&#176;</span></h6>
                    <p class= "py-4">${forecastday[1].day.condition.text}</p>
                </div>   
            </div>
        </div>
        <div class="p-0 col-md-4 weth-item">
            <div class="text-center h-100">
                <div class="container wethContentHead py-2">
                    <h2 class="date-content">${weekday[new Date(forecastday[2].date).getDay()]}</h2>
                </div>
                <div class="last-body">
                    <img class= "my-4" src="${forecastday[2].day.condition.icon}" width="60" height="60" alt"">
                    <h3 class="high-temp">${forecastday[2].day.maxtemp_c}<span> &#8451;</span></h3>
                    <h6 class="high-temp">${forecastday[2].day.mintemp_c}<span>&#176;</span></h6>
                    <p class= "py-4">${forecastday[2].day.condition.text}</p>
                </div>   
            </div>
        </div>
        ` 

    document.getElementById("rowData").innerHTML = cols;
}
