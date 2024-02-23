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
          reg: "^(hl|HL)天气(.*)$",  // 正则表达式规则
          fnc: 'Nachoneko'  // 匹配规则后调用的方法
        }
      ]
    })
  }

  async Nachoneko(e) {  // 声明异步函数Nachoneko
    let city = e.msg.replace(/猫羽雫天气/g, "").trim();  // 提取城市名称并去除首尾空格
    logger.info(`HL天气收到查询: ${city}`);  // 输出日志信息
    let apiUrl = `https://www.apii.cn/api/weather/?city=${encodeURIComponent(city)}`;  // 构造请求url

    try {
      const response = await fetch(apiUrl);  // 发起请求获取天气数据
      const data = await response.json();  // 将响应解析为JSON格式

      // 解析天气数据并构造回复消息
      if (data && data.code === '1') {
        const weatherInfo = data.data[0];
        const replyMsg = `城市：${city}\n日期：${weatherInfo.date}\n天气：${weatherInfo.weather}\n温度：${weatherInfo.temperature}\n风向：${weatherInfo.manner}`;
        await this.e.reply(replyMsg, true);  // 发送天气信息消息
      } else {
        await this.e.reply("获取天气信息失败，请稍后重试。", true);  // 发送失败消息
      }
    } catch (error) {
      logger.error(`获取天气信息时出错：${error}`);
      await this.e.reply("获取天气信息失败，请稍后重试。", true);  // 发送失败消息
    }
  }
}
