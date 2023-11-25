import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'oicq仓库',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'oicq仓库$',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[hl-plugin]')
  e.reply(`https://github.com/takayama-lily/oicq`)
    return true
  }
}
