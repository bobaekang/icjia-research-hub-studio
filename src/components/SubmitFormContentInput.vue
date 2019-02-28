<template>
  <v-form class="mb-2">
    <v-layout class="pl-3" row wrap>
      <v-flex v-if="contentType === 'app'" xs12 md6 lg4>
        <v-text-field v-model="url" :counter="max" :rules="rules" label="URL" />
      </v-flex>

      <v-flex v-if="contentType !== 'dataset'" class="pb-2" xs12>
        <p style="color:rgba(0,0,0,.54);">Splash image</p>
        <file-reader class="pb-2" fileType="img"></file-reader>
      </v-flex>

      <template v-if="contentType === 'article'">
        <v-flex xs12>
          <p class="pt-2 input-title">Article body</p>
          <the-markdown-editor :myInput="this.myInput"></the-markdown-editor>
        </v-flex>

        <v-flex class="pb-2" xs12>
          <p class="input-title">Article images</p>

          <div v-for="i in imgNum" :key="i">
            <file-reader class="pb-4" fileType="img"></file-reader>
          </div>

          <v-btn outline @click="imgNum++">
            add image
          </v-btn>

          <v-btn v-if="imgNum > 0" outline color="error" @click="imgNum--">
            remove image
          </v-btn>
        </v-flex>
      </template>

      <v-flex v-if="contentType === 'dataset'" class="pb-2" xs12>
        <p class="input-title">Data in CSV format</p>
        <file-reader class="pb-2" fileType="csv"></file-reader>
      </v-flex>

      <v-flex v-if="contentType !== 'dataset'" class="pr-3" xs12 md10 lg6>
        <v-textarea
          v-model="summary"
          :counter="max"
          :rules="rules"
          label="Summary"
        />
      </v-flex>

      <v-flex v-if="contentType !== 'article'" class="pr-3" xs12 md10 lg6>
        <v-textarea
          v-model="description"
          :counter="max"
          :rules="rules"
          label="Description"
        />
      </v-flex>
    </v-layout>

    <v-btn class="mt-5" outline color="primary" @click="onSaveChanges">
      Save changes
    </v-btn>
  </v-form>
</template>

<script>
import FileReader from '@/components/FileReader'
import TheMarkdownEditor from '@/components/TheMarkdownEditor'

export default {
  components: {
    TheMarkdownEditor,
    FileReader
  },
  props: {
    contentType: String,
    update: Boolean
  },
  data() {
    return {
      description: '',
      imgNum: 0,
      myInput: '',
      summary: '',
      url: 'https://'
    }
  },
  mounted() {
    if (update) {
      const contentObj = this.$store.getters.contentObj

      if (this.contentType === 'app') {
        this.url = contentObj.url
        this.summary = contentObj.summary
        this.description = contentObj.description
      } else if (this.contentType === 'article') {
        this.myInput = contentObj.body
        this.summary = contentObj.summary
      } else if (this.contentType === 'dataset') {
        this.description = contentObj.description
      }
    }
  },
  methods: {
    onSaveChanges() {
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