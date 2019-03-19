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
      :headers="contentType !== 'authors' ? headers : headersAuthor"
      :items="items"
      :search="search"
      :pagination.sync="paginationSync"
    >
      <template slot="items" slot-scope="props">
        <td v-if="contentType !== 'authors'">
          {{ props.item.date ? props.item.date.slice(0, 10) : '' }}
        </td>

        <td>{{ props.item.title }}</td>

        <td class="justify-end layout px-3">
          <PreviewDialog :contentType="contentType" :icon="true">
            <v-icon class="greyicon" @click="previewItem(props.item)">
              visibility
            </v-icon>
          </PreviewDialog>

          <template v-if="type === 'manage'">
            <v-btn v-if="publish" icon @click="unpublishItem(props.item)">
              <v-icon class="greyicon">close</v-icon>
            </v-btn>

            <v-btn v-else icon @click="publishItem(props.item)">
              <v-icon class="greyicon">check</v-icon>
            </v-btn>

            <v-btn v-if="isAdmin" icon @click="deleteItem(props.item)">
              <v-icon color="error">delete_forever</v-icon>
            </v-btn>
          </template>

          <v-btn v-if="type === 'update'" icon @click="editItem(props.item)">
            <v-icon class="greyicon">edit</v-icon>
          </v-btn>
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
          text: 'Date',
          align: 'left',
          value: 'date'
        },
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
      paginationSync: {
        descending: true,
        sortBy: 'date'
      },
      search: ''
    }
  },
  computed: {
    items() {
      return this.$store.state.content.itemlist
    },
    isAdmin() {
      return this.$store.state.auth.role === 'Administrator'
    },
    headersAuthor() {
      return this.headers.filter(el => {
        return el.value !== 'date'
      })
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
    async deleteItem(item) {
      const res = await this.$store.dispatch('content/deleteItem', {
        contentType: this.contentType,
        id: item._id
      })

      if (res.status === 200) {
        alert('Item is deleted.')
        this.$store.dispatch('content/fetchItemList', {
          contentType: this.contentType,
          publish: this.publish
        })
      } else {
        alert('Failed to delete: ' + item.title)
      }
    },
    async editItem(item) {
      const res = await this.$store.dispatch('content/fetchItem', {
        contentType: this.contentType,
        id: item._id
      })

      if (res.status === 200) {
        alert('Item is selected. Proceed to edit.')
      } else {
        alert('Failed to select: ' + item.title)
      }
    }
  }
}
</script>

<style scoped>
.item-table >>> td {
  font-size: 1em;
}

.greyicon {
  color: rgba(0, 0, 0, 0.54) !important;
}
</style>
