<template>
  <v-stepper v-model="stepNum" class="mb-5">
    <v-stepper-header>
      <template v-for="step in stepNumTotal">
        <v-stepper-step
          :key="`step${step}`"
          :complete="stepNum > step"
          :step="step"
        >
          <slot :name="`stepHeader${step}`"></slot>
        </v-stepper-step>

        <v-divider
          :key="`divider${step}`"
          v-if="step < stepNumTotal"
        ></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <template v-for="step in stepNumTotal">
        <v-stepper-content :key="`content${step}`" :step="step">
          <v-layout align-center>
            <v-icon v-if="stepNum > 1" @click="stepNum--">
              navigate_before
            </v-icon>

            <v-flex class="no-shadow mx-3">
              <slot :name="`stepItem${step}`"></slot>
            </v-flex>

            <v-icon v-if="stepNum < stepNumTotal" @click="stepNum++">
              navigate_next
            </v-icon>
          </v-layout>
        </v-stepper-content>
      </template>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
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

<style scoped>
.no-shadow >>> div {
  --webkit-box-shadow: None !important;
  box-shadow: None !important;
}
</style>
