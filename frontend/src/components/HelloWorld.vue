<template>
<div id="app">
<div class="container">
<h1>Lista de Datos</h1>
<table class="table table-striped">
<thead>
  <th scope="col">#ID</th>
  <th scope="col">Descripcion</th>
</thead>
<tbody>
  <tr v-for ="(cancha, index) in items" :key="index">
          <td>{{cancha.id }}</td>
          <td>{{cancha.descripcion}}</td>
  </tr>
</tbody>
</table>
</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  created(){
     axios.get('http://localhost:80/canchas').then(response => this.items = response.data.canchas)
  },
  data() {
      return {
        items: []
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
