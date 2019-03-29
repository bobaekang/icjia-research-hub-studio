<template>
  <BaseViewLayout>
    <template v-slot:title>{{ title }}</template>

    <template v-slot:description>{{ description }}</template>

    <CreateStepper />
  </BaseViewLayout>
</template>

<script>
import BaseViewLayout from '@/components/BaseViewLayout'
import CreateStepper from '@/components/CreateStepper'

export default {
  components: {
    BaseViewLayout,
    CreateStepper
  },
  data() {
    return {
      title: 'Create contents',
      description:
        'You can fill out the following form, preview the result, and create a new item.'
    }
  }
}
</script>
