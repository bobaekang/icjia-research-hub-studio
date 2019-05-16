<template>
  <BaseViewLayout>
    <template v-slot:title>{{ title }}</template>

    <template v-slot:description>{{ description }}</template>

    <ManageStepper />
  </BaseViewLayout>
</template>

<script>
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const ManageStepper = () => import('@/components/ManageStepper')

export default {
  components: {
    BaseViewLayout,
    ManageStepper
  },
  data() {
    return {
      title: 'Manage contents',
      description:
        'Review and publish submissions or take down published items to make changes.'
    }
  }
}
</script>
