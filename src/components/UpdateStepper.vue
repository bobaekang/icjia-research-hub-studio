<template>
  <v-stepper v-model="stepNum">
    <v-stepper-header>
      <v-stepper-step :complete="stepNum > 1" step="1">
        Select item
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="stepNum > 2" step="2">
        Update
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-layout align-center>
          <v-flex class="no-shadow mx-3">
            <the-item-table type="update"></the-item-table>
          </v-flex>

          <v-icon icon @click="stepNum = 2">
            navigate_next
          </v-icon>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-layout align-center>
          <v-icon @click="stepNum = 1">
            navigate_before
          </v-icon>

          <v-flex v-if="type === 'submit'" class="no-shadow">
            <submit-form update="true"></submit-form>
          </v-flex>

          <v-flex v-if="type === 'post'" class="no-shadow">
            <post-form></post-form>
          </v-flex>
        </v-layout>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import TheItemTable from '@/components/TheItemTable'
import PostForm from '@/components/PostForm'
import SubmitForm from '@/components/SubmitForm'

export default {
  components: {
    TheItemTable,
    PostForm,
    SubmitForm
  },
  props: {
    type: String
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