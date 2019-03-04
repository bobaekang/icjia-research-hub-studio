<template>
  <BaseViewLayout>
    <h1>Post a new item</h1>

    <p class="py-2">
      Create a new item to be published.
    </p>

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
  }
}
</script>
