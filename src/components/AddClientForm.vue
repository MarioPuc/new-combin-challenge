<template>
    <div>
      <v-card class="px-10 py-8">
        <h1 class="text-center">Add Client</h1>
        <v-form ref="form">
          <v-row >
            <v-col cols="12">
              <v-text-field
                label="Firstname"
                v-model="objClient.firstName"
                :rules="nameRules"
                @change="resetValidation"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field
                  label="Lastname"
                  v-model="objClient.lastName"
                  :rules="lastNameRules"
                  @change="resetValidation"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Address"
                v-model="objClient.address"
                :rules="addressRules"
                @change="resetValidation"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                 label="SNN"
                 v-model="objClient.ssn"
                 :rules="[ ssnRules ]"
                 @change="resetValidation"
                 ></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions class="justify-space-between py-4">
            <v-btn v-on:click="resetData"> Reset </v-btn>
            <v-btn
              v-on:click="dataValidation"
              :disabled="!isValid"
            > Save </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddItemForm',

  data: () => ({
    addressRules: [
      v => !!v || 'The address is required'
    ],
    isValid: true,
    lastNameRules: [
      v => !!v || 'The last name is required'
    ],
    nameRules: [
      v => !!v || 'The first name is required'
    ],
    objClient: {
      firstName: '',
      lastName: '',
      address: '',
      ssn: ''
    }
  }),

  computed: {
    ...mapState(['errorMessage', 'clients'])
  },

  methods: {
    ...mapActions(['addClient']),
    addClientCall () {
      this.addClient(this.objClient)
    },
    dataValidation () {
      this.isValid = this.$refs.form.validate()
      if (this.isValid) {
        this.addClientCall()
      }
    },
    resetData () {
      this.objClient = {
        firstName: '',
        lastName: '',
        address: '',
        ssn: ''
      }
    },
    resetValidation () {
      if (this.objClient.firstName && this.objClient.lastName && this.objClient.address && this.objClient.ssn) {
        const validState = this.$refs.form.validate()
        console.log(validState)
        if (validState) {
          this.isValid = true
        }
      }
    },
    ssnRules (value) {
      const match = this.clients.filter(client => client.ssn === value)
      const regex = /^\d{3}-\d{2}-\d{4}$/
      if (value.length === 0) {
        return 'The SSN is required'
      } else if (regex.test(value) === false) {
        return 'The SSN is not valid, keep this format: 000-00-0000'
      } else if (match.length > 0) {
        return 'The SSN must be unique'
      } else {
        return true
      }
    }
  }
}
</script>
