//导入node:fs模块
import fs from 'node:fs'

if (!global.segment) {
  global.segment = (await import("oicq")).segment
}

//输出提示
logger.mark('---------HL---------')
logger.debug('\x1b[36m少女祈祷中...\x1b[0m')
logger.info('\x1b[33mhl插件初始化~\x1b[0m')
logger.mark('---------HL---------')

//加载插件
const files = fs.readdirSync('./plugins/hl-plugin/apps').filter(file => file.endsWith('.js'))

let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})


ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
      logger.error(`载入插件错误：${logger.red(name)}`)
      logger.error(ret[i].reason)
      continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}


export { apps }