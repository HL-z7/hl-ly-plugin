import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs';
import path from 'path';
import https from 'https';

const __dirname = path.resolve();

export class RandomX extends plugin {
  constructor() {
    super({
      name: 'hl-随机二次元',
      dsc: '壁纸',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: "^#?H随机二次元$",
          fnc: 'Xx',
        },
        // 添加新的规则
        {
          reg: "^H随机柴郡$",
          fnc: 'X',
        }
      ],
    });

    this.imageDirPath = path.join(__dirname, 'plugins/hl-ly-plugin/resources/hhh');
  }

  async Xx(e) {
    const files = fs.readdirSync(this.imageDirPath).filter(file => file.endsWith('.png'));
    if (files.length === 0) {
      return false;
    }

    const number = Math.floor(Math.random() * files.length);
    const imagePath = path.join(this.imageDirPath, files[number]);

    let buttons = [
      [
        {
          text: '再来一张',
          callback: 'H随机二次元',
          send: true,
        },
        {
          text: '柴郡',
          callback: 'H随机柴郡',
          send: true,
        },
      ],
       [
        {
          text: '甘城猫猫',
          callback: 'H随机甘城',
          send: true,
        },
        {
          text: '心脏弱',
          callback: 'H心脏弱',
          send: true,
        },
      ],
    ];

    await this.reply([
      segment.image(imagePath),
      segment.button(...buttons),
    ]);
    return;
  }

  async X(e) {
    const imageUrl = "https://image-api.api.luoyutianyang.icu/api/chaijun";
    const tmpDir = "plugins/hl-ly-plugin/tmp";
    const timestamp = Date.now();
    const localPath = path.join(tmpDir, `${timestamp}`);

    try {
      await this.downloadImage(imageUrl, localPath);
      let buttons = [
        [
          {
            text: '二次元',
            callback: 'H随机二次元',
            send: true,
          },
          {
            text: '再来一张',
            callback: 'H随机柴郡',
            send: true,
          },
        ],
         [
        {
          text: '甘城猫猫',
          callback: 'H随机甘城',
          send: true,
        },
        {
          text: '心脏弱',
          callback: 'H心脏弱',
          send: true,
        },
      ],
      ];

      e.reply([
        segment.image(localPath),
        segment.button(...buttons),
      ]);

      fs.unlink(localPath, err => {
        if (err) {
          console.error('删除文件出错:', err);
        } else {
          console.log(`删除临时文件 ${timestamp}`);
        }
      });
    } catch (err) {
      console.error('下载图片出错:', err);
    }
  }

  async downloadImage(url, localPath) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(localPath);

      https.get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', err => {
        fs.unlink(localPath, () => reject(err));
      });
    });
  }
}