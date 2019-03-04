<template>
  <BaseForm :contentType="contentType" formType="submit">
    <v-form>
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Title"
            @keyup="titleToSlug"
            counter
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field v-model="slug" :rules="rules" label="Slug" counter />
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
            v-model="categories"
            label="Categories"
            hint="Select categories"
            persistent-hint
            multiple
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="tags"
            label="Tags"
            hint="Separate tags with commas"
            persistent-hint
          />
        </v-flex>

        <v-flex v-if="contentType === 'apps'" class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="url"
            :counter="max"
            :rules="rules"
            label="URL"
          />
        </v-flex>

        <v-flex v-if="contentType !== 'datasets'" class="px-3 pt-3" xs12>
          <p style="color:rgba(0,0,0,.54);">Splash image</p>
          <FileReader class="pb-2" fileType="img" />
        </v-flex>

        <template v-if="contentType === 'articles'">
          <v-flex class="px-3 pt-3" xs12>
            <p class="pt-2 input-title">Article body</p>
            <MarkdownEditor :myInput="this.myInput" />
          </v-flex>

          <v-flex class="px-3 pb-2" xs12>
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

        <v-flex v-if="contentType === 'datasets'" class="pb-2" xs12>
          <p class="input-title">Data in CSV format</p>
          <FileReader class="pb-2" fileType="csv" />
        </v-flex>

        <v-flex v-if="contentType !== 'datasets'" class="px-3" xs12 md10 lg6>
          <v-textarea
            v-model="summary"
            :counter="max"
            :rules="rules"
            label="Summary"
          />
        </v-flex>

        <v-flex v-if="contentType !== 'articles'" class="px-3" xs12 md10 lg6>
          <v-textarea
            v-model="description"
            :counter="max"
            :rules="rules"
            label="Description"
          />
        </v-flex>
      </v-layout>

      <v-btn outline color="" @click="onSaveChanges">
        Save
      </v-btn>

      <PreviewDialog :contentType="contentType" :item="item" />
    </v-form>
  </BaseForm>
</template>

<script>
import BaseForm from '@/components/BaseForm'
import DatePicker from '@/components/DatePicker'
import FileReader from '@/components/FileReader'
import MarkdownEditor from '@/components/MarkdownEditor'
import PreviewDialog from '@/components/PreviewDialog'

export default {
  components: {
    BaseForm,
    DatePicker,
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
      title: '',
      slug: '',
      date: '',
      categories: [],
      categoryOptions: [
        'corrections',
        'courts',
        'crimes',
        'law enforcement',
        'other'
      ],
      tags: '',
      description: '',
      imgNum: 0,
      myInput: '',
      summary: '',
      url: 'https://'
    }
  },
  mounted() {
    if (this.update) {
      const contentObj = this.$store.state.content.item

      this.title = contentObj.title
      this.slug = contentObj.slug
      this.categories = contentObj.categories
      this.tags = contentObj.tags

      if (this.contentType === 'apps') {
        this.url = contentObj.url
        this.summary = contentObj.summary
        this.description = contentObj.description
      } else if (this.contentType === 'articles') {
        this.myInput = contentObj.body
        this.summary = contentObj.summary
      } else if (this.contentType === 'datasets') {
        this.description = contentObj.description
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
      let item = {}

      // item.title = this.title
      // item.slug = this.slug
      // item.date = this.date
      // item.categories = this.categories
      // item.tags = this.tags ? this.tags.split(',').map(el => el.trim()) : []

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
