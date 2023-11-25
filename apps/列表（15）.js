import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '快捷键',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '快捷键$',
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
    let msg = "在【】里的是命令\n"+
    "注意！此快捷键仅XDM可用\n"+
    "【u】启动Ubuntu\n"+
    "以上是Termux才需要\n"+
    "【x】启动脚本菜单\n"+
    "【y】前台启动云崽\n"+
    "【r】后台运行云崽\n"+
    "【lx】查看运行日志\n"+
    "【s】停止运行云崽\n"+
    "【yz】切换云崽根目录\n"+
    "——————————\n"+
    "【V】Linux安装Clash\n"+
    "注意这个是大写的英文V\n"+
    "——————————\n"+
    "请在Linux终端输入\n"+
    "不是发群里！"
    e.reply(msg,true)
    return true
  }
}

