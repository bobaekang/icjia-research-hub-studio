<template>
  <v-layout row>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-btn outline slot="activator" color="primary">
        Preview
      </v-btn>

      <v-card>
        <v-toolbar class="toolbar">
          <v-btn icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Preview</v-toolbar-title>
        </v-toolbar>
        <preview-dialog-apps-item v-if="contentType === 'app'" :item="item">
        </preview-dialog-apps-item>

        <preview-dialog-article v-if="contentType === 'article'" :item="item">
        </preview-dialog-article>

        <preview-dialog-dataset v-if="contentType === 'dataset'" :item="item">
        </preview-dialog-dataset>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import PreviewDialogAppsItem from '@/components/PreviewDialogAppsItem'
import PreviewDialogArticle from '@/components/PreviewDialogArticle'
import PreviewDialogDataset from '@/components/PreviewDialogDataset'

export default {
  components: {
    PreviewDialogAppsItem,
    PreviewDialogArticle,
    PreviewDialogDataset
  },
  props: {
    contentType: String
  },
  data() {
    return {
      dialog: false
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