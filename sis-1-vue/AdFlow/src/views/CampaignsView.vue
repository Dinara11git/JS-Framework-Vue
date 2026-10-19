
<template>
  <section class="campaigns-page">
    <!-- Page header -->
    <div class="page-header">
      <div>
        <p class="eyebrow">ADVERTISING</p>
        <h1>Campaigns</h1>
        <p class="subtitle">
          Manage and track your advertising campaigns.
        </p>
      </div>

      <button
        class="add-button"
        @click="showForm = !showForm"
      >
        {{ showForm ? 'Cancel' : '+ New campaign' }}
      </button>
    </div>

    <!-- Loading state -->
    <p v-if="loading" class="message">
      Loading campaigns...
    </p>

    <!-- Error state -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button class="retry-button" @click="loadCampaigns">
        Retry
      </button>
    </div>

    <!-- Reusable campaign form -->
    <div v-if="showForm" class="form-card">
      <h3>Create a campaign</h3>

      <CampaignForm @create-campaign="addCampaign" />

      <p v-if="formError" class="form-error">
        {{ formError }}
      </p>
    </div>

    <!-- Search and filter -->
    <div class="filters">
      <input
        v-model="search"
        type="text"
        placeholder="Search campaigns..."
        aria-label="Search campaigns"
      />

      <select
        v-model="selectedStatus"
        aria-label="Filter by status"
      >
        <option value="All">All statuses</option>
        <option value="Active">Active</option>
        <option value="Paused">Paused</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    <p v-if="searchStatus" class="search-status">
  {{ searchStatus }}
</p>

    <!-- Campaign table -->
    <div v-if="!loading" class="table-card">
      <table>
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Budget</th>
            <th>Spent</th>
            <th>Leads</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="campaign in filteredCampaigns"
            :key="campaign.id"
          >
            <td class="campaign-name">
              {{ campaign.name }}
            </td>

            <td>{{ Number(campaign.budget).toLocaleString() }} ₸</td>
            <td>{{ Number(campaign.spent || 0).toLocaleString() }} ₸</td>
            <td>{{ campaign.leads || 0 }}</td>

            <td>
              <span
                class="status"
                :class="campaign.status.toLowerCase()"
              >
                {{ campaign.status }}
              </span>
            </td>

            <td>
              <RouterLink :to="'/campaigns/' + campaign.id">
                View →
              </RouterLink>
            </td>
          </tr>

          <tr v-if="filteredCampaigns.length === 0">
            <td colspan="6" class="empty">
              No campaigns found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!loading" class="results">
      Showing {{ filteredCampaigns.length }} campaign(s)
    </p>
  </section>
</template>

<script>
import CampaignForm from '../components/CampaignForm.vue'

export default {
  name: 'CampaignsView',

  components: {
    CampaignForm
  },

  data() {
    return {
      search: '',
      selectedStatus: 'All',
      showForm: false,
      formError: '',
      searchStatus: ''
    }
  },

  computed: {
    campaigns() {
      return this.$store.state.campaigns
    },

    loading() {
      return this.$store.state.loading
    },

    error() {
      return this.$store.state.error
    },

    filteredCampaigns() {
      return this.campaigns.filter(campaign => {
        const matchesSearch = campaign.name
          .toLowerCase()
          .includes(this.search.toLowerCase())

        const matchesStatus =
          this.selectedStatus === 'All' ||
          campaign.status === this.selectedStatus

        return matchesSearch && matchesStatus
      })
    }
  },

  watch: {
  search(newValue) {
    if (newValue.trim()) {
      this.searchStatus = `Searching for: ${newValue.trim()}`
    } else {
      this.searchStatus = ''
    }
  }
},

  methods: {
    loadCampaigns() {
      this.$store.dispatch('fetchCampaigns')
    },

    async addCampaign(campaignData) {
      this.formError = ''

      const name = campaignData.name.trim()
      const budget = Number(campaignData.budget)

      if (!name || !Number.isFinite(budget) || budget <= 0) {
        this.formError = 'Enter a campaign name and a positive budget.'
        return
      }

      const success = await this.$store.dispatch('addCampaign', {
        name,
        budget
      })

      if (success) {
        this.showForm = false
        this.formError = ''
      } else {
        this.formError =
          this.$store.state.error ||
          'Could not create campaign. Please try again.'
      }
    }
  },

  created() {
  console.log('CampaignsView: component created')
},

mounted() {
  console.log('CampaignsView: component mounted')
  this.loadCampaigns()
}
}
</script>

<style scoped>
.campaigns-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-width: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.eyebrow {
  color: #777f95;
  font-size: 12px;
  letter-spacing: 1px;
}

h1 {
  font-size: 32px;
  margin: 10px 0;
}

.subtitle,
.results {
  color: #68738a;
}

.add-button {
  background: #5b61d6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  cursor: pointer;
  font-weight: 600;
}

.add-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-card,
.table-card {
  width: 100%;
  min-width: 0;
  background: white;
  border: 1px solid #e7eaf1;
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;
}

.form-card h3 {
  margin-top: 0;
}

.filters {
  display: flex;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.filters input {
  flex: 1;
  min-width: 180px;
}

input,
select {
  padding: 12px;
  border: 1px solid #dce1eb;
  border-radius: 8px;
  font: inherit;
}

.table-card {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 14px 10px;
  border-bottom: 1px solid #edf0f5;
  white-space: nowrap;
}

th {
  color: #68738a;
  font-size: 13px;
}

.campaign-name {
  font-weight: bold;
  white-space: normal;
  overflow-wrap: anywhere;
  min-width: 160px;
}

.status {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.status.active {
  background: #dcfce7;
  color: #166534;
}

.status.paused {
  background: #fef3c7;
  color: #92400e;
}

.status.completed {
  background: #e5e7eb;
  color: #374151;
}

td a {
  color: #5b61d6;
  text-decoration: none;
}

td a:hover {
  text-decoration: underline;
}

.empty {
  text-align: center;
  color: #68738a;
  padding: 30px;
}

.results {
  font-size: 13px;
}

.message {
  margin-top: 20px;
  color: #5b61d6;
}

.error-message {
  margin-top: 20px;
  padding: 16px;
  background: #fef2f2;
  border-radius: 8px;
  color: #b91c1c;
}

.retry-button {
  padding: 8px 14px;
  border: 1px solid #b91c1c;
  border-radius: 6px;
  background: white;
  color: #b91c1c;
  cursor: pointer;
}

.form-error {
  color: #b91c1c;
  font-size: 14px;
  margin-top: 12px;
}

@media (max-width: 700px) {
  .filters {
    flex-direction: column;
  }

  .filters input,
  .filters select {
    width: 100%;
  }

  .page-header {
    align-items: flex-start;
  }
}

.search-status {
  color: #68738a;
  font-size: 13px;
  margin-top: 10px;
}

</style>
