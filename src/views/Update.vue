<template>
  <BaseViewLayout>
    <h1>Update an item</h1>

    <p class="py-2">Make updates to a published item.</p>

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
