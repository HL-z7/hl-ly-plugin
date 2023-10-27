import fs from 'fs'
import _ from 'lodash'
import cfg from '../../../lib/config/config.js'
const Plugin_Path = `${process.cwd()}/plugins/cunyx-plugin`
const README_path = `${Plugin_Path}/README.md`
const CHANGELOG_path = `${Plugin_Path}/CHANGELOG.md`

let yunzai_ver = '';
try{
  let packageJson = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8'));
  yunzai_ver = packageJson.version;
}catch(err){}

let logs = {}
let changelogs = []
let currentVersion
let versionCount = 2

const getLine = function (line) {
  line = line.replace(/(^\s*\*|\r)/g, '')
  line = line.replace(/\s*`([^`]+`)/g, '<span class="cmd">$1')
  line = line.replace(/`\s*/g, '</span>')
  line = line.replace(/\s*\*\*([^*]+\*\*)/g, '<span class="strong">$1')
  line = line.replace(/\*\*\s*/g, '</span>')
  line = line.replace(/ⁿᵉʷ/g, '<span class="new"></span>')
  return line
}

try {
  let packageJson = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/hl-plugin/package.json`, 'utf8'));
  currentVersion = packageJson.version;
}catch(err){}

let yunzaiName = cfg.package.name
if (yunzaiName == 'miao-yunzai') {
  yunzaiName = 'Miao-Yunzai'
} else if (yunzaiName == 'yunzai') {
  yunzaiName = 'Yunzai-Bot'
} else if (yunzaiName == 'trss-yunzai') {
  yunzaiName = 'TRSS-Yunzai'
} else {
  yunzaiName = _.capitalize(yunzaiName)
}
let Version = {
  get ver () {
    return currentVersion
  },
  get name () {
    return yunzaiName
  },
  get yunzai () {
    return yunzai_ver
  }
}
export default Version