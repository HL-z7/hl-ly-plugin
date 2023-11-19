import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'HL插件',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'HL插件',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[hl-plugin]')
  e.reply(`https://gitee.com/fox-glaze/hl-plugin`)
    return true
  }
}
