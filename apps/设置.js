import plugin from '../../../lib/plugins/plugin.js'
import lodash from 'lodash'
import { Config, Common } from '../components/index.js'
import { isVIP } from '../model/vipCheck.js';
import loader from '../../../lib/plugins/loader.js'
import moment from 'moment'
import md5 from 'md5';

const cfgMap = {
  'emoji戳一戳': 'sz.emocyc',
  '早苗戳一戳': 'sz.zmcyc',
  '不可以': 'sz.zrcyc',
  '早苗trss': 'sz.cyczm',
  '进群通知': 'sz.jinqun',
  '表情合成': 'sz.biaoqing',
  'H': 'sz.hhh',
};


const CfgReg = `^#?HL(插件)?设置\\s*(${lodash.keys(cfgMap).join('|')})?\\s*(.*)$`;

export class setting extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: 'HL插件设置',
      /** 功能描述 */
      dsc: '',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: -10,
      rule: [
        {
          /** 命令正则匹配 */
          reg: CfgReg,
          /** 执行方法 */
          fnc: 'message'
        }
      ]
    });
  }

  async message(e) { 
    if (!isVIP(e)) {  
      await e.reply('你没有权限✘');
      return false;
    }
    return await set(e);
  }
}

async function set(e) {
  let reg = new RegExp(CfgReg).exec(e.msg);

  if (reg && reg[2]) {
    let val = reg[3] || '';
    let cfgKey = cfgMap[reg[2]];
    if (cfgKey == 'sz.cycxy') {
      let cycxy = ['all', 'alone'];
      if (!cycxy(val)) {
        e.reply('无效的设置', true);
        return true;
      }
    } else if (val.includes('开启') || val.includes('关闭')) {
      val = !/关闭/.test(val);
    } else {
      cfgKey = '';
    }

    if (cfgKey) {
      setCfg(cfgKey, val);
    }
  }

  let cfg = {};
  for (let name in cfgMap) {
    let key = cfgMap[name].split('.')[1];
    cfg[key] = getStatus(cfgMap[name]);
  }

  // 渲染图像
  return await Common.render('admin/index', {
    ...cfg
  }, { e, scale: 1 });

}

function setCfg(rote, value, def = false) {
  let arr = rote?.split('.') || [];
  if (arr.length > 0) {
    let type = arr[0], name = arr[1];
    let data = Config.getYaml('set', type, def ? 'defSet' : 'config') || {};
    data[name] = value;
    Config.save('set', type, def ? 'defSet' : 'config', data);
  }
}

const getStatus = function (rote, def = false) {
  let _class = 'cfg-status';
  let value = '';
  let arr = rote?.split('.') || [];
  if (arr.length > 0) {
    let type = arr[0], name = arr[1];
    let data = Config.getYaml('set', type, def ? 'defSet' : 'config') || {};
    if (data[name] == true || data[name] == false) {
      _class = data[name] == false ? `${_class}  status-off` : _class;
      value = data[name] == true ? '已开启' : '已关闭';
    } else {
      value = data[name];
    }
  }
  if (!value) {
    if (rote == 'sz.cycxy') {
      value = 'all';
    } else {
      _class = `${_class}  status-off`;
      value = '已关闭';
    }
  }

  return `<div class="${_class}">${value}</div>`;
}