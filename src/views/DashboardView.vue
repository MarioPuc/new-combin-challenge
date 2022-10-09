<template>
    <div>
      <NavigationBar />
      <v-container>
        <v-row>
          <v-col cols="6">
            <AddClientForm />
          </v-col>
        <v-col cols="6">
          <ClientsTable />
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>

import { mapState } from 'vuex'

import AddClientForm from '../components/AddClientForm'
import ClientsTable from '../components/ClientsTable'
import NavigationBar from '../components/general/NavigationBar'

export default {
  name: 'DashboardView',

  components: {
    AddClientForm,
    ClientsTable,
    NavigationBar
  },
  data: () => ({
    //
  }),

  computed: {
    ...mapState(['errorMessage', 'isLogged'])
  },

  watch: {
    errorMessage () {
      if (this.errorMessage === 'The token has expired') {
        this.$router.push('/')
        setTimeout(() => {
          this.$router.go()
        }, 3000)
      }
    },
    isLogged () {
      if (this.isLogged === false) {
        this.$router.push('/')
        this.$router.go()
      }
    }
  }
}
</script>
