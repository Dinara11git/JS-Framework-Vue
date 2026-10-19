
<template>
  <aside class="sidebar">
    <h2 class="logo">AdFlow<span>.</span></h2>
    <p class="menu-label">WORKSPACE</p>

    <nav>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/campaigns">Campaigns</RouterLink>
      <RouterLink to="/clients">Clients</RouterLink>
      <RouterLink to="/analytics">Analytics</RouterLink>
    </nav>

    <div class="sidebar-footer">
      <p class="user-email">
        {{ user || 'User' }}
      </p>

      <button class="logout-button" @click="logout">
        <span>↪</span> Logout
      </button>

      <p class="footer">Marketing workspace</p>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',

  computed: {
    user() {
      return this.$store.state.user
    }
  },

  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 230px;
  min-height: 100vh;
  padding: 28px 18px;
  background: #172033;
  color: white;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 26px;
  margin-bottom: 40px;
}

.logo span {
  color: #7c83ff;
}

.menu-label {
  color: #929bb0;
  font-size: 11px;
  letter-spacing: 1.5px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

nav a {
  padding: 12px;
  border-radius: 8px;
  color: #cbd2e1;
  text-decoration: none;
}

nav a:hover,
nav a.router-link-active {
  background: #303c55;
  color: white;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 32px;
}

.user-email {
  color: #cbd2e1;
  font-size: 12px;
  overflow-wrap: anywhere;
  margin-bottom: 12px;
}

.logout-button {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #46516a;
  border-radius: 8px;
  background: transparent;
  color: white;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
}

.logout-button:hover {
  background: #303c55;
}

.logout-button span {
  margin-right: 8px;
}

.footer {
  margin-top: 24px;
  color: #929bb0;
  font-size: 12px;
}
</style>
