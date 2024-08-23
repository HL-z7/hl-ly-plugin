import fetch from 'node-fetch';
import gifFrames from 'gif-frames';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
*hl-ly-plugin
*作者：HL 
*QQ：3610159055
*官网 hli.icu
*插件写于2024年8月22号
*功能作用是将gif图片拆成分帧图 再进行合成长图
*使用时请在“example”里创建“gif”文件夹
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class Example extends plugin {
  constructor() {
    super({
      name: '提取',
      dsc: 'HL',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^#?转长图$',
          fnc: 'processGif'
        },
        {
          reg: '^#?gif清除$',
          fnc: 'clearGifCache'
        }
      ]
    });

    this.streamToBuffer = this.streamToBuffer.bind(this);
  }

  async processGif(e) {
    e.reply('已收到请求！开始逐步合成...');

    const source = e.source;
    if (!source || !source.seq) {
      e.reply('无法获取 source 或 source 中没有 seq');
      return false;
    }

    const seq = source.seq;

    try {
      const history = await e.group.getChatHistory(seq, 1);
      const gifUrl = this.extractGifUrl(history);

      if (!gifUrl) {
        e.reply('未找到 GIF 动图');
        return false;
      }

      const { framePaths, longImagePath } = await this.convertGifToLongImage(gifUrl);

      await this.sendMergedImages(e, framePaths, longImagePath, gifUrl);

      return true;
    } catch (error) {
      e.reply('处理 GIF 动图失败');
      return false;
    }
  }

  extractGifUrl(history) {
    for (const record of history) {
      for (const item of record.message) {
        if (item.type === 'image' && item.file.endsWith('.gif')) {
          return item.url;
        }
      }
    }
    return null;
  }

  async convertGifToLongImage(gifUrl) {
    const response = await fetch(gifUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let frames;
    try {
      frames = await gifFrames({
        url: buffer,
        frames: 'all',
        outputType: 'png',
        cumulative: false,
        dispose: 'restore'
      });
    } catch (error) {
      throw new Error('无法获取 GIF 帧');
    }

    const gifFolder = path.join(__dirname, 'gif');
    if (!fs.existsSync(gifFolder)) {
      fs.mkdirSync(gifFolder);
    }

    const framePaths = [];
    let totalHeight = 0;
    let maxWidth = 0;

    const frameBuffers = await Promise.all(frames.map(async (frame, index) => {
      try {
        const frameStream = frame.getImage();
        const frameBuffer = await this.streamToBuffer(frameStream);

        const processedBuffer = await sharp(frameBuffer)
          .flatten({ background: { r: 255, g: 255, b: 255 } })  // 去除透明背景
          .removeAlpha()  // 去除Alpha通道，以避免透明度混淆
          .toBuffer();

        const metadata = await sharp(processedBuffer).metadata();
        totalHeight += metadata.height;
        if (metadata.width > maxWidth) {
          maxWidth = metadata.width;
        }

        const framePath = path.join(gifFolder, `frame_${index}.png`);
        await sharp(processedBuffer).png().toFile(framePath);

        framePaths.push(framePath);

        return processedBuffer;
      } catch (error) {
        console.error(`处理第 ${index} 帧时出错:`, error);
        return null; // 跳过损坏的帧
      }
    }).filter(buffer => buffer !== null)); // 过滤掉损坏的帧

    const compositeImage = sharp({
      create: {
        width: maxWidth,
        height: totalHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      }
    });

    let currentY = 0;
    const compositeOps = frameBuffers.map((frameBuffer, index) => {
      return sharp(frameBuffer).metadata().then(metadata => {
        const top = currentY;
        currentY += metadata.height;
        return { input: frameBuffer, top, left: 0 };
      });
    });

    const outputFileName = `long_image_${Date.now()}.png`;
    const outputPath = path.join(gifFolder, outputFileName);

    await compositeImage.composite(await Promise.all(compositeOps)).toFile(outputPath);

    return {
      framePaths,
      longImagePath: outputPath
    };
  }

  streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }

  async sendMergedImages(e, framePaths, longImagePath, gifUrl) {
    const messages = [
      '------[合并后的长图]------', 
      { type: 'image', file: longImagePath },
      '------[原图]------',
      { type: 'image', file: gifUrl }
    ];

    messages.push('------[GIF 拆分帧图片]------');
    framePaths.forEach((path, index) => {
      messages.push({
        type: 'image',
        file: path
      });
    });

    const aw = this.e.runtime.common.makeForwardMsg(e, messages, '长图、原图与拆分帧图片');
    await e.reply(aw);
  }

  async clearGifCache(e) {
    const gifFolder = path.join(__dirname, 'gif');

    if (!fs.existsSync(gifFolder)) {
      e.reply('没有找到缓存的 GIF 图片');
      return false;
    }

    const files = fs.readdirSync(gifFolder);
    let deletedFilesCount = 0;

    for (const file of files) {
      const filePath = path.join(gifFolder, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        deletedFilesCount++;
      }
    }

    e.reply(`已清理${deletedFilesCount}张缓存图片！`);

    return true;
  }
}