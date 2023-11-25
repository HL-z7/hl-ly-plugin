import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '插件库',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '插件库$',
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
    let msg = "Yunzai-Bot 插件指引\n"+
    "https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index\n"+
    "第一个gitee（国内）\n"+
    "第二个github(国外)\n"+
    "https://github.com/yhArcadia/Yunzai-Bot-plugins-index"
    e.reply(msg,true)
    return true
  }
}
