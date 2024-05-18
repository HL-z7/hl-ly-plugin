import plugin from '../../../lib/plugins/plugin.js';  // 导入插件

export class NachonekoWeathere extends plugin {  // 定义NachonekoWeathere类并继承plugin类
  constructor() {  // 构造函数
    super({  // 调用父类构造函数
      name: 'HL天气',  // 插件名称
      dsc: '天气查询',  // 插件描述
      event: 'message',  // 监听事件为message 消息类
      priority: 5000,  // 本JS插件优先级 数字越低越高喔
      rule: [  // 规则数组
        {
          reg: "^(H|h)天气(.*)$",  // 正则表达式规则
          fnc: 'Nachoneko'  // 匹配规则后调用的方法
        }
      ]
    })
  }

  async Nachoneko(e) {  // 声明异步函数Nachoneko
    let city = e.msg.replace(/(H|h)天气/g, "").trim();  // 提取城市名称并去除首尾空格
    logger.info(`HL天气收到查询: ${city}`);  // 输出日志信息
    let apiUrl = `http://api.yujn.cn/api/tianqi.php?msg=${encodeURIComponent(city)}&b=1`;  // 构造请求url

    try {
      const response = await fetch(apiUrl);  // 发起请求获取天气数据
      const data = await response.text();  // 将响应解析为TEXT格式

      // 解析天气数据并构造回复消息
      if (data) {
        await this.e.reply(data, true);  // 发送天气信息消息
      } else {
        await this.e.reply("获取天气信息失败，请稍后重试。", true);  // 发送失败消息
      }
    } catch (error) {
      logger.error(`获取天气信息时出错：${error}`);
      await this.e.reply("获取天气信息失败，请稍后重试。", true);  // 发送失败消息
    }
  }
}
