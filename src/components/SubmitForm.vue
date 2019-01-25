<template>
    <v-stepper
        v-model="stepNum"
        vertical
        non-linear
        >
        <v-layout justify-end>
            <div class="mt-3 mr-3">
                <submit-form-reset-dialog></submit-form-reset-dialog>
            </div>
        </v-layout>

        <v-stepper-step :complete="stepNum > 1" step="1">
            Select content type: {{ contentTypeCapitalized }}
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-radio-group v-model="contentType" row>
                <v-radio
                    label="App"
                    value="app"
                    />
                <v-radio
                    label="Article"
                    value="article"
                    />
                <v-radio
                    label="Dataset"
                    value="dataset"
                    />
            </v-radio-group>
            
            <v-btn
                outline
                color="primary"
                @click="stepNum = 2"
                >
                Continue
            </v-btn>
        </v-stepper-content>

        <v-stepper-step
            editable
            :complete="stepNum > 2" step="2"
            >
            Provide metadata
        </v-stepper-step>

        <v-stepper-content step="2">
            <submit-form-metadata-input :contentType="contentType"></submit-form-metadata-input>

            <v-divider class="mb-2"></v-divider>

            <v-btn
                outline
                @click="stepNum = 1"
                >
                Back
            </v-btn>
            <v-btn
                outline
                color="primary"
                @click="stepNum = 3"
                >
                Continue
            </v-btn>
        </v-stepper-content>

        <v-stepper-step
            editable
            :complete="stepNum > 3" step="3"
            >
            Provide content
        </v-stepper-step>

        <v-stepper-content step="3">
            <submit-form-content-input :contentType="contentType"></submit-form-content-input>
            
            <v-divider class="mb-2"></v-divider>

            <v-btn
                outline
                @click="stepNum = 2"
                >
                Back
            </v-btn>
            <v-btn
                outline
                color="primary"
                @click="stepNum = 4"
                >
                Continue
            </v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">
            Preview and submit
        </v-stepper-step>
        
        <v-stepper-content step="4">
            <preview-dialog :contentType="contentType"></preview-dialog>
            
            <v-divider class="my-2"></v-divider>

            <v-btn
                outline
                @click="stepNum = 3"
                >
                Back
            </v-btn>
            
            <submit-form-submit-dialog></submit-form-submit-dialog>

        </v-stepper-content>
    </v-stepper>
</template>

<script>
import PreviewDialog from '@/components/PreviewDialog'
import SubmitFormContentInput from '@/components/SubmitFormContentInput';
import SubmitFormMetadataInput from '@/components/SubmitFormMetadataInput';
import SubmitFormResetDialog from '@/components/SubmitFormResetDialog';
import SubmitFormSubmitDialog from '@/components/SubmitFormSubmitDialog';

export default {
    components: {
        PreviewDialog,
        SubmitFormContentInput,
        SubmitFormMetadataInput,
        SubmitFormResetDialog,
        SubmitFormSubmitDialog,
    },
    data () {
        return {
            contentType: 'article',
            stepNum: 1
        }
    },
    computed: {
        contentTypeCapitalized () {
            let type = this.contentType;
            return type.charAt(0).toUpperCase() + type.slice(1);
        }
    },
    methods: {
        reset () {
            alert('clear all!');
            this.stepNum = 1;
        },
        submit() {
            alert('submit');
        }
    }
  }
</script>

<style>
    
</style>