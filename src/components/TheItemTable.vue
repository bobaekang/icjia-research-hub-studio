<template>
    <v-card>
        <v-card-title>
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
            :headers="headers"
            :items="items"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="justify-end layout px-3">
                    <v-icon
                        class="mr-2"
                        @click="previewItem(props.item)"
                        >
                        visibility
                    </v-icon>
                    <v-icon
                        v-if="type === 'manage'"
                        class="mr-2"
                        @click="publishItem(props.item)"
                        >
                        publish
                    </v-icon>
                    <v-icon
                        v-if="type === 'update'"
                        @click="editItem(props.item)"
                        >
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
export default {
    props: {
        type: String,
    },
    data () {
        return {
            headers: [
                {
                    text: 'Title',
                    align: 'left',
                    value: 'name'
                },
                {
                    text: 'Actions',
                    align: 'right',
                    value: 'name',
                    sortable: false 
                }
            ],
            items: [],
            search: ''
        }
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.items = [
                {
                    name: 'Frozen Yogurt',
                },
                {
                    name: 'Ice cream sandwich',
                },
                {
                    name: 'Eclair',
                },
                {
                    name: 'Cupcake',
                },
                {
                    name: 'Gingerbread',
                },
                {
                    name: 'Jelly bean',
                },
                {
                    name: 'Lollipop',
                },
                {
                    name: 'Honeycomb',
                },
                {
                    name: 'Donut',
                },
                {
                    name: 'KitKat',
                }
            ]
        },
        previewItem (item) {
            alert('preview this');
        },
        publishItem (item) {
            alert('publish this');
        },
        editItem (item) {
            alert('edit this');
        },
    }
}
</script>