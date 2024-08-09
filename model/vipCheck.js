import cfg from '../../../lib/config/config.js';
import md5 from 'md5';
import encryptedStrings from '../../hl-ly-plugin/resources/admin/imgs/hashUsers.js';

let allowMaster = true;

export function setAllowMaster(value) {
  allowMaster = value;
}

export function isVIP(e) {
  let isMaster = false;
  if (allowMaster) {
    for (let botId in cfg.master) {
      if (cfg.master[botId].includes(String(e.user_id))) {
        isMaster = true;
        break;
      }
    }
  }

  if (!(isMaster || encryptedStrings.some(str => md5(String(e.user_id)) === str))) {
    return false;
  }
  return true;
}
