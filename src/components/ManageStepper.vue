<template>
  <BaseStepper :stepNumTotal="2">
    <template v-slot:stepHeader1>
      Select content type
    </template>

    <template v-slot:stepItem1>
      <TheContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepHeader2>
      Manage
    </template>

    <template v-slot:stepItem2>
      <TheItemTable type="manage" :contentType="contentType" />
    </template>
  </BaseStepper>
</template>

<script>
import BaseStepper from '@/components/BaseStepper'
import TheContentTypeSelector from '@/components/TheContentTypeSelector'
import TheItemTable from '@/components/TheItemTable'

export default {
  components: {
    BaseStepper,
    TheContentTypeSelector,
    TheItemTable
  },
  props: {
    type: String
  },
  data() {
    return {
      stepNum: 1,
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
