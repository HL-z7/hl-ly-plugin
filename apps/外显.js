import fs from 'fs';
import path from 'path';

const summaryFile = path.join('resources', 'summary.yaml');
let summarymsg = fs.existsSync(summaryFile) ? fs.readFileSync(summaryFile, 'utf-8') : '[图片]';

export class waixian extends plugin {
  constructor() {
    super({
      name: '外显',
      dsc: '外显',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: /^#?hl(设置|增加|删除|取消)外显(\s+)?(.+)?$/i,
          fnc: 'waixian'
        }
      ]
    });
  }

  async waixian(e) {
    if(!this.e.isMaster){return true}
    const [, action, , summary] = e.msg.match(this.rule[0].reg);
    if (['设置','增加','添加'].includes(action)) {
      summarymsg = summary;
      fs.writeFileSync(summaryFile, summary);
      return e.reply(`已经设置外显为: ${summary}`);
  }
  else if(['删除','取消'].includes(action)) {
    summarymsg = '[图片]';
    fs.writeFileSync(summaryFile, summarymsg);
    return e.reply(`已经删除外显`);
  }
}
}
segment.image = (file, name) => {
  return {
    type: "image",
    file,
    name,
    summary:summarymsg
  };
};