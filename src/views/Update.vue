<template>
  <BaseViewLayout>
    <h1>Update contents</h1>

    <p class="py-2">
      Make updates to existing drafts. Select an item to update, make changes,
      and apply the update.
    </p>

    <UpdateStepper type="create" />
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
