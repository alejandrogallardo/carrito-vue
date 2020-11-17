import { createStore } from 'vuex'

export default createStore({
  state: {
    productos: [],
    carrito: {}
  },
  mutations: { // Las mutaciones solo modifican el state
    setProductos(state, payload){ // payload es lo que vamos a recivir
      state.productos = payload
      // console.log(state.productos);
    },
    setCarrito(state, payload){
      state.carrito[payload.id] = payload
      // console.log(state.carrito);
    },
    vaciarCarrito(state){
      state.carrito = {}
    },
    aumentar(state, payload){
      state.carrito[payload].cantidad = state.carrito[payload].cantidad + 1;
    },
    disminuir(state, payload){
      state.carrito[payload].cantidad = state.carrito[payload].cantidad - 1;
      if( state.carrito[payload].cantidad === 0 ){
        delete state.carrito[payload]
      }
    }
  },
  actions: { // hace llamado a servirdor o si se necesita mayou logica
    async fetchData({commit}){
      try {
        const res = await fetch('productos.json');
        const data = await res.json();
        commit('setProductos', data)
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    agregarAlCarro({commit, state}, producto){
      state.carrito.hasOwnProperty(producto.id) ? producto.cantidad = state.carrito[producto.id].cantidad + 1 : producto.cantidad = 1
      commit('setCarrito', producto) // este commit modifica el state
    }
  },
  getters: {
    totalCantidad(state){
      return Object.values(state.carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    },
    totalPrecio(state){
      return Object.values(state.carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    }
  },
  modules: {
  }
})
