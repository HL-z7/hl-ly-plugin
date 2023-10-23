import plugin from '../../../lib/plugins/plugin.js';
import lodash from 'lodash';
import { Cfg, Version, Common, Data, HelpTheme } from '../components/index.js';
import Theme from './help/help.js';

export class hl_help extends plugin {
  constructor() {
    super({
      name: '狐璃_帮助',
      dsc: '',
      event: 'message',
      priority: 2000,
      rule: [
        {
          reg: '^#?hl(插件)?帮助$',
          fnc: 'message'
        }
      ]
    });
  }

  async help(e) {
    let custom = {};
    let help = {};
    let { diyCfg, sysCfg } = await Data.importCfg('help');

    if (lodash.isArray(help.helpCfg)) {
      custom = {
        helpList: help.helpCfg,
        helpCfg: {}
      };
    } else {
      custom = help;
    }

    let helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg);
    let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList;

    let helpGroup = [];

    lodash.forEach(helpList, (group) => {
      if (group.auth && group.auth === 'master' && !e.isMaster) {
        return true;
      }

      lodash.forEach(group.list, (help) => {
        let icon = help.icon * 1;
        if (!icon) {
          help.css = 'display:none';
        } else {
          let x = (icon - 1) % 10;
          let y = (icon - x - 1) / 10;
          help.css = `background-position:-${x * 50}px -${y * 50}px`;
        }
      });

      helpGroup.push(group);
    });

    let themeData = await HelpTheme.getThemeData(diyCfg.helpCfg || {}, sysCfg.helpCfg || {});

    return await Common.render('help/index', {
      helpCfg: helpConfig,
      helpGroup,
      ...themeData,
      element: 'default'
    }, { e, scale: 1.2 });
  }

  async versionInfo(e) {
    return await Common.render('help/version-info', {
      currentVersion: Version.version,
      changelogs: Version.changelogs,
      elem: 'anemo'
    }, { e, scale: 1.2 });
  }
}