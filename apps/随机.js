import plugin from '../../../lib/plugins/plugin.js'

export class diaotu extends plugin {
  constructor () {
    super({
      name: 'HL随机图片',
      dsc: 'HL随机图片',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^(#|/)?H随机三次元$',
          fnc: 'scy'
        },
        {
          reg: '^(#|/)?随机柴郡$',
          fnc: 'cj'
        },
        {
          reg: '^(#|/)?(美女|小姐姐)$',
          fnc: 'mn'
        },
        {
          reg: '^(#|/)?H随机2次元$',
          fnc: 'ecy'
        },
        {
          reg: '^(#|/)?H随机猫猫$',
          fnc: 'mm'
        },
        {
          reg: '^(#|/)?H随机原神$',
          fnc: 'ys'
        },
        {
          reg: '^(#|/)?(H随机cos|H随机Cos|H随机COS|Hcos)$',
          fnc: 'cos'
        },
        {
          reg: '^(#|/)?H心脏弱$',
          fnc: 'xzr'
        },
        {
          reg: '^(#|/)?H随机甘城$',
          fnc: 'gc'
        },
        {
          reg: '^(#|/)?(H随机壁纸|H随机bz|Hhs)$',
          fnc: 'bz'
        }
      ]
    })
  }

  // 壁纸
  async bz (e) {
    await this.reply(segment.image('https://t.mwm.moe/pc'))
    return true // 返回true 阻挡消息不再往下
  }

  // 原神
  async ys (e) {
    await this.reply(segment.image('https://api.lolimi.cn/API/yuan/?type=image'))
    return true // 返回true 阻挡消息不再往下
  }

  // 猫猫
  async mm (e) {
    await this.reply(segment.image('https://api.suyanw.cn/api/mao'))
    return true // 返回true 阻挡消息不再往下
  }
// 甘城
  async gc (e) {
    await this.reply(segment.image('https://guge123-mmapi.hf.space/mm'))
    return true // 返回true 阻挡消息不再往下
  }

  
  // 随机三次元
  async scy (e) {
    await this.reply(segment.image('https://api.vvhan.com/api/girl'))
    return true // 返回true 阻挡消息不再往下
  }

  // 随机2次元
  async ecy (e) {
    await this.reply(segment.image('https://api.yimian.xyz/img'))
    return true // 返回true 阻挡消息不再往下
  }

  // 随机柴郡
  async cj (e) {
    await this.reply(segment.image('https://image-api.api.luoyutianyang.icu/api/chaijun'))
    return true // 返回true 阻挡消息不再往下
  }

  // 美女/小姐姐
  async mn (e) {
    await this.reply(segment.image('https://image-api.api.luoyutianyang.icu/api/meinv'))
    return true // 返回true 阻挡消息不再往下
  }

// 心脏弱
  async xzr (e) {
    await this.reply(segment.image('https://guge123-xin.hf.space/xin'))
    return true // 返回true 阻挡消息不再往下
  }
  
  // 随机cos
  async cos (e) {
    await this.reply(segment.image('https://api.lolimi.cn/API/tup/xjj.php'))
    return true // 返回true 阻挡消息不再往下
  }
}
