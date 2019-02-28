<template>
  <v-dialog v-model="dialog" width="500">
    <v-btn outline slot="activator" color="primary">
      Submit
    </v-btn>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        <h3>Ready to submit?</h3>
      </v-card-title>

      <v-card-text>
        Make sure to preview the content before submitting it!
        <br />
        You will be able to update your submission later.
        <br />
        Your submission will be published once a manager approves it.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog = false">
          Back
        </v-btn>

        <v-btn color="primary" flat @click="dialog = false">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  }
}
</script>