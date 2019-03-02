<template>
  <BaseLayout>
    <h1>Submit a new item</h1>
    
    <p class="py-2">
      You can fill out the following form, preview the result, and submit the
      item.
    </p>

    <SubmitStepper />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import SubmitStepper from '@/components/SubmitStepper'

export default {
  components: {
    BaseLayout,
    SubmitStepper
  }
}
</script>
