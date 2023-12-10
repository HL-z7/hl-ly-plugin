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
    logger.info('[hl-plugin]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-12/10/657593610794b.png`)
    await this.e.reply(segment.video(url))
    let msg = "输不起就别玩"
    await this.e.reply(msg,true,{at:true})
    return true
  }
}