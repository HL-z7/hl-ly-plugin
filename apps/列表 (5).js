import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '千羽插件',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '4',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[afd.js插件]')
  e.reply(`https://gitee.com/think-first-sxs/reset-qianyu-plugin`)
    return true
  }
}
