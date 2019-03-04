<template>
  <v-layout row wrap>
    <v-flex xs12 class="mb-3">
      <v-layout>
        <h3>Content type: {{ contentType }}</h3>

        <v-spacer></v-spacer>

        <BaseButtonDialog
          :buttonAction="resetAction"
          buttonName="reset"
          buttonType="error"
        >
          <template v-slot:title>
            <h3>Are you sure?</h3>
          </template>

          <template v-slot:main>
            You will lose the saved work. Are you sure to proceed and reset?
          </template>
        </BaseButtonDialog>

        <BaseButtonDialog
          :buttonAction="formAction"
          :buttonName="formType"
          buttonType="primary"
        >
          <template v-slot:title>
            <h3>Ready to {{ formType }}?</h3>
          </template>

          <template v-slot:main>
            Make sure to preview the content before you {{ formType }} it!
            <br />

            <template v-if="formType === 'submit'">
              You will be able to update your submission later.
              <br />
              Your submission will be published once a manager approves it.
            </template>
          </template>
        </BaseButtonDialog>
      </v-layout>
    </v-flex>

    <v-flex xs12>
      <slot></slot>
    </v-flex>
  </v-layout>
</template>

<script>
import BaseButtonDialog from '@/components/BaseButtonDialog'

export default {
  components: {
    BaseButtonDialog
  },
  props: {
    contentType: String,
    formType: String
  },
  data() {
    return {
      stepNum: 1
    }
  },
  methods: {
    formAction(formType) {
      if (formType === 'submit') {
        alert('submit')
      } else if (formType === 'post') {
        alert('post')
      }
    },
    resetAction() {
      alert('reset')
    }
  }
}
</script>
