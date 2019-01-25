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

                <h1>Submit a new item</h1>
                <p class="py-2">
                    You can fill out the following form, preview the result, and submit the item.
                </p>
                
                <submit-form></submit-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import SubmitForm from '@/components/SubmitForm';

export default {
    components: {
        SubmitForm,
    }
}
</script>

<style>
    
</style>