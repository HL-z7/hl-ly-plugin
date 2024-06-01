import plugin from '../../../lib/plugins/plugin.js'; // 导入插件
import { segment } from 'oicq'; // 确保您正在使用适当的oicq库
// hl-ly-plugin 仓库链接https://gitee.com/fox-glaze/hl-ly-plugin

export class CrazyThursdayPlugin extends plugin { // 定义CrazyThursdayPlugin类并继承plugin类
  constructor() { // 构造函数
    super({ // 调用父类构造函数
      name: 'HL娱乐', // 插件名称
      dsc: '生成HS举牌图片或随机视频', // 插件描述
      event: 'message', // 监听事件为message 消息类
      priority: 500, // 本JS插件优先级 数字越低越高
      rule: [ // 规则数组
        {
          reg: "^#?hs举牌(.+?) (.+?) (.+?)$", // 正则表达式规则
          fnc: 'generateHSJupai' // 匹配规则后调用的方法
        },
        {
          reg: "^多来点视频(\\d+)$", // 正则表达式规则，匹配数字1-5
          fnc: 'sendRandomVideopro' // 匹配规则后调用的方法
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

  async sendRandomVideo(e) {  // 声明异步函数sendRandomVideo
    logger.info(`收到随机视频请求`);

    // 先发送收到消息
    await this.e.reply("收到！开始获取视频 请稍等...", true);

    try {
      const apiUrl = 'http://api.yujn.cn/api/zzxjj.php?type=video';
      const response = await fetch(apiUrl);  // 发起请求获取视频数据

      if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();  // 将响应解析为ArrayBuffer格式
      const videoBuffer = Buffer.from(arrayBuffer);  // 将ArrayBuffer转换为Buffer格式

      // 发送视频消息
      await this.e.reply(segment.video(videoBuffer), true);
    } catch (error) {
      logger.error(`获取随机视频时出错：${error}`);
      await this.e.reply("获取随机视频失败，请稍后重试。", true);  // 发送失败消息
    }
  }
  async sendRandomVideopro(e) { // 声明异步函数sendRandomVideopro
    logger.info(`收到随机视频请求`);

    // 先发送收到消息
    await this.e.reply("收到！开始获取视频pro 请稍等...", true);

    // 提取用户输入的数字
    const match = e.msg.match(/^多来点视频(\d+)$/);
    if (!match) {
      await this.e.reply("视频数量不可大于5", true);
      return;
    }

    const num = parseInt(match[1], 10);
    if (num > 5) {
      await this.e.reply("视频数量不可大于5", true);
      return;
    }

    // 准备发送视频
    const apiUrl = 'https://jx.iqfk.top/api/sjsp.php?type=video';
    const videoPromises = [];

    for (let i = 0; i < num; i++) {
      videoPromises.push(fetch(apiUrl).then(response => {
        if (!response.ok) {
          throw new Error(`请求失败，状态码: ${response.status}`);
        }
        return response.arrayBuffer();
      }).then(arrayBuffer => {
        return Buffer.from(arrayBuffer);
      }).then(videoBuffer => {
        return this.e.reply(segment.video(videoBuffer), true);
      }).catch(error => {
        logger.error(`获取随机视频时出错：${error}`);
        return this.e.reply("获取随机视频失败，请稍后重试。", true);
      }));
    }

    // 等待所有视频请求完成
    await Promise.all(videoPromises);
  }
}