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
      <v-radio-group v-model="status" row>
        <v-radio
          v-for="status in statusOptions"
          :key="status"
          :label="status[0].toUpperCase() + status.slice(1)"
          :value="status"
        ></v-radio>
      </v-radio-group>

      <ItemTable type="manage" :contentType="contentType" :status="status" />
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
      status: 'submitted'
    }
  },
  computed: {
    statusOptions() {
      switch (this.$store.state.auth.role) {
        case 'R&A User':
          return ['submitted', 'created']
        case 'R&A Manager':
          return ['published', 'submitted']
        default:
          return ['published', 'submitted', 'created']
      }
    }
  },
  watch: {
    contentType() {
      this.status = 'submitted'
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
