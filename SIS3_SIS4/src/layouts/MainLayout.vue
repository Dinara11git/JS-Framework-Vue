<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { UserOutlined, DashboardOutlined, ReadOutlined, FileTextOutlined, LogoutOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const selectedKey = computed(() => {
  if (route.path.startsWith('/assignments')) return '/assignments'
  return route.path
})
function logout() {
  localStorage.removeItem('studenthub-auth')
  router.push('/login')
}
</script>

<template>
  <a-layout class="app-shell">
    <a-layout-header class="app-header">
      <div class="brand">Student<span>Hub</span></div>
      <div class="header-right">
        <a-tag color="blue">Student Portal</a-tag>
        <a-avatar style="background:#4778d9">S</a-avatar>
        <a-button type="text" @click="logout"><logout-outlined /> Logout</a-button>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="app-sider" width="220" breakpoint="lg" collapsed-width="0">
        <a-menu class="app-menu" mode="inline" :selected-keys="[selectedKey]">
          <a-menu-item key="/dashboard" @click="router.push('/dashboard')"><dashboard-outlined /> Dashboard</a-menu-item>
          <a-menu-item key="/students" @click="router.push('/students')"><user-outlined /> Students</a-menu-item>
          <a-menu-item key="/assignments" @click="router.push('/assignments')"><file-text-outlined /> Assignments</a-menu-item>
          <a-menu-item key="/profile" @click="router.push('/profile')"><read-outlined /> Profile</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="app-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
