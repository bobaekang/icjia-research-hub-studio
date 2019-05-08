<template>
  <v-container>
    <RHArticleView v-if="view" :item="item" :key="1" />

    <v-layout v-else justify-center>
      <v-flex xs12 sm10 xl8>
        <RHArticleCard :item="item" :key="2" />
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
