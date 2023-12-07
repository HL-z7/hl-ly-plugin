import plugin from '../../../lib/plugins/plugin.js'
export class example extends plugin {
  constructor () {
    super({
      name: '原神启动!',
      dsc: '原神启动!',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '原神启动',
          fnc: 'cs'
        }
      ]
    })
  }
  
    async cs (e) {
    logger.info('[hl-plugin]')
      let msg = [
   segment.image('https://img.kookapp.cn/assets/2023-09/kiykjwz3BC0pk1hc.jpg'),
   segment.image('https://img.kookapp.cn/assets/2023-09/Bn6wQuLVdD0pk1hc.jpg'),
   segment.image('https://img.kookapp.cn/assets/2023-09/fxbVR0Be3I0pk1hc.jpg'), 
   segment.image('https://img.kookapp.cn/assets/2023-09/UX26i8GM2T0pk1hc.jpg'),
	]
    e.reply(msg,true,{ at: true })
	return true
  }
}