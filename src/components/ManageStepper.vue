<template>
  <BaseStepper :stepNumTotal="2" @stepper-navigate-before="navigateBefore">
    <template v-slot:stepHeader1>
      Select content type
    </template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepHeader2>
      Manage
    </template>

    <template v-slot:stepItem2>
      <v-btn outline color="primary" @click="publish = !publish">
        {{ publish ? 'published' : 'submitted' }}
      </v-btn>

      <ItemTable type="manage" :contentType="contentType" :publish="publish" />
    </template>
  </BaseStepper>
</template>

<script>
import BaseStepper from '@/components/BaseStepper'
import ContentTypeSelector from '@/components/ContentTypeSelector'
import ItemTable from '@/components/ItemTable'

export default {
  components: {
    BaseStepper,
    ContentTypeSelector,
    ItemTable
  },
  props: {
    type: String
  },
  data() {
    return {
      contentTypes: this.$store.state.content.types,
      contentType: 'apps',
      publish: false
    }
  },
  watch: {
    contentType() {
      this.publish = false
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
