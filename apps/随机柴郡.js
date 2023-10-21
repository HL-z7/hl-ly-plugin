import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'
/*
鸣谢桑帛云api
*/

export class example extends plugin {
  constructor () {
    super({
      name: '随机柴郡',
      dsc: '随机柴郡',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '柴郡',
          fnc: 'cj'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[随机柴郡.js插件]')
    let url = encodeURI(`https://api.lolimi.cn/API/chaiq/c.php`)
    await this.e.reply(segment.image(url), true,{at:true})
    return true
  }
}
