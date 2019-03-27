<template>
  <BaseViewLayout>
    <h1>Create contents</h1>

    <p class="py-2">
      You can fill out the following form, preview the result, and create a new
      item.
    </p>

    <CreateStepper />
  </BaseViewLayout>
</template>

<script>
import BaseViewLayout from '@/components/BaseViewLayout'
import CreateStepper from '@/components/CreateStepper'

export default {
  components: {
    BaseViewLayout,
    CreateStepper
  }
}
</script>
