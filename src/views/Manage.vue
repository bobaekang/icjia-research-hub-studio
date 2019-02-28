<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <h1>Manage submissions</h1>
        <p class="py-2">
          Review and publish submissions
        </p>

        <the-item-table type="manage"></the-item-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TheItemTable from '@/components/TheItemTable'

export default {
  components: {
    TheItemTable
  }
}
</script>

<style>
</style>v