<template>
  <BaseViewLayout>
    <template v-slot:title>{{ title }}</template>

    <template v-slot:description>{{ description }}</template>

    <CreateStepper />
  </BaseViewLayout>
</template>

<script>
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const CreateStepper = () => import('@/components/CreateStepper')

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
