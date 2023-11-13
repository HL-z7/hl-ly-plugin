import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '安装软件',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '',
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
    logger.info('[列表.js插件启动成功]')
    let msg = "安卓所需软件\n"+
    "列如\n"+
    "ZeroTermux\n"+
    "滑动验证助手\n"+
    "质感文件\n"+
    "https://www.123pan.com/s/YkmlVv-khkg3.html"
    e.reply(msg,true)
    return true
  }
}
