const date = new Date();




axios.get('https://api-weather-app-ssd0.onrender.com/weather')
  .then(response => {


    const citiesDiv = document.querySelector(".cities");
    response.data.forEach(item => {

      const cityList = document.createElement('li');
      cityList.className = "city";

      const cityName = document.createElement('h2');
      cityName.className = "city-name";

      const city = document.createElement('span');
      city.className = "name"
      city.textContent = item.city;

      cityName.appendChild(city);

      const temp = document.createElement('span');
      temp.className = "city-temp"
      temp.textContent = `${item.temperature}°C`;

      const iconDiv = document.createElement('figure');
      const image = document.createElement('img');
      image.className = "city-icon";
      image.src = `https://openweathermap.org/img/wn/${item.icon}@2x.png`;
      image.alt = 'Weather icon';

      const description = document.createElement('figcaption');
      description.textContent = item.description;

      iconDiv.appendChild(image);
      iconDiv.appendChild(description);


      cityList.appendChild(cityName);
      cityList.appendChild(temp);
      cityList.appendChild(image);

      citiesDiv.appendChild(cityList);
    });



  })
  .catch(error => console.error("error:", error));





document.addEventListener("DOMContentLoaded", () => {


  const body = document.querySelector(".time");
  const weatherDiv = document.createElement('div');
  weatherDiv.className = "text-center"
  const todays_date = document.createElement('p');
  todays_date.textContent = date;
  weatherDiv.appendChild(todays_date);
  body.appendChild(weatherDiv);

  const search_bar = document.getElementById('Search-bar');


  search_bar.addEventListener('input', (e) => {
      e.preventDefault();
    
      const search_value = search_bar.value.toLowerCase();
      const cities = document.querySelectorAll(".city");
      const city_name = document.querySelectorAll(".name");
    
    
      for (let i = 0; i < city_name.length + 1; i++) {
        let match = cities[i].querySelectorAll('.name')[0];
    
        if (match) {
            let city_value = match.textContent || match.innerHTML;
            if (city_value.toLowerCase().indexOf(search_value) > -1){
                cities[i].style.display = "";
            } else {
                cities[i].style.display = "none";
            }
        } else {
          console.log("match not found")
        }
      }
    })
})
