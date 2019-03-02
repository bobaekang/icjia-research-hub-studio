<template>
  <BaseForm :stepNumTotal="2">
    <template v-slot:stepHeader1>
      Provide contents (type: {{ contentType }})
    </template>

    <template v-slot:stepItem1>
      <PostFormContentInput :contentType="contentType" />
    </template>

    <template v-slot:stepHeader2>
      Preview and submit
    </template>

    <template v-slot:stepItem2>
      <PreviewDialog :contentType="contentType" :item="item" />
      <v-btn outline color="primary" @click="alert('preview')">
        Post
      </v-btn>
    </template>
  </BaseForm>
</template>

<script>
import BaseForm from '@/components/BaseForm'
import PostFormContentInput from '@/components/PostFormContentInput'
import PreviewDialog from '@/components/PreviewDialog'

export default {
  components: {
    BaseForm,
    PostFormContentInput,
    PreviewDialog
  },
  props: {
    contentType: String
  },
  data() {
    return {
      stepNum: 1,
      item: {}
    }
  }
}
</script>
