<template>
  <v-stepper v-model="stepNum" vertical non-linear>
    <v-layout justify-end>
      <div class="mt-3 mr-3">
        <BaseButtonDialog buttonName="reset" buttonType="error">
          <template v-slot:title>
            <h3>Are you sure?</h3>
          </template>

          <template v-slot:main>
            You will lose the saved work. Are you sure to proceed and reset?
          </template>
        </BaseButtonDialog>
      </div>
    </v-layout>

    <template v-for="step in stepNumTotal">
      <v-stepper-step
        :key="`step${step}`"
        :complete="stepNum > step"
        :step="step"
      >
        <slot :name="`stepHeader${step}`"></slot>
      </v-stepper-step>

      <v-stepper-content :key="`content${step}`" :step="step">
        <slot :name="`stepItem${step}`"></slot>

        <v-btn v-if="stepNum > 1" outline @click="stepNum--">
          Back
        </v-btn>
        <v-btn
          v-if="stepNum < stepNumTotal"
          outline
          color="primary"
          @click="stepNum++"
        >
          Continue
        </v-btn>
      </v-stepper-content>
    </template>
  </v-stepper>
</template>

<script>
import BaseButtonDialog from '@/components/BaseButtonDialog'

export default {
  components: {
    BaseButtonDialog
  },
  props: {
    stepNumTotal: Number
  },
  data() {
    return {
      stepNum: 1
    }
  }
}
</script>
