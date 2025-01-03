import plugin from '../../../lib/plugins/plugin.js'
export class ysqd extends plugin {
  constructor() {
    super({
      name: '原神启动!',
      dsc: '原神启动!',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^#?龙傲天$',
          fnc: 'lat'
        },
        {
          reg: '#?菜就多练$',
          fnc: 'caijiuduolian'
        },
        {
          reg: '^#?原神启动$',
          fnc: 'cs'
        },
        {
          reg: '厵神',
          fnc: 'yuanshen'
        }
      ]
    })
  }

  async cs(e) {
    logger.info('[hl-ly-plugin]')
    let msg = [
      segment.image('https://img.kookapp.cn/assets/2023-09/kiykjwz3BC0pk1hc.jpg'),
      segment.image('https://img.kookapp.cn/assets/2023-09/Bn6wQuLVdD0pk1hc.jpg'),
      segment.image('https://img.kookapp.cn/assets/2023-09/fxbVR0Be3I0pk1hc.jpg'),
      segment.image('https://img.kookapp.cn/assets/2023-09/UX26i8GM2T0pk1hc.jpg'),
    ]
    e.reply(msg, true, { at: true })
    return true
  }

  async lat (e) {
      logger.info('[hl-ly-plugin]')
      let msg = [
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/KbNlJq8PYn0d60d6.jpeg'),
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/oGO7QUhxHD08c08c.jpeg'),
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/P8wK1rkLXQ05o05o.jpeg'), 
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/6Z7aJm5lWq060060.jpeg'),
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/bSTWQNmR350kq0kq.jpeg'),
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/2ZNkaU9jfa086086.jpeg'),
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/JIX9oc5QOY04y04y.jpeg'), 
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/o7yCTAm4Zj0fk0fk.jpeg'),
   segment.image('https://img.kookapp.cn/attachments/2024-06/12/bk3aiTtEHU06k06k.jpeg'),
	]
    e.reply(msg,true)
	return true
  }
  async caijiuduolian (e) {
    logger.info('[hl-ly-plugin]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2024-01/04/6596d4960a65a.mp4`)
    await this.e.reply(segment.video(url))
    let msg = "输不起就别玩"
    await this.e.reply(msg,true,{at:true})
    return true
  }
  async yuanshen (e) {
    logger.info('[yuanlainiyewanyuanshena.js插件]')
    let url = encodeURI(`https://img.kookapp.cn/attachments/2023-09/16/65054d60df30a.mp4`)
    await this.e.reply(segment.video(url))
  }

}