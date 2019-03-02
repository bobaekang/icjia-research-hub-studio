<template>
  <BaseLayout>
    <h1>Post a new item</h1>

    <p class="py-2">
      Create a new item to be published.
    </p>

    <PostStepper />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import PostStepper from '@/components/PostStepper'

export default {
  components: {
    BaseLayout,
    PostStepper
  }
}
</script>

<style>
</style>
