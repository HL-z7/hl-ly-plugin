import plugin from '../../../lib/plugins/plugin.js'
export class example extends plugin {
  constructor () {
    super({
      name: '随机美女',
      dsc: '随机美女',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^#?(美女|小姐姐)$',
          fnc: 'sjmn'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[随机美女.js插件]')
    let url = encodeURI(`https://api.lolimi.cn/API/tup/xjj.php`)
    await this.e.reply(segment.image(url), true,{at:true})
    return true
  }
}
