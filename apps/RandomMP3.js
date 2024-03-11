// 引入相关依赖
import plugin from '../../../lib/plugins/plugin.js'
import fs from "fs";
import path from "path";

// 获取当前目录路径
const __dirname = path.resolve();

// 引入YAML库
import YAML from 'yaml';

// 定义RandomMP3类并继承plugin基类
export class RandomMP3 extends plugin {
    constructor() {
        // 调用父类构造函数初始化插件信息
        super({
            name: 'hl-随机语音',  // 插件名称
            dsc: '随机发送本地MP3可配置',  // 描述信息
            event: 'message',  // 响应事件类型
            priority: 5000,   // 优先级为5000（越低越高）
            rule: [
                {
                    reg: null,  // 正则表达式初始化为空字符串，稍后从配置文件中读取
                    fnc: 'MP3'   // 定义函数名为MP3
                }
            ]
        });

        // 读取配置文件
        const configPath = path.join(__dirname, 'plugins/hl-ly-plugin/config/RandomMP3.yaml'); // 配置文件路径
        const configFile = fs.readFileSync(configPath, 'utf-8'); // 读取配置文件

        // 使用yaml库解析配置文件
        const { reg } = YAML.parse(configFile); // 解析出正则表达式

        // 将正则表达式更新为从配置文件中读取的值
        this.rule[0].reg = new RegExp(`(${reg.join('|')})`);

        // 设置MP3文件夹路径
        this.mp3DirPath = path.join(__dirname, 'plugins/hl-ly-plugin/resources/MP3');//放MP3的文件夹
    }

    // 定义处理函数MP3
    async MP3(e) { 
    const files = fs.readdirSync(this.mp3DirPath).filter(file => file.endsWith('.mp3')); // 读取所有MP3文件

    // 若文件数量为0则返回false
    if (files.length === 0) {
        return false; // 没有找到文件则返回false
    }
    
    // 随机获取一个MP3文件
    const number = Math.floor(Math.random() * files.length); // 随机获取一个数字
    const mp3Path = path.join(this.mp3DirPath, files[number]); // 获取对应的MP3文件路径

    // 回复包含语音的消息
    await this.reply(segment.record(mp3Path)); // 发送语音消息
    return; 
   }
 }