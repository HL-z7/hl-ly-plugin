import plugin from '../../../lib/plugins/plugin.js';  // 导入插件
import { segment } from 'oicq';  // 确保您正在使用适当的oicq库
//hl-ly-plugin  仓库链接https://gitee.com/fox-glaze/hl-ly-plugin
export class CrazyThursdayPlugin extends plugin {  // 定义CrazyThursdayPlugin类并继承plugin类
  constructor() {  // 构造函数
    super({  // 调用父类构造函数
      name: 'HL举牌功能',  // 插件名称
      dsc: '生成举牌图片',  // 插件描述
      event: 'message',  // 监听事件为message 消息类
      priority: 500,  // 本JS插件优先级 数字越低越高
      rule: [  // 规则数组
        {
          reg: "^#?hs举牌(.+?) (.+?) (.+?)$",  // 正则表达式规则
          fnc: 'generateHSJupai'  // 匹配规则后调用的方法
        }
      ]
    })
  }

  async generateHSJupai(e) {  // 声明异步函数generateHSJupai
    logger.info(`收到HS举牌请求`);

    const message = e.msg;  // 获取消息内容
    const [, msg, msg1, msg2] = message.match(/^#?hs举牌(.+?) (.+?) (.+?)$/);

    // 先发送收到消息
    await this.e.reply("收到！开始制作图片 请稍等...", true);

    try {
      const apiUrl = `http://api.yujn.cn/api/hsjp1.php?msg=${encodeURIComponent(msg)}&msg1=${encodeURIComponent(msg1)}&msg2=${encodeURIComponent(msg2)}&rgb1=1`;
      const response = await fetch(apiUrl);  // 发起请求获取图片数据

      if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();  // 将响应解析为ArrayBuffer格式
      const imageBuffer = Buffer.from(arrayBuffer);  // 将ArrayBuffer转换为Buffer格式

      // 发送图片消息
      await this.e.reply(segment.image(imageBuffer), true);
    } catch (error) {
      logger.error(`获取HS举牌图片时出错：${error}`);
      await this.e.reply("获取HS举牌图片失败，请稍后重试。", true);  // 发送失败消息
    }
  }
}
