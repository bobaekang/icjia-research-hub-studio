<template>
    <v-container>
        <v-layout
            justify-center
            >
            <v-flex
                xs12
                sm10
                md8
                >

                <h1>Post a new item</h1>
                <p class="py-2">
                    Create a new item to be published.
                </p>

                <post-form></post-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import PostForm from '@/components/PostForm';

export default {
    components: {
        PostForm,
    }
}
</script>

<style>
    
</style>