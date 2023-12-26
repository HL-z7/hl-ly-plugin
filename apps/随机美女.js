import plugin from '../../../lib/plugins/plugin.js'
export class example extends plugin{
  constructor () {
    super({
      name: '随机美女',
      dsc: '随机美女',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^#?(美女|小姐姐)$',
          fnc: 'xjj'
        }
      ]
    })
  }
  
  async xjj (e) {
    logger.info('[hl-plugin]')
    let url = encodeURI(`https://luoyutianyang-pictures-of-the-api.hf.space/api/meinv/`)
    await this.e.reply(segment.image(url), true,{at:true})
    return true
  }
}
