
<template>
  <section class="details-page">
    <RouterLink to="/campaigns" class="back-link">
      ← Back to campaigns
    </RouterLink>

    <p class="eyebrow">CAMPAIGN DETAILS</p>

    <p v-if="loading" class="message">
      Loading campaign...
    </p>

    <div v-else-if="error" class="error-card">
      <p>{{ error }}</p>
      <button @click="loadCampaigns">Try again</button>
    </div>

    <div v-else-if="!campaign" class="not-found">
      <h1>Campaign not found</h1>
      <p>No campaign exists with ID {{ $route.params.id }}.</p>
      <RouterLink to="/campaigns">Return to campaigns</RouterLink>
    </div>

    <template v-else>
      <div class="page-heading">
        <div>
          <h1>{{ campaign.name }}</h1>
          <p class="subtitle">Campaign ID: {{ campaign.id }}</p>
        </div>

        <span
          class="status"
          :class="{ inactive: campaign.status !== 'Active' }"
        >
          {{ campaign.status }}
        </span>
      </div>

      <div class="details-grid">
        <div class="detail-card">
          <p>Total budget</p>
          <h2>{{ formatMoney(campaign.budget) }}</h2>
        </div>

        <div class="detail-card">
          <p>Total spent</p>
          <h2>{{ formatMoney(campaign.spent) }}</h2>
        </div>

        <div class="detail-card">
          <p>Leads</p>
          <h2>{{ campaign.leads }}</h2>
        </div>

        <div class="detail-card">
          <p>Remaining budget</p>
          <h2>{{ formatMoney(remainingBudget) }}</h2>
        </div>
      </div>

      <div class="info-card">
        <h3>Campaign overview</h3>
        <p><strong>Name:</strong> {{ campaign.name }}</p>
        <p><strong>Status:</strong> {{ campaign.status }}</p>
        <p><strong>Budget:</strong> {{ formatMoney(campaign.budget) }}</p>
        <p><strong>Spent:</strong> {{ formatMoney(campaign.spent) }}</p>
        <p><strong>Leads:</strong> {{ campaign.leads }}</p>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: 'CampaignDetailsView',

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

    campaign() {
      return this.campaigns.find(
        item => String(item.id) === String(this.$route.params.id)
      )
    },

    remainingBudget() {
      if (!this.campaign) return 0

      return Math.max(
        0,
        Number(this.campaign.budget || 0) -
          Number(this.campaign.spent || 0)
      )
    }
  },

  created() {
    this.loadCampaigns()
  },

  methods: {
    async loadCampaigns() {
      if (this.campaigns.length === 0) {
        await this.$store.dispatch('fetchCampaigns')
      }
    },

    formatMoney(value) {
      return `${Number(value || 0).toLocaleString()} ₸`
    }
  }
}
</script>

<style scoped>
.details-page {
  max-width: 1200px;
  margin: 0 auto;
}

.back-link {
  color: #5b61d6;
  text-decoration: none;
  font-weight: bold;
}

.eyebrow {
  margin-top: 30px;
  color: #777f95;
  font-size: 12px;
  letter-spacing: 1px;
}

.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

h1 {
  font-size: 32px;
  margin-bottom: 8px;
}

.subtitle {
  color: #68738a;
}

.status {
  padding: 8px 12px;
  border-radius: 20px;
  background: #dcfce7;
  color: #166534;
  font-size: 13px;
}

.status.inactive {
  background: #f3f4f6;
  color: #4b5563;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.detail-card,
.info-card {
  padding: 24px;
  border: 1px solid #e7eaf1;
  border-radius: 14px;
  background: white;
}

.detail-card p {
  color: #68738a;
  margin-top: 0;
}

.detail-card h2 {
  margin-bottom: 0;
  font-size: 26px;
}

.info-card {
  margin-top: 24px;
}

.info-card p {
  color: #68738a;
}

.message {
  padding: 20px 0;
  color: #68738a;
}

.error-card {
  padding: 20px;
  background: #fff0f0;
  border-radius: 12px;
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

.not-found a {
  color: #5b61d6;
}

@media (max-width: 700px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .page-heading {
    align-items: flex-start;
  }
}
</style>
