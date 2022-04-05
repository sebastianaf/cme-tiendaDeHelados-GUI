/*
  Colegio Ténico Maria Elvinia
  Grado 10º
  
  Esta pequeña implementación de Javascript simula
  un programa que usará el cajero de una heladería
  para calcular el valor total del pedido de un helado
  para un cliente

  No considera la validación de pedido, es decir, solo funciona
  si se ingresan valores numéricos
*/

/*
  Estos son los mensajes para mostrar en la aplicación
*/
var bienvenida = `
--Heladería CME--
Bienvenidos a nuestra heladería
`;

var catalogo = `
---Sabores de helados---
    1.Vainilla -> $2.000
    2.Fresa -> $2.500
    3.Macadamia -> $1.000
    4.Brownie -> $3.000
    5.Chocolate -> $2.000
  Igrese el número del sabor
`;

var aderesos = `
---Lista de aderesos y extras---
  1.Crema de mora -> $500
  2.Crema de leche -> $500
  3.Galletas waffer -> $2.000
  4.Crema batida -> $1.000
Igrese el número del adereso
`;

/*
  Esta matriz guardará los datos del pedido así:
  Primera fila -> Lista de sabores del helado
  Segunda fila -> Cantidad de bolitas para cada sabor
  Tercera fila -> Lista de aderesos o extras del helado
  Cuarta fila -> Cantidad de aderesos o extras
*/
var pedido = [[], [], [], []];

/*
  Estos son los costos de cada sabor por bolita
  y de cada adereso o extra por unidad
  para cálcular el valor total del pedido
*/
var costos = [
  ["Vainilla", "Fresa", "Macadamia", "Brownie", "Chocolate"],
  [2000, 2500, 1000, 3000, 2000],
  ["Crema de mora", "Crema de leche", "Galletas waffer", "Crema batida"],
  [500, 500, 2000, 1000],
];

/**
 * Se omiten los pasos iniciales del script anterior, ahora se recuperan los valores a través del DOM
 */

/**
 * Se definen las cantidades de aderesos y sabores de manera estática
 */
const cantidadSabores = 5;
const cantidadAderesos = 4;

/**
 * Esta función usa el DOM para recuperar las cantidades de los sabores y aderesos
 */
const recuperarValores = () => {
  //Se reinicia el arreglo de pedidos
  pedido = [[], [], [], []];

  //se recuperan las bolitas helado
  costos[0].forEach((sabor, i) => {
    pedido[0].push(i + 1);
    pedido[1].push(document.getElementById(sabor.toLowerCase()).value);
  });

  //Se recuperan las cantidades de aderesos
  costos[2].forEach((adereso, i) => {
    //console.log(adereso.replace(/\s/g, "").toLowerCase());
    pedido[2].push(i + 1);
    console.log(
      document.getElementById(adereso.replace(/\s/g, "").toLowerCase()).value
    );
    pedido[3].push(
      document.getElementById(adereso.replace(/\s/g, "").toLowerCase()).value
    );
  });
};

/**
 * Y Finalmente esta función toma el valor calculado y lo imprime en el área de la factura
 */
const calcular = () => {
  /**
   * Primero se recuperan los valores del la intefaz gráfica
   */
  recuperarValores();

  /**
   * Se crea una cadena de texto donde se guardará el registro del pedido
   */
  let factura = ``;

  /**
   * Se agregan los costos individuales por cada sabor de helado según su cantidad
   */
  factura += `Bolitas de helado\n`;
  var valorTotalSabor = 0;
  var i2 = 0;
  while (i2 < cantidadSabores) {
    var valorSabor = costos[1][pedido[0][i2] - 1];
    var numeroDeBolitas = pedido[1][i2];
    var totalSabor = valorSabor * numeroDeBolitas;
    var nombreSabor = costos[0][pedido[0][i2] - 1];

    factura += `${nombreSabor} x ${numeroDeBolitas} = $${totalSabor} COP\n`;
    valorTotalSabor += totalSabor;
    i2++;
  }

  /**
   * Se agregan los costos individuales para cada adereso o extra según su cantidad
   */
  factura += `\nAderesos\n`;
  var valorTotalAderesos = 0;
  var i3 = 0;
  while (i3 < cantidadAderesos) {
    var valorAdereso = costos[3][pedido[2][i3] - 1];
    var unidadesAdereso = pedido[3][i3];
    var totalAdereso = valorAdereso * unidadesAdereso;
    var nombreAdereso = costos[2][pedido[2][i3] - 1];

    factura += `${nombreAdereso} x ${unidadesAdereso} = $${totalAdereso} COP\n`;
    valorTotalAderesos += totalAdereso;
    i3++;
  }

  /*
  Se agrega a la cadena de texto en una 
  nueva línea el valor total del helado
*/
  factura += `\nTOTAL = ${valorTotalAderesos + valorTotalSabor} COP`;
  document.getElementById("contenidoFactura").innerText = factura;
  factura = ``;
};
