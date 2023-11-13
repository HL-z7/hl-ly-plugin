import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'ap文档',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'ap文档',
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
