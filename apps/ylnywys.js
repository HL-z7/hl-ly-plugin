import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '原神',
      dsc: '原来你也玩原神呀',
      event: 'message',
      priority: 250,
      rule: [
        {
          reg: '原神',
          fnc: 'hitokoto'
        }
      ]
    })
  }
  async hitokoto (e) {
    logger.info('[原神.js插件]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-09/16/65054d60df30a.mp4`)
    await this.e.reply(segment.video(url))
  }
}
