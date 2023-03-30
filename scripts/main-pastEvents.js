let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let events = [];
let inputBusqueda = document.querySelector("input[name='textInput']");
let checkboxes;
let currentDate = '';

//Constantes Capturadas y variables

const contenedor = document.getElementById('cardsContainer')
const contenedorChecks = document.getElementById('checkbox-container')
const input = document.querySelector("input[name='textInput']");

//Eventos 

input.addEventListener('input', superFiltro)
contenedorChecks.addEventListener('change', superFiltro)

//Llamada de funciones

getEvents();

//Funciones
async function getEvents () {
  try {
      let response = await fetch(urlAPI);
      let dataAPI = await response.json();
      events = dataAPI.events;
      currentDate = dataAPI.currentDate;
      pintarTarjetas(events)
      crearCheckboxes(events)
  } catch (error){
      console.log(error.message);
  } 
  };

function superFiltro(){
  let arrayFiltrado1 = filtrarPorTexto(events,input.value)
  let arrayFiltrado2 = filtrarPorCategoria(arrayFiltrado1)
  pintarTarjetas(arrayFiltrado2)
}

function pintarTarjetas(arrayDatos){
  if(arrayDatos.length == 0){
    contenedor.innerHTML = "<h3 class='display-1-fw-bolder'>No hay coincidencias!</h3>";
  } else { 
  let tarjetas = ''
  let arrayFiltrado = arrayDatos.filter(arrayDatos => arrayDatos.date<currentDate)
  arrayFiltrado.forEach(elemento =>{

tarjetas +=    `
<div class="individual-card-container d-flex">
<div class="card">
<div class="card-img">

<img
src="${elemento.image}"
class="card-img-top col-2"
alt="..."
height="250"
/>
</div>

<div class="card-body">
<h5 class="card-title">${elemento.name}</h5>
<p class="card-text d-flex">${elemento.description}</p>
<div class="card-price justify-content-between">
  <p>Price $${elemento.price}</p>
  <a href="./details.html?id=${elemento._id}" class="btn btn-primary">Ver mas...</a>
</div>
</div>
</div>
</div>`
  })
  contenedor.innerHTML = tarjetas
}}

function filtrarPorTexto(arrayDatos, texto){
  let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}
function crearCheckboxes(arrayInfo){
  let checks = ''
  let categoryRepeated = arrayInfo.map(elemento =>elemento.category)
  let category = new Set(categoryRepeated.sort((a,b) =>{
    if(a>b){
      return 1
    }
    if(a<b){
      return -1
    }return 0
    
  }))
  category.forEach(elemento => {
    checks += `<li class="list-group-item">
    <input
      class="form-check-input me-1"
      type="checkbox"
      value="${elemento}"
      id="${elemento}"
    />
    <label class="form-check-label" for="${elemento}">${elemento}</label>
  </li>`
  })
  contenedorChecks.innerHTML=checks
}

function filtrarPorCategoria(arrayInfo){
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkboxes)
  let checksChecked = arrayChecks.filter(check => check.checked)
  if (checksChecked.length == 0 ){
    return arrayInfo
  }
  let checkValues = checksChecked.map(check => check.value)
console.log(checkValues)
  let arrayFiltrado = arrayInfo.filter(elemento => checkValues.includes(elemento.category))
  console.log(arrayFiltrado)
  return arrayFiltrado
}

// const date = new Date(); // Getting automatically the current date and formatting it to yyyy-mm-dd
// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
// let currentDate = `${year}-${month}-${day}`;
// console.log(currentDate);
