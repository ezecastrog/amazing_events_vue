let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let events = [];
let currentDate = '';
const contenedorTarjeta = document.getElementById('contenedorTarjeta') 
let query = location.search
let params = new URLSearchParams(query)
let idParams = params.get("id")

//Llamada de funciones
getEvents();

// Funciones
function tarjetaSeleccionada(){
  let tarjetaElegida = events.find(info => info._id == idParams);
  let tarjeta = "";
  tarjeta += `<img src="${tarjetaElegida.image}" class="card-img-top d-flex" alt="..." height="280" >
  </div>
  <div class="p-3"></div>
  <div class="card justify-content-center border-dark p-2  d-flex">
      <h2 class="p-1">${tarjetaElegida.name}</h2>
      <p class="p-1">Description: ${tarjetaElegida.description}</p>
      <p class="p-1">Date: ${tarjetaElegida.date}</p>
      <p class="p-1">Place: ${tarjetaElegida.place}</p>
      <p class="p-1"> Assistance: ${tarjetaElegida.assistance || tarjetaElegida.estimate}</p>
      <p class="p-1">Price $${tarjetaElegida.price}</p>
      
`

contenedorTarjeta.innerHTML = tarjeta;

}

async function getEvents () {
  try {
      let response = await fetch(urlAPI);
      let dataAPI = await response.json();
      events = dataAPI.events;
      currentDate = dataAPI.currentDate;
      tarjetaSeleccionada();
  } catch (error){
      console.log(error.message);
  } 
  };