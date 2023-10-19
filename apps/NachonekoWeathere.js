import plugin from '../../../lib/plugins/plugin.js'  // 导入插件
/**
注意导入的路径
如果你要当独立JS插件使用
请减少一次 ../
也就是写成 import plugin from '../../lib/plugins/plugin.js'
 */
export class NachonekoWeathere extends plugin {  // 定义NachonekoWeathere类并继承plugin类
  constructor () {  // 构造函数
    super({  // 调用父类构造函数
      name: '猫羽雫天气',  // 插件名称
      dsc: '猫羽雫举牌天气接口',  // 插件描述
      event: 'message',  // 监听事件为message 消息类
      priority: 5000,  // 本JS插件优先级 数字越低越高喔
      rule: [  // 规则数组
        {
          reg: "^猫羽雫天气(.*)$",  // 正则表达式规则
          fnc: 'Nachoneko'  // 匹配规则后调用的方法
        }
      ]
    })
  }
  async Nachoneko (e) {  // 声明异步函数Nachoneko
    let 猫猫 = e.msg.replace(/猫羽雫天气/g,"").trim()  // 替换消息中的字符并去除首尾空格
    logger.info(`猫羽雫天气收到查询: ${猫猫}`);  // 输出日志信息
    let url =`http://api.caonm.net/api/qqtq/t.php?msg=${猫猫}&type=img&n=1`  // 构造请求url
    await this.e.reply(segment.image(url), true)  // 发送图片消息
    return;  // 返回
  }
}