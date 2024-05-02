import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: 'HL列表',
      dsc: '^hl列表$',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^hl列表$',
          fnc: 'dggz'
        },
        {
          reg: '^H群发帮助$',
          fnc: 'hbz'
        },
        {
          reg: '^(#HL插件|#hl插件)$',
          fnc: 'hl'
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
    logger.info('[HL-LY-Plugin]')
    let msg = "输入以下完整名称即可触发\n"+
    "H随机三次元\n"+
    "随机柴郡\n"+
    "H随机2次元\n"+
    "H随机猫猫\n"+
    "H随机原神\n"+
    "随机jo\n"+
    "H随机cos/Hcos\n"+
    "H随机壁纸\n"+
    "H随机甘城\n"+
    "H心脏弱"
    e.reply(msg,true)
    return true
  }

async hbz (e) {
    logger.info('[HL-LY-Plugin]')
    let msg = "【一键群发帮助】\n"+
    "一键群发+内容（只发送适配器为ICQQ）\n"+
    "官bot群发+内容（只发送适配器为ICQQ与QQBot）\n"+
    "单独群发#机器人QQ号#内容（指定QQ号执行群发）\n"+
    "全局群发+内容（发送全平台）"
    e.reply(msg,true)
    return true
  }

  async hl (e) {
    logger.info('[hl-ly-plugin]')
    e.reply(`https://gitee.com/fox-glaze/hl-ly-plugin`)
    return true
  }
}
