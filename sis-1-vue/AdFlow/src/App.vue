
<template>
  <div :class="isLoginPage ? 'login-layout' : 'app-layout'">
    <AppSidebar v-if="!isLoginPage" />

    <main :class="isLoginPage ? 'login-content' : 'main-content'">
      <RouterView />
    </main>
  </div>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue'

export default {
  components: {
    AppSidebar
  },

  computed: {
    isLoginPage() {
      return this.$route.path === '/login'
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f7fb;
  color: #172033;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 36px;
  min-width: 0;
}

.login-layout {
  min-height: 100vh;
}

.login-content {
  min-height: 100vh;
  width: 100%;
}
</style>
