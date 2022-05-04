const reloj = () => {
  let miReloj = document.getElementById("reloj");

  let fechaActual = new Date();
  let horas = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();
  let segundos = fechaActual.getSeconds();
  //let milisegundos = fechaActual.get();

  setInterval(() => {
    let horaActual = `
    
    ${horas < 10 ? "0" : ""}
    ${horas + parseInt(parseInt(segundos / 60) / 60)}:
    
    ${minutos % 60 < 10 ? "0" : ""}
    ${minutos + parseInt(segundos / 60)}:
    
    ${segundos % 60 < 10 ? "0" : ""}
    ${segundos % 60}`;
    miReloj.innerHTML = horaActual;
    segundos++;
  }, 1000);
};

reloj();
