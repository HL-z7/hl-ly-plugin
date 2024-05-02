import plugin from '../../../lib/plugins/plugin.js';  // 导入插件
export class example extends plugin {
  constructor () {
    super({
      name: 'HL一键群发',
      dsc: '一键pro',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^一键群发(.*)$',
          fnc: 'cs'
        },
        {
          reg: '^官bot群发(.*)$',
          fnc: 'qqBotGroupSend'
        },
        {
          reg: '^单独群发#(\\d+)#(.*)$',
          fnc: 'sendToSingleGroup'
        },
        {
          reg: '^全局群发(.*)$',
          fnc: 'globalGroupSend'
        }
      ]
    })
  }
  
  async cs (e) {
    if (!e.isMaster) {
      e.reply("你没有权限✘"); // 发送权限提示
      return false;
    }
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
  
  async qqBotGroupSend (e) {
    if (!e.isMaster) {
      e.reply("你没有权限✘"); // 发送权限提示
      return false;
    }
    if (this.e.adapter_name === 'QQBot') {
      let textToTranslate = e.msg.replace(/官bot群发/g, "").trim();
      if (textToTranslate === "") {
        e.reply("请在指令后加上需要发送的内容");
        return false;
      }
      
      e.reply("正在执行官bot群发中...");
      
      for (const i of Bot.gl.keys()) {
        await Bot.sleep(500); // 添加延迟
        await Bot.pickGroup(i).sendMsg(textToTranslate);
      }
      return true;
    } else if (this.e.adapter_name === 'ICQQ') {
      e.reply("当前不支持官bot群发");
      return false;
    } else {
      return false;
    }
  }
  
  async sendToSingleGroup(e) {
    if (!e.isMaster) {
      e.reply("你没有权限✘"); // 发送权限提示
      return false;
    }
    let match = e.msg.match(/^单独群发#(\d+)#(.*)$/);
    if (!match) {
      e.reply("格式不正确，请使用 单独群发#id#内容 格式");
      return false;
    }
    
    let botQQ = parseInt(match[1]);
    let textToTranslate = match[2];
    
    if (isNaN(botQQ) || botQQ <= 0) {
      e.reply("机器人QQ号不正确，请输入正确的机器人QQ号");
      return false;
    }
    
    if (textToTranslate === "") {
      e.reply("请输入要发送的内容");
      return false;
    }
    
    e.reply("正在执行单独群发中...");
    
    (async () => {
      for (const [id,i] of Bot[botQQ].gl) {
        await Bot[botQQ].pickGroup(id).sendMsg(textToTranslate);
        await Bot.sleep(500);
      }
    })();
    
    return true;
  }
  
  async globalGroupSend(e) {
    if (!e.isMaster) {
      e.reply("你没有权限✘"); // 发送权限提示
      return false;
    }
    
    let textToTranslate = e.msg.replace(/全局群发/g, "").trim();
    if (textToTranslate === "") {
      e.reply("请在指令后加上需要发送的内容");
      return false;
    }
    
    e.reply("正在执行全局群发中...");
    
    for (const i of Bot.gl.keys()) {
      await Bot.pickGroup(i).sendMsg(textToTranslate);
    }
    
    return true;
  }
}