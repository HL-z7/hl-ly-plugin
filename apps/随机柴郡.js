import plugin from '../../../lib/plugins/plugin.js'
export class example extends plugin {
  constructor () {
    super({
      name: '随机柴郡',
      dsc: '柴郡$',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '柴郡$',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[hl-plugin]')
    let url = encodeURI(`https://luoyutianyang-api.hf.space/api/chaijun`)
    await this.e.reply(segment.image(url), true,{at:true})
    return true
  }
}