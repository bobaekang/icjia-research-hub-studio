<template>
    <div class="mb-2">
        <v-form class="my-3">
            <v-layout row wrap>
                <v-flex
                    class="px-3"
                    xs12
                    md6
                    lg4
                    >
                    <v-text-field
                        v-model="title"
                        :counter="max"
                        :rules="rules"
                        label="Title"
                        />
                </v-flex>
                
                <v-flex
                    class="px-3"
                    xs12
                    md6
                    lg4
                    >
                    <v-text-field
                        v-model="slug"
                        :counter="max"
                        :rules="rules"
                        label="Slug"
                        />
                </v-flex>                
            </v-layout>

            <v-layout row>
                <v-flex
                    class="px-3"
                    xs12
                    md6
                    lg4
                    >
                    <the-date-picker></the-date-picker>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex
                    class="px-3"
                    xs12
                    md6
                    lg4
                    >
                    <v-select
                        :items="categoryOptions"
                        v-model="categories"
                        label="Categories"
                        hint="Select categories"
                        persistent-hint
                        multiple
                        />
                </v-flex>

                <v-flex
                    class="px-3"
                    xs12
                    md6
                    lg4
                    >
                    <v-text-field
                        v-model="tags"
                        label="Tags"
                        hint="Separate tags with commas"
                        persistent-hint
                        />
                </v-flex>
            </v-layout>
        </v-form>

        <v-btn
            class="mt-5"
            outline
            color = "primary"
            @click="onSaveChanges"
            >
            save changes
        </v-btn>
    </div>
</template>

<script>
import TheDatePicker from '@/components/TheDatePicker';

export default {
    components: {
        TheDatePicker,
    },
    props: {
        contentType: String,
        content: Object,
    },
    data () {
        return {
            title: '',
            slug: '',
            date:  '',
            categories: [],
            categoryOptions: [
                'corrections',
                'courts',
                'crimes',
                'law enforcement',
                'other'
            ],
            tags: '',
        }
    },
    methods: {
        onSaveChanges () {
            alert('changes saved');
        }
    }
}
</script>