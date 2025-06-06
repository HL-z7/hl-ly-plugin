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
          reg: '^H随机三次元$',
          fnc: 'scy'
        },
        {
          reg: '^随机柴郡$',
          fnc: 'cj'
        },
        {
          reg: '^H(BA|随机BA|随机蔚蓝档案|蔚蓝档案)$',
          fnc: 'BA'
        },
        {
          reg: '^(美女|小姐姐)$',
          fnc: 'mn'
        },
        {
          reg: '^H随机2次元$',
          fnc: 'ecy'
        },
        {
          reg: '^H随机猫猫$',
          fnc: 'mm'
        },
        {
          reg: '^H随机原神$',
          fnc: 'ys'
        },
        {
          reg: '^(H随机cos|H随机Cos|H随机COS|Hcos)$',
          fnc: 'cos'
        },
        {
          reg: '^H心脏弱$',
          fnc: 'xzr'
        },
         {
          reg: '^(H随机jo|H随机jojo|Hjo|Hjojo|随机jojo|随机jo)$',
          fnc: 'jojo'
        },
        {
          reg: '^随机真寻$',
          fnc: 'zx'
        },
        {
          reg: '^H?随机宇佐纪$',
          fnc: 'yzj'
        },
        {
          reg: '^H?随机(miku|初音)$',
          fnc: 'cy'
        },
        {
          reg: '^H随机甘城$',
          fnc: 'gc'
        },
        {
          reg: '^(Hloli|H随机loli|H随机萝莉)$',
          fnc: 'loli'
        },
        {
          reg: '^(H凉|H随机凉|H随机liang)$',
          fnc: 'liang'
        },
        {
          reg: '^(Hxnn|H随机xnn|Hxnl|H随机小楠梁)$',
          fnc: 'loli'
        },
        {
          reg: '^(H流萤|H随机流萤)$',
          fnc: 'ly'
        },
        {
          reg: '^(H玛丽|H随机玛丽)$',
          fnc: 'mali'
        },
        {
          reg: '^(H随机壁纸|H随机bz)$',
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
    await this.reply(segment.image('https://api.hlz7.com/mm'))
    return true // 返回true 阻挡消息不再往下
  }
  // 宇佐纪
  async yzj (e) {
    await this.reply(segment.image('https://api.hlz7.com/yzj'))
    return true // 返回true 阻挡消息不再往下
  }
   // 蔚蓝档案
  async BA (e) {
    await this.reply(segment.image('https://api.hlz7.com/BA'))
    return true // 返回true 阻挡消息不再往下
  }
  // miku/初音
  async cy (e) {
    await this.reply(segment.image('https://api.hlz7.com/miku'))
    return true // 返回true 阻挡消息不再往下
  }
//jojo
 async jojo (e) {
    await this.reply(segment.image('https://api.hlz7.com/jojo'))
    return true // 返回true 阻挡消息不再往下
  }
  
  // 随机三次元
  async scy (e) {
    await this.reply(segment.image('https://api.lolimi.cn/API/tup/xjj.php'))
    return true // 返回true 阻挡消息不再往下
  }
// 真寻
  async zx (e) {
    await this.reply(segment.image('https://luoyutianyang-api.hf.space/api/zhenxun'))
    return true // 返回true 阻挡消息不再往下
  }

  // 随机2次元
  async ecy (e) {
    await this.reply(segment.image('https://api.yimian.xyz/img'))
    return true // 返回true 阻挡消息不再往下
  }

  // 随机柴郡
  async cj (e) {
    await this.reply(segment.image('https://luoyutianyang-api.hf.space/api/chaijun'))
    return true // 返回true 阻挡消息不再往下
  }

  // 美女/小姐姐
  async mn (e) {
    await this.reply(segment.image('https://luoyutianyang-api.hf.space/api/meinv'))
    return true // 返回true 阻挡消息不再往下
  }

// 心脏弱
  async xzr (e) {
    await this.reply(segment.image('http://api.hlz7.com/xin'))
    return true // 返回true 阻挡消息不再往下
  }
// 萝莉
  async loli (e) {
    await this.reply(segment.image('http://api.hlz7.com/loli'))
    return true // 返回true 阻挡消息不再往下
  }

  // 凉
  async liang (e) {
    await this.reply(segment.image('http://api.hlz7.com/liang'))
    return true // 返回true 阻挡消息不再往下
  }

  // 小楠梁
  async xnn (e) {
    await this.reply(segment.image('http://api.hlz7.com/xnn'))
    return true // 返回true 阻挡消息不再往下
  }

  // 流萤
  async ly (e) {
    await this.reply(segment.image('http://api.hlz7.com/ly'))
    return true // 返回true 阻挡消息不再往下
  }
  //玛丽
  async mali (e) {
    await this.reply(segment.image('http://api.hlz7.com/mali'))
    return true // 返回true 阻挡消息不再往下
  }
  
  // 随机cos
  async cos (e) {
    await this.reply(segment.image('http://api.hlz7.com/cos'))
    return true // 返回true 阻挡消息不再往下
  }
}
