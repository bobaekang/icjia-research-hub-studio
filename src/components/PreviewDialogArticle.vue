<template>
  <v-container>
    <ArticleItemView v-if="view" :item="item" />

    <v-layout v-else justify-center>
      <v-flex xs12 sm10 xl8>
        <ArticleItem :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticleItem from '@/components/research-hub/ArticleItem'
import ArticleItemView from '@/components/research-hub/ArticleItemView'

export default {
  components: {
    ArticleItem,
    ArticleItemView
  },
  props: {
    item: Object,
    view: Boolean
  }
}
</script>
