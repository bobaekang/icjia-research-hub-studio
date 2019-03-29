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
        v-if="contentType == 'apps'"
        :item="item"
        :view="view"
      />

      <PreviewDialogArticle
        v-if="contentType == 'articles'"
        :item="item"
        :view="view"
      />

      <PreviewDialogDataset
        v-if="contentType == 'datasets'"
        :item="item"
        :view="view"
      />
    </v-card>
  </v-dialog>
</template>

<script>
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
    },
    msgTitle() {
      return `Preview type: ${this.contentType} ${this.view ? 'view' : ''}`
    }
  },
  methods: {
    closePreview() {
      this.dialog = false
      this.view = false
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
