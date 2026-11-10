<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssignment } from '../services/api'
const route = useRoute()
const router = useRouter()
const item = ref(null)
const loading = ref(false)
const error = ref('')
async function load() {
  loading.value = true; error.value = ''; item.value = null
  try {
    const response = await getAssignment(route.params.id)
    item.value = response.data
  } catch (e) { error.value = e.message || 'Could not load assignment' }
  finally { loading.value = false }
}
onMounted(load)
watch(() => route.params.id, load)
</script>

<template>
  <div>
    <a-button type="link" @click="router.push('/assignments')">← Back to assignments</a-button>
    <a-typography-title :level="2" class="page-title" style="margin-top:12px">Assignment details</a-typography-title>
    <div class="page-subtitle">Dynamic route: /assignments/:id</div>
    <a-card class="content-card">
      <a-spin :spinning="loading">
        <a-alert v-if="error" type="error" show-icon :message="error">
          <template #action><a-button size="small" @click="load">Retry</a-button></template>
        </a-alert>
        <a-empty v-else-if="!loading && !item" description="Assignment not found" />
        <template v-else-if="item">
          <a-tag color="blue">ID: {{ item.id }}</a-tag>
          <a-typography-title :level="3">{{ item.title }}</a-typography-title>
          <a-typography-paragraph>{{ item.body }}</a-typography-paragraph>
          <a-descriptions bordered size="small">
            <a-descriptions-item label="User ID">{{ item.userId }}</a-descriptions-item>
            <a-descriptions-item label="Record ID">{{ item.id }}</a-descriptions-item>
          </a-descriptions>
        </template>
      </a-spin>
    </a-card>
  </div>
</template>
