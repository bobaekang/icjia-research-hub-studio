<template>
  <BaseViewLayout>
    <h1>Post new</h1>

    <p class="py-2">
      Post new items of any type and status.
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
