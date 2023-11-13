import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '白狐脚本',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '1',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[afd.js插件]')
  e.reply(`https://gitee.com/baihu433/Yunzai-Bot-Shell/`)
    return true
  }
}
