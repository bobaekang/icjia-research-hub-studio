<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <h1>Update an item</h1>
        <p class="py-2">
          Make updates to a published item.
        </p>

        <update-stepper type="post"></update-stepper>
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