<template>
  <BaseForm
    :contentType="contentType"
    formType="submit"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.title"
            label="Title"
            counter
            :rules="[rules.required]"
            @keyup="titleToSlug"
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.slug"
            label="Slug"
            counter
            :hint="update ? '' : 'Automatically generated from title'"
            :readonly="!update"
            :disabled="update"
            :rules="[rules.required]"
          />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex class="px-3" xs12 md6 lg4>
          <DatePicker :date.sync="item.date" />
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-select
            v-model="item.categories"
            label="Categories"
            clearable
            multiple
            :items="categoryOptions"
            :rules="[rules.required]"
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.tags"
            label="Tags"
            hint="Separate tags with commas"
          />
        </v-flex>

        <template v-if="contentType === 'apps'">
          <v-flex class="px-3" xs12 md6 lg4>
            <v-text-field
              v-model="item.url"
              label="URL"
              :rules="[rules.required]"
            />
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
            <v-textarea
              v-model="item.description"
              label="Description"
              :rules="[rules.required]"
            />
          </v-flex>
        </template>

        <template v-if="contentType === 'articles'">
          <v-flex class="px-3" xs12 md6 lg4>
            <v-select
              v-model="item.authors"
              item-text="title"
              item-value="_id"
              label="Authors"
              clearable
              multiple
              :items="authorOptions"
              :rules="[rules.required]"
            />
          </v-flex>

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
            <MarkdownEditor
              :markdown.sync="item.markdown"
              :rules="[rules.required]"
            />
          </v-flex>

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea
              v-model="item.summary"
              label="Summary"
              :rules="[rules.required]"
            />
          </v-flex>
        </template>

        <template v-if="contentType === 'datasets'">
          <v-flex class="px-3" xs12 md6 lg4>
            <v-select
              v-model="item.agegroup"
              label="Age group"
              clearable
              :items="agegroupOptions"
            />
          </v-flex>

          <v-flex class="px-3" xs12 md6 lg4>
            <v-text-field
              v-model="item.timeperiod"
              label="Time period"
              hint="Format: yyyy-yyyy"
              :rules="[rules.timeperiod]"
            />
          </v-flex>

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

      <v-btn outline @click="onSave">
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
import BaseForm from '@/components/BaseForm'
import DatePicker from '@/components/DatePicker'
import MyDropzone from '@/components/MyDropzone'
import MarkdownEditor from '@/components/MarkdownEditor'
import PreviewDialog from '@/components/PreviewDialog'

import client from '@/services/client.js'

const today = new Date().toISOString().substr(0, 10)

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
        date: today,
        categories: [],
        tags: '',
        authors: null,
        agegroup: null,
        timeperiod: null,
        description: null,
        markdown: '',
        summary: null,
        url: null
      },
      authorOptions: [],
      saved: false,
      valid: false
    }
  },
  computed: {
    ...mapState('content', {
      content: 'item',
      contentId: 'itemId',
      rules: 'rules'
    }),
    ...mapState('form', {
      agegroupOptions: 'agegroupOptions',
      categoryOptions: 'categoryOptions',
      rules: 'rules'
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
      this.resetItem(false)

      if (newContentType === 'articles' && !this.authorOptions.length) {
        client.getAuthorList().then(res => {
          this.authorOptions = res.data.data.authors
        })
      }
    },
    content(newContent, oldContent) {
      const content = newContent

      if (this.update && content && Object.keys(content).length) {
        this.item.title = newContent.title
        this.item.slug = content.slug
        this.item.categories = content.categories
        this.item.tags = content.tags ? content.tags.join(', ') : ''

        if (this.contentType === 'apps') {
          this.item.url = content.url ? content.url : 'https://'
          this.item.description = content.description
        } else if (this.contentType === 'articles') {
          console.log(content.markdown)
          this.item.markdown = content.markdown
          this.item.summary = content.summary
        } else if (this.contentType === 'datasets') {
          this.item.description = content.description
        }

        this.saved = true
      }
    }
  },
  methods: {
    addContentTypeProperties(item) {
      if (this.contentType === 'apps') {
        if (this.dropzoneSplashVm.getAcceptedFiles().length) {
          item.image = this.dropzoneSplashVm.getAcceptedFiles()[0].dataURL
        }
      } else if (this.contentType === 'articles') {
        if (this.dropzoneSplashVm.getAcceptedFiles().length) {
          item.splash = this.dropzoneSplashVm.getAcceptedFiles()[0].dataURL
        }

        if (this.dropzoneImagesVm.getAcceptedFiles()) {
          item.images = this.dropzoneImagesVm.getAcceptedFiles().map(file => {
            return {
              title: file.name,
              src: file.dataURL
            }
          })
        }
      } else if (this.contentType === 'datasets') {
        if (this.dropzoneDataVm.getAcceptedFiles()) {
          const file = this.dropzoneDataVm.getAcceptedFiles()[0]
          const reader = new FileReader()

          reader.onload = e => this.$emit('load', e.target.result)
          reader.readAsText(file)

          item.datacsv = reader.result
        }
      }
    },
    removeAllDropzonFiles() {
      const dropzoneVms = [
        this.dropzoneDataVm,
        this.dropzoneSplashVm,
        this.dropzoneImagesVm
      ]

      dropzoneVms.forEach(vm => {
        if (vm) vm.removeAllFiles()
      })
    },
    removeEmptyProperties(obj) {
      Object.keys(obj).forEach(key => {
        ;(obj[key] === undefined || obj[key] === null) && delete obj[key]
      })
    },
    resetItem(update) {
      if (update) {
        this.$store.dispatch('content/fetchItem', {
          contentType: this.contentType,
          id: this.contentId
        })
      } else {
        this.$store.dispatch('content/setItem', {})
        this.item = {
          title: '',
          slug: '',
          date: today,
          categories: [],
          tags: '',
          authors: null,
          description: null,
          markdown: '',
          summary: null,
          url: null,
          datacsv: null
        }
      }
      this.saved = false
      this.valid = false
    },
    titleToSlug() {
      this.item.slug = this.item.title
        .replace(/[^\w\s]/gi, '')
        .replace(/\s/gi, '-')
        .toLowerCase()
    },
    onMain() {
      if (this.update) {
        console.log(this.contentType)
        this.$store.dispatch('content/updateItem', this.contentType)
        alert('Update submitted--back to home!')
      } else {
        this.$store.dispatch('content/submitItem', this.contentType)
        alert('New item submitted--back to home!')
      }
      this.$router.push('/')
    },
    onReset() {
      this.resetItem(this.update)
      this.removeAllDropzonFiles()
    },
    onSave() {
      if (this.$refs.form.validate()) {
        const item = { ...this.item }

        item.tags = item.tags ? item.tags.split(',').map(el => el.trim()) : []
        item.markdown = this.contentType === 'articles' ? item.markdown : null

        this.removeEmptyProperties(item)
        this.addContentTypeProperties(item)

        this.$store.dispatch('content/setItem', item)
        this.saved = true

        alert('Changes saved. Try preview.')
      }
    }
  }
}
</script>
