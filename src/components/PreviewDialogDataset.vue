<template>
  <v-container>
    <v-layout justify-center>
      <v-flex v-if="view" xs12 sm10 md8>
        <DatasetItemView :item="item" />
      </v-flex>

      <v-flex v-else xs12 sm10 xl8>
        <DatasetItem :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DatasetItem from '@/components/research-hub/DatasetItem'
import DatasetItemView from '@/components/research-hub/DatasetItemView'

export default {
  components: {
    DatasetItem,
    DatasetItemView
  },
  props: {
    item: Object,
    view: Boolean
  }
}
</script>
