<template>
    <v-container>
        <router-link :to="`/${task.path}`">
            <v-card
                hover
                height="150"
                >
                <v-container
                    align-center
                    justify-center
                    fill-height
                    >
                    <h3>{{ task.title.toUpperCase() }}</h3>
                </v-container>
            </v-card>
        </router-link>
    </v-container>
</template>

<script>
export default {
    props: {
        task: Object,
    }
}
</script>

<style>
    
</style>