import plugin from '../../../lib/plugins/plugin.js'; // 导入插件
/* 作者：HL 插件名hl-ly-plugin 仓库链接https://gitee.com/fox-glaze/hl-ly-plugin  API接口均来自网络*/
export class CrazyThursdayPlugin extends plugin {
  constructor() {
    super({
      name: 'HL娱乐',
      dsc: '生成HS举牌图片或随机视频',
      event: 'message',
      priority: 500,
      rule: [
        {
          reg: /^#?hs举牌 (.+?) (.+?) (.+?)$/,
          fnc: 'generateHSJupai'
        },
        {
          reg: /^#?hs2举牌(.+?) (.+?) (.+?)$/,
          fnc: 'generateHS2Jupai'
        },
        {
          reg: /^#?来点(动漫|萝莉|甜妹|欲梦|黑丝|白丝)$/,
          fnc: 'sendDirectVideo'
        },
        {
          reg: /^#?来点视频$|^多来点视频(\d+)$/,
          fnc: 'sendRandomVideo'
        },
        {
          reg: /^#?H喜报(.+?)$/,
          fnc: 'generateHappyReport'
        },
        {
          reg: /^#?H悲报(.+?)$/,
          fnc: 'generateSadReport'
        },
        {
          reg: /^#?H奇怪龙(.+?) (.+?)$/,
          fnc: 'generateCourtesySynthesis'
        },
        {
          reg: /^#?H鸭鸭举牌(.+?) ?(\d?)$/,
          fnc: 'generateYayaJupai'
        },
        {
          reg: /^#?H(猫羽雫|猫羽)举牌(.+?) ?(\d?)$/,
          fnc: 'maoyujupai'
        }
      ]
    });
  }

  async generateHSJupai(e) {
    const apiUrl = 'http://api.yujn.cn/api/hsjp1.php?';
    logger.info('收到HS举牌请求');

    const [, msg, msg1, msg2] = e.msg.match(/^#?hs举牌(.+?) (.+?) (.+?)$/);

    await this.sendResponse('开始制作图片 请稍等...', true);

    try {
      const response = await fetch(`${apiUrl}msg=${encodeURIComponent(msg)}&msg1=${encodeURIComponent(msg1)}&msg2=${encodeURIComponent(msg2)}&rgb1=1`);
      const imageBuffer = await this.fetchImageFromResponse(response);

      await this.e.reply(segment.image(imageBuffer), true);
    } catch (error) {
      await this.sendErrorResponse('获取HS举牌图片失败', error);
    }
  }

  async generateHS2Jupai(e) {
    const apiUrl = 'http://api.yujn.cn/api/hsjp2.php?';
    logger.info('收到HS2举牌请求');

    const [, msg, msg1, msg2] = e.msg.match(/^#?hs2举牌 (.+?) (.+?) (.+?)$/);

    await this.sendResponse('开始制作图片 请稍等...', true);

    try {
      const response = await fetch(`${apiUrl}msg=${encodeURIComponent(msg)}&msg1=${encodeURIComponent(msg1)}&msg2=${encodeURIComponent(msg2)}&rgb1=1`);
      const imageBuffer = await this.fetchImageFromResponse(response);

      await this.e.reply(segment.image(imageBuffer), true);
    } catch (error) {
      await this.sendErrorResponse('获取HS2举牌图片失败', error);
    }
  }

  async sendDirectVideo(e) {
    const type = e.msg.match(/^#?来点(.+)$/)[1];
    const videoUrls = {
      动漫: 'http://api.yujn.cn/api/dmsp.php',
      萝莉: 'http://api.yujn.cn/api/luoli.php',
      甜妹: 'https://v2.api-m.com/api/meinv?return=302',
      欲梦: 'http://api.yujn.cn/api/ndym.php',
      黑丝: 'http://api.yujn.cn/api/heisis.php',
      白丝: 'http://api.yujn.cn/api/baisis.php'
    };
    const videoUrl = videoUrls[type];

    logger.info(`收到${type}视频请求`);

    // 发送文本消息
    await this.e.reply(`收到！开始获取${type}视频`);

    try {
      const forwardNodes = [
        {
          user_id: this.e.user_id,
          nickname: this.e.sender.nickname,
          message: [
            { type: 'video', file: videoUrl }
          ]
        }
      ];

      const forwardMessage = await Bot.makeForwardMsg(forwardNodes);
      await this.e.reply(forwardMessage);
    } catch (error) {
      await this.sendErrorResponse(`发送${type}视频失败`, error);
    }
  }

  async sendRandomVideo(e) {
    const match = e.msg.match(/^多来点视频(\d+)$/);
    const num = match ? parseInt(match[1], 10) : 1;

    if (num > 5) {
      await this.e.reply("视频数量不可大于5", true);
      return;
    }

    logger.info(`收到${num}个随机视频请求`);

    // 发送文本消息
    await this.e.reply(`收到！开始获取${num}个随机视频`);

    try {
      const forwardNodes = [];
      for (let i = 0; i < num; i++) {
        const videoSegment = segment.video('https://jx.iqfk.top/api/sjsp.php');
        forwardNodes.push({
          user_id: this.e.user_id,
          nickname: this.e.sender.nickname,
          message: [videoSegment]
        });
      }
      const forwardMessage = await Bot.makeForwardMsg(forwardNodes);
      await this.e.reply(forwardMessage);
    } catch (error) {
      await this.sendErrorResponse('获取随机视频失败', error);
    }
  }

  async generateHappyReport(e) {
    const [, msg] = e.msg.match(/^#?H喜报(.+?)$/);
    logger.info(`收到喜报请求`);

    await this.sendResponse('开始生成喜报 请稍等...', true);

    try {
      const apiUrl = `https://www.oexan.cn/API/xb.php?msg=${encodeURIComponent(msg)}`;
      const imageBuffer = await this.fetchImage(apiUrl);

      await this.e.reply(segment.image(imageBuffer), true);
    } catch (error) {
      await this.sendErrorResponse('获取喜报图片失败', error);
    }
  }

  async generateSadReport(e) {
    const [, msg] = e.msg.match(/^#?H悲报(.+?)$/);
    logger.info(`收到悲报请求`);

    await this.sendResponse('开始生成悲报 请稍等...', true);

    try {
      const apiUrl = `https://www.oexan.cn/API/beibao.php?msg=${encodeURIComponent(msg)}`;
      const imageBuffer = await this.fetchImage(apiUrl);

      await this.e.reply(segment.image(imageBuffer), true);
    } catch (error) {
      await this.sendErrorResponse('获取悲报图片失败', error);
    }
  }

  async generateCourtesySynthesis(e) {
    const [, a, b] = e.msg.match(/^#?H奇怪龙(.+?) (.+?)$/);
    logger.info(`收到奇怪龙请求！`);

    await this.sendResponse('开始生成合成图片 请稍等...', true);

    try {
      const apiUrl = `http://long.api.zhilaohu.icu/Long.php?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}&t=2`;
      const imageBuffer = await this.fetchImage(apiUrl);

      await this.e.reply(segment.image(imageBuffer), true);
    } catch (error) {
      await this.sendErrorResponse('获取奇怪龙图片失败', error);
    }
  }

  async generateYayaJupai(e) {
    const [, msg, type] = e.msg.match(/^#?H鸭鸭举牌(.+?) ?(\d?)$/);
    const imgType = type ? parseInt(type, 10) : 1;
    logger.info('收到H鸭鸭举牌请求');

    await this.sendResponse('开始制作图片 请稍等...', true);

    try {
      const apiUrl = `https://yaya.api.zhilaohu.icu/yaya.php?a=${encodeURIComponent(msg)}&b=&t=2&img=${imgType}`;
      const imageBuffer = await this.fetchImage(apiUrl);

      await this.e.reply(segment.image(imageBuffer), true);
    } catch (error) {
      await this.sendErrorResponse('获取H鸭鸭举牌图片失败', error);
    }
  }

  async generateYayaJupai(e) {
    const [, msg, type] = e.msg.match(/^#?H(猫羽雫|猫羽)举牌(.+?) ?(\d?)$/);
    const imgType = type ? parseInt(type, 10) : 1;
    logger.info('收到H猫羽雫举牌请求');

    await this.sendResponse('开始制作图片 请稍等...', true);

    try {
      const apiUrl = `https://maoyu.api.zhilaohu.icu/mao.php?a=${encodeURIComponent(msg)}&b=&t=2&img=${imgType}`;
      const imageBuffer = await this.fetchImage(apiUrl);

      await this.e.reply(segment.image(imageBuffer), true);
    } catch (error) {
      await this.sendErrorResponse('获取H猫羽雫举牌图片失败', error);
    }
  }

  async fetchImage(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`请求失败，状态码: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async fetchImageFromResponse(response) {
    if (!response.ok) {
      throw new Error(`请求失败，状态码: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async fetchVideo(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`请求失败，状态码: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async fetchVideos(url, num) {
    const videoPromises = [];

    for (let i = 0; i < num; i++) {
      videoPromises.push(this.fetchVideo(url));
    }

    return Promise.all(videoPromises);
  }

  async sendResponse(message, isPrivate) {
    await this.e.reply(message, isPrivate);
  }

  async sendErrorResponse(message, error) {
    logger.error(`获取资源时出错：${error}`);
    await this.e.reply(`${message}，请稍后重试。`, true);
  }
}
