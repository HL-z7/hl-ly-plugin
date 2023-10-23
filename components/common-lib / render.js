import { Data, Version, Plugin_Name } from '../index.js'
import fs from 'fs'

const _path = process.cwd()

export default async function (path, params, cfg) {
  let [app, tpl] = path.split('/')
  let { e } = cfg
  let layoutPath = process.cwd() + `/plugins/${Plugin_Name}/resources/common/layout/`
  let resPath = `../../../../../plugins/${Plugin_Name}/resources/`
  Data.createDir(`data/html/${Plugin_Name}/${app}/${tpl}`, 'root')
  let data = {
    ...params,
    _plugin: Plugin_Name,
    saveId: params.saveId || params.save_id || tpl,
    tplFile: `./plugins/${Plugin_Name}/resources/${app}/${tpl}.html`,
    pluResPath: resPath,
    _res_path: resPath,
    _layout_path: layoutPath,
    _tpl_path: process.cwd() + `/plugins/${Plugin_Name}/resources/common/tpl/`,
    defaultLayout: layoutPath + 'default.html',
    elemLayout: layoutPath + 'elem.html',
    pageGotoParams: {
      waitUntil: 'networkidle0'
    },
    sys: {
      scale: 1,
      copyright: `Created By Yunzai-Bot<span class="version">${Version.yunzai} 🤖</span> & xiaofei-Plugin<span class="version">${Version.ver} 🧩</span>`
    },
    quality: 100
  }
  if (process.argv.includes('web-debug')) {
    // debug下保存当前页面的渲染数据，方便模板编写与调试
    // 由于只用于调试，开发者只关注自己当时开发的文件即可，暂不考虑app及plugin的命名冲突
    let saveDir = _path + '/data/ViewData/'
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir)
    }
    let file = saveDir + tpl + '.json'
    data._app = app
    fs.writeFileSync(file, JSON.stringify(data))
  }
  let img = await xiaofei_plugin.puppeteer.screenshot(`${Plugin_Name}/${app}/${tpl}`, data)
  let ret = true
  if (img) {
    if (img?.type != 'image') img = segment.image(img)
    ret = await e.reply(img)
  }
  return cfg.retMsgId ? ret : true
}