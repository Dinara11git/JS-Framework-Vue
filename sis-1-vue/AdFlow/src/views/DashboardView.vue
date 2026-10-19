
<template>
  <section class="dashboard">
    <p class="eyebrow">OVERVIEW</p>
    <h1>Dashboard</h1>
    <p class="subtitle">Welcome to your marketing workspace.</p>

    <p v-if="loading || clientsLoading" class="info-message">
      Loading dashboard data...
    </p>

    <div v-else-if="error || clientsError" class="error-card">
      <p>{{ error || clientsError }}</p>
      <button @click="loadDashboard">Try again</button>
    </div>

    <template v-else>
      <div class="stats-grid">
        <div class="stat-card">
          <p>Total campaigns</p>
          <h2>{{ totalCampaigns }}</h2>
          <span>Advertising projects</span>
        </div>

        <div class="stat-card">
          <p>Total clients</p>
          <h2>{{ totalClients }}</h2>
          <span>Registered clients</span>
        </div>

        <div class="stat-card">
          <p>Total budget</p>
          <h2>{{ totalBudget.toLocaleString() }} ₸</h2>
          <span>Planned advertising budget</span>
        </div>

        <div class="stat-card">
          <p>Total spent</p>
          <h2>{{ totalSpent.toLocaleString() }} ₸</h2>
          <span>Money spent on ads</span>
        </div>

        <div class="stat-card">
          <p>Total leads</p>
          <h2>{{ totalLeads }}</h2>
          <span>Potential customers</span>
        </div>

        <div class="stat-card">
          <p>Active campaigns</p>
          <h2>{{ activeCampaigns }}</h2>
          <span>Currently active</span>
        </div>
      </div>

      <div class="welcome-card">
        <h3>Your campaigns, all in one place.</h3>
        <p>Manage clients, track advertising results and monitor budgets.</p>
        <RouterLink to="/campaigns">View campaigns →</RouterLink>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: 'DashboardView',

  computed: {
    campaigns() {
      return this.$store.state.campaigns
    },

    clients() {
      return this.$store.state.clients
    },

    loading() {
      return this.$store.state.loading
    },

    error() {
      return this.$store.state.error
    },

    clientsLoading() {
      return this.$store.state.clientsLoading
    },

    clientsError() {
      return this.$store.state.clientsError
    },

    totalCampaigns() {
      return this.campaigns.length
    },

    totalClients() {
      return this.clients.length
    },

    totalBudget() {
      return this.campaigns.reduce(
        (sum, campaign) => sum + Number(campaign.budget || 0),
        0
      )
    },

    totalSpent() {
      return this.campaigns.reduce(
        (sum, campaign) => sum + Number(campaign.spent || 0),
        0
      )
    },

    totalLeads() {
      return this.campaigns.reduce(
        (sum, campaign) => sum + Number(campaign.leads || 0),
        0
      )
    },

    activeCampaigns() {
      return this.campaigns.filter(
        campaign => campaign.status === 'Active'
      ).length
    }
  },

  created() {
    this.loadDashboard()
  },

  methods: {
    async loadDashboard() {
      const tasks = []

      if (this.campaigns.length === 0) {
        tasks.push(this.$store.dispatch('fetchCampaigns'))
      }

      if (this.clients.length === 0) {
        tasks.push(this.$store.dispatch('fetchClients'))
      }

      await Promise.all(tasks)
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
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

.subtitle {
  color: #68738a;
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid #e7eaf1;
}

.stat-card p {
  color: #68738a;
  margin: 0 0 12px;
}

.stat-card h2 {
  font-size: 28px;
  margin: 0 0 10px;
}

.stat-card span {
  color: #929bb0;
  font-size: 13px;
}

.welcome-card {
  background: white;
  padding: 28px;
  margin-top: 24px;
  border-radius: 14px;
}

.welcome-card a {
  color: #5b61d6;
  text-decoration: none;
  font-weight: bold;
}

.info-message {
  color: #68738a;
  padding: 20px 0;
}

.error-card {
  padding: 20px;
  border-radius: 12px;
  background: #fff0f0;
  color: #b42318;
}

.error-card button {
  padding: 10px 16px;
  border: none;
  border-radius: 7px;
  background: #5b61d6;
  color: white;
  cursor: pointer;
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
