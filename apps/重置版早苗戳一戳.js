import { Config} from '../components/index.js'
import plugin from '../../../lib/plugins/plugin.js' //改为独立js需要删除一个../
import cfg from '../../../lib/config/config.js'
import fs from "fs"; // Node.js的文件系统模块
import path from "path"; // Node.js的处理文件路径的模块
const __dirname = path.resolve(); // 获取当前文件运行的目录


export class example extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: '早苗戳一戳',
      /** 功能描述 */
      dsc: '简单开发示例',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'notice.group.poke',
      /** 优先级，数字越小等级越高 */
      priority: 1,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '.*',
          /** 执行方法 */
          fnc: 'chuochuo'
        }
      ]
    })
  }
 
  

  async chuochuo (e) {
if(!Config.getConfig('set','sz')['zmcyc']){return false}
    

    if(e.target_id == cfg.qq){
      
    
    let num = Math.floor(Math.random() * 29)+1;
    
 if(num == 1){
  e.reply(`小牙签还软趴趴～`);
 

}else if(num == 2){
  e.reply(`主人行不行啊，就那么短嘛？`);
}else if(num == 3){
  e.reply(`戳回去,嘿嘿`);
  e.group.pokeMember(e.operator_id);
}
  else if(num == 4){
  e.reply(`不要戳那里...早苗快要...`);
  e.group.pokeMember(e.operator_id);
}else if(num == 5){
  e.reply(`再戳把你76个账号给你盗了`);
}else if(num == 6){
  e.reply(`唔~早苗晃了晃头顶的小呆毛`);
}else if(num == 7){
  e.reply(`早苗要去收集信仰啦~主人要信仰我嘛w`);
  e.group.pokeMember(e.operator_id);
}else if(num == 8){
  e.reply(`早苗想要去睡觉了`);
}else if(num == 9){
  e.reply(`早苗有一点难受...呆在家里太久了，请让早苗静一静，先不要戳了嘛`);
  e.group.pokeMember(e.operator_id);
}else if(num == 10){
  e.reply(`主人因为一直戳早苗...早苗好难受qwq，对主人好感-114514不想再理主人了`);
  e.group.pokeMember(e.operator_id);
}else if(num == 11){
  e.reply(`不可以！`);
}else if(num == 12){
  e.reply(`都叫你不要再戳了！`);
  e.group.pokeMember(e.operator_id);
}
  else if(num == 13){
  e.reply(`你再戳的话！早苗就要...就要凶你了！`);
  e.group.pokeMember(e.operator_id);
}else if(num == 14){
  e.reply(`额啊啊啊！不要再戳了`);
}else if(num == 15){
  e.reply(`嗯啊～真是美好的一天呢`);
}else if(num == 16){
  e.reply(`嗷呜～`);
  e.group.pokeMember(e.operator_id);
}else if(num == 17){
  e.reply(`再戳的话！主人就要以身相许了呢～`);
}else if(num == 18){
  e.reply(`可以让早苗休息一会嘛，早苗快要坚持不住了...`);
  e.group.pokeMember(e.operator_id);
}else if(num == 19){
  e.reply(`主人可以不要一直戳早苗同一个地方嘛...早苗感觉好疼...`);
  e.group.pokeMember(e.operator_id);
}else if(num == 20){
  e.reply(`哼哼哼啊啊啊啊啊，啊啊啊啊啊啊啊啊啊`);
}else if(num == 21){
  e.reply(`哇哦...好大的......`);
  e.group.pokeMember(e.operator_id);
}
  else if(num == 22){
  e.reply(`唔..都怪主人，早苗不理你了！`);
  e.group.pokeMember(e.operator_id);
}else if(num == 23){
  e.reply(`唉？对不起！早苗喝牛奶不小心弄在主人身上了...`);
}else if(num == 24){
  e.reply(`早苗今天穿的粉白色的小裙子呢`);
}else if(num == 25){
  e.reply(`哇唔～风好大啊`);
  e.group.pokeMember(e.operator_id);
}else if(num == 26){
  e.reply(`早苗感觉好舒服呢～`);
}else if(num == 27){
  e.reply(`蹭蹭主人的手....`);
  e.group.pokeMember(e.operator_id);
}else if(num == 28){
  e.reply(`主人真是闲的没事干呢...`);
  e.group.pokeMember(e.operator_id);
}
  return true
  }
}
}

