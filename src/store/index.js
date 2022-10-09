import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    clients: [],
    errorMessage: ''
  },
  getters: {
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
    addClient ({ commit }, obj) {
      const token = localStorage.getItem('token-x')
      fetch('http://localhost:8081/api/members ', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
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
      console.log('form get clients')
      const token = localStorage.getItem('token-x')
      if (token === null || token === undefined || typeof token !== 'string') {
        return 'La sesión ha expirado, por favor inicie sesión'
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
    login ({ commit }, obj) {
      fetch('http://localhost:8081/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
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
          commit('setError', 'Server error, please try later')
          console.log('error: ' + err)
        })
    }
  },
  modules: {
  }
})
