import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'ap',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '2',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[afd.js插件]')
  e.reply(`https://ap-plugin.com/Config/`)
    return true
  }
}
