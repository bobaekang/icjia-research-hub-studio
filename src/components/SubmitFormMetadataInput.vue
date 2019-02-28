<template>
  <div class="mb-2">
    <v-form class="my-3">
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
          <the-date-picker></the-date-picker>
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
      </v-layout>
    </v-form>

    <v-btn class="mt-5" outline color="primary" @click="onSaveChanges">
      save changes
    </v-btn>
  </div>
</template>

<script>
import TheDatePicker from '@/components/TheDatePicker'

export default {
  components: {
    TheDatePicker
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
      tags: ''
    }
  },
  mouted() {
    if (update) {
      const contentObj = this.$store.getters.contentObj

      this.title = contentObj.title
      this.slug = contentObj.slug
      this.categories = contentObj.categories
      this.tags = contentObj.tags
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
      let obj = {}

      obj.title = this.title
      obj.slug = this.slug
      obj.date = this.date
      obj.categories = this.categories
      obj.tags = this.tags ? this.tags.split(',').map(el => el.trim()) : []

      this.$store.dispatch('setItem', obj)
    }
  }
}
</script>