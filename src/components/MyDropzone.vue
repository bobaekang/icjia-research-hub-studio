<template>
  <div>
    <BaseDropzone
      ref="MyDropzone"
      id="dropzone"
      @vdropzone-file-added="vfileAdded"
      @vdropzone-error="verror"
      @vdropzone-removed-file="vremoved"
      @vdropzone-total-upload-progress="vprogress"
      @vdropzone-mounted="vmounted"
      @vdropzone-duplicate-file="vdduplicate"
      :options="dropzoneOptions"
      :duplicateCheck="true"
    >
      <slot></slot>
    </BaseDropzone>
  </div>
</template>

<script>
import BaseDropzone from '@/components/BaseDropzone'

export default {
  components: {
    BaseDropzone
  },
  props: {
    fileTypes: String,
    limitFilesize: {
      type: Boolean,
      default: true
    },
    maxOne: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: this.limitFilesize ? 0.5 : null,
        maxFiles: this.maxOne ? 1 : null,
        acceptedFiles: this.fileTypes,
        addRemoveLinks: true,
        autoProcessQueue: false,
        accept(file, done) {
          done()
        }
      },
      fileAdded: false,
      error: false,
      removedFile: false,
      uploadProgress: false,
      progress: false,
      myProgress: 0,
      isMounted: false,
      dDuplicate: false
    }
  },
  methods: {
    vfileAdded(file) {
      this.fileAdded = true
      this.$refs.MyDropzone.$el.querySelector('.dz-progress').remove()
    },
    verror(file) {
      this.files = this.files.filter((value, index, arr) => {
        return value.name !== file.name
      })
      this.error = true
    },
    vremoved(file, xhr, error) {
      this.files = this.files.filter((value, index, arr) => {
        return value.name !== file.name
      })
      this.removedFile = true
    },
    vprogress(totalProgress, totalBytes, totalBytesSent) {
      this.progress = true
      this.myProgress = Math.floor(totalProgress)
    },
    vmounted() {
      this.isMounted = true
    },
    vdduplicate() {
      this.dDuplicate = true
    }
  },
  watch: {
    fileAdded() {
      let that = this
      setTimeout(function() {
        that.fileAdded = false
      }, 2000)
    },
    error() {
      let that = this
      setTimeout(function() {
        that.error = false
      }, 2000)
    },
    removedFile() {
      let that = this
      setTimeout(function() {
        that.removedFile = false
      }, 2000)
    },
    progress() {
      let that = this
      setTimeout(function() {
        that.progress = false
      }, 2000)
    },
    isMounted() {
      let that = this
      setTimeout(function() {
        that.isMounted = false
      }, 2000)
    },
    dDuplicate() {
      let that = this
      setTimeout(function() {
        that.dDuplicate = false
      }, 2000)
    }
  }
}
</script>
