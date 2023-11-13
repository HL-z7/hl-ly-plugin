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
          reg: '5',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[afd.js插件]')
  e.reply(`https://gitee.com/fox-glaze/hl-plugin`)
    return true
  }
}
