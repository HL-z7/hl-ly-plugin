// 引入插件基类和文件相关依赖
import plugin from '../../../lib/plugins/plugin.js'; // 引入父类plugin
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
       name: '图片列表',  // 插件名称
       dsc: '合并发送指定路径图片列表',  // 描述信息
       event: 'message',  // 响应事件类型
       priority: 5000,   // 优先级为5000
       rule: [
      {
       reg: null,  // 正则表达式初始化为空字符串，稍后从配置文件中读取
       fnc: 'list'   // 定义函数名为list
       }
      ]
   });

// 读取配置文件
const configPath = path.join(__dirname, 'plugins/hl-plugin/config/list.yaml'); // 配置文件路径
const configFile = fs.readFileSync(configPath, 'utf-8'); // 读取配置文件

// 使用yaml库解析配置文件
const { reg } = YAML.parse(configFile); // 解析出正则表达式

// 将正则表达式更新为从配置文件中读取的值
this.rule[0].reg = new RegExp(`(${reg.join('|')})`); // 注：使用正则表达式匹配消息

// 设置图片文件夹路径
this.imageDirPath = path.join(__dirname, 'plugins/hl-plugin/resources/H'); // 图片文件夹路径 注：图片在资源文件夹中的路径
}

// 定义处理函数list
async list(e) {
const files = fs.readdirSync(this.imageDirPath).filter(file => file.endsWith('.png')); // 注：筛选出png格式的图片文件
if (files.length === 0) {
return false; // 注：如果没有找到符合条件的图片，则返回false
}

const nickname = e.isGroup ? await getNicknameInGroup(e.group_id) : Bot.nickname; // 注：获取群昵称或者用户昵称
const msgList = [{
  message: [`本地图库有 ${files.length} 张图片`],
  nickname,
  user_id: Bot.uin
}];

for (let i = 0; i < files.length; i++) {
  const filePath = path.join(this.imageDirPath, files[i]); // 注：拼接图片的绝对路径
  msgList.push({
    message: [`${i + 1}.`, segment.image(`file://${filePath}`)],
    nickname,
    user_id: Bot.uin
  }); // 注：将每张图片以序号和图片形式添加到消息列表中
}

const forwardMsg = await Bot.makeForwardMsg(msgList); // 注：使用酷Q的API将消息列表合并成一条消息
if (!forwardMsg) {
  e.reply('当前消息被风控限制，请私聊查看', true); // 注：如果消息发送失败，则提供错误提示
} else {
  await e.reply(forwardMsg); // 注：发送消息给用户/群聊
}

return true; // 注：返回true表示处理完成
}
}

// 获取群昵称或者用户昵称
async function getNicknameInGroup(groupId, userId = Bot.uin) {
const info = await Bot.getGroupMemberInfo(groupId, userId);
return info.card || info.nickname || String(userId); // 注：获取群名片或者用户昵称，如果都不存在则返回用户QQ号
}


//这样写好麻烦啊 呜呜~