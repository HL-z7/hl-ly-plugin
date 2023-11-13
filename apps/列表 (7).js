import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'icqq',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'icqq',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[afd.js插件]')
  e.reply(`https://github.com/icqqjs/icqq`)
    return true
  }
}
