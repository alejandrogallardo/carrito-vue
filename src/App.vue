<template>
  <div class="container">
    <h1>Carrito Vue</h1>
    <hr>
    <div class="row">
      <Card
        v-for="producto of productos" :key="producto.id"
        :producto="producto"
      />
    </div>
    
      <CarritoV />
    
  </div>

</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Card from './components/Card'
import CarritoV from './components/CarritoV'
export default {
  name: 'App',
  components: {
   Card,
   CarritoV
  },
  setup(){ // composition API
    const store = useStore();
    onMounted(() => {
      store.dispatch('fetchData');
    });
    // los state se mapean en las propiedades computadas
    const productos = computed(() => store.state.productos);
    // const carrito = computed(() => store.state.carrito)
    return {productos}
  }
}
</script>

