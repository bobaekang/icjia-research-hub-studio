<template>
  <RHBaseToolbar :menu="isLoggedIn">
    <template v-slot:titleExtra>
      <span class="light"> Studio</span>
    </template>

    <template v-slot:toolbarItems v-if="isLoggedIn">
      <v-btn v-for="(view, i) in views" :key="i" :to="`/${view.path}`" flat>
        <v-icon v-if="/post/.test(view.name)" color="error">warning</v-icon>
        <template>{{ view.name }}</template>
      </v-btn>

      <v-btn color="primary" flat @click="logout">log out</v-btn>
    </template>

    <template v-slot:toolbarDrawerItems v-if="isLoggedIn">
      <v-list-tile v-for="(view, i) in views" :key="i" :to="`/${view.path}`">
        <v-icon v-if="/post/.test(view.name)" color="error">warning</v-icon>
        <v-list-tile-title>{{ view.name }}</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="logout">
        <v-list-tile-title>log out</v-list-tile-title>
      </v-list-tile>
    </template>
  </RHBaseToolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', {
      isLoggedIn: 'isLoggedIn'
    }),
    views() {
      let views = [{ name: 'home', path: '' }]

      switch (this.$store.state.auth.role) {
        case 'Administrator':
          views.push(
            { name: 'create', path: 'create' },
            { name: 'update', path: 'update' },
            { name: 'manage', path: 'manage' },
            { name: 'post new', path: 'post-new' },
            { name: 'post up', path: 'post-update' }
          )
          break
        case 'R&A User':
          views.push(
            { name: 'create', path: 'create' },
            { name: 'update', path: 'update' },
            { name: 'manage', path: 'manage' }
          )
          break
        case 'R&A Manager':
          views.push({ name: 'manage', path: 'manage' })
          break
      }

      return views
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
