<template>
  <div>
    <v-app-bar app color="grey lighten-3"  flat >
        <v-app-bar-nav-icon @click="leftDrawer = !leftDrawer"></v-app-bar-nav-icon>
        <v-row justify="space-between" align="center">
          <v-col cols="4">
            logo-space
          </v-col>
          <v-col cols="8" class="text-right">
            <v-btn icon @click="rightDrawer = !rightDrawer" style="display: inline-block;">
              <v-icon color="orange">mdi-account-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="leftDrawer" fixed temporary>
      <v-list>
        <v-list-item-group color="black">
          <v-list-item v-for="(link, n) in links" :key="`link${n}`" :to="link.to">
            {{ link.name }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="rightDrawer" fixed temporary right>
      <v-list>
        <v-list-item-group color="orange">
          <v-list-item v-for="(option, n) in accountOptions" :key="`option${n}`" :to="option.to">
            {{ option.name }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',

  data: () => ({
    leftDrawer: false,
    rightDrawer: false,
    links: [
      { to: '/dashboard', name: 'Dashboard' },
      { to: '/*', name: 'Other page' }
    ],
    accountOptions: [
      { to: '/*', name: 'Profile' },
      { to: '/*', name: 'Other page' }
    ]
  })
}
</script>
