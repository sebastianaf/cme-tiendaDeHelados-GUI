const reloj = () => {
  let miReloj = document.getElementById("reloj");

  let localLocale = moment();

  setInterval(() => {
    localLocale = moment();
    let horaActual = `${localLocale.format('hh:mm:ss a')}`;
    miReloj.innerHTML = horaActual;
  }, 1000);
};

reloj();
