<template>
  <BaseViewLayout>
    <h1>Manage submissions</h1>

    <p class="py-2">
      Review and publish submissions
    </p>

    <ManageStepper />
  </BaseViewLayout>
</template>

<script>
import BaseViewLayout from '@/components/BaseViewLayout'
import ManageStepper from '@/components/ManageStepper'

export default {
  components: {
    BaseViewLayout,
    ManageStepper
  }
}
</script>
