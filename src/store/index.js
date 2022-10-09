import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    clients: [],
    errorMessage: ''
  },
  mutations: {
    setClients (state, payload) {
      state.clients = payload
    },
    setError (state, payload) {
      state.errorMessage = payload
    },
    setLoggedStatus (state, payload) {
      state.isLogged = payload
    },
    setNewClient (state, payload) {
      state.clients.push(payload)
    }
  },
  actions: {
    addClient ({ commit }, objClient) {
      const token = localStorage.getItem('token-x')
      fetch('http://localhost:8081/api/members ', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objClient)
      })
        .then(async (response) => {
          const res = await response.json()
          if (res.message === 'The token has expired') {
            commit('setError', res.message)
          } else if (res.message === 'Duplicate SSN') {
            commit('setError', res.message)
          } else {
            commit('setNewClient', res)
          }
        })
    },
    getClients ({ commit }) {
      const token = localStorage.getItem('token-x')
      if (token === null || token === undefined || typeof token !== 'string') {
        return 'Token not found'
      }

      fetch('http://localhost:8081/api/members ', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(async (response) => {
          const res = await response.json()
          if (res?.message === 'The token has expired') {
            commit('setError', res.message)
          } else {
            commit('setClients', res)
            commit('setLoggedStatus', true)
          }
        })
    },
    login ({ commit }, objUser) {
      fetch('http://localhost:8081/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objUser)
      })
        .then(async (response) => {
          const res = await response.json()
          if (res.message === 'Invalid Credentials') {
            commit('setError', res.message)
          } else {
            localStorage.setItem('token-x', res.token)
            commit('setError', '')
            commit('setLoggedStatus', true)
          }
        })
        .catch(err => {
          commit('setError', `Server error: ${err}, please try later`)
        })
    }
  }
})
