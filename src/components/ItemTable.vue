<template>
  <v-card>
    <v-card-title>
      <h3>Content type: {{ contentType }}</h3>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      class="item-table"
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>

        <td class="justify-end layout px-3">
          <PreviewDialog :contentType="contentType" :icon="true">
            <v-icon
              style="color:rgba(0,0,0,.54)"
              @click="previewItem(props.item)"
            >
              visibility
            </v-icon>
          </PreviewDialog>
          <v-icon
            v-if="type === 'manage'"
            class="mr-2"
            @click="publishItem(props.item)"
          >
            publish
          </v-icon>
          <v-icon v-if="type === 'update'" @click="editItem(props.item)">
            edit
          </v-icon>
        </td>
      </template>

      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import PreviewDialog from '@/components/PreviewDialog'

export default {
  components: {
    PreviewDialog
  },
  props: {
    contentType: String,
    publish: Boolean,
    type: String
  },
  data() {
    return {
      headers: [
        {
          text: 'Title',
          align: 'left',
          value: 'title'
        },
        {
          text: 'Actions',
          align: 'right',
          value: 'title',
          sortable: false
        }
      ],
      search: ''
    }
  },
  computed: {
    items() {
      return this.$store.state.content.itemlist
    }
  },
  watch: {
    contentType() {
      const payload = {
        contentType: this.contentType,
        publish: this.publish
      }
      this.$store.dispatch('content/fetchItemList', payload)
    }
  },
  created() {
    const payload = {
      contentType: this.contentType,
      publish: this.publish
    }
    this.$store.dispatch('content/fetchItemList', payload)
  },
  methods: {
    previewItem(item) {
      const payload = {
        contentType: this.contentType,
        id: item._id
      }
      this.$store.dispatch('content/fetchItem', payload)
      console.log(item)
    },
    publishItem(item) {
      alert(item + 'now publisehd')
      // this.$store.dispatch('content/publishItem', item.id)
    },
    editItem(item) {
      this.$store.dispatch('content/setItem', item)
      alert('Item is selected. Proceed to edit.')
    }
  }
}
</script>

<style scoped>
.item-table >>> td {
  font-size: 1em;
}
</style>