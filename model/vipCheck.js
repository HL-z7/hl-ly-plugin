import md5 from 'md5';
import encryptedStrings from '../../hl-ly-plugin/resources/admin/imgs/hashUsers.js';

let allowMaster = true;

export function setAllowMaster(value) {
  allowMaster = value;
}

export function isVIP(e) {
  
  if (allowMaster && e.isMaster) {
    return true;
  }
  if (encryptedStrings.some(str => md5(String(e.user_id)) === str)) {
    return true;
  }
  return false;
}