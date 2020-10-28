<template>
  <div>
     <h2>Iniciar sesión</h2>
        <form @submit="login">
            <div>
                <label for="username">Nombre de usuario</label>
                <input type="text" v-model="username" placeholder="Nombre de usuario" required>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" placeholder="Password" required>
            </div>
            <div class="form-group">
                <p v-if="error">Has introducido mal el nombre de usuario o la contraseña.</p>
                <button type="submit" >Iniciar sesión</button>
            </div>
        </form>
        <div>{{ info }}</div>
        <div>{{ status }}</div>
  </div>
</template>

<script>
import axios from 'axios';

const url = 'https://localhost/3000/'; 
export default {
  data: () => ({
    username: "",
    password: "",
    rol: "",
    error: false,
    info: null,
    status: null
  }),
  methods: {
    login(){
        axios.post('http://localhost:3000/login', {username: this.username, password: this.password})
        .then(response => {
          this.info = response.data;
          this.status= response.data.status;
          if(this.status == 200){
          this.$router.push('/home');
        }
        else {
          this.error = true;
        }
      })
    }
  }
}
</script>

<style>

</style>
