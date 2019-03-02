<template>
  <BaseLayout>
    <h1>Manage submissions</h1>

    <p class="py-2">
      Review and publish submissions
    </p>

    <ManageStepper />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import ManageStepper from '@/components/ManageStepper'

export default {
  components: {
    BaseLayout,
    ManageStepper
  }
}
</script>

<style>
</style>
