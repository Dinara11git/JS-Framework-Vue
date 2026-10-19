
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
})

export default {
  async getCampaigns() {
    const response = await api.get('/posts?_limit=4')
    return response.data
  },

  async createCampaign(campaign) {
    const response = await api.post('/posts', {
      title: campaign.name,
      body: `Budget: ${campaign.budget}`,
      userId: 1
    })

    return response.data
  },

  async getClients() {
    const response = await api.get('/users?_limit=5')
    return response.data
  },

  async createClient(client) {
    const response = await api.post('/users', client)
    return response.data
  }
}
