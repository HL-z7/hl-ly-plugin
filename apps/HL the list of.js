import plugin from '../../../lib/plugins/plugin.js'

export class ExamplePlugin extends plugin {
  constructor () {
    super({
      name: '',
      dsc: 'hl列表',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: 'hl列表',
          fnc: 'dggz'
        },
        {
          reg: '寒暄官网$',
          fnc: 'cs'
        },
        {
          reg: '科学一下上网$',
          fnc: 'kxsw'
        },
        {
          reg: 'ap文档$',
          fnc: 'apwd'
        },
        {
          reg: '签名异常$',
          fnc: 'qmyc'
        },
        {
          reg: '千羽插件$',
          fnc: 'qycj'
        },
        {
          reg: 'HL插件$',
          fnc: 'hlcj'
        },
        {
          reg: 'icqq仓库$',
          fnc: 'icqqck'
        },
        {
          reg: '订阅链接$',
          fnc: 'dylj'
        },
        {
          reg: '安装软件$',
          fnc: 'azrj'
        },
        {
          reg: '问题合集$',
          fnc: 'wthj'
        },
        {
          reg: 'oicq仓库$',
          fnc: 'oicqck'
        },
        {
          reg: '白狐脚本$',
          fnc: 'bhjb'
        },
        {
          reg: '椰奶文档$',
          fnc: 'ynwd'
        },
        {
          reg: '插件库$',
          fnc: 'cjk'
        },
        {
          reg: 'XDM快捷键$',
          fnc: 'kjj'
        }
      ]
    })
  }

  async dggz (e) {
    logger.info('[hl-plugin]')
    let msg = "列表\n" +
      "输入序号右边的关键词即可触发\n" +
      "0.寒暄官网\n" +
      "1.科学上网\n" +
      "2.ap文档\n" +
      "3.签名异常\n" +
      "4.千羽插件\n" +
      "5.HL插件\n" +
      "6.icqq仓库\n" +
      "7.订阅链接\n" +
      "8.安装软件\n" +
      "9.问题合集\n" +
      "10.oicq仓库\n" +
      "11.白狐脚本\n" +
      "12.椰奶文档\n" +
      "13.插件库\n" +
      "14.快捷键（XDM可用）"
      
    e.reply(msg, true)
    return true
  }

  async cs (e) {
    logger.info('[hl-plugin]')
    e.reply(`Yunzai.icu`)
    return true
  }

  async kxsw (e) {
    logger.info('[hl-plugin]')
    let msg = "我又来给你们推荐啦！\n"+
    "这次有纯 免 费 的喔！\n"+
    "https://xfree.netlify.app/\n"+
    "请复制链接到浏览器打开\n"+
    "请不要使用高贵的QQ浏览器! "
    e.reply(msg)
    return true
  }

  async apwd (e) {
    logger.info('[hl-plugin]')
    e.reply(`https://ap-plugin.com/Config/`)
    return true
  }

  async qmyc (e) {
    logger.info('[hl-plugin]')
    let msg = "关于签名异常\n"+
    "更换签名api即可解决\n"+
    "您可以进入下面这个链接抱脸自建\n"+
    "https://github.com/CikeyQi/QQsign_docs/blob/main/index.md\n"+
    "上面的链接需要科学上网"+
    "没有科学上网可以看寒暄喧的教程\n"+
    "https://yunzai.icu/docs/QSign.html"
    e.reply(msg)
    return true
  }

  async qycj (e) {
    logger.info('[hl-plugin]')
    e.reply(`https://gitee.com/think-first-sxs/reset-qianyu-plugin`)
    return true
  }

  async hlcj (e) {
    logger.info('[hl-plugin]')
    e.reply(`https://gitee.com/fox-glaze/hl-plugin`)
    return true
  }

  async icqqck (e) {
    logger.info('[hl-plugin]')
    e.reply(`https://github.com/icqqjs/icqq`)
    return true
  }

  async dylj (e) {
    logger.info('[hl-plugin]')
    e.reply(`https://lonan1.luonan.me`)
    return true
  }

  async azrj (e) {
    logger.info('[hl-plugin]')
    let msg = "安卓所需软件\n"+
    "列如\n"+
    "ZeroTermux\n"+
    "滑动验证助手\n"+
    "质感文件\n"+
    "https://www.123pan.com/s/YkmlVv-khkg3.html "
    e.reply(msg)
    return true
  }

  async wthj (e) {
    logger.info('[hl-plugin]')
    let msg = "fafa小雨版：\n"+
    "https://www.wolai.com/d87HohAH7zgLNG3u9Z2yJz\n"+
    "LUCK小运版：\n"+
    "https://www.wolai.com/oA43vuW71aBnv7UsEysn4T\n"+
    "运佬的看不了的话就看这个：\n"+
    "https://www.wolai.com/f1M1idtvVGfeHAjcywfwmw\n"+
    "鹤望兰版：\n"+
    "https://chatgptplugin.ikechan8370.com/guide/\n"+
    "逍遥姐姐版：\n"+
    "https://flowus.cn/bhcjwt/share/9fd5845e-89e2-4d06-9d2a-f5a89b391a2c "
    e.reply(msg)
    return true
  }

  async oicqck (e) {
    logger.info('[hl-plugin]')
    e.reply(`https://github.com/takayama-lily/oicq`)
    return true
  }

  async bhjb (e) {
    logger.info('[hl-plugin]')
    e.reply(`https://gitee.com/baihu433/Yunzai-Bot-Shell/`)
    return true
  }

  async ynwd (e) {
    logger.info('[hl-plugin]')
    e.reply(`https://www.yenai.ren/`)
    return true
  }

  async cjk (e) {
    logger.info('[hl-plugin]')
    let msg = "Yunzai-Bot 插件库\n"+
    "https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index\n"+
    "第一个gitee（国内）\n"+
    "第二个github(国外)\n"+
    "https://github.com/yhArcadia/Yunzai-Bot-plugins-index"
    e.reply(msg)
    return true
  }

  async kjj (e) {
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
    e.reply(msg)
    return true
  }
}