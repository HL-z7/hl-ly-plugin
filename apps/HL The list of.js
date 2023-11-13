import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'hl列表',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'hl列表',
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
    let msg = "列表\n"+
    "输入序号右边的关键词即可触发\n"+
    "0.寒暄官网\n"+
    "1.科学上网\n"+
    "2.ap文档\n"+
    "3.签名异常\n"+
    "4.千羽插件\n"+
    "5.HL插件\n"+
    "6.icqq\n"+
    "7.订阅链接\n"+
    "8.安装软件\n"+
    "9.问题合集\n"+
    "10.oicq\n"+
    "11.白狐脚本\n"+
    "12.椰奶文档\n"+
    "13.插件库\n"+
    "14.快捷键（XDM可用）"
    e.reply(msg,true)
    return true
  }
}
