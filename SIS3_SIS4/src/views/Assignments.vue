<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const assignments = computed(() => store.state.assignments)
const loading = computed(() => store.state.assignmentsLoading)
const error = computed(() => store.state.error)
const modalOpen = ref(false)
const saving = ref(false)
const editingId = ref(null)
const form = reactive({ title: '', body: '' })
const columns = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Description', dataIndex: 'body', key: 'body', ellipsis: true },
  { title: 'User ID', dataIndex: 'userId', key: 'userId', width: 90 },
  { title: 'Actions', key: 'actions', width: 190 },
]
function openCreate() { editingId.value = null; form.title = ''; form.body = ''; modalOpen.value = true }
function openEdit(item) { editingId.value = item.id; form.title = item.title; form.body = item.body; modalOpen.value = true }
async function submit() {
  if (!form.title.trim() || !form.body.trim()) return
  saving.value = true
  try {
    if (editingId.value) await store.dispatch('editAssignment', { id: editingId.value, payload: { title: form.title, body: form.body, userId: 1 } })
    else await store.dispatch('addAssignment', { title: form.title, body: form.body, userId: 1 })
    modalOpen.value = false
  } catch { /* API error is shown through the message below */ }
  finally { saving.value = false }
}
async function remove(id) {
  try { await store.dispatch('removeAssignment', id) } catch {}
}
async function load() { try { await store.dispatch('fetchAssignments') } catch {} }
onMounted(() => { if (!assignments.value.length) load() })
</script>

<template>
  <div>
    <a-typography-title :level="2" class="page-title">Assignments</a-typography-title>
    <div class="page-subtitle">Create, view, update and delete assignment records using Axios.</div>
    <a-card class="content-card">
      <div class="page-toolbar">
        <a-typography-text type="secondary">{{ assignments.length }} assignments</a-typography-text>
        <a-space>
          <a-button @click="load" :loading="loading">Refresh</a-button>
          <a-button type="primary" @click="openCreate">+ Add assignment</a-button>
        </a-space>
      </div>
      <a-alert v-if="error" type="error" :message="error" show-icon style="margin-bottom:16px">
        <template #action><a-button size="small" @click="load">Retry</a-button></template>
      </a-alert>
      <a-spin :spinning="loading">
        <a-table :columns="columns" :data-source="assignments" :row-key="record => record.id" :pagination="{ pageSize: 7 }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'actions'">
              <a-space>
                <a-button type="link" size="small" @click="router.push(`/assignments/${record.id}`)">View</a-button>
                <a-button type="link" size="small" @click="openEdit(record)">Edit</a-button>
                <a-popconfirm title="Delete this assignment?" @confirm="remove(record.id)">
                  <a-button type="link" danger size="small">Delete</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </a-table>
      </a-spin>
    </a-card>
    <a-modal v-model:open="modalOpen" :title="editingId ? 'Edit assignment' : 'New assignment'" @ok="submit" :confirm-loading="saving">
      <a-form layout="vertical">
        <a-form-item label="Title" required><a-input v-model:value="form.title" placeholder="Assignment title" /></a-form-item>
        <a-form-item label="Description" required><a-textarea v-model:value="form.body" :rows="4" placeholder="Assignment description" /></a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
