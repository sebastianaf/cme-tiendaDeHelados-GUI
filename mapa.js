let mapa = document.getElementById("demo");

const geolocate = (position, message = "Esta es tu ubicación") => {
  const {latitude, longitude} = position.coords;

  let map = L.map("map").setView([latitude, longitude], 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([latitude, longitude]).addTo(map).bindPopup(message).openPopup();
};

const inCaseError = () => {
  const position = {
    coords: {
      longitude: -76.493919,
      latitude: 3.467651,
    },
  };
  geolocate(position, "Aquí está el colegio");
  alert("Se mostrará la ubicación del colegio");
};

// Esta función campura las coordenadas del usuario web
const showPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geolocate, inCaseError);
  } else {
    alert("La geolicalización no es soportada");
  }
};

showPosition();
