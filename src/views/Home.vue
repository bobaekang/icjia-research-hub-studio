<template>
  <v-container>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12 sm10 md8>
        <h1 class="text-xs-center">Choose your task</h1>

        <v-layout row wrap justify-center>
          <template v-for="(task, i) in tasks">
            <v-flex :key="i" v-if="checkPermission(task)" xs12 sm6 md4>
              <home-task-card :task="task"></home-task-card>
            </v-flex>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HomeTaskCard from '@/components/HomeTaskCard'

export default {
  components: {
    HomeTaskCard
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    }
  },
  methods: {
    checkPermission(card) {
      const role = this.$store.getters.role
      if (role === 'Administrator') {
        return true
      } else {
        if (card.permission) {
          return card.permission === role
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style>
</style>