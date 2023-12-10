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
          reg: '菜',
          fnc: 'caijiuduolian'
        }
      ]
    })
  }
  async caijiuduolian (e) {
    logger.info('[hl-plugin]')
    this.mp3DirPath = path.join(__dirname, 'plugins/hl-plugin/resources/MP3/菜就多练.mp3');
    let msg = "以前是以前，现在是现在"
    await this.e.reply(msg,true)
    await this.reply(segment.record(mp3Path))
    return true
  }
}