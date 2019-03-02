<template>
  <BaseLayout>
    <h1>Update an item</h1>
    
    <p class="py-2">
      Make updates to a published item.
    </p>

    <UpdateStepper type="post" />
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
