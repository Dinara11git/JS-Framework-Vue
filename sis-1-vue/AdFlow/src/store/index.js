
import { createStore } from 'vuex'
import api from '../services/api'

// Safely read saved data from LocalStorage
function readLocalData(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch (error) {
    return []
  }
}

const store = createStore({
  state() {
    return {
      // Authentication
      isAuthenticated:
        localStorage.getItem('adflow-authenticated') === 'true',
      user: localStorage.getItem('adflow-user') || null,

      // Campaigns
      campaigns: [],
      loading: false,
      error: null,

      // Clients
      clients: [],
      clientsLoading: false,
      clientsError: null
    }
  },

  mutations: {
    // Authentication
    SET_AUTH(state, email) {
      state.isAuthenticated = true
      state.user = email
    },

    LOGOUT(state) {
      state.isAuthenticated = false
      state.user = null
    },

    // Campaigns
    SET_CAMPAIGNS(state, campaigns) {
      state.campaigns = campaigns
    },

    ADD_CAMPAIGN(state, campaign) {
      state.campaigns.unshift(campaign)

      const savedCampaigns = readLocalData('adflow-local-campaigns')
      savedCampaigns.unshift(campaign)

      localStorage.setItem(
        'adflow-local-campaigns',
        JSON.stringify(savedCampaigns)
      )
    },

    SET_LOADING(state, value) {
      state.loading = value
    },

    SET_ERROR(state, message) {
      state.error = message
    },

    // Clients
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },

    ADD_CLIENT(state, client) {
      state.clients.unshift(client)

      const savedClients = readLocalData('adflow-local-clients')
      savedClients.unshift(client)

      localStorage.setItem(
        'adflow-local-clients',
        JSON.stringify(savedClients)
      )
    },

    SET_CLIENTS_LOADING(state, value) {
      state.clientsLoading = value
    },

    SET_CLIENTS_ERROR(state, message) {
      state.clientsError = message
    }
  },

  actions: {
    // Login
    login({ commit }, credentials) {
      const validEmail = 'admin@adflow.com'
      const validPassword = '123456'

      if (
        credentials.email.trim() === validEmail &&
        credentials.password === validPassword
      ) {
        localStorage.setItem('adflow-authenticated', 'true')
        localStorage.setItem('adflow-user', validEmail)

        commit('SET_AUTH', validEmail)
        return true
      }

      return false
    },

    // Logout
    logout({ commit }) {
      localStorage.removeItem('adflow-authenticated')
      localStorage.removeItem('adflow-user')

      commit('LOGOUT')
    },

    // Load campaigns from API and LocalStorage
    async fetchCampaigns({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const data = await api.getCampaigns()

        const campaignNames = [
          'Math Course',
          'Beauty Studio',
          'Online Store',
          'Summer Sale'
        ]

        const apiCampaigns = data.map((post, index) => ({
          id: post.id,
          name: campaignNames[index] || `Campaign ${post.id}`,
          budget: 50000 + post.id * 10000,
          spent: 0,
          leads: 0,
          status: 'Active'
        }))

        const localCampaigns = readLocalData('adflow-local-campaigns')

        commit('SET_CAMPAIGNS', [
          ...localCampaigns,
          ...apiCampaigns
        ])
      } catch (error) {
        const localCampaigns = readLocalData('adflow-local-campaigns')

        if (localCampaigns.length > 0) {
          commit('SET_CAMPAIGNS', localCampaigns)
        }

        commit(
          'SET_ERROR',
          'Could not load campaigns from the API. Saved campaigns are still available.'
        )
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Add campaign
    async addCampaign({ commit }, campaignData) {
      commit('SET_ERROR', null)

      try {
        await api.createCampaign(campaignData)

        const campaign = {
          id: Date.now(),
          name: campaignData.name.trim(),
          budget: Number(campaignData.budget),
          spent: 0,
          leads: 0,
          status: 'Active'
        }

        commit('ADD_CAMPAIGN', campaign)
        return true
      } catch (error) {
        commit(
          'SET_ERROR',
          'Could not save the campaign. Please try again.'
        )
        return false
      }
    },

    // Load clients from API and LocalStorage
    async fetchClients({ commit }) {
      commit('SET_CLIENTS_LOADING', true)
      commit('SET_CLIENTS_ERROR', null)

      try {
        const data = await api.getClients()
        const localClients = readLocalData('adflow-local-clients')

        commit('SET_CLIENTS', [
          ...localClients,
          ...data
        ])
      } catch (error) {
        const localClients = readLocalData('adflow-local-clients')

        if (localClients.length > 0) {
          commit('SET_CLIENTS', localClients)
        }

        commit(
          'SET_CLIENTS_ERROR',
          'Could not load clients from the API. Saved clients are still available.'
        )
      } finally {
        commit('SET_CLIENTS_LOADING', false)
      }
    },

    // Add client
    async addClient({ commit }, clientData) {
      commit('SET_CLIENTS_ERROR', null)

      try {
        await api.createClient(clientData)

        const client = {
          ...clientData,
          id: Date.now()
        }

        commit('ADD_CLIENT', client)
        return true
      } catch (error) {
        commit(
          'SET_CLIENTS_ERROR',
          'Could not save client. Please try again.'
        )
        return false
      }
    }
  }
})

export default store
