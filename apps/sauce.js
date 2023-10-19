/**
可以作为独立的js插件使用
但是需要修改一下路径
import plugin from'../../lib/plugins/plugin.js'
import cfg from'../../lib/config/config.js'
import common from'../../lib/common/common.js'
需要使用这个导入路径
就是少了一个../
*/
import plugin from'../../../lib/plugins/plugin.js'
import cfg from'../../../lib/config/config.js'
import common from'../../../lib/common/common.js'
const path=process.cwd()

if (!global.segment) { // 判断global.segment是否存在，不存在则导入oicq.segment
global.segment = (await import("oicq")).segment;
}

export class example extends plugin {
constructor () {
super({
name: '管理酱！', // 插件名称
dsc: '@机器人被禁言1天但6秒后解除', // 插件描述
event: 'message.group', // 监听事件
priority: 6969, // 优先级（数字越小 等级越高 负级更高）
});
this.switch = true; //这个是开关
/**
true是开启
false是关闭
如果需要关闭就把这个true改成false
暂时不支持指定群哈（作者太懒）如果有帮手可以优化一下哈
主要是作者不会写
作者还想写发送开关来直接开关功能（研究30分钟决定放弃）
*/
}

async accept() {
    if (!this.switch) return false; // 如果插件关闭，则返回false

    const isEmptyMessage =
        this.e.message.length == 1 ||
        (this.e.message.length == 2 && this.e.message[1].text == ""); // 检查消息是否为空

    if (this.e.atme && isEmptyMessage) { // 判断是否艾特了机器人并且消息为空
        let 酱酱 = encodeURI(`https://gchat.qpic.cn/gchatpic_new/563829463/3943694434-2910457764-B5DEFA9D89747CA1F6F90933A248EC3A/0?term=3&is_origin=1`); // 图片链接
        await this.e.reply(segment.image(酱酱), true); // 回复图片
        this.e.group.muteMember(this.e.sender.user_id, 86400); // 禁言发送人
        await common.sleep(6000); // 等待6秒（时间可以自己改 里面的数字）
        this.e.group.muteMember(this.e.sender.user_id, 0); // 解除禁言（如果不想要解禁就删掉这一行）
        return "return"; // 阻挡消息不再往下（很多种写法的啦）
    }
    return false; // 否则返回false
 }
}