<template>
  <BaseForm :contentType="contentType" formType="post">
    <v-form>
      <v-layout class="pl-3" row wrap>
        <v-flex class="pb-2" xs12>
          <p class="input-title">JSON file</p>
          <FileReader class="pb-2" fileType="json" />
        </v-flex>

        <v-flex v-if="contentType === 'datasets'" class="pb-2" xs12>
          <p class="input-title">CSV data</p>
          <FileReader class="pb-2" fileType="csv" />
        </v-flex>

        <template v-if="contentType === 'articles'">
          <v-flex class="pb-2" xs12>
            <p class="input-title">Splash image</p>
            <FileReader class="pb-2" fileType="img" />
          </v-flex>

          <v-flex class="pb-2" xs12>
            <p class="input-title">Markdown file</p>
            <FileReader class="pb-2" fileType="img" />
          </v-flex>

          <v-flex class="pb-2" xs12>
            <p class="input-title">Article images</p>

            <div v-for="i in imgNum" :key="i">
              <FileReader class="pb-4" fileType="img" />
            </div>

            <v-btn outline @click="imgNum++">
              add image
            </v-btn>

            <v-btn v-if="imgNum > 0" outline color="error" @click="imgNum--">
              remove image
            </v-btn>
          </v-flex>
        </template>
      </v-layout>

      <v-btn outline @click="onSaveChanges">
        Save
      </v-btn>

      <PreviewDialog :contentType="contentType" :item="item" />
    </v-form>
  </BaseForm>
</template>

<script>
import BaseForm from '@/components/BaseForm'
import FileReader from '@/components/FileReader'
import PreviewDialog from '@/components/PreviewDialog'

export default {
  components: {
    BaseForm,
    FileReader,
    PreviewDialog
  },
  props: {
    contentType: String
  },
  data() {
    return {
      imgNum: 0
    }
  },
  methods: {
    onSaveChanges() {
      let item = {}

      this.$store.dispatch('content/setItem', item)

      alert('changes saved')
    }
  }
}
</script>

<style scoped>
.input-title {
  color: rgba(0, 0, 0, 0.54);
}
</style>
