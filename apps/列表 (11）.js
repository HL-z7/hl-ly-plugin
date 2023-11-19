import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'oicq',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'oicq',
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
