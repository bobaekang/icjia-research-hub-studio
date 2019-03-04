<template>
  <BaseStepper :stepNumTotal="3">
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
      <ItemTable type="update" :contentType="contentType" />
    </template>

    <template v-slot:stepHeader3>
      Update
    </template>

    <template v-slot:stepItem3>
      <v-flex class="no-shadow">
        <SubmitForm v-if="type === 'submit'" :update="true" />
        <PostForm v-if="type === 'post'" :contentType="contentType" />
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
      contentType: 'apps'
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
