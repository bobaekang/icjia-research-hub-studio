<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    v-model="menu"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="date"
      label="Date"
      append-icon="event"
      readonly
    />

    <v-date-picker v-model="date" no-title scrollable @input="menu = false" />
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      date: new Date().toISOString().substr(0, 10)
    }
  }
}
</script>

