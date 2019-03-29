<template>
  <div>
    <v-toolbar id="toolbar" :height="hpixel" fixed scroll-off-screen>
      <a class="hidden-xs-only" :href="logo.href" target="_blank">
        <img :src="logo.url" :height="logoHpixel" alt="logo" />
      </a>

      <router-link to="/">
        <v-toolbar-title>
          <template>{{ titleUpper }}</template>
          <span class="thin"> Studio</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <template v-if="isLoggedIn">
          <v-btn v-for="(view, i) in views" :key="i" :to="`/${view.path}`" flat>
            <template>{{ view.name }}</template>
          </v-btn>

          <v-btn color="primary" flat @click="logout">log out</v-btn>
        </template>
      </v-toolbar-items>

      <v-menu v-if="isLoggedIn" offset-y class="hidden-md-and-up">
        <v-btn slot="activator" flat>
          <v-icon>menu</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile
            v-for="(view, i) in views"
            :key="i"
            :to="`/${view.path}`"
          >
            <v-list-tile-title class="slot">{{ view.name }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title class="slot" @click="logout">
              <template>{{ 'log out' }}</template>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <div :style="{ height: hpixel, backgroundColor: '#466c8c' }"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      height: 75,
      title: 'Research Hub',
      logo: {
        url:
          'http://www.icjia.state.il.us/_themes/icjia/img/logo-icjia-small-blue-3.png',
        href: 'http://www.icjia.state.il.us'
      }
    }
  },
  computed: {
    ...mapState('auth', {
      isLoggedIn: 'isLoggedIn'
    }),
    titleUpper() {
      return this.title.toUpperCase()
    },
    hpixel() {
      return `${this.height}px`
    },
    logoHpixel() {
      return `${this.height * 0.85}px`
    },
    views() {
      let views = [{ name: 'home', path: '/' }]

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
    login() {
      this.$router.push('/login')
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}

img {
  margin-right: 10px;
}

#toolbar {
  font-family: 'Lato';
  box-shadow: 0 2px rgba(0, 0, 0, 0.2);
}

.slot {
  font-family: 'Lato';
  font-size: 0.8em;
  text-transform: uppercase;
  text-align: center;
}

.thin {
  font-weight: 300;
}
</style>
