<template>
  <BaseForm
    :contentType="contentType"
    formType="post"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form>
      <v-layout class="pl-3" row wrap>
        <v-flex class="px-3 pt-3" xs12>
          <BaseDropzoneTitle :update="update">
            JSON file
          </BaseDropzoneTitle>

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
            <BaseDropzoneTitle :update="update">
              Image
            </BaseDropzoneTitle>

            <MyDropzone
              ref="DropzoneImage"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
            >
              Drop an Image (JPEG or PNG only) here to upload
            </MyDropzone>
          </v-flex>
        </template>

        <template v-if="contentType === 'articles'">
          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">
              Splash image
            </BaseDropzoneTitle>

            <MyDropzone
              ref="DropzoneSplash"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
            >
              Drop a splash image (JPEG or PNG only) here to upload
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">
              Article images
            </BaseDropzoneTitle>

            <MyDropzone
              key="DropzoneImages"
              ref="DropzoneImages"
              fileTypes=".jpg, .jpeg, .png"
            >
              Drop images (JPEG or PNG only) here to upload
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">
              Article body
            </BaseDropzoneTitle>

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
            <BaseDropzoneTitle :update="update">
              Data file
            </BaseDropzoneTitle>

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

      <v-btn outline @click="saveItem">
        Save
      </v-btn>

      <PreviewDialog v-if="saved" :contentType="contentType" :icon="false" />
      <v-btn v-else outline disabled>
        Preview
      </v-btn>
    </v-form>
  </BaseForm>
</template>

<script>
import { mapState } from 'vuex'
import { baseActionMixin, dropzoneMixin } from '@/mixins/formMixin'
import BaseDropzoneTitle from '@/components/BaseDropzoneTitle'
import BaseForm from '@/components/BaseForm'
import MyDropzone from '@/components/MyDropzone'
import PreviewDialog from '@/components/PreviewDialog'

export default {
  name: 'postform',
  mixins: [baseActionMixin, dropzoneMixin],
  components: {
    BaseDropzoneTitle,
    BaseForm,
    MyDropzone,
    PreviewDialog
  },
  props: {
    contentType: String,
    update: Boolean
  },
  data() {
    return {
      item: {},
      saved: false
    }
  },
  computed: {
    ...mapState('content', {
      content: 'item',
      contentId: 'itemId'
    }),
    dropzoneList() {
      const contentType = this.contentType
      return {
        json: this.$refs.DropzoneJson.$refs.MyDropzone,
        image:
          contentType === 'apps'
            ? this.$refs.DropzoneImage.$refs.MyDropzone
            : null,
        splash:
          contentType === 'articles'
            ? this.$refs.DropzoneSplash.$refs.MyDropzone
            : null,
        images:
          contentType === 'articles'
            ? this.$refs.DropzoneImages.$refs.MyDropzone
            : null,
        markdown:
          contentType === 'articles'
            ? this.$refs.DropzoneMarkdown.$refs.MyDropzone
            : null,
        data:
          contentType === 'datasets'
            ? this.$refs.DropzoneData.$refs.MyDropzone
            : null
      }
    }
  },
  watch: {
    contentType() {
      this.resetItem(false)
    },
    content() {
      if (this.update) {
        this.item = this.content
        this.saved = true
      }
    }
  },
  methods: {
    resetItem(update) {
      if (update) {
        this.$store.dispatch('content/fetchItem', {
          contentType: this.contentType,
          id: this.contentId
        })
      } else {
        this.$store.dispatch('content/setItem', {})
        this.item = {}
      }
      this.saved = false
    },
    async saveItem() {
      let item = { ...this.item }

      await this.addDropzoneFiles(item, this.contentType, this.dropzoneList)

      this.$store.dispatch('content/setItem', item)
      this.saved = true

      alert('Changes saved. Try preview.')
    }
  }
}
</script>
