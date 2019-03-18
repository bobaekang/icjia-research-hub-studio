<template>
  <BaseStepper :stepNumTotal="2">
    <template v-slot:stepHeader1>
      Select content type
    </template>

    <template v-slot:stepHeader2>
      Post
    </template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepItem2>
      <PostForm :contentType="contentType" :update="false" />
    </template>
  </BaseStepper>
</template>

<script>
import BaseStepper from '@/components/BaseStepper'
import PostForm from '@/components/PostForm'
import ContentTypeSelector from '@/components/ContentTypeSelector'

export default {
  components: {
    BaseStepper,
    PostForm,
    ContentTypeSelector
  },
  data() {
    return {
      contentType: 'apps',
      contentTypes: this.$store.state.content.typesAll
    }
  },
  methods: {
    navigateBefore() {
      this.$store.dispatch('content/setItem', {})
    }
  }
}
</script>

<style scoped>
.no-shadow >>> div {
  --webkit-box-shadow: None !important;
  box-shadow: None !important;
}
</style>
