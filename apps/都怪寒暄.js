export class example extends plugin {
  constructor () {
    super({
      name: '都怪寒暄',
      dsc: '寒暄？',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '都怪寒暄',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    logger.info('[都怪寒暄.js插件]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-10/raNn0dXq4y0lh12a.jpeg?x-oss-process=style/ld`)
    await this.e.reply(segment.image(url), true)
    return true
  }
}
