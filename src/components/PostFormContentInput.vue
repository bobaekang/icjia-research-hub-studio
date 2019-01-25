<template>
    <v-form class="mb-5"> 
        <v-layout
            class="pl-3"
            row
            wrap
            >
            <v-flex class="pb-2" xs12>
                <p class="input-title">JSON file</p>
                <file-reader class="pb-2" fileType="json"></file-reader>
            </v-flex>

            <v-flex
                v-if="contentType === 'dataset'"
                class="pb-2"
                xs12
                >
                <p class="input-title">CSV data</p>
                <file-reader class="pb-2" fileType="csv"></file-reader>
            </v-flex>

            <template v-if="contentType === 'article'">
                <v-flex class="pb-2" xs12>
                    <p class="input-title">Splash image</p>
                    <file-reader class="pb-2" fileType="img"></file-reader>
                </v-flex>

                <v-flex class="pb-2" xs12>
                    <p class="input-title">Markdown file</p>
                    <file-reader class="pb-2" fileType="img"></file-reader>
                </v-flex>

                <v-flex class="pb-2" xs12>
                    <p class="input-title">Article images</p>

                    <div
                        v-for="i in imgNum"
                        :key="i"
                        >
                        <file-reader class="pb-4" fileType="img"></file-reader>
                    </div>

                    <v-btn
                        outline
                        @click="imgNum++"
                        >
                        add image
                    </v-btn>

                    <v-btn
                        v-if="imgNum > 0"
                        outline
                        color="error"
                        @click="imgNum--"
                        >
                        remove image
                    </v-btn>
                </v-flex>
            </template>
        </v-layout>

        <v-btn
            class="mt-5"
            outline
            color = "primary"
            @click="onSaveChanges"
            >
            Save changes
        </v-btn>
    </v-form>
</template>

<script>
import FileReader from '@/components/FileReader';

export default {
    components: {
        FileReader,
    },
    props: {
        contentType: String,
        content: Object
    },
    data () {
        return {
            imgNum: 0,
        }
    }
}
</script>

<style scoped>
.input-title {
    color: rgba(0,0,0,.54);
}    
</style>