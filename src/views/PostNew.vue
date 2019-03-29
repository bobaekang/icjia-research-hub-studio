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

    <PostStepper />
  </BaseViewLayout>
</template>

<script>
import BaseViewLayout from '@/components/BaseViewLayout'
import PostStepper from '@/components/PostStepper'

export default {
  components: {
    BaseViewLayout,
    PostStepper
  },
  data() {
    return {
      title: 'Post new',
      description: 'Post new items of any type and status.'
    }
  }
}
</script>
