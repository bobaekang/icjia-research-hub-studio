<template>
  <BaseForm
    :contentType="contentType"
    formType="submit"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form>
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.title"
            label="Title"
            @keyup="titleToSlug"
            counter
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            :disabled="update"
            v-model="item.slug"
            label="Slug"
            counter
          />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex class="px-3" xs12 md6 lg4>
          <DatePicker />
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-select
            :items="categoryOptions"
            v-model="item.categories"
            label="Categories"
            hint="Select categories"
            persistent-hint
            multiple
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.tags"
            label="Tags"
            hint="Separate tags with commas"
            persistent-hint
          />
        </v-flex>

        <template v-if="contentType === 'apps'">
          <v-flex class="px-3" xs12 md6 lg4>
            <v-text-field v-model="item.url" label="URL" />
          </v-flex>

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

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea v-model="item.description" label="Description" />
          </v-flex>
        </template>

        <template v-if="contentType === 'articles'">
          <v-flex class="px-3 pt-3" xs12>
            <p class="greycolor">Splash image</p>
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
            <p class="greycolor">Article images</p>
            <MyDropzone
              key="DropzoneImages"
              ref="DropzoneImages"
              fileTypes=".jpg, .jpeg, .png"
            >
              Drop images (JPEG or PNG only) here to upload
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <p class="pt-2 greycolor">Article body</p>
            <MarkdownEditor :markdown="item.markdown ? item.markdown : ''" />
          </v-flex>

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea v-model="item.summary" label="Summary" />
          </v-flex>
        </template>

        <template v-if="contentType === 'datasets'">
          <v-flex class="px-3 pt-3" xs12>
            <p class="greycolor">Data file</p>
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

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea v-model="item.description" label="Description" />
          </v-flex>
        </template>
      </v-layout>

      <div style="height: 50px;"></div>

      <v-btn outline color="" @click="onSaveChanges">
        Save
      </v-btn>

      <PreviewDialog :contentType="contentType" :icon="false" />
    </v-form>
  </BaseForm>
</template>

<script>
import { mapState } from 'vuex'
import BaseForm from '@/components/BaseForm'
import DatePicker from '@/components/DatePicker'
import MyDropzone from '@/components/MyDropzone'
import MarkdownEditor from '@/components/MarkdownEditor'
import PreviewDialog from '@/components/PreviewDialog'

export default {
  components: {
    BaseForm,
    DatePicker,
    MyDropzone,
    MarkdownEditor,
    PreviewDialog
  },
  props: {
    contentType: String,
    update: Boolean
  },
  data() {
    return {
      id: '',
      item: {
        title: '',
        slug: '',
        date: '',
        categories: [],
        tags: '',
        description: null,
        markdown: '',
        summary: null,
        url: null,
        datacsv: null
      },
      categoryOptions: [
        'corrections',
        'courts',
        'crimes',
        'law enforcement',
        'other'
      ]
    }
  },
  computed: {
    ...mapState('content', {
      content: 'item',
      contentId: 'itemId'
    }),
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
    dropzoneDataVm() {
      if (this.contentType === 'datasets') {
        return this.$refs.DropzoneData.$refs.MyDropzone
      }
      return null
    }
  },
  watch: {
    contentType(newContentType, oldContentType) {
      this.onReset()

      this.dropzoneSplashVm.removeAllFiles(true)
      this.dropzoneImagesVm.removeAllFiles(true)
      this.dropzoneDataVm.removeAllFiles(true)
    },
    content(newContent, oldContent) {
      if (this.update) {
        const content = newContent

        if (Object.entries(content).length !== 0) {
          this.item.title = content.title
          this.item.slug = content.slug
          this.item.categories = content.categories
          this.item.tags = content.tags

          if (this.contentType === 'apps') {
            this.item.url = content.url ? content.url : 'https://'
            this.item.description = content.description
          } else if (this.contentType === 'articles') {
            this.item.markdown = content.body
            this.item.summary = content.summary
          } else if (this.contentType === 'datasets') {
            this.item.description = content.description
          }
        }
      }
    }
  },
  methods: {
    titleToSlug() {
      this.slug = this.title
        .replace(/[^\w\s]/gi, '')
        .replace(/\s/gi, '-')
        .toLowerCase()
    },
    onSaveChanges() {
      if (this.contentType === 'apps') {
        // const splash = this.dropzoneSplashVm.getAcceptedFiles()[0].dataURL
        console.log(this.dropzoneSplashVm.getAcceptedFiles())
      } else if (this.contentType === 'articles') {
        // const splash = this.dropzoneSplashVm.getAcceptedFiles()[0].dataURL
        // const images = this.dropzoneImagesVm.getAcceptedFiles().map(file => {
        //   return {
        //     title: file.name,
        //     src: file.dataURL
        //   }
        // })
        console.log(this.dropzoneSplashVm.getAcceptedFiles())
        console.log(this.dropzoneImagesVm.getAcceptedFiles())
      } else if (this.contentType === 'datasets') {
        console.log(this.dropzoneDataVm.getAcceptedFiles())
        // const file = this.dropzoneDataVm.getAcceptedFiles()[0]
        // const reader = new FileReader()

        // reader.onload = e => this.$emit('load', e.target.result)
        // reader.onload = e => {
        //   this.$emit('load', e.target.result)
        //   this.datacsv = e.target.result
        // }
        // reader.readAsText(file)
      }

      // const tags = this.item.tags
      //   ? this.item.tags.split(',').map(el => el.trim())
      //   : []

      // let item = this.item
      // item.tags = tags

      // this.$store.dispatch('content/setItem', item)

      alert('changes saved')
    },
    onReset() {
      console.log('reset')

      if (this.contentType === 'datasets') {
        this.dropzoneDataVm.removeAllFiles(true)
      } else {
        this.dropzoneSplashVm.removeAllFiles(true)
        if (this.contentType === 'articles') {
          this.dropzoneImagesVm.removeAllFiles(true)
        }
      }

      if (this.update) {
        this.$store.dispatch('content/fetchItem', {
          contentType: this.contentType,
          id: this.contentId
        })
      } else {
        this.item = {
          title: '',
          slug: '',
          date: '',
          categories: [],
          tags: '',
          description: null,
          markdown: null,
          summary: null,
          url: null
        }
      }
    },
    onMain() {
      if (this.update) {
        console.log('main event caught: update')
      } else {
        console.log('main event caught: new')
        this.title = ''
        this.slug = ''
        this.date = ''
        this.categories = []
        this.tags = ''

        if (this.contentType === 'apps') {
          this.url = 'https://'
          this.description = ''
        } else if (this.contentType === 'articles') {
          // this.markdown = ''
          // this.summary = ''
          console.log('articles')
        } else if (this.contentType === 'datasets') {
          // this.description = ''
          console.log('datasets')
        }
      }
    }
  }
}
</script>
