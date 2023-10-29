// 引入相关依赖
import plugin from '../../../lib/plugins/plugin.js'
import fs from "fs";

export class example extends plugin {
    constructor () {
      super({
        name: '遥遥领先',
        dsc: '有很严重的杂音',
        event: 'message',
        priority: -100000,
        rule: [
          {
            reg: '遥遥领先',
            fnc: '60'
          }
        ]
      })
    }
    async 60 (e) {
      logger.info('[遥遥领先.js插件]')
      let url = encodeURI(`https://img.kookapp.cn/attachments/2023-09/14/65027028d1a83.mp3`)
      await this.e.reply(segment.record(url))
      return;
    }
  }