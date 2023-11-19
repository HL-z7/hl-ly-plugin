import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'icqq仓库',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'icqq仓库',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[hl-plugin]')
  e.reply(`https://github.com/icqqjs/icqq`)
    return true
  }
}
