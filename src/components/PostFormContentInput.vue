<template>
  <v-form class="mb-5">
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
  </v-form>
</template>

<script>
import FileReader from '@/components/FileReader'

export default {
  components: {
    FileReader
  },
  props: {
    contentType: String,
    content: Object
  },
  data() {
    return {
      imgNum: 0
    }
  }
}
</script>

<style scoped>
.input-title {
  color: rgba(0, 0, 0, 0.54);
}
</style>
