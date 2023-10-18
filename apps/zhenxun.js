import plugin from '../../lib/plugins/plugin.js'
import fs from 'node:fs'
/* 
交流频道 https://discord.gg/VUwHWWm9RH
侵联删 haanxuan7@gmail.com
*/
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
    let url = encodeURI(`https://hanxuan.cc/zhenxun.mp4`)
    await this.e.reply(segment.video(url))
  }
}