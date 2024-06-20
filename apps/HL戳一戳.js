import { Config} from '../components/index.js'
export class HLcyc extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: 'HL戳一戳',
      /** 功能描述 */
      dsc: '不想写捏',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'notice.group.poke',
      /** 优先级，数字越小等级越高 */
      priority: -1145145,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '.*',
          /** 执行方法 */
          fnc: 'emocyc'
        }
      ]
    });
  }
  
  async emocyc (e) {
if(!Config.getConfig('set','sz')['emocyc']){return false}
    logger.info('[HL戳一戳]');

    // 生成随机数
    let i = Math.floor(Math.random() * 6) + 1;

    // 发送戳一戳
    Array.from({ length: 1 }, () => this.reply({ type: 'poke', id: i }));

    return true
  }
}