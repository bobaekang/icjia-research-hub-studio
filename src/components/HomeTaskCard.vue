<template>
  <v-container>
    <router-link :to="`/${task.path}`">
      <v-card hover height="150">
        <v-layout
          align-center
          justify-center
          fill-height
          row
          wrap
          class="text-center"
        >
          <v-flex xs12>
            <div class="font-lato task-card uppercase">
              {{ task.title }}
            </div>
            <div v-if="!task.permission" class="admin-only pt-2">
              <v-icon color="error">warning</v-icon>
              Admin only
            </div>
          </v-flex>
        </v-layout>
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

.text-center {
  text-align: center;
}

.admin-only {
  color: grey;
}
</style>
