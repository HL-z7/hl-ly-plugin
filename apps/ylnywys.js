import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'

export class example extends plugin {
  constructor () {
    super({
      name: '原来你也玩原神啊',
      dsc: '原来你也玩原神啊',
      event: 'message',
      priority: -100000,
      rule: [
        {
          reg: '原神启动',
          fnc: 'yuanshen'
        }
      ]
    })
  }
  async yuanshen (e) {
    logger.info('[yuanlainiyewanyuanshena.js插件]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-09/16/65054d60df30a.mp4`)
    await this.e.reply(segment.video(url))
  }
}
