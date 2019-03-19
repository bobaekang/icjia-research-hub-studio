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

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea v-model="item.description" label="Description" />
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
import DatePicker from '@/components/DatePicker'
import MyDropzone from '@/components/MyDropzone'
import MarkdownEditor from '@/components/MarkdownEditor'
import PreviewDialog from '@/components/PreviewDialog'

import client from '@/services/client.js'

const today = new Date().toISOString().substr(0, 10)

export default {
  name: 'submitform',
  mixins: [baseActionMixin, dropzoneMixin],
  components: {
    BaseDropzoneTitle,
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
    dropzoneList() {
      const contentType = this.contentType

      return {
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
        data:
          contentType === 'datasets'
            ? this.$refs.DropzoneData.$refs.MyDropzone
            : null
      }
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
      if (this.update && newContent && Object.keys(newContent).length) {
        this.item = newContent
        this.item.date = this.item.date.slice(0, 10)
        this.item.tags = this.item.tags ? this.item.tags.join(', ') : ''

        this.saved = true
      }
    }
  },
  methods: {
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
    async saveItem() {
      if (this.$refs.form.validate()) {
        let item = { ...this.item }

        item.tags = item.tags ? item.tags.split(',').map(el => el.trim()) : []
        item.markdown = this.contentType === 'articles' ? item.markdown : null

        this.removeEmptyProperties(item)
        await this.addDropzoneFiles(item, this.contentType, this.dropzoneList)

        this.$store.dispatch('content/setItem', item)
        this.saved = true

        alert('Changes saved. Try preview.')
      }
    },
    titleToSlug() {
      if (!this.update) {
        this.item.slug = this.item.title
          .replace(/[^\w\s]/gi, '')
          .replace(/\s/gi, '-')
          .toLowerCase()
      }
    }
  }
}
</script>
