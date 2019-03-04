<template>
  <BaseViewLayout>
    <h1>Submit a new item</h1>
    <p class="py-2">
      You can fill out the following form, preview the result, and submit the
      item.
    </p>

    <SubmitStepper />
  </BaseViewLayout>
</template>

<script>
import BaseViewLayout from '@/components/BaseViewLayout'
import SubmitStepper from '@/components/SubmitStepper'

export default {
  components: {
    BaseViewLayout,
    SubmitStepper
  }
}
</script>
