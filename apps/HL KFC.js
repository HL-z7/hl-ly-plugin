import plugin from '../../../lib/plugins/plugin.js';  // 导入插件

export class CrazyThursdayPlugin extends plugin {  // 定义CrazyThursdayPlugin类并继承plugin类
  constructor() {  // 构造函数
    super({  // 调用父类构造函数
      name: '疯狂星期四',  // 插件名称
      dsc: '随机生成疯狂星期四的文案',  // 插件描述
      event: 'message',  // 监听事件为message 消息类
      priority: 5000,  // 本JS插件优先级 数字越低越高
      rule: [  // 规则数组
        {
          reg: "^#?随机(kfc|KFC|疯狂星期四)$",  // 正则表达式规则
          fnc: 'generateCrazyThursday'  // 匹配规则后调用的方法
        }
      ]
    })
  }

  async generateCrazyThursday(e) {  // 声明异步函数generateCrazyThursday
    logger.info(`收到疯狂星期四请求`);

    try {
      const apiUrl = 'https://api.khkj6.com/kfc/';
      const response = await fetch(apiUrl);  // 发起请求获取文案数据
      if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
      }
      
      const data = await response.json();  // 将响应解析为JSON格式
      logger.info(`API响应数据: ${JSON.stringify(data)}`);

      // 检查是否成功获取到文案内容
      if (data && data.msg) {
        const crazyThursdayMessage = data.msg;
        await this.e.reply(crazyThursdayMessage, true);  // 发送疯狂星期四文案消息
      } else {
        await this.e.reply("获取疯狂星期四文案失败，请稍后重试。", true);  // 发送失败消息
      }
    } catch (error) {
      logger.error(`获取疯狂星期四文案时出错：${error}`);
      await this.e.reply("获取疯狂星期四文案失败，请稍后重试。", true);  // 发送失败消息
    }
  }
}