import plugin from '../../../lib/plugins/plugin.js';
import { segment } from "oicq";
import fs from "fs";
import path from "path";

const _path = process.cwd();

let botname = '崽崽' // 此处修改为自己的Bot名字.
let master = '主人' // 此处修改为主人自定义名字.

// 图片文件夹路径
const imgDir = path.join(_path, 'plugins/hl-ly-plugin/resources/cyc');

export class chuo extends plugin {
  constructor() {
    super({
      name: '不要这样对主人辣',
      dsc: '戳一戳主人图片回复',
      event: 'notice.group.poke',
      priority: -114514,
      rule: [{
        reg: '',
        fnc: 'chuomaster'
      }]
    })
  }
  async chuomaster(e) {
      if(!Config.getConfig('set','sz')['zrcyc']){return false}

    logger.info('[戳一戳生效]')
    if (e.runtime.cfg.masterQQ.includes(e.target_id)) {
      /*触发黑名单*/
      let blackList = []
      if (blackList.includes(e.user_id))
        return false
      /*戳一戳回复*/
      let choose = Math.round(Math.random() * 11)
      let imgPath = '';
      let replyText = '';
      switch (choose) {
        case 1:
          imgPath = getRandomImagePath();
          replyText = `坏人，你对${master}干嘛呢!`;
          break;
        case 2:
          imgPath = getRandomImagePath();
          replyText = `你太坏了，${botname}要为${master}报仇!`;
          break;
        case 3:
          imgPath = getRandomImagePath();
          replyText = `${master}是${botname}的，你不可以这样对${master}`;
          break;
        case 4:
          imgPath = getRandomImagePath();
          replyText = `你很可爱哦~${botname}很喜欢你~`;
          break;
        case 5:
          imgPath = getRandomImagePath();
          replyText = `坏人，${botname}记住你了!`;
          break;
        case 6:
          imgPath = getRandomImagePath();
          replyText = `${botname}劝你去欺负那边那个佬佬`;
          break;
        case 7:
          imgPath = getRandomImagePath();
          replyText = `${botname}咬洗你！`;
          break;
        case 8:
          imgPath = getRandomImagePath();
          replyText = `${botname}做了一个伟大的决定！`;
          break;
        case 9:
          imgPath = getRandomImagePath();
          replyText = `${botname}生气了，你老欺负${master}`;
          break;
        case 10:
          imgPath = getRandomImagePath();
          replyText = `你个坏人！${botname}要喊人了！`;
          break;
        default:
          imgPath = getRandomImagePath();
          replyText = `不！许！碰！${botname}的${master}！`;
      }
      if (fs.existsSync(imgPath)) {
        e.reply([
          segment.at(e.operator_id),
          replyText,
          segment.image(imgPath)
        ], true)
      } else {
        e.reply([
          segment.at(e.operator_id),
          replyText,
          segment.text('[图片未找到]')
        ], true)
      }
    }
    return false
  }
}

function getRandomImagePath() {
  const files = fs.readdirSync(imgDir);
  const randomIndex = Math.floor(Math.random() * files.length);
  return path.join(imgDir, files[randomIndex]);
}