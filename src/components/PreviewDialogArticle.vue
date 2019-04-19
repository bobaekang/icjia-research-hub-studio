<template>
  <v-container>
    <RHArticleView v-if="view" :item="item" />

    <v-layout v-else justify-center>
      <v-flex xs12 sm10 xl8>
        <RHArticleCard :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    item: Object,
    view: Boolean
  }
}
</script>
