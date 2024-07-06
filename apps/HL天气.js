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
    let apiUrl = `https://api.oioweb.cn/api/weather/weather?city_name=${encodeURIComponent(city)}`;  // 构造请求url

    try {
      const response = await fetch(apiUrl);  // 发起请求获取天气数据
      const data = await response.json();  // 将响应解析为JSON格式

      if (data.code === 200 && data.result) {
        const result = data.result;
        const message = [
          `地区：${result.city_name}`,
          `当前天气：${result.current_condition}`,
          `当前温度：${result.current_temperature}°C`,
          `温馨提示：${result.tips}`,
          `数据更新时间：${new Date(result.current_time * 1000).toLocaleString()}`
        ];

        for (let forecast of result.forecast_list) {
          message.push(
            `日期：${forecast.date}`,
            `天气：${forecast.condition}`,
            `温度：${forecast.low_temperature}°C ~ ${forecast.high_temperature}°C`,
            `风向：${forecast.wind_direction}`,
            `风力：${forecast.wind_level}`
          );
        }

        let aw = this.e.runtime.common.makeForwardMsg(this.e, message, '天气信息');
        await this.e.reply(aw);
      } else {
        await this.e.reply("获取天气信息失败，请稍后重试。", true);  // 发送失败消息
      }
    } catch (error) {
      logger.error(`获取天气信息时出错：${error}`);
      await this.e.reply("获取天气信息失败，请稍后重试。", true);  // 发送失败消息
    }
  }
}