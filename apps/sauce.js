/**
可以作为独立的js插件使用
但是需要修改一下路径
import plugin from'../../lib/plugins/plugin.js'
import cfg from'../../lib/config/config.js'
import common from'../../lib/common/common.js'
需要使用这个导入路径
就是少了一个../
*/
import plugin from '../../../lib/plugins/plugin.js';
import cfg from '../../../lib/config/config.js';
import common from '../../../lib/common/common.js';
const path = process.cwd();

if (!global.segment) {
  global.segment = (await import("oicq")).segment;
}

export class example extends plugin {
  constructor() {
    super({
      name: '管理酱！',
      dsc: '@机器人被禁言1天但6秒后解除',
      event: 'message.group',
      priority: -114514,
    });
    this.switch = true;
  }

  async accept() {
    if (!this.switch) return false;

    const isEmptyMessage =
      this.e.message.length === 1 ||
      (this.e.message.length === 2 && this.e.message[1].text === "");

    if (this.e.atme && isEmptyMessage) {
      let 酱酱 = encodeURI(
        `https://img.kookapp.cn/attachments/2023-11/14/beP26bvDdD0u00to.jpeg?x-oss-process=style/ld`
      );
      await this.e.reply(segment.image(酱酱), true);
      this.e.group.muteMember(this.e.sender.user_id, 86400);
      await common.sleep(6000);
      this.e.group.muteMember(this.e.sender.user_id, 0);
      return "return";
    }
    return false;
  }
}