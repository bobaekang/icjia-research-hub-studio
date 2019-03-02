<template>
  <BaseLayout>
    <h1>Submit an update</h1>
    
    <p class="py-2">
      Submit an update to either a submission or a published item. Select an
      item to update, make changes, and submit the update.
    </p>

    <UpdateStepper type="submit" />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import UpdateStepper from '@/components/UpdateStepper'

export default {
  components: {
    BaseLayout,
    UpdateStepper
  }
}
</script>

<style>
</style>
