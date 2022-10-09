<template>
    <div>
      <v-card class="px-2 py-8">
        <h1 class="text-center">Clients Board</h1>
        <v-data-table
          :headers="headers"
          :items="clients"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-card>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'ClientsTable',

  created () {
    this.initialize()
  },

  mounted: function () {
    this.timer = setInterval(() => {
      this.getClients()
    }, 120000)
  },

  data: () => ({
    headers: [
      { text: 'First Name', value: 'firstName' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Address', value: 'address' },
      { text: 'SSN', value: 'ssn' }
    ],
    items: []
  }),

  beforeDestroy () {
    clearInterval(this.timer)
  },

  computed: {
    ...mapState(['clients'])
  },

  methods: {
    ...mapActions(['getClients']),
    initialize () {
      this.getClients()
    }
  }
}
</script>
