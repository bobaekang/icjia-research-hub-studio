<template>
  <BaseViewLayout>
    <h1>Post update</h1>

    <p class="py-2">
      Post updates to existing items.
    </p>

    <UpdateStepper type="post" />
  </BaseViewLayout>
</template>

<script>
import BaseViewLayout from '@/components/BaseViewLayout'
import UpdateStepper from '@/components/UpdateStepper'

export default {
  components: {
    BaseViewLayout,
    UpdateStepper
  }
}
</script>
