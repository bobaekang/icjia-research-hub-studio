<template>
    <v-dialog
        v-model="dialog"
        width="500"
        >
        <v-btn
            outline
            slot="activator"
            color="error"
            >
            reset
        </v-btn>

        <v-card>
            <v-card-title
                class="headline grey lighten-2"
                >
                <h3>Are you sure?</h3>                
            </v-card-title>

            <v-card-text>
                You will lose the saved work. Are you sure to proceed and reset?
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    flat
                    @click="dialog = false"
                    >
                    back
                </v-btn>
                
                <v-btn
                    color="error"
                    flat
                    @click="dialog = false"
                    >
                    reset
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data () {
        return {
            dialog: false
        }
    }
}
</script>