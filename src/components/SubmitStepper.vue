<template>
  <BaseStepper :stepNumTotal="2">
    <template v-slot:stepHeader1>
      Select content type
    </template>

    <template v-slot:stepHeader2>
      Submit
    </template>

    <template v-slot:stepItem1>
      <TheContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepItem2>
      <SubmitForm :contentType="contentType" :update="false" />
    </template>
  </BaseStepper>
</template>

<script>
import BaseStepper from '@/components/BaseStepper'
import SubmitForm from '@/components/SubmitForm'
import TheContentTypeSelector from '@/components/TheContentTypeSelector'

export default {
  components: {
    BaseStepper,
    SubmitForm,
    TheContentTypeSelector
  },
  data() {
    return {
      contentTypes: this.$store.state.content.types,
      contentType: 'apps'
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
