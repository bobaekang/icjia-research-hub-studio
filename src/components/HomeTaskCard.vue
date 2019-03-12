<template>
  <v-container>
    <router-link :to="`/${task.path}`">
      <v-card class="task-card font-lato uppercase" hover height="150">
        <v-container align-center justify-center fill-height class="">
          {{ task.title }}
        </v-container>
      </v-card>
    </router-link>
  </v-container>
</template>

<script>
export default {
  props: {
    task: Object
  }
}
</script>

<style scoped>
.task-card {
  font-size: 1.2em;
}

.task-card:hover {
  font-weight: 600;
}
</style>
