<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(false)
const form = reactive({ email: 'student@example.com', password: '123456' })
const error = ref('')
function login() {
  loading.value = true
  error.value = ''
  setTimeout(() => {
    if (form.email.trim() && form.password === '123456') {
      localStorage.setItem('studenthub-auth', 'true')
      router.push('/dashboard')
    } else error.value = 'Enter an email and the demo password 123456.'
    loading.value = false
  }, 350)
}
</script>

<template>
  <div class="login-page">
    <a-card class="login-card">
      <div class="login-brand">StudentHub</div>
      <a-typography-paragraph class="muted" style="text-align:center">Sign in to your student account</a-typography-paragraph>
      <a-alert v-if="error" type="error" :message="error" show-icon style="margin-bottom:16px" />
      <a-form :model="form" layout="vertical" @finish="login">
        <a-form-item label="Email">
          <a-input v-model:value="form.email" size="large" placeholder="student@example.com" />
        </a-form-item>
        <a-form-item label="Password">
          <a-input-password v-model:value="form.password" size="large" placeholder="Password" />
        </a-form-item>
        <a-button
  type="primary"
  block
  size="large"
  :loading="loading"
  @click="login"
>
  Sign in
</a-button>
      </a-form>
      <a-divider />
      <a-typography-text type="secondary">Demo password: <b>123456</b></a-typography-text>
    </a-card>
  </div>
</template>
