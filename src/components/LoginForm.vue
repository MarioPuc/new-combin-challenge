<template>
    <div>
        <v-card class="px-16 py-10">
            <h1 class="text-center">Iniciar sesión</h1>

            <v-row class="justify-center" >
                <div class="text-center">
                    <v-text-field
                        label="Usuario"
                        :v-model="loginObj.user"
                    ></v-text-field>

                    <v-text-field
                        label="Contraseña"
                        :v-model="loginObj.password"
                    ></v-text-field>

                    <v-btn>Iniciar sesión</v-btn>
                </div>
            </v-row>
        </v-card>
    </div>
</template>

<script>

export default {
  name: 'LoginForm',

  data: () => ({
    loginObj: {
      password: '',
      user: ''
    }
  })
}
</script>
