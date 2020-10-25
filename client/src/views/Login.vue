<template>
  <div>
     <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input type="text" v-model="email" required placeholder="email">
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" required placeholder="Password" >
            </div>
            <div class="form-group">
                <p v-if="error">Has introducido mal el email o la contraseña.</p>
                <button >Login</button>
            </div>
        </form>
  </div>
</template>

<script>
import auth from "@/services/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    error: false
  }),
  methods: {
    async login() {
      try {
        await auth.login(this.email, this.password);
        this.$router.push("/");
      } catch (error) {
        this.error = true;
      }
    }
  }
}
</script>

<style>

</style>
