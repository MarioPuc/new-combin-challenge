<template>
    <div>
        <v-card class="px-16 py-10 loginCard">
            <h1 class="text-center">Login</h1>

            <v-row class="justify-center" >
                <div class="text-center">
                    <v-text-field
                        label="User"
                        v-model="loginObj.username"
                    ></v-text-field>

                    <v-text-field
                        label="Password"
                        v-model="loginObj.password"
                    ></v-text-field>

                    <div class="errorMessage py-2 px-6">{{ errorMessage }}</div>
                    <v-btn v-on:click="loginCall">Iniciar sesión</v-btn>
                </div>
            </v-row>
        </v-card>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'LoginForm',

  data: () => ({
    loginObj: {
      password: '',
      username: ''
    }
  }),
  computed: {
    ...mapState(['errorMessage'])
  },

  watch: {
    errorMessage () {
      if (this.errorMessage === 'The token has expired') {
        console.log('si expiró')
      }
    }
  },

  methods: {
    ...mapActions(['login']),

    loginCall () {
      this.login(this.loginObj)
    }
  }
}
</script>
