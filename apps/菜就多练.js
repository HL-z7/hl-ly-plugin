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
    let msg = "以前是以前，现在是现在"
    let url = encodeURI(`https://gitee.com/luoyutianyang/tuchuan/raw/master/%E8%A7%86%E9%A2%91/%E8%8F%9C%E5%B0%B1%E5%A4%9A%E7%BB%83.mp4`)
    await this.e.reply(segment.video(url),msg,true)
  }
}