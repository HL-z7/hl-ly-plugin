import plugin from '../../../lib/plugins/plugin.js';


const _path = process.cwd();


let tx = {};
let kaiguan = {};

let muteMax = 43200; 
let muteMin = 1; 


let tututu = 1;


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
      return true; 
    }

    if (!e.isGroup) {
      return true;
    }

    const groupId = e.group_id;
    const userId = e.user_id;

    
    if (!triggerCount[groupId]) {
      triggerCount[groupId] = {};
    }
    if (!triggerCount[groupId][userId]) {
      triggerCount[groupId][userId] = 0;
    }

    
    triggerCount[groupId][userId]++;

    
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
      
      
      triggerCount[groupId][userId] = 0;
    } else {
      
      let remainingAttempts = 3 - triggerCount[groupId][userId];
      e.reply(`检测到触发违禁词，您还有${remainingAttempts}次机会。`);
    }

    return true; 
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