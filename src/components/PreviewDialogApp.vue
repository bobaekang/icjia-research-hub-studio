<template>
  <v-container>
    <v-layout justify-center>
      <v-flex v-if="view" xs12 sm10 md8>
        <AppItemView :item="item" />
      </v-flex>

      <v-flex v-else xs12 sm10 xl8>
        <v-layout justify-center>
          <v-flex xs12 sm6 lg4>
            <AppItem :item="item" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppItem from '@/components/research-hub/AppItem'
import AppItemView from '@/components/research-hub/AppItemView'

export default {
  components: {
    AppItem,
    AppItemView
  },
  props: {
    item: Object,
    view: Boolean
  }
}
</script>
