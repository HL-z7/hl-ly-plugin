import plugin from '../../../lib/plugins/plugin.js'

export class help extends plugin {
    constructor() {
        super({
            name: 'HL插件帮助Wiki',//插件名字
            dsc: '不会CSS放个Wiki吧',//插件介绍
            event: 'message',//消息
            priority: -250,//执行优先级：越低等级越高 那负级嘎嘎嘎
            rule: [
                {
                    //正则表达试
                    reg: '(hl帮助|HL帮助|狐狐帮助|H帮助|狐璃帮助|hl功能)',//模糊触发词
                    fnc: 'Help' //前
                }
            ]
        });
    }
         //后
    async Help(e) {
    e.reply("https://gitee.com/fox-glaze/hl-plugin", true);//false为不引用，true为引用
    return;
  }
}
