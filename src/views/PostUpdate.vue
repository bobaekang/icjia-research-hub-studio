<template>
  <BaseViewLayout>
    <template v-slot:title>{{ title }}</template>

    <template v-slot:description>
      <template>{{ description }}</template>
      <span class="greycolor ml-3">
        <v-icon color="error">warning</v-icon>
        <template>{{ 'Admin only' }}</template>
      </span>
    </template>

    <UpdateStepper type="post" />
  </BaseViewLayout>
</template>

<script>
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const UpdateStepper = () => import('@/components/UpdateStepper')

export default {
  components: {
    BaseViewLayout,
    UpdateStepper
  },
  data() {
    return {
      title: 'Post update',
      description: 'Post updates to existing items.'
    }
  }
}
</script>
