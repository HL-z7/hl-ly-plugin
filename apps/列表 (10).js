import plugin from '../../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '问题合集',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '问题合集',
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
    let msg = "问问题前先看问题🐔合集：\n"+
    "fafa小雨版：\n"+
    "https://www.wolai.com/d87HohAH7zgLNG3u9Z2yJz\n"+
    "LUCK小运版：\n"+
    "https://www.wolai.com/oA43vuW71aBnv7UsEysn4T\n"+
    "运佬的看不了的话就看这个：\n"+
    "https://www.wolai.com/f1M1idtvVGfeHAjcywfwmw\n"+
    "鹤望兰版：\n"+
    "https://chatgptplugin.ikechan8370.com/guide/\n"+
    "落雨版：\n"+
    "https://docs.qq.com/doc/DTHlWa2pYYUVUbWN6\n"+
    "逍遥姐姐版：\n"+
    "https://flowus.cn/bhcjwt/share/9fd5845e-89e2-4d06-9d2a-f5a89b391a2c"
    e.reply(msg,true)
    return true
  }
}

