export const baseActionMixin = {
  methods: {
    onMain() {
      if (this.update) {
        this.$store.dispatch('content/updateItem', this.contentType)
        alert('Item updated--back to home!')
      } else {
        this.$store.dispatch('content/createItem', this.contentType)
        alert('New item created--back to home!')
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

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = reject

    reader.readAsText(file)
  })
}

export const dropzoneMixin = {
  methods: {
    async addDropzoneFiles(item, contentType, dropzoneList) {
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
            console.log(file)
            return {
              title: file.name
                .split('.')
                .slice(0, -1)
                .join('.'),
              src: file.dataURL
            }
          })
        }
      } else if (contentType === 'datasets') {
        if (hasAcceptedFiles(_.data)) {
          item.datacsv = await readFileAsync(_.data.getAcceptedFiles()[0])
        }
      }

      if (this.$options.name === 'postform') {
        if (hasAcceptedFiles(_.json)) {
          const json = await readFileAsync(_.json.getAcceptedFiles()[0])
          Object.assign(item, JSON.parse(json))
        }

        if (contentType === 'articles' && hasAcceptedFiles(_.markdown)) {
          item.markdown = await readFileAsync(_.markdown.getAcceptedFiles()[0])
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
