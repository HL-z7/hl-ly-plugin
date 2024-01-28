import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: 'HL列表',
      dsc: '',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^(#|/)？hl列表$',
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
    logger.info('[HL-Plugin]')
    let msg = "输入以下完整名称即可触发\n"+
    "H随机三次元\n"+
    "H随机柴郡\n"+
    "H随机2次元\n"+
    "H随机猫猫\n"+
    "H随机原神\n"+
    "H随机cos/Hcos\n"+
    "H随机壁纸\n"+
    "H随机甘城\n"+
    "H心脏弱"
    e.reply(msg,true)
    return true
  }
}
