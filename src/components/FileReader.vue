<template>
    <div>
        <input
            v-if="textTypes.indexOf(fileType) > -1"
            type="file"
            @change="readText"
            >
                
        <input
            v-if="fileType === 'img'"
            type="file"
            @change="readImage"
            >
    </div>
</template>

<script>
export default {
    props: {
        fileType: String, // csv, json, md or img
    },
    data () {
        return {
            validator: null,
            textTypes: ['csv', 'json', 'md']
        }
    },
    mounted () {
        if (this.textTypes.indexOf(this.fileType) > -1) {
            this.validator = (filename) => {
                return filename.endsWith(`.${this.fileType}`);
            }
        } else if (this.fileType === 'img') {
            this.validator = (filename) => {
                return filename.endsWith('.png') ||
                    filename.endsWith('.jpeg') ||
                    filename.endsWith('.jpg') ||
                    filename.endsWith('.gif');
            }
        }
    },
    methods: {
        readText (e) {
            const file = e.target.files[0];

            if (this.validator(file.name)) {
                const reader = new FileReader();

                reader.onload = e => this.$emit('load', e.target.result)
                reader.readAsText(file);
            } else {
                e.target.value = '';
                alert('Incorrect format!');
            }
        },
        readImage (e) {
            const file = e.target.files[0]

            if (this.validator(file.name)) {
                const reader = new FileReader();
            
                reader.onload = e => this.$emit('load', e.target.result)
                reader.readAsDataURL(file);
            } else {
                e.target.value = '';
                alert('Incorrect format!');
            }
        }
    }
}
</script>