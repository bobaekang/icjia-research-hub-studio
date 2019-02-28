<template>
  <v-stepper v-model="stepNum" vertical non-linear>
    <v-layout justify-end>
      <div class="mt-3 mr-3">
        <v-btn outline color="error" @click="alert('preview')">
          reset
        </v-btn>
      </div>
    </v-layout>

    <v-stepper-step :complete="stepNum > 1" step="1">
      Select content type: {{ contentTypeCapitalized }}
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-radio-group v-model="contentType" row>
        <v-radio label="App" value="app" />
        <v-radio label="Article" value="article" />
        <v-radio label="Dataset" value="dataset" />
      </v-radio-group>

      <v-btn outline color="primary" @click="stepNum = 2">
        Continue
      </v-btn>
    </v-stepper-content>

    <v-stepper-step editable :complete="stepNum > 2" step="2">
      Provide contents
    </v-stepper-step>

    <v-stepper-content step="2">
      <post-form-content-input
        :contentType="contentType"
      ></post-form-content-input>

      <v-btn outline @click="stepNum = 1">
        Back
      </v-btn>
      <v-btn outline color="primary" @click="stepNum = 3">
        Continue
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="3">
      Preview and submit
    </v-stepper-step>

    <v-stepper-content step="3">
      <preview-dialog :contentType="contentType"></preview-dialog>

      <v-divider class="my-2"></v-divider>

      <v-btn outline @click="stepNum = 2">
        Back
      </v-btn>

      <v-btn outline color="primary" @click="alert('preview')">
        Post
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import PostFormContentInput from '@/components/PostFormContentInput'
import PreviewDialog from '@/components/PreviewDialog'

export default {
  components: {
    PostFormContentInput,
    PreviewDialog
  },
  data() {
    return {
      contentType: 'article',
      stepNum: 1
    }
  },
  computed: {
    contentTypeCapitalized() {
      let type = this.contentType
      return type.charAt(0).toUpperCase() + type.slice(1)
    }
  },
  methods: {}
}
</script>

<style>
</style>