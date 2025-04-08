const date = new Date();




axios.get('https://api-weather-app-ssd0.onrender.com/weather')
  .then(response => {
    const body = document.querySelector(".body");
    const weatherDiv = document.createElement('div');
    weatherDiv.className = "text-center fs-1"
    const todays_date = document.createElement('p');
    todays_date.textContent = date;
    weatherDiv.appendChild(todays_date);
    body.appendChild(weatherDiv);
    response.data.forEach(item => {
      const container = document.createElement('div');
      container.className = 'container-fluid';

      const row = document.createElement('div');
      row.className = 'row text-center';

      const col1 = document.createElement('div');
      col1.className = 'col border';

      const icon = document.createElement('img');
      icon.src = `https://openweathermap.org/img/wn/${item.icon}@2x.png`;
      icon.alt = 'Weather icon';

      col1.appendChild(icon);

      const col2 = document.createElement('div');
      col2.className = 'col-6 border fs-1';

      const cityName = document.createElement('p');
      cityName.className = "city_name";
      cityName.textContent = item.city;

      col2.appendChild(cityName);

      const col3 = document.createElement('div');
      col3.className = 'col border fs-1';
      col3.textContent = item.temperature;

      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);

      container.appendChild(row);

      document.body.appendChild(container);
    });

  })
  .catch(error => console.error("error:", error));





document.addEventListener("DOMContentLoaded", () => {

    const search_bar = document.getElementById('Search-bar');


    search_bar.addEventListener('input', (e) => {
        e.preventDefault();
      
        const search_value = search_bar.value.toLowerCase();
        const city_container = document.getElementById('cities');
        const cities = document.querySelectorAll(".row.text-center");
        const city_name = document.querySelectorAll(".city_name");
      
      
        for (let i = 0; i< city_name.length + 1; i++) {
          let match = cities[i].querySelectorAll('.city_name')[0];
      
          if (match) {
              let city_value = match.textContent || match.innerHTML;
              console.log("match found")  
              if (city_value.toLowerCase().indexOf(search_value) > -1){
                  cities[i].style.display = "";
                  console.log("found results")
              } else {
                  cities[i].style.display = "none";
                  console.log("nothing found")
              }
          } else {
            console.log("match not found")
          }
        }
      })
})
