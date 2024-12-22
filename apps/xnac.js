export class waixian extends plugin {
  constructor() {
    super({
      name: 'xn',
      dsc: 'xn',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: /^#?星怒艾草$/,
          fnc: 'xn'
        }
      ]
    });
  }

async xn (e){
 let v = [segment.at(2867698764),"撅"]
 await this.e.reply(v)
 return true
}