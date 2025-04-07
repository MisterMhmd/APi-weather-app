const date = new Date();



fetch('http://localhost:5050/weather')
  .then(res => res.json())
  .then(data => {
    const body = document.querySelector(".body");
    const weatherDiv = document.createElement('div');
    weatherDiv.className = "text-center fs-1"
    const todays_date = document.createElement('p');
    todays_date.textContent = date;
    weatherDiv.appendChild(todays_date);
    body.appendChild(weatherDiv);
    data.forEach(item => {
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


