<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { TeamOutlined, FileTextOutlined, BookOutlined } from '@ant-design/icons-vue'
const store = useStore()
const router = useRouter()
const students = computed(() => store.state.students)
const assignments = computed(() => store.state.assignments)
const loading = computed(() => store.state.studentsLoading || store.state.assignmentsLoading)
const error = computed(() => store.state.error)
async function load() {
  try { await Promise.all([store.dispatch('fetchStudents'), store.dispatch('fetchAssignments')]) } catch {}
}
onMounted(load)
</script>

<template>
  <div>
    <a-typography-title :level="2" class="page-title">Dashboard</a-typography-title>
    <div class="page-subtitle">Welcome back! Here is your academic overview.</div>
    <a-alert v-if="error" type="error" show-icon :message="error" description="Please check your internet connection and try again." style="margin-bottom:18px">
      <template #action><a-button size="small" @click="load">Retry</a-button></template>
    </a-alert>
    <a-spin :spinning="loading" tip="Loading dashboard data...">
      <a-row :gutter="[16,16]">
        <a-col :xs="24" :sm="12" :lg="8">
          <a-card class="stat-card"><a-statistic title="Students" :value="students.length"><template #prefix><team-outlined /></template></a-statistic></a-card>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="8">
          <a-card class="stat-card"><a-statistic title="Assignments" :value="assignments.length"><template #prefix><file-text-outlined /></template></a-statistic></a-card>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="8">
          <a-card class="stat-card"><a-statistic title="Courses" :value="4"><template #prefix><book-outlined /></template></a-statistic></a-card>
        </a-col>
      </a-row>
      <a-row :gutter="[16,16]" style="margin-top:16px">
        <a-col :xs="24" :lg="14">
          <a-card class="content-card" title="Recent assignments">
            <a-list :data-source="assignments.slice(0,5)" :locale="{emptyText:'No assignments'}">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta :title="item.title" :description="`Assignment #${item.id}`" />
                  <a-button type="link" @click="router.push(`/assignments/${item.id}`)">View</a-button>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </a-col>
        <a-col :xs="24" :lg="10">
          <a-card class="content-card" title="Quick links">
            <a-space direction="vertical" style="width:100%">
              <a-button block @click="router.push('/students')">View students</a-button>
              <a-button block @click="router.push('/assignments')">Manage assignments</a-button>
              <a-button block @click="router.push('/profile')">Open profile</a-button>
            </a-space>
          </a-card>
        </a-col>
      </a-row>
      <a-alert v-if="!loading && !error" type="success" show-icon message="Dashboard data loaded successfully." style="margin-top:16px" />
    </a-spin>
  </div>
</template>
