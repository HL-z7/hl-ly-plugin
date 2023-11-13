import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '寒暄官网',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '1',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[afd.js插件]')
  e.reply(`hanxuan.cc`)
    return true
  }
}
