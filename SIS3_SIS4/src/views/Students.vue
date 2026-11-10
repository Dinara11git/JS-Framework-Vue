<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const students = computed(() => store.state.students)
const loading = computed(() => store.state.studentsLoading)
const error = computed(() => store.state.error)
async function load() { try { await store.dispatch('fetchStudents') } catch {} }
onMounted(() => { if (!students.value.length) load() })
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Username', dataIndex: 'username', key: 'username' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'City', key: 'city', customRender: ({ record }) => record.address?.city || '-' },
  { title: 'Company', key: 'company', customRender: ({ record }) => record.company?.name || '-' },
]
</script>

<template>
  <div>
    <a-typography-title :level="2" class="page-title">Students</a-typography-title>
    <div class="page-subtitle">Student directory loaded from a public REST API.</div>
    <a-card class="content-card">
      <div class="page-toolbar">
        <a-typography-text type="secondary">Total students: {{ students.length }}</a-typography-text>
        <a-button @click="load" :loading="loading">Refresh</a-button>
      </div>
      <a-alert v-if="error" type="error" :message="error" show-icon style="margin-bottom:16px">
        <template #action><a-button size="small" @click="load">Retry</a-button></template>
      </a-alert>
      <a-spin :spinning="loading">
        <a-table :columns="columns" :data-source="students" :row-key="record => record.id" :pagination="{ pageSize: 6 }" />
      </a-spin>
    </a-card>
  </div>
</template>
