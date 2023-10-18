import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'hl帮助',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'hl帮助',
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
    logger.info('[help.js插件启动成功]')
    let msg = "HL帮助列表\n"+
    "1.都怪寒暄\n"+
    "2.随机语音\n"+
    "3.随机表情包\n"+
    "4.早苗戳一戳（戳一戳触发）\n"+
    "5.遥遥领先\n"+
    "6.真寻（输入“真寻”即可触发）\n"+
    "7.更多功能还在想捏（因为还不会写...）"
    e.reply(msg,true)
    return true
  }
}
