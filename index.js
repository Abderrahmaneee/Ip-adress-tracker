function requestAPI() {
  event.preventDefault();
  getIP();
}

function getIP() {
  const id = document.querySelector("#main__input").value;
  let URL;

  if (isNaN(id)) {
    URL = `https://geo.ipify.org/api/v1?apiKey=at_y29Mogt4HWOFHJ28XnwDvI7UMLALQ&domain=${id}`;
  } else {
    URL = `https://geo.ipify.org/api/v1?apiKey=at_y29Mogt4HWOFHJ28XnwDvI7UMLALQ&ipAddress=${id}`;
  }

  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      document.querySelector("#main__detail").innerHTML = `
          <div class="detail__item">
            <p class="main__subtitle">IP ADDRESS</p>
            <p class="main__text">${res.ip}</p>
          </div>
          <div class="detail__item">
            <p class="main__subtitle">LOCATION</p>
            <p class="main__text">
              ${res.location.city}, ${res.location.region} ${res.location.postalCode}
            </p>
          </div>
          <div class="detail__item">
            <p class="main__subtitle">TIMEZONE</p>
            <p class="main__text">UTC${res.location.timezone}</p>
          </div>
          <div class="detail__item">
            <p class="main__subtitle">ISP</p>
            <p class="main__text">${res.isp}</p>
          </div>
        `;
      buildMap(res.location.lat, res.location.lng);
    });
}

function buildMap(lat, lng) {
  document.querySelector("#map").innerHTML = "<div id='mapid'></div>";

  let myMap = L.map("mapid", { zoomControl: false }).setView([lat, lng], 16);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoieXV1Y29kZSIsImEiOiJja2V2ZGgzaGIwNDByMnlwOWRsejN6empkIn0.izeMg6hbEjL89TFnW5ZarA",
    }
  ).addTo(myMap);

  let icon = L.icon({
    iconUrl: "./images/icon-location.svg",
  });

  let marker = L.marker([lat, lng], { icon: icon }).addTo(myMap);
}

getIP();
