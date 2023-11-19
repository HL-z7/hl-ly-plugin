import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '千羽插件',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '千羽插件',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[hl-plugin]')
  e.reply(`https://gitee.com/think-first-sxs/reset-qianyu-plugin`)
    return true
  }
}
