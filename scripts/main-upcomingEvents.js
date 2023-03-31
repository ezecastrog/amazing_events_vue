const { createApp } = Vue

const app = createApp({
  data(){
    return {
      urlAPI:'https://mindhub-xj03.onrender.com/api/amazing',
      eventos:[],
      currentDate:'',
      backupEventos:[],
      texto:'',
      categorias:[],
      categoriasSeleccionadas:[],
      eventosFiltrados:[],
    }

  },
  created(){
    this.pedirDatos()
  },
  mounted(){
//   let arrayFiltrado = arrayDatos.filter(arrayDatos => arrayDatos.date>currentDate)

  },
  methods:{
    pedirDatos(){
      fetch(this.urlAPI)
      .then(response =>response.json())
      .then(datosAPI =>{
        this.eventos = datosAPI.events 
        this.currentDate = datosAPI.currentDate
        this.eventos = this.eventos.filter(events=>events.date>this.currentDate)
        this.backupEventos = this.eventos
        this.extraerCategorias(datosAPI.events)
      })
    },
    extraerCategorias(array){
      array.forEach(elemento=>{
        if(!this.categorias.includes(elemento.category)){
          this.categorias.push(elemento.category)
        }
      })

    }

  },
  computed:{
    filtroDoble(){
      let primerFiltro = this.backupEventos.filter(
        evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
        if(!this.categoriasSeleccionadas.length){
          this.eventos = primerFiltro
        }else{
          this.eventos = primerFiltro.filter(evento=> this.categoriasSeleccionadas.includes(evento.category))
        }
    }
  }
}).mount('#app')