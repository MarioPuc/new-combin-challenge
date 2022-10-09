<template>
    <div>
        <v-container class="align-content-center d-flex f-height">
            <v-row  align="center" justify="center">
                <LoginForm />
            </v-row>
        </v-container>
    </div>
</template>

<script>

import { mapState } from 'vuex'

import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'LoginView',

  components: {
    LoginForm
  },

  computed: {
    ...mapState(['isLogged'])
  },

  watch: {
    isLogged () {
      if (this.isLogged === true) {
        this.$router.push('/dashboard')
      }
    }
  },

  data: () => ({
    //
  })

}
</script>
