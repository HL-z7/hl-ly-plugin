import fs from "node:fs/promises";
import path from "path";
import puppeteer from "puppeteer";

const _dirname = path.resolve('plugins/hl-ly-plugin');

export class jrys extends plugin {
  constructor() {
    super({
      name: '今日运势',
      dsc: '运势',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^#?运势$',
          fnc: 'yunshi',
        },
        {
          reg: '^#?逆天改命$',
          fnc: 'changeFate',
        },
      ],
    });
  }

  getMentionedInfo() {
    const mention = this.e.message.find(msg => msg.type === 'at');
    return {
      qq: mention?.qq || this.e.user_id,
      mentionUserId: mention?.qq || this.e.user_id
    };
  }

  async yunshi() {
    return await this.renderFortune(false);
  }

  async changeFate() {
    return await this.renderFortune(true);
  }

  getRandomColor() {
    const colors = [
      '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
      '#845EC2', '#F9F871', '#FF9671', '#00C9A7', '#C34A36'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  async renderFortune(changeFate = false) {
    const { qq, mentionUserId } = this.getMentionedInfo();
    const url = `http://jrys.api.hlz7.com/?qq=${qq}&starRating=${changeFate ? 7 : 0}&changeFate=${changeFate}`;

    try {
      await this.e.reply("在看咯...");

      const response = await fetch(url);
      if (!response.ok) throw new Error("API 请求失败");

      const data = await response.json();
      if (data.code !== 200 || data.status !== "Success")
        return this.e.reply("被超时了...");

      const content = data.data;

      const htmlTemplate = await fs.readFile(path.join(_dirname, 'resources/html/yunshi/yunshi.html'), 'utf8');
      const cssContent = await fs.readFile(path.join(_dirname, 'resources/html/yunshi/yunshi.css'), 'utf8');
      const fontColorStyle = `color: ${this.getRandomColor()};`;

      const html = htmlTemplate
        .replace('{{fortuneSummary}}', content.fortuneSummary)
        .replace('{{luckyStar}}', content.luckyStar)
        .replace('{{signText}}', content.signText)
        .replace('{{unSignText}}', content.unSignText)
        .replace(/{{fontColorStyle}}/g, fontColorStyle)
        .replace('</head>', `<style>${cssContent}</style></head>`);

      const imageBuffer = await this.renderImage(html);

      return this.e.reply([segment.at(mentionUserId), segment.image(imageBuffer)], true);

    } catch (err) {
      console.error(err);
      return this.e.reply("生成图片时出错...");
    }
  }

  async renderImage(html) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let buffer;

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.setViewport({ width: 480, height: 720 });
      buffer = await page.screenshot({ fullPage: true });
    } finally {
      await browser.close();
    }

    return buffer;
  }
}