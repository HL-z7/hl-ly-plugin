import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '订阅链接',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '7',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[afd.js插件]')
  e.reply(`https://lonan1.luonan.me`)
    return true
  }
}
