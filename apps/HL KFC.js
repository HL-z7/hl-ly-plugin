import plugin from '../../../lib/plugins/plugin.js';  // 导入插件

export class CrazyThursdayPlugin extends plugin {  
  constructor() {  
    super({  
      name: 'HL疯狂星期四',  
      dsc: '疯狂星期四文案',  
      event: 'message',  
      priority: 500,  
      rule: [  
        {
          reg: "^#?随机(kfc|KFC|疯狂星期四)$",  
          fnc: 'generateCrazyThursday'  
        }
      ]
    });
  }

  async generateCrazyThursday(e) {  
    logger.info(`收到疯狂星期四请求`);

    try {
      const apiUrl = 'http://kfc.api.zhilaohu.icu/index.php?type=json&hh=%3Cbr%3E'; 
      const response = await fetch(apiUrl);  
      if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
      }

      const data = await response.json();  
      logger.info(`API响应数据: ${JSON.stringify(data)}`);

      
      if (data && data.msg) {
        const crazyThursdayMessage = data.msg.trim();  
        await this.e.reply(crazyThursdayMessage, true);  
      } else {
        await this.e.reply("获取疯狂星期四文案失败，请联系开发者修复。", true);  
      }
    } catch (error) {
      logger.error(`获取疯狂星期四文案时出错：${error}`);
      await this.e.reply("获取疯狂星期四文案失败，请联系开发者修复。", true);  
    }
  }
}
