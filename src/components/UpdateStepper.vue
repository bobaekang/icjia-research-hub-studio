<template>
  <BaseStepper :stepNumTotal="3" @stepper-navigate-before="navigateBefore">
    <template v-slot:stepHeader1>
      Select content type
    </template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepHeader2>
      Select item
    </template>

    <template v-slot:stepItem2>
      <v-btn
        v-if="type === 'post' && contentType !== 'authors'"
        outline
        color="primary"
        @click="publish = !publish"
      >
        {{ publish ? 'published' : 'submitted' }}
      </v-btn>

      <ItemTable type="update" :contentType="contentType" :publish="publish" />
    </template>

    <template v-slot:stepHeader3>
      Update
    </template>

    <template v-slot:stepItem3>
      <v-flex class="no-shadow">
        <SubmitForm
          v-if="type === 'submit'"
          :contentType="contentType"
          :update="true"
        />

        <PostForm
          v-if="type === 'post'"
          :contentType="contentType"
          :update="true"
        />
      </v-flex>
    </template>
  </BaseStepper>
</template>

<script>
import BaseStepper from '@/components/BaseStepper'
import ContentTypeSelector from '@/components/ContentTypeSelector'
import ItemTable from '@/components/ItemTable'
import PostForm from '@/components/PostForm'
import SubmitForm from '@/components/SubmitForm'

export default {
  components: {
    BaseStepper,
    ContentTypeSelector,
    ItemTable,
    PostForm,
    SubmitForm
  },
  props: {
    type: String
  },
  data() {
    return {
      contentTypes:
        this.type === 'post'
          ? this.$store.state.content.allTypes
          : this.$store.state.content.types,
      contentType: 'apps',
      publish: false
    }
  },
  watch: {
    contentType() {
      this.publish = false
    }
  },
  methods: {
    navigateBefore(step) {
      console.log(step)
      if (step.to === 2) {
        this.$store.dispatch('content/setItem', {})
      }
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
