<template>
  <BaseViewLayout>
    <h1>Submit an update</h1>
    <p class="py-2">
      Submit an update to either a submission or a published item. Select an
      item to update, make changes, and submit the update.
    </p>

    <UpdateStepper type="submit" />
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
