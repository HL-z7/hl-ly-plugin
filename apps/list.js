import plugin from '../../../lib/plugins/plugin.js';
import fs from "fs";
import path from "path";

// 获取当前目录路径
const __dirname = path.resolve();

// 引入YAML库
import YAML from 'yaml';

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
        const configPath = path.join(__dirname, 'plugins/hl-plugin/config/list.yaml');
        const configFile = fs.readFileSync(configPath, 'utf-8');

        // 使用yaml库解析配置文件
        const { reg } = YAML.parse(configFile);

        // 将正则表达式更新为从配置文件中读取的值
        this.rule[0].reg = new RegExp(`(${reg.join('|')})`);

        // 设置图片文件夹路径
        this.imageDirPath = path.join(__dirname, 'plugins/hl-plugin/resources/hhh');
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