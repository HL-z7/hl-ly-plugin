export class example extends plugin {
  constructor () {
    super({
      name: '龙傲天',
      dsc: '龙傲天',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '龙傲天',
          fnc: 'lat'
        }
      ]
    })
  }
  
    async lat (e) {
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
}