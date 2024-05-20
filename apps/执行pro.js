import { segment } from "oicq";
import lodash from "lodash";
import fs from "fs";
import plugin from '../../../lib/plugins/plugin.js';
import common from '../../../lib/common/common.js';

// 项目路径
const _path = process.cwd();

// 这不能改
let tx = {};
let kaiguan = {};

let muteMax = 43200; // 禁言分钟数上限
let muteMin = 1; // 禁言分钟数下限

// 是否启用谁发谁禁言，否为0是为1
let tututu = 1;

// 存储用户触发关键词次数的对象
let triggerCount = {};

export class kelitaocan extends plugin {
  constructor() {
    super({
      name: "执行禁言pro",
      dsc: "不想写捏",
      event: "message",
      priority: 600,
      rule: [
        {
          reg: '^(你妈|cnm|草你妈|艹你妈|你m)$',
          fnc: 'kelitaocan'
        }
      ],
    })
  }

  async kelitaocan(e) {
    if (e.isMaster || e.user_id == 923276093 || e.user_id == 3610159055) { 
      e.reply("主人怎么这么不小心呀～");
      return true; // 不执行后续操作
    }

    if (!e.isGroup) {
      return true;
    }

    const groupId = e.group_id;
    const userId = e.user_id;

    // 初始化用户触发次数为0
    if (!triggerCount[groupId]) {
      triggerCount[groupId] = {};
    }
    if (!triggerCount[groupId][userId]) {
      triggerCount[groupId][userId] = 0;
    }

    // 增加用户触发次数
    triggerCount[groupId][userId]++;

    // 如果触发次数达到3次，则执行禁言操作
    if (triggerCount[groupId][userId] >= 3) {
      let mmap = await e.group.getMemberMap();
      let arrMember = Array.from(mmap.values());
      let randomGay = arrMember[Math.round(Math.random() * (arrMember.length - 1))];
      let randomtime = Math.round(Math.random() * (muteMax - muteMin)) + muteMin;
      let name = randomGay.card;
      if (name.length == 0) {
        name = randomGay.nickname;
      }
      let who = randomGay.user_id;

      if (tututu) {
        who = e.user_id;
        name = e.sender.card;
        if (name.length == 0) {
          name = e.sender.nickname;
        }
      }
      e.group.muteMember(who, randomtime * 60);
      tx[groupId] = { user_id: who };

      e.reply(`检测到触发违禁词，您已违规！开始禁言操作！ \n【${name}】 ${who}  \n您已被禁言${randomtime}分钟！`);
      
      // 重置用户触发次数
      triggerCount[groupId][userId] = 0;
    } else {
      // 提示用户还有几次机会
      let remainingAttempts = 3 - triggerCount[groupId][userId];
      e.reply(`检测到触发违禁词，您还有${remainingAttempts}次机会。`);
    }

    return true; // 返回 true 阻挡消息不再往下
  }
}

export class helpMaster extends plugin {
  constructor() {
    super({
      name: '执行禁言pro',
      dsc: 'unban',
      event: 'notice.group.ban',
      priority: -1,
      rule: [
        {
          /** 命令正则匹配 */
          fnc: 'help'
        }
      ]
    })
  }

  async help(e) {
    if (!e.isMaster) return false
    if (e.member.is_admin && !e.group.is_owner) {
      await this.reply('主人..呜呜~(>_<)~')
      return false
    }
      
    if (e.duration === 0) { return false }
    if (Bot[e.self_id].pickGroup(e.group_id).is_admin || e.group.is_owner) {
      await e.group.muteMember(e.user_id, 0)
      e.reply('主人！我来啦！')
      return false
    } else {
      e.reply('主人...呜呜~(>_<)~')
      return false
    }
  }
}