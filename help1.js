import plugin from '../../../lib/plugins/plugin.js'
export class example extends plugin {
  constructor () {
    super({
      name: '帮助插件js',
      dsc: 'hl帮助',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'hl帮助',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[帮助.js插件]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-10/Cs2a6UrKvq1c80tg.jpeg`)
    await this.e.reply(segment.image(url), true)
    return true
  }
}
