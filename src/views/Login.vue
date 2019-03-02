<template>
  <v-container>
    <v-layout row wrap align-center justify-center fill-height>
      <login-form />
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  components: {
    LoginForm
  }
}
</script>
