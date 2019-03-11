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

        <v-flex v-if="contentType === 'apps'" class="px-3" xs12 md6 lg4>
          <v-text-field v-model="item.url" label="URL" />
        </v-flex>

        <v-flex v-if="contentType !== 'datasets'" class="px-3 pt-3" xs12>
          <p style="color:rgba(0,0,0,.54);">Splash image</p>
          <ImgDropzone :splash="true" />
        </v-flex>

        <template v-if="contentType === 'articles'">
          <v-flex class="px-3 pt-3" xs12>
            <p class="pt-2 input-title">Article body</p>
            <MarkdownEditor :markdown="this.item.markdown" />
          </v-flex>

          <v-flex class="px-3 pb-2" xs12>
            <p class="input-title">Article images</p>
            <ImgDropzone />
          </v-flex>
        </template>

        <v-flex v-if="contentType === 'datasets'" class="pb-2" xs12>
          <p class="input-title">Data in CSV format</p>
          <FileReader class="pb-2" fileType="csv" />
        </v-flex>

        <v-flex v-if="contentType === 'articles'" class="px-3" xs12 md10 lg6>
          <v-textarea v-model="item.summary" label="Summary" />
        </v-flex>

        <v-flex v-if="contentType !== 'articles'" class="px-3" xs12 md10 lg6>
          <v-textarea v-model="item.description" label="Description" />
        </v-flex>
      </v-layout>

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
import ImgDropzone from '@/components/ImgDropzone'
import FileReader from '@/components/FileReader'
import MarkdownEditor from '@/components/MarkdownEditor'
import PreviewDialog from '@/components/PreviewDialog'

export default {
  components: {
    BaseForm,
    DatePicker,
    ImgDropzone,
    FileReader,
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
        markdown: null,
        summary: null,
        url: null
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
    })
  },
  watch: {
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
      const tags = this.item.tags
        ? this.item.tags.split(',').map(el => el.trim())
        : []

      let item = this.item
      item.tags = tags

      this.$store.dispatch('content/setItem', item)

      alert('changes saved')
    },
    onReset() {
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

<style scoped>
.input-title {
  color: rgba(0, 0, 0, 0.54);
}
</style>
