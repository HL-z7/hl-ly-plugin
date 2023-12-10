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
    let msg = "以前是以前，现在是现在"
    await this.e.reply(msg,true)
    let url = encodeURI(`https://gzc-download.weiyun.com/ftn_handler/136c50e7904262cf4c47d1a53de9343f4b11a79d54180e03850741372c3363fc/C022DD073704E89DDD2205521858E523.mp4?fname=C022DD073704E89DDD2205521858E523.mp4&from=30013&version=3.3.3.3`)
    await this.e.reply(segment.video(url))
  }
}