import Help from './help/Help.js'
import { App } from '#hl'

let app = App.init({
  id: 'help',
  name: 'hl',
  desc: '喵喵帮助'
})

app.reg({
  help: {
    rule: /^#?hl帮助|hl菜单|hlhelp|hl功能|hl指令$/,
    fn: Help.render,
    desc: '【#帮助】 #hl帮助'
  }
})

export default app
