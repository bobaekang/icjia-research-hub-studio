<template>
  <v-card>
    <v-card-title>
      <p class="font-lato bold large">
        <template>{{ 'Content type: ' }}</template>
        <span class="capitalize">{{ contentType }}</span>
      </p>

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
      v-if="items"
      class="item-table"
      :headers="contentType !== 'authors' ? headers : headersAuthor"
      :items="items"
      :search="search"
      :pagination.sync="paginationSync"
    >
      <template slot="items" slot-scope="props">
        <td v-if="contentType !== 'authors' && props.item.date">
          <template>{{ props.item.date.slice(0, 10) }}</template>
        </td>

        <td>{{ props.item.title }}</td>

        <td class="justify-end layout px-3">
          <PreviewDialog
            :contentType="contentType"
            :icon="true"
            :id="props.item._id"
          >
            <v-icon class="greyicon" @click="previewItem(props.item)">
              <template>{{ 'visibility' }}</template>
            </v-icon>
          </PreviewDialog>

          <template v-if="type === 'manage'">
            <template v-if="isRoleUser">
              <template v-if="isStatusSubmitted">
                <v-btn icon @click="updateToCreated(props.item)">
                  <v-icon class="greyicon">close</v-icon>
                </v-btn>
              </template>

              <template v-if="isStatusCreated">
                <v-btn icon @click="updateToSubmitted(props.item)">
                  <v-icon class="greyicon">check</v-icon>
                </v-btn>
                <v-btn icon @click="deleteItem(props.item)">
                  <v-icon color="error">delete_forever</v-icon>
                </v-btn>
              </template>
            </template>

            <template v-if="isRoleManager">
              <v-btn
                v-if="isStatusSubmitted"
                icon
                @click="updateToPublished(props.item)"
              >
                <v-icon class="greyicon">check</v-icon>
              </v-btn>

              <v-btn
                v-if="isStatusPublished"
                icon
                @click="updateToSubmitted(props.item)"
              >
                <v-icon class="greyicon">close</v-icon>
              </v-btn>
            </template>

            <template v-if="isRoleAdmin">
              <template v-if="isStatusPublished">
                <v-btn icon @click="updateToSubmitted(props.item)">
                  <v-icon class="greyicon">close</v-icon>
                </v-btn>
              </template>

              <template v-if="isStatusSubmitted">
                <v-btn icon @click="updateToPublished(props.item)">
                  <v-icon class="greyicon">check</v-icon>
                </v-btn>
                <v-btn icon @click="updateToCreated(props.item)">
                  <v-icon class="greyicon">close</v-icon>
                </v-btn>
              </template>

              <template v-if="isStatusCreated">
                <v-btn icon @click="updateToSubmitted(props.item)">
                  <v-icon class="greyicon">check</v-icon>
                </v-btn>
              </template>

              <v-btn icon @click="deleteItem(props.item)">
                <v-icon color="error">delete_forever</v-icon>
              </v-btn>
            </template>
          </template>

          <v-btn v-if="type === 'update'" icon @click="editItem(props.item)">
            <v-icon class="greyicon">edit</v-icon>
          </v-btn>
        </td>
      </template>

      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        <template>{{ msgNoResult }}</template>
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
const PreviewDialog = () => import('@/components/PreviewDialog')

export default {
  components: {
    PreviewDialog
  },
  props: {
    contentType: String,
    status: String,
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
      componentKey: 0,
      search: ''
    }
  },
  computed: {
    items() {
      return this.$store.state.content.itemlist
    },
    isRoleAdmin() {
      return this.$store.state.auth.role === 'Administrator'
    },
    isRoleManager() {
      return this.$store.state.auth.role === 'R&A Manager'
    },
    isRoleUser() {
      return this.$store.state.auth.role === 'R&A User'
    },
    isStatusCreated() {
      return this.status === 'created'
    },
    isStatusPublished() {
      return this.status === 'published'
    },
    isStatusSubmitted() {
      return this.status === 'submitted'
    },
    headersAuthor() {
      return this.headers.filter(el => {
        return el.value !== 'date'
      })
    },
    msgNoResult() {
      return `Your search for "${this.search}" found no results.`
    }
  },
  watch: {
    contentType() {
      this.$store.dispatch('content/fetchItemList', {
        contentType: this.contentType,
        status: this.status
      })
    },
    status() {
      this.$store.dispatch('content/fetchItemList', {
        contentType: this.contentType,
        status: this.status
      })
    }
  },
  created() {
    this.$store.dispatch('content/fetchItemList', {
      contentType: this.contentType,
      status: this.status
    })
  },
  mounted() {
    this.$watch(
      'status',
      () => {
        this.rerender()
      },
      { immediate: true }
    )
  },
  methods: {
    rerender() {
      this.componentKey += 1
    },
    async previewItem(item) {
      await this.$store.dispatch('content/fetchItem', {
        contentType: this.contentType,
        id: item._id
      })
    },
    async updateToCreated(item) {
      const res = await this.$store.dispatch('content/updateItemToCreated', {
        contentType: this.contentType,
        id: item._id
      })

      if (res && res.status === 200) {
        alert('Status updated to created: ' + item.title)
        this.$store.dispatch('content/fetchItemList', {
          contentType: this.contentType,
          status: this.status
        })
      } else {
        alert('Failed to update status: ' + item.title)
      }
    },
    async updateToPublished(item) {
      const res = await this.$store.dispatch('content/updateItemToPublished', {
        contentType: this.contentType,
        id: item._id
      })

      if (res && res.status === 200) {
        alert('Status updated to publisehd: ' + item.title)
        this.$store.dispatch('content/fetchItemList', {
          contentType: this.contentType,
          status: this.status
        })
      } else {
        alert('Failed to update status: ' + item.title)
      }
    },
    async updateToSubmitted(item) {
      const res = await this.$store.dispatch('content/updateItemToSubmitted', {
        contentType: this.contentType,
        id: item._id
      })

      if (res && res.status === 200) {
        alert('Status updated to submitted: ' + item.title)
        this.$store.dispatch('content/fetchItemList', {
          contentType: this.contentType,
          status: this.status
        })
      } else {
        alert('Failed to update status: ' + item.title)
      }
    },
    async deleteItem(item) {
      const res = await this.$store.dispatch('content/deleteItem', {
        contentType: this.contentType,
        id: item._id
      })

      if (res && res.status === 200) {
        alert('Item is deleted.')
        this.$store.dispatch('content/fetchItemList', {
          contentType: this.contentType,
          status: this.status
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

      if (res && res.status === 200) {
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
