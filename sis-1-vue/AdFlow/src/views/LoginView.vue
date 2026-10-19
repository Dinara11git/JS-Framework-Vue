
<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="login">
      <h1>AdFlow</h1>
      <p>Sign in to manage your campaigns</p>

      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="admin@adflow.com"
        required
      />

      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter password"
        required
      />

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit">Sign in</button>

      <small>Demo: admin@adflow.com / 123456</small>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  methods: {
    async login() {
      this.error = ''

      const success = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })

      if (success) {
        this.$router.push('/dashboard')
      } else {
        this.error = 'Incorrect email or password.'
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  font-family: Arial, sans-serif;
}

.login-card {
  width: 340px;
  padding: 32px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

h1 {
  color: #4f46e5;
}

label {
  display: block;
  margin-top: 18px;
  margin-bottom: 6px;
}

input {
  box-sizing: border-box;
  width: 100%;
  padding: 11px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
}

button {
  width: 100%;
  margin-top: 22px;
  padding: 12px;
  color: white;
  background: #4f46e5;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}

.error {
  color: #dc2626;
}

small {
  display: block;
  margin-top: 16px;
  color: #6b7280;
}
</style>
