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
        <v-btn icon @click="closePreview">
          <v-icon>close</v-icon>
        </v-btn>

        <v-btn flat @click="view = !view">
          <template>{{ view ? 'show card' : 'show view' }}</template>
        </v-btn>

        <v-toolbar-title style="text-transform: uppercase">
          <template>{{ msgTitle }}</template>
        </v-toolbar-title>
      </v-toolbar>

      <PreviewDialogApp
        v-if="contentType == 'apps' && item"
        :item="item"
        :view="view"
      />

      <PreviewDialogArticle
        v-if="contentType == 'articles' && item"
        :item="item"
        :view="view"
      />

      <PreviewDialogDataset
        v-if="contentType == 'datasets' && item"
        :item="item"
        :view="view"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import {
  appGetters,
  articleGetters,
  datasetGetters
} from '@/services/client.js'
import PreviewDialogApp from '@/components/PreviewDialogApp'
import PreviewDialogArticle from '@/components/PreviewDialogArticle'
import PreviewDialogDataset from '@/components/PreviewDialogDataset'

export default {
  components: {
    PreviewDialogApp,
    PreviewDialogArticle,
    PreviewDialogDataset
  },
  props: {
    contentType: String,
    icon: Boolean,
    id: String,
    local: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      view: false,
      item: this.local ? this.$store.state.content.item : null
    }
  },
  computed: {
    msgTitle() {
      return `Preview type: ${this.contentType} ${this.view ? 'view' : ''}`
    }
  },
  methods: {
    closePreview() {
      this.dialog = false
      this.view = false
    }
  },
  async created() {
    if (!this.local) {
      let res

      switch (this.contentType) {
        case 'apps':
          res = await appGetters.getSingle(this.id)
          break
        case 'articles':
          res = await articleGetters.getSingle(this.id)
          break
        case 'datasets':
          res = await datasetGetters.getSingle(this.id)
          break
        default:
          break
      }

      this.item = res.data
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
