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

        <PreviewDialogAppsItem v-if="contentType === 'apps'" :item="item" />

        <PreviewDialogArticle v-if="contentType === 'articles'" :item="item" />

        <PreviewDialogDataset v-if="contentType === 'datasets'" :item="item" />
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
