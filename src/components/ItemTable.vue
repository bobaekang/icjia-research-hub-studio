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

          <template v-if="type === 'manage'">
            <v-icon
              v-if="publish"
              class="mr-2"
              @click="unpublishItem(props.item)"
            >
              close
            </v-icon>
            <v-icon v-else class="mr-2" @click="publishItem(props.item)">
              check
            </v-icon>
          </template>

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
      this.$store.dispatch('content/fetchItemList', {
        contentType: this.contentType,
        publish: this.publish
      })
    },
    publish() {
      this.$store.dispatch('content/fetchItemList', {
        contentType: this.contentType,
        publish: this.publish
      })
    }
  },
  created() {
    this.$store.dispatch('content/fetchItemList', {
      contentType: this.contentType,
      publish: this.publish
    })
  },
  methods: {
    async previewItem(item) {
      await this.$store.dispatch('content/fetchItem', {
        contentType: this.contentType,
        id: item._id
      })
      console.log(item)
    },
    async publishItem(item) {
      const res = await this.$store.dispatch('content/publishItem', {
        contentType: this.contentType,
        id: item._id
      })

      if (res.status === 200) {
        alert('Now publisehd: ' + item.title)
        this.$store.dispatch('content/fetchItemList', {
          contentType: this.contentType,
          publish: this.publish
        })
      } else {
        alert('Failed to publish: ' + item.title)
      }
    },
    async unpublishItem(item) {
      const res = await this.$store.dispatch('content/unpublishItem', {
        contentType: this.contentType,
        id: item._id
      })

      if (res.status === 200) {
        alert('Now unpublisehd: ' + item.title)
        this.$store.dispatch('content/fetchItemList', {
          contentType: this.contentType,
          publish: this.publish
        })
      } else {
        alert('Failed to unpublish: ' + item.title)
      }
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
