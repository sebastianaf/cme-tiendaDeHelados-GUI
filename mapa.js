let mapa = document.getElementById("demo");

const geolocate = (position) => {
  let map;
  let longitud;
  let latitud;

  if (position) {
    //El usuario acepta usar la geolocalización
    longitud = position.coords.longitude;
    latitud = position.coords.latitude;
    
    map = L.map("map").setView([latitud,longitud], 15);
    
 
  } else {
    //El usuario NO acepta usar la geolocalización
    longitud = 3.4725994;
    latitud = -76.490998;
    
    map = L.map("map").setView([latitud, longitud], 15);
    
    
  }

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

const showPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geolocate);
  } else {
    alert("La geolicalización no estará disponible");
  }
};

showPosition();
