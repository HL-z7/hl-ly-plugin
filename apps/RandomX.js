// 引入插件基类和文件相关依赖
import plugin from '../../../lib/plugins/plugin.js' // 引入父类plugin
import fs from "fs"; // 引入node.js内置的文件系统模块
import path from "path"; // 引入node.js内置的路径模块

// 获取当前目录路径
const __dirname = path.resolve();

// 引入YAML库
import YAML from 'yaml'; // 引入YAML库解析配置文件

// 定义RandomX类并继承plugin基类
export class RandomX extends plugin {
    constructor() {
        // 调用父类构造函数初始化插件信息
        super({
            name: 'hl-随机二次元',  // 插件名称
            dsc: '壁纸',  // 描述信息
            event: 'message',  // 响应事件类型
            priority: 5000,   // 优先级为5000
            rule: [
                {
                    reg: null,  // 正则表达式初始化为空字符串，稍后从配置文件中读取
                    fnc: 'Xx'   // 定义函数名为Xx
                }
            ]
        });

        // 读取配置文件
        const configPath = path.join(__dirname, 'plugins/hl-ly-plugin/config/RandomX.yaml'); // 配置文件路径
        const configFile = fs.readFileSync(configPath, 'utf-8'); // 读取配置文件

        // 使用yaml库解析配置文件
        const { reg } = YAML.parse(configFile); // 解析出正则表达式

        // 将正则表达式更新为从配置文件中读取的值
        this.rule[0].reg = new RegExp(`(${reg.join('|')})`);

        // 设置图片文件夹路径
        this.imageDirPath = path.join(__dirname, 'plugins/hl-ly-plugin/resources/hhh'); // 图片文件夹路径
    }

    // 定义处理函数Xx
    async Xx(e) { 
        const files = fs.readdirSync(this.imageDirPath).filter(file => file.endsWith('.png')); // 读取所有图片文件

        // 若图片数量为0则返回false
        if (files.length === 0) {
            return false; // 没有找到图片则返回false
        }
        
        // 随机获取一张图片
        const number = Math.floor(Math.random() * files.length); // 随机获取一个数字
        const imagePath = path.join(this.imageDirPath, files[number]); // 获取对应的图片路径

        // 回复包含图片的消息
        await this.reply(segment.image(imagePath)); // 发送图片消息
        return; 
    }
}
