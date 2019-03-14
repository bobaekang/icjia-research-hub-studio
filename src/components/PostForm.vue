<template>
  <BaseForm :contentType="contentType" formType="post">
    <v-form>
      <v-layout class="pl-3" row wrap>
        <v-flex class="px-3 pt-3" xs12>
          <p class="greycolor">
            JSON file
            <span v-if="update">(No change if not provided)</span>
          </p>
          <MyDropzone
            key="DropzoneJson"
            ref="DropzoneJson"
            fileTypes=".json"
            :maxOne="true"
            :limitFilesize="false"
          >
            Drop a JSON file here to upload
          </MyDropzone>
        </v-flex>

        <template v-if="contentType === 'apps'">
          <v-flex class="px-3 pt-3" xs12>
            <p class="greycolor">Splash image</p>
            <MyDropzone
              key="DropzoneSplashApp"
              ref="DropzoneSplash"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
            >
              Drop a splash image (JPEG or PNG only) here to upload
            </MyDropzone>
          </v-flex>
        </template>

        <template v-if="contentType === 'articles'">
          <v-flex class="px-3 pt-3" xs12>
            <p class="greycolor">
              Splash image
              <span v-if="update">(No change if not provided)</span>
            </p>
            <MyDropzone
              key="DropzoneSplashArticle"
              ref="DropzoneSplash"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
            >
              Drop a splash image (JPEG or PNG only) here to upload
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <p class="greycolor">
              Article images
              <span v-if="update">(No change if not provided)</span>
            </p>
            <MyDropzone
              key="DropzoneImages"
              ref="DropzoneImages"
              fileTypes=".jpg, .jpeg, .png"
            >
              Drop images (JPEG or PNG only) here to upload
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <p class="greycolor">
              Article body
              <span v-if="update">(No change if not provided)</span>
            </p>
            <MyDropzone
              key="DropzoneMarkdown"
              ref="DropzoneMarkdown"
              fileTypes=".md"
              :maxOne="true"
            >
              Drop a markdown file here to upload
            </MyDropzone>
          </v-flex>
        </template>

        <template v-if="contentType === 'datasets'">
          <v-flex class="px-3 pt-3" xs12>
            <p class="greycolor">
              Data file
              <span v-if="update">(No change if not provided)</span>
            </p>
            <MyDropzone
              key="DropzoneData"
              ref="DropzoneData"
              fileTypes=".csv"
              :maxOne="true"
              :limitFilesize="false"
            >
              Drop a CSV file here to upload
            </MyDropzone>
          </v-flex>
        </template>
      </v-layout>

      <div style="height: 50px;"></div>

      <v-btn outline @click="onSaveChanges">
        Save
      </v-btn>

      <PreviewDialog :contentType="contentType" :icon="false" />
    </v-form>
  </BaseForm>
</template>

<script>
import { mapState } from 'vuex'
import BaseForm from '@/components/BaseForm'
import MyDropzone from '@/components/MyDropzone'
import PreviewDialog from '@/components/PreviewDialog'

export default {
  components: {
    BaseForm,
    MyDropzone,
    PreviewDialog
  },
  props: {
    contentType: String,
    update: String
  },
  computed: {
    ...mapState('content', {
      content: 'item',
      contentId: 'itemId'
    }),
    dropzoneJsonVm() {
      return this.$refs.DropzoneJson.$refs.MyDropzone
    },
    dropzoneSplashVm() {
      if (this.contentType !== 'datasets') {
        return this.$refs.DropzoneSplash.$refs.MyDropzone
      }
      return null
    },
    dropzoneImagesVm() {
      if (this.contentType === 'articles') {
        return this.$refs.DropzoneImages.$refs.MyDropzone
      }
      return null
    },
    dropzoneMarkdownVm() {
      if (this.contentType === 'articles') {
        return this.$refs.DropzoneMarkdown.$refs.MyDropzone
      }
      return null
    },
    dropzoneDataVm() {
      if (this.contentType === 'datasets') {
        return this.$refs.DropzoneData.$refs.MyDropzone
      }
      return null
    }
  },
  watch: {
    contentType() {
      this.onReset()

      const removeAllFiles = dropzoneVm => {
        if (dropzoneVm) dropzoneVm.removeAllFiles(true)
      }

      removeAllFiles(this.dropzoneJsonVm)
      removeAllFiles(this.dropzoneSplashVm)
      removeAllFiles(this.dropzoneImagesVm)
      removeAllFiles(this.dropzoneMarkdownVm)
      removeAllFiles(this.dropzoneDataVm)
    }
    // content(newContent, oldContent) {
    //   if (this.update) {
    //     const content = newContent

    //     if (Object.entries(content).length !== 0) {
    //       this.item.title = content.title
    //       this.item.slug = content.slug
    //       this.item.categories = content.categories
    //       this.item.tags = content.tags

    //       if (this.contentType === 'apps') {
    //         this.item.url = content.url ? content.url : 'https://'
    //         this.item.description = content.description
    //       } else if (this.contentType === 'articles') {
    //         this.item.markdown = content.body
    //         this.item.summary = content.summary
    //       } else if (this.contentType === 'datasets') {
    //         this.item.description = content.description
    //       }
    //     }
    //   }
    // }
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
