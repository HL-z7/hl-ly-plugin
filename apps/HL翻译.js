import plugin from '../../../lib/plugins/plugin.js';  // 导入插件

export class GoogleTranslatePlugin extends plugin {  // 定义GoogleTranslatePlugin类并继承plugin类
  constructor() {  // 构造函数
    super({  // 调用父类构造函数
      name: '谷歌文本翻译',  // 插件名称
      dsc: '将指定文本进行翻译',  // 插件描述
      event: 'message',  // 监听事件为message 消息类
      priority: 5000,  // 本JS插件优先级 数字越低越高喔
      rule: [  // 规则数组
        {
          reg: "^#?(H|h)翻(.*)$",  // 正则表达式规则
          fnc: 'translateText'  // 匹配规则后调用的方法
        }
      ]
    })
  }

  async translateText(e) {  // 声明异步函数translateText
    let textToTranslate = e.msg.replace(/#?(H|h)翻/g, "").trim();  // 提取要翻译的文本并去除首尾空格
    logger.info(`收到翻译请求: ${textToTranslate}`);  // 输出日志信息

    let apiUrl = `https://findmyip.net/api/translate.php?text=${encodeURIComponent(textToTranslate)}`;  // 构造请求url
    logger.info(`API请求URL: ${apiUrl}`);

    try {
      const response = await fetch(apiUrl);  // 发起请求进行文本翻译
      if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
      }
      
      const data = await response.json();  // 将响应解析为JSON格式
      logger.info(`API响应数据: ${JSON.stringify(data)}`);

      // 解析翻译结果并构造回复消息
      if (data && data.code === 200 && data.data && data.data.translate_result) {
        const translationResult = data.data.translate_result;
        await this.e.reply(translationResult, true);  // 发送翻译结果消息
      } else {
        await this.e.reply("翻译失败，请稍后重试。", true);  // 发送失败消息
      }
    } catch (error) {
      logger.error(`翻译时出错：${error}`);
      await this.e.reply("翻译失败，请稍后重试。", true);  // 发送失败消息
    }
  }
}