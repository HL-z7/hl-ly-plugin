// 引入插件基类和文件相关依赖
import plugin from '../../../lib/plugins/plugin.js'
export class example extends plugin {
  constructor () {
    super({
      name: '6',
      dsc: '别6了',
      event: 'message',
      priority: 5200,
      rule: [
        {
          reg: '6',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[别6了.js插件]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-10/23/do560SOqUs0a808w.jpeg`)
    await this.e.reply(segment.image(url), true)
    return true
  }
}
