const date = new Date();



fetch('http://localhost:5050/weather')
  .then(res => res.json())
  .then(data => {
    const body = document.querySelector(".body");
    const weatherDiv = document.createElement('div');
    const todays_date = document.createElement('p');
    todays_date.textContent = date;
    weatherDiv.appendChild(todays_date);
    weatherDiv.classList.add("weather");
    data.forEach(item => {
      const info = document.createElement('p');
      info.textContent = `City: ${item.city}, Temperature: ${item.temperature}°C, Weather: ${item.weather}`;
      weatherDiv.appendChild(info);
    });

    body.appendChild(weatherDiv);
  })
  .catch(error => console.error("error:", error));


