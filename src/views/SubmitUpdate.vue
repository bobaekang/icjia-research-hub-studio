<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <h1>Submit an update</h1>
        <p class="py-2">
          Submit an update to either a submission or a published item. Select an
          item to update, make changes, and submit the update.
        </p>

        <update-stepper type="submit"></update-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UpdateStepper from '@/components/UpdateStepper'

export default {
  components: {
    UpdateStepper
  }
}
</script>

<style>
</style>