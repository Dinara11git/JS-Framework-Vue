
<template>
  <section class="clients-page">
    <div class="page-header">
      <div>
        <p class="eyebrow">RELATIONSHIPS</p>
        <h1>Clients</h1>
        <p class="subtitle">Manage your marketing clients.</p>
      </div>

      <button class="primary-button" @click="showForm = !showForm">
        {{ showForm ? 'Cancel' : '+ New client' }}
      </button>
    </div>

    <p v-if="loading">Loading clients...</p>

    <div v-if="error" class="error">
      {{ error }}
      <button @click="loadClients">Retry</button>
    </div>

    <div v-if="showForm" class="form-card">
      <h3>Add a client</h3>

      <form @submit.prevent="addClient">
        <label>Client name</label>
        <input v-model.trim="newClient.name" required placeholder="Client name">

        <label>Email</label>
        <input v-model.trim="newClient.email" type="email" required placeholder="Email">

        <label>Company</label>
        <input v-model.trim="newClient.company" placeholder="Company name">

        <button class="primary-button" type="submit" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save client' }}
        </button>
      </form>
    </div>

    <input
      v-model="search"
      class="search"
      placeholder="Search clients by name or email..."
    >

    <div v-if="loading" class="message">
      Loading client list...
    </div>

    <div v-else class="client-grid">
      <article
        v-for="client in filteredClients"
        :key="client.id"
        class="client-card"
      >
        <div class="avatar">
          {{ client.name.charAt(0).toUpperCase() }}
        </div>

        <h3>{{ client.name }}</h3>
        <p>{{ client.email }}</p>
        <p class="company">
          {{ client.company?.name || client.company || 'Independent client' }}
        </p>
      </article>

      <p v-if="filteredClients.length === 0" class="empty">
        No clients found.
      </p>
    </div>

    <p class="results">Showing {{ filteredClients.length }} client(s)</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      showForm: false,
      saving: false,
      newClient: {
        name: '',
        email: '',
        company: ''
      }
    }
  },

  computed: {
    clients() {
      return this.$store.state.clients
    },

    loading() {
      return this.$store.state.clientsLoading
    },

    error() {
      return this.$store.state.clientsError
    },

    filteredClients() {
      const query = this.search.toLowerCase()

      return this.clients.filter(client => {
        const name = (client.name || '').toLowerCase()
        const email = (client.email || '').toLowerCase()

        return name.includes(query) || email.includes(query)
      })
    }
  },

  methods: {
    loadClients() {
      this.$store.dispatch('fetchClients')
    },

    async addClient() {
      this.saving = true

      try {
        const success = await this.$store.dispatch('addClient', {
          name: this.newClient.name,
          email: this.newClient.email,
          company: this.newClient.company
            ? { name: this.newClient.company }
            : { name: 'Independent client' }
        })

        if (success) {
          this.newClient = {
            name: '',
            email: '',
            company: ''
          }
          this.showForm = false
        }
      } finally {
        this.saving = false
      }
    }
  },

  mounted() {
    this.loadClients()
  }
}
</script>

<style scoped>
.clients-page {
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.eyebrow {
  color: #777f95;
  font-size: 12px;
  letter-spacing: 1px;
}

h1 {
  font-size: 32px;
  margin-bottom: 8px;
}

.subtitle,
.results,
.client-card p {
  color: #68738a;
}

.primary-button {
  background: #5b61d6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  cursor: pointer;
}

.primary-button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.form-card,
.client-card {
  background: white;
  border: 1px solid #e7eaf1;
  border-radius: 12px;
  padding: 22px;
}

.form-card {
  margin: 24px 0;
}

.form-card form {
  display: grid;
  gap: 10px;
  max-width: 420px;
}

.form-card input,
.search {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid #dce1eb;
  border-radius: 8px;
  font: inherit;
}

.search {
  margin: 24px 0;
  max-width: 500px;
}

.client-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #e8e9ff;
  color: #5b61d6;
  font-size: 20px;
  font-weight: bold;
}

.client-card h3 {
  overflow-wrap: anywhere;
}

.client-card p {
  overflow-wrap: anywhere;
}

.company {
  font-size: 13px;
}

.error {
  color: #b91c1c;
  margin: 20px 0;
}

.empty,
.message {
  color: #68738a;
}

.results {
  margin-top: 20px;
  font-size: 13px;
}

@media (max-width: 700px) {
  .client-grid {
    grid-template-columns: 1fr;
  }
}
</style>
