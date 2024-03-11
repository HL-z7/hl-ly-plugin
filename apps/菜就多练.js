import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'

export class example extends plugin {
  constructor () {
    super({
      name: '菜就多练',
      dsc: '你菜就多练',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '菜就多练',
          fnc: 'caijiuduolian'
        }
      ]
    })
  }
  async caijiuduolian (e) {
    logger.info('[hl-ly-plugin]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2024-01/04/6596d4960a65a.mp4`)
    await this.e.reply(segment.video(url))
    let msg = "输不起就别玩"
    await this.e.reply(msg,true,{at:true})
    return true
  }
}