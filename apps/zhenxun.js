import plugin from '../../../lib/plugins/plugin.js'
export class example extends plugin{
  constructor () {
    super({
      name: '随机真',
      dsc: '随机真寻',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^#?随机真寻$',
          fnc: 'zx'
        }
      ]
    })
  }
  
  async zx (e) {
    logger.info('[hl-ly-plugin]')
    let url = encodeURI(`https://luoyutianyang-api.hf.space/api/zhenxun`)
    await this.e.reply(segment.image(url), true,{at:true})
    return true
  }
}