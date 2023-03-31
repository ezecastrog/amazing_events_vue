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
    }

  },
  created(){
    this.pedirDatos()
  },
  mounted(){

  },
  methods:{
    pedirDatos(){
      fetch(this.urlAPI)
      .then(response =>response.json())
      .then(datosAPI =>{
        this.eventos = datosAPI.events
        this.backupEventos = this.eventos
        this.currentDate = datosAPI.currentDate
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