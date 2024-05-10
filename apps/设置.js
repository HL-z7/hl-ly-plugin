import plugin from '../../../lib/plugins/plugin.js'
import lodash from 'lodash'
import { Config, Common } from '../components/index.js'
import loader from '../../../lib/plugins/loader.js'
import moment from 'moment'
const cfgMap = {

    'emoji戳一戳': 'sz.emocyc',
    '早苗戳一戳': 'sz.zmcyc',
    'mys签到': 'sz.mysqd',
    '不可以': 'sz.zrcyc',
    '早苗trss': 'sz.cyczm',



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
                    fnc: 'message',
                    permission: 'master'
                }
            ]
        });
    }

    async message() {
        return await set(this.e);
    }
}


async function set(e) {
    let reg = new RegExp(CfgReg).exec(e.msg);

    if (reg && reg[2]) {
        let val = reg[3] || '';
        let cfgKey = cfgMap[reg[2]];
        if (cfgKey == 'sz.bantime') {
            if (isNaN(val) || val < 60 || val > 2592000){e.reply('设置错误，请设置60~2592000范围内的时间')
                return true
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
        if (rote == 'sz.cyc') {
            value = '早苗';
        } else {
            _class = `${_class}  status-off`;
            value = '已关闭';
        }
    }

    return `<div class="${_class}">${value}</div>`;
}