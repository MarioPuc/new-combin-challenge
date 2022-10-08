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

import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'LoginView',

  components: {
    LoginForm
  },

  data: () => ({
    //
  })
}
</script>
