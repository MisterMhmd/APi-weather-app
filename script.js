const date = new Date();
const format = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
}


document.addEventListener("DOMContentLoaded", () => {
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

  const body = document.querySelector(".time");
  const weatherDiv = document.createElement('div');
  weatherDiv.className = "text-center"
  const todays_date = document.createElement('p');
  todays_date.textContent = date.toLocaleDateString("en-EG", format);
  weatherDiv.appendChild(todays_date);
  body.appendChild(weatherDiv);

  const search_bar = document.getElementById('Search-bar');


  search_bar.addEventListener('input', () => {
    const search_value = search_bar.value.toLowerCase();
    const cities = document.querySelectorAll(".city");
  
    document.querySelectorAll(".city").forEach(city => {
      const name = city.querySelector(".name");
      if (name.textContent.toLowerCase().includes(search_value)) {
        city.style.display = '';
      } else {
        city.style.display = 'none';
      }
    });
  });
})
