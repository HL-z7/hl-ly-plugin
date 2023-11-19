import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '科学上网',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '科学上网',
          fnc: 'dggz'
        }
      ]
    })
  }
  /*
  作者QQ号:3610159055
  作者:HL
  ps:使用的时候记得把q群和联系人改成自己的，如果出现一天指令两条消息请及时联系
  */
  async dggz (e) {
    logger.info('[hl-plugin]')
    let msg = "我又来给你们推荐啦！\n"+
    "这次有纯 免 费 的喔！\n"+
    "https://xfree.netlify.app/\n"+
    "请复制链接到浏览器打开\n"+
    "请不要使用高贵的QQ浏览器！"
    e.reply(msg,true)
    return true
  }
}
