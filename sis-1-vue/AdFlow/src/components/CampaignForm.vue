
<template>
  <form class="campaign-form" @submit.prevent="submitCampaign">
    <div class="form-group">
      <label for="name">Campaign name</label>
      <input
        id="name"
        v-model.trim="name"
        type="text"
        placeholder="Enter campaign name"
        required
      />
    </div>

    <div class="form-group">
      <label for="budget">Budget (₸)</label>
      <input
        id="budget"
        v-model.number="budget"
        type="number"
        min="1"
        placeholder="Enter budget"
        required
      />
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <button type="submit">Create campaign</button>
  </form>
</template>

<script>
export default {
  name: 'CampaignForm',

  emits: ['create-campaign'],

  data() {
    return {
      name: '',
      budget: null,
      error: ''
    }
  },

  methods: {
    submitCampaign() {
      if (!this.name || !this.budget || this.budget <= 0) {
        this.error = 'Enter a campaign name and a positive budget.'
        return
      }

      this.$emit('create-campaign', {
        name: this.name,
        budget: this.budget
      })

      this.name = ''
      this.budget = null
      this.error = ''
    }
  }
}
</script>

<style scoped>
.campaign-form {
  display: grid;
  gap: 16px;
  max-width: 500px;
}

.form-group {
  display: grid;
  gap: 8px;
}

input {
  padding: 12px;
  border: 1px solid #dce1eb;
  border-radius: 8px;
  font-size: 14px;
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  background: #635bff;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.error {
  color: #dc2626;
}
</style>
