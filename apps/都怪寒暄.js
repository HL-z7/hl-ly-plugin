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
    let url = encodeURI(`https://gchat.qpic.cn/gchatpic_new/0/0-0-CBEA903F37EC5143BC0DAC3089AB143F/0`)
    await this.e.reply(segment.image(url), true)
    return true
  }
}
