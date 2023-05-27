const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
const { stringify } = require('yaml')

const BASE_PATH = 'infographics'
const YAML_PATH = 'index.yaml'

const slidesets = fs.readdirSync(BASE_PATH)
const details = slidesets
  .map(folder => {
    const filepath = path.join(BASE_PATH, folder)
    const files = fs.readdirSync(filepath)
    const details = {
      title: '',
      path: folder,
      slides: files.map(file => getImageDetails(filepath, file))
    }

    return details
  })
const yaml = stringify(details)

fs.writeFileSync(YAML_PATH, yaml, { encoding: 'utf-8', flag: 'w' })
console.log(`${details.length} total slidesets written to YAML file.`)

function getImageDetails(basepath, file) {
  const dimensions = sizeOf(path.join(basepath, file))
  return {
    path: file,
    height: dimensions.height,
    width: dimensions.width,
    code: '',
    html: '',
    text: ''
  }
}