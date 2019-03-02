<template>
  <v-dialog v-model="dialog" width="500">
    <v-btn outline slot="activator" :color="buttonType">
      {{ buttonName }}
    </v-btn>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        <slot name="title"></slot>
      </v-card-title>

      <v-card-text>
        <slot name="main"></slot>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog = false">
          back
        </v-btn>

        <v-btn :color="buttonType" flat @click="dialog = false">
          {{ buttonName }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    buttonName: String,
    buttonType: String
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style>
</style>
