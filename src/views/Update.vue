<template>
  <BaseViewLayout>
    <template v-slot:title>{{ title }}</template>

    <template v-slot:description>{{ description }}</template>

    <UpdateStepper type="create" />
  </BaseViewLayout>
</template>

<script>
import BaseViewLayout from '@/components/BaseViewLayout'
import UpdateStepper from '@/components/UpdateStepper'

export default {
  components: {
    BaseViewLayout,
    UpdateStepper
  },
  data() {
    return {
      title: 'Update contents',
      description:
        'Make updates to existing drafts. Select an item to update, make changes, and apply the update.'
    }
  }
}
</script>
