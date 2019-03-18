export const baseActionMixin = {
  methods: {
    onMain() {
      if (this.update) {
        this.$store.dispatch('content/updateItem', this.contentType)
        alert('Update submitted--back to home!')
      } else {
        this.$store.dispatch('content/submitItem', this.contentType)
        alert('New item submitted--back to home!')
      }
      this.$router.push('/')
    },
    onReset() {
      this.resetItem(this.update)
      this.removeDropzoneFiles(this.dropzoneVm)
    }
  }
}

const hasAcceptedFiles = dz => {
  return dz.getAcceptedFiles().length > 0
}

export const dropzoneMixin = {
  methods: {
    addDropzoneFiles(item, contentType, dropzoneList) {
      const _ = dropzoneList

      if (contentType === 'apps') {
        if (hasAcceptedFiles(_.image)) {
          item.image = _.image.getAcceptedFiles()[0].dataURL
        }
      } else if (contentType === 'articles') {
        if (hasAcceptedFiles(_.splash)) {
          item.splash = _.splash.getAcceptedFiles()[0].dataURL
        }

        if (hasAcceptedFiles(_.images)) {
          item.images = _.images.getAcceptedFiles().map(file => {
            return {
              title: file.name,
              src: file.dataURL
            }
          })
        }
      } else if (contentType === 'datasets') {
        if (hasAcceptedFiles(_.data)) {
          const reader = new FileReader()
          reader.readAsText(_.data.getAcceptedFiles()[0])
          reader.onloadend = () => (item.datacsv = reader.result)
        }
      }

      if (this.$options.name === 'postform') {
        if (hasAcceptedFiles(_.json)) {
          const reader = new FileReader()
          reader.readAsText(_.json.getAcceptedFiles()[0])
          reader.onloadend = () =>
            Object.assign(item, JSON.parse(reader.result))
        }

        if (contentType === 'articles' && hasAcceptedFiles(_.markdown)) {
          const reader = new FileReader()
          reader.readAsText(_.markdown.getAcceptedFiles()[0])
          reader.onloadend = () => (item.markdown = reader.result)
        }
      }
    },
    removeDropzoneFiles(dropzoneList) {
      Object.keys(dropzoneList).forEach(k => {
        if (dropzoneList[k]) dropzoneList[k].removeAllFiles()
      })
    }
  }
}
