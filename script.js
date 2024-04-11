var container= document.getElementsByClassName("container")
async function getWeather(lat,lng) {
  
 
  var api_key = "2d91f913102d6e595cd65162033e2d9c";
  var weather_api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
  var out1 = await weather_api.json();
   console.log(out1);
  var result = document.querySelector("body div.container");
  result.innerHTML = "";
  var data_ele = document.createElement("h1");
  data_ele.classList.add("cName");
  data_ele.innerText = JSON.stringify(out1.sys.country);
  var data_ele1 = document.createElement("p");
  data_ele1.classList.add("cWeather");
  data_ele1.innerText = JSON.stringify(out1.weather)
  // console.log(data_ele.innerText);
  var data_ele2 = document.createElement("p");
  data_ele2.classList.add("cWindSpeed");
  data_ele2.innerText = JSON.stringify(out1.wind.speed);
  result.append(data_ele);
  result.append(data_ele1);
  result.append(data_ele2);
}

async function countrydata()
{
    //let countries=await fetch("https://restcountries.com/v3.1/all")
    let countries=await fetch('https://restcountries.com/v3.1/all', {
        Method: 'GET'
        
      })
      let con=await countries.json()
    
    con.forEach(country => {
        let currencyCodes = Object.keys(country?.currencies);
        console.log(Object.keys(country.currencies))

       
        var header= document.createElement('div')
        let [lat,lng]=country.latlng
        header.lat=lat
        header.lng=lng
        console.log(lat,lng)
        header.setAttribute("class","card-deck")
        header.innerHTML=`
        <div class="card text-center">
        <div class="card-block">
        <h2 class="card-title">${country.name.common}</h2>
          <img src="${country.flags.png}" class="card-img>
          <div class="card-body">
            <h5 class="card-title">Capital: ${country.capital}</h5>
            <h5 class="card-title">Region: ${country.region}</h5>
            <h5 class="card-title">Country Code: ${currencyCodes[0]}</h5>
             <h5 class="card-title">Latitude: ${country.latlng[0]}</h5>
             <h5 class="card-title">Longititude: ${country.latlng[1]}</h5>

          </div>  
          </div>
          <div class="card-footer">
          <button class="btn btn-primary" onclick="getWeather(${country.latlng[0]},${country.latlng[1]})">Click for Weather</button>

          </div>`
        container [0].appendChild(header)
    })
    
}
console.log(container)
countrydata();

