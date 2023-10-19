import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'

export class example extends plugin {
  constructor () {
    super({
      name: '真寻酱',
      dsc: '别当欧尼酱了',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '真寻',
          fnc: 'zhenxun'
        }
      ]
    })
  }
  async zhenxun (e) {
    logger.info('[zhenxunHomo.js插件]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-10/19/653126dc5fda6.mp4`)
    await this.e.reply(segment.video(url))
  }
}