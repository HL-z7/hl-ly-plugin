import plugin from '../../../lib/plugins/plugin.js'

export class HLlist extends plugin {
  constructor () {
    super({
      name: 'HL列表',
      dsc: 'HL',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^#?(hl|HL)列表$',
          fnc: 'dggz'
        },
        {
          reg: '^H群发帮助$',
          fnc: 'hbz'
        },
        {
          reg: '^遥遥领先$',
          fnc: '60'
        },
        {
          reg: /^poke(\d+)?$/,
          fnc: 'emocyc'
        },
        {
          reg: '^H违禁词帮助$',
          fnc: 'ban'
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
    "【图文/表情合成列表】\n"+
    "hs举牌内容1 内容2 内容3（需要空格）\n"+
    "hs2举牌内容1 内容2 内容3（需要空格）\n"+
    "H喜报+内容\n"+
    "H悲报+内容\n"+
    "H奇怪龙+内容(空格)+内容\n"+
    "H鸭鸭举牌+内容（后面可以空格后输入类型，类型有1,2）\n"+
    "H猫羽举牌+内容（后面可以空格后输入类型，类型有1,2）\n"+
    "H表情帮助（第一次安装本插件请先将表情合成打开‘#HL设置表情合成开启’）\n"+
    "【娱乐列表】\n"+
    "发送‘Htag帮助’即可查看功能\n"+
     "发送‘poke’即可,可加数字1~6发送对应表情\n"+
    "【图片列表】\n"+
    "H随机三次元\n"+
    "随机柴郡\n"+
    "H随机2次元\n"+
    "H随机猫猫\n"+
    "H随机原神\n"+
    "随机jo\n"+
    "H随机初音/miku\n"+
    "H随机宇佐纪\n"+
    "H随机BA\n"+
    "H随机cos/Hcos\n"+
    "H随机壁纸\n"+
    "H随机甘城\n"+
    "H玛丽\n"+
    "H流萤\n"+
    "H小楠梁\n"+
    "H凉\n"+
    "H萝莉\n"+
    "H心脏弱\n"+
    "【视频列表】\n"+
    "多来点视频1～5（数字代表视频数量）\n"+
    "来点动漫\n"+
    "来点萝莉\n"+
    "来点欲梦\n"+
    "来点甜妹\n"+
    "来点黑丝\n"+
    "来点白丝"
    e.reply(msg,true)
    return true
  }

async hbz (e) {
    logger.info('[HL-LY-Plugin]')
    let msg = "【一键群发帮助】\n"+
    "#一键群发+内容（只发送适配器为ICQQ）\n"+
    "#官bot群发+内容（只发送适配器为ICQQ与QQBot）\n"+
    "#单独群发#机器人QQ号#内容（指定QQ号执行群发）\n"+
    "#全局群发+内容（发送全平台）"
    e.reply(msg,true)
    return true
  }


async ban (e) {
    logger.info('[HL-LY-Plugin]')
    let msg = "【违禁词帮助】\n"+
    "H违禁词开启/关闭(默认关闭)\n"+
    "H违禁词切换模式1/2\n"+
    "（1为警告模式|2为直接禁言模式）\n"+
    "H新增违禁词+要加的违禁词\n"+
    "H新增模糊违禁词+要加的违禁词\n"+
    "H删除违禁词+要删的违禁词\n"+
    "H删除模糊违禁词+要删的违禁词\n"+
    "H违禁词设置时间+1~43200\n"+
    "(如果设置的时间为0，所禁言的时间为随机时间)\n"+
    "H违禁词列表"
    e.reply(msg,true)
    return true
  }



  async hl (e) {
    logger.info('[hl-ly-plugin]')
    e.reply(`https://gitee.com/fox-glaze/hl-ly-plugin`)
    return true
  }

 async 60(e) {
    logger.info('[hl-ly-plugin]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-09/14/65027028d1a83.mp3`)
    await this.e.reply(segment.record(url))
    return;
  }

/*手动emoji*/
async emocyc(e) {
    logger.info('[HL戳一戳]');
    let match = e.msg.match(/^poke([1-6])$/);
    let i = match ? parseInt(match[1], 10) : Math.floor(Math.random() * 6) + 1;
    this.reply({ type: 'poke', id: i });
    return true;
    }
}