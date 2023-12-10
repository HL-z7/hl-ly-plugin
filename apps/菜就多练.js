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
    await this.e.reply(msg,true)
    let url = encodeURI(`https://fanbook.mobi/channels/@me/574500068208795648/574500685509300224`)
    await this.e.reply(segment.video(url))
  }
}