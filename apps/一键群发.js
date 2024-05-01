import plugin from '../../../lib/plugins/plugin.js';  // 导入插件
export class example extends plugin {
  constructor () {
    super({
      name: '',
      dsc: '一键pro',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^一键群发(.*)$',
          fnc: 'cs'
        }
      ]
    })
  }
  
  async cs (e) {
    let textToTranslate = e.msg.replace(/一键群发/g, "").trim();
    if (textToTranslate === "") {
      e.reply("请在指令后加上需要发送的内容");
      return false;
    }
    
    e.reply("正在执行一键群发中...");
    
    if (this.e.adapter_name === 'ICQQ') {
      for (const i of Bot.gl.keys()) {
        await Bot.sleep(500); // 添加延迟
        await Bot.pickGroup(i).sendMsg(textToTranslate);
      }
      return true;
    } else if (this.e.adapter_name === 'QQBot') {
      e.reply("当前不支持一键群发");
      return false;
    } else {
      return false;
    }
  }
}