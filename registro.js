const { dinero, toFormat } = window.dinero.js;
const { COP } = window["@dinero.js/currencies"];

/**
 * Los registros tienen esta forma
   [
       {
            date: "Una fecha de un registro",
            value: "Un valor de la venta del helado",
            obs: ""
        },
        {
            date: "Otra fecha de otro registro",
            value: "otro valor de la venta del helado",
            obs: "El detalle de los elementos comprados en el helado"
        },
        .
        .
        .
    ]
 */

const checkEmpty = async () => {
  if (localStorage.salesRecords === undefined) {
    localStorage.setItem("salesRecords", JSON.stringify([]));
    console.log("first");
    console.log(localStorage.salesRecords);
  }
};

export const record = async (value, obs) => {
  let localLocale = moment();
  localLocale.locale("es");
  const transformer = ({ amount, currency }) => `$${amount} ${currency.code}`;
  const valueWithCurrency = dinero({ amount: value, currency: COP, scale: 0 });

  checkEmpty();
  console.log("second");
  console.log(localStorage.salesRecords);

  const newRecordArray = await JSON.parse(localStorage.salesRecords);
  newRecordArray.push({
    date: localLocale.format("DD MMM YY hh:mm a"),
    value: toFormat(valueWithCurrency, transformer),
    obs,
  });

  console.log("new Array");
  console.log(newRecordArray);

  localStorage.setItem("salesRecords", JSON.stringify(newRecordArray));

  showRecords();
};

const showRecords = async () => {
  let salesRecordsTable = document.getElementById("salesRecords");
  let recordsHTML = `
    <table class="table table-striped">
        <thead>
            <th>Fecha</th>
            <th>Valor</th>
        </thead>
        <tbody>
  `;

  console.log("third");
  console.log(localStorage.salesRecords);
  console.log("fourth");
  console.log(await JSON.parse(localStorage.salesRecords));

  if (localStorage.salesRecords) {
    /**
     * Debe hacer las correcciones según la forma que tienen los registros para mostrar 
     * las fechas, valores y detalles de cada compra correctamente, la forma que tienen
     * los registros están de la línea 4 a la 21
     */
    (await JSON.parse(localStorage.getItem("salesRecords"))).forEach(
      (record) => {
        /**
         * El objeto record accede a cada elemento del arreglo de registros
         */
        recordsHTML += `
                <tr         
                    data-bs-toggle="tooltip" 
                    data-bs-placement="bottom"
                    title="${"error" /** Aquí se pone el detalle de la compra */}" 
                >
                    <td>${"error" /** Aquí va la fecha de cada compra */ }</td>
                    <td>${"error" /** Aquí va  el valor de cada compra*/}</td>
                </tr>
            `;
      }
    );
    recordsHTML += `
            </tbody>
        </table>
    `;
    salesRecordsTable.innerHTML = recordsHTML;
  } else {
    salesRecordsTable.innerHTML = `<p class="m-3">No hay registros</p>`;
  }
};

showRecords();