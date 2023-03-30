let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let events = [];
let pastEvents =[];
let categories =[];
let currentDate = '';
const contenedorTabla = document.getElementById('table-stats');

//Llamada de funciones
getEvents();



//Funciones
function loadStats(categorias){
    let container = document.querySelector('tbody');
    let firstTableHTML = `
    <tr>
      <td>Event with the highest percentage of attendance</td>
      <td>Event with the lowest percentage of attendance</td>
      <td>Event with larger capacity</td>
    </tr>
    `
    let secondTableHTML = `
    <tr>
    <th scope="row" colspan=3 class="bg-dark-subtle">Upcoming events statistics by category</th>
  </tr>
  <tr >
    <td>Cateogries</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
  </tr>
    `
    let thirdTableHTML = `
    <tr>
    <th scope="row" colspan="3" class="bg-dark-subtle">Past Events statistic by category</th>
  </tr>
  <tr>
    <td>Cateogries</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
  </tr>
  `
    let tableEventStatisticsHTML = "";
    let tablePastEventsHTML = "";
    let tableUpcomingEventsHTML ="";
    let pastEvents = extractPastEvents(events);
    let masAsistido = getMostAssisted(pastEvents)
    let porcentajeMasAsistido = Math.round((masAsistido.assistance/masAsistido.capacity)*100)
    let menosAsistido = getLessAssisted(pastEvents)
    let porcentajeMenosAsistido = Math.round((menosAsistido.assistance/menosAsistido.capacity)*100)
    let masCapacidad = getMostCapacity(pastEvents);
    tableEventStatisticsHTML +=`
        <tr>
        <td>${porcentajeMasAsistido}% (${masAsistido.name})</td>
        <td>${porcentajeMenosAsistido}% (${menosAsistido.name})</td>
        <td>${masCapacidad.capacity} (${masCapacidad.name})</td>
        </tr>
        `

    categorias.forEach(category=>{
        let filtradosEventos = extractEventByCategory(category,events);

        let upcomingEvents = extractUpcomingEvents(filtradosEventos);
        let gananciaUpcomingEvents = getRevenue(upcomingEvents)
        let porcentajeAsistenciaUpcomingEvents = getPercentageAssistance(upcomingEvents);

        let pastEvents = extractPastEvents(filtradosEventos);
        let gananciaPastEvents = getRevenue(pastEvents);
        let porcentajeAsistenciaPastEvents= getPercentageAssistance(pastEvents);
        
        tableUpcomingEventsHTML +=`<tr>
        <td>${category}</td>
        <td>$${gananciaUpcomingEvents}</td>
        <td>${porcentajeAsistenciaUpcomingEvents}%</td>
        </tr>
        `

        tablePastEventsHTML +=`<tr>
        <td>${category}</td>
        <td>$${gananciaPastEvents}</td>
        <td>${porcentajeAsistenciaPastEvents}%</td>
        </tr>
        `
    })    
    container.innerHTML = firstTableHTML += tableEventStatisticsHTML+=secondTableHTML +=tableUpcomingEventsHTML += thirdTableHTML += tablePastEventsHTML

}
function extractUpcomingEvents(events){
    return events.filter(evento=>evento.date>currentDate);

}
function extractPastEvents(events){
    return events.filter(evento=>evento.date<currentDate);
}

function extractCategories(arrayEventos){
    let categoriasRepetidas = arrayEventos.map(eventos => eventos.category); 
    categories = new Set(categoriasRepetidas)
}

function extractEventByCategory(category,events){
return events.filter(evento=>evento.category.includes(category));
}

function getPercentageAssistance(eventos){
    let sumAssistance = 0;
    eventos.forEach(evento=>sumAssistance += ((evento.assistance||evento.estimate)/evento.capacity)*100 )
    return Math.round(sumAssistance/eventos.length)
}

function getRevenue(eventos){
    let sumRevenue = 0;
    eventos.forEach(evento=>sumRevenue +=((evento.price)*(evento.assistance||evento.estimate)))
    return Math.round(sumRevenue)
}

function getMostAssisted(events){
    return events.reduce((acumulador,valorActual)=>{
        if (valorActual.assistance>acumulador.assistance){
            return valorActual;
        } else {
            return acumulador;
        }
    })
}
function getLessAssisted(events){
    return events.reduce((acumulador,valorActual)=>{
        if (valorActual.assistance<acumulador.assistance){
            return valorActual;
        } else{
            return acumulador;
        }
    })
}
function getMostCapacity(events){
    return events.reduce((acumulador,valorActual)=>{
        if (valorActual.capacity>acumulador.capacity){
            return valorActual;
        } else {
            return acumulador;
        }
    })

}
async function getEvents () {
    try {
        let response = await fetch(urlAPI);
        let dataAPI = await response.json();
        events = dataAPI.events;
        currentDate = dataAPI.currentDate;
        categories = extractCategories(events);
        extractCategories(events);
        loadStats(categories);

} catch (error){
        console.log(error.message);
    }
}
