<template>
  <BaseStepper :stepNumTotal="2" @stepper-navigate-before="navigateBefore">
    <template v-slot:stepHeader1>{{ stepHeader1 }}</template>

    <template v-slot:stepHeader2>{{ stepHeader2 }}</template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepItem2>
      <CreateForm :contentType="contentType" :update="false" />
    </template>
  </BaseStepper>
</template>

<script>
import BaseStepper from '@/components/BaseStepper'
import ContentTypeSelector from '@/components/ContentTypeSelector'
import CreateForm from '@/components/CreateForm'

export default {
  components: {
    BaseStepper,
    ContentTypeSelector,
    CreateForm
  },
  data() {
    return {
      contentType: 'apps',
      contentTypes: this.$store.state.content.types,
      stepHeader1: 'Select content type',
      stepHeader2: 'Create'
    }
  },
  methods: {
    navigateBefore() {
      this.$store.dispatch('content/setItem', {})
      this.$store.dispatch('content/setItemId', '')
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
