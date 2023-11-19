import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '签名异常',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '签名异常',
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
    let msg = "关于签名api异常\n"+
    "更换签名api即可解决\n"+
    "您可以进入下面这个链接抱脸自建\n"+
    "https://github.com/CikeyQi/QQsign_docs/blob/main/index.md\n"+
    "上面的链接需要科学🐔上网"+
    "没有科学上网可以看寒暄喧的教程\n"+
    "https://hanxuan.cc/docs/QSign.html"
    e.reply(msg,true)
    return true
  }
}
