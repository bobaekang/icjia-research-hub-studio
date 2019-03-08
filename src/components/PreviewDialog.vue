<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-btn slot="activator" :outline="!icon" :icon="icon">
      <slot>Preview</slot>
    </v-btn>

    <v-card>
      <v-toolbar class="toolbar">
        <v-btn icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>

        <v-btn flat @click="view = !view">
          {{ view ? 'show card' : 'show view' }}
        </v-btn>

        <v-toolbar-title style="text-transform: uppercase">
          Preview type: {{ contentType }} {{ view ? 'view' : '' }}
        </v-toolbar-title>
      </v-toolbar>

      <template v-if="contentType == 'apps'">
        <AppItem v-if="!view" :item="item" />
        <AppItemView v-if="view" :item="item" />
      </template>

      <template :v-if="contentType == 'articles'">
        <ArticleItem v-if="!view" :item="item"/>
        <ArticleItemView v-if="view" :item="item"/>
      </template>

      <template :v-if="contentType == 'datasets'">
        <DatasetItem v-if="!view" :item="item" />
        <DatasetItemView v-if="view" :item="item" />
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import AppItem from '@/components/research-hub/AppItem'
import AppItemView from '@/components/research-hub/AppItemView'
import ArticleItem from '@/components/research-hub/ArticleItem'
import ArticleItemView from '@/components/research-hub/ArticleItemView'
import DatasetItem from '@/components/research-hub/DatasetItem'
import DatasetItemView from '@/components/research-hub/DatasetItemView'

export default {
  components: {
    AppItem,
    AppItemView,
    ArticleItem,
    ArticleItemView,
    DatasetItem,
    DatasetItemView
  },
  props: {
    contentType: String,
    icon: Boolean
  },
  data() {
    return {
      dialog: false,
      view: false
    }
  },
  computed: {
    item() {
      return this.$store.state.content.item
    }
  }
}
</script>

<style scoped>
.toolbar {
  font-family: 'Lato' !important;
  box-shadow: 0 2px rgba(0, 0, 0, 0.2);
}
</style>
