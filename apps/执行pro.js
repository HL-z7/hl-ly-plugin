import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const _path = process.cwd();
const configPath = path.join(_path, 'plugins/hl-ly-plugin/config/jin.yaml');
const defaultConfigPath = path.join(_path, 'plugins/hl-ly-plugin/config/default_config/jin.yaml');


function loadConfig() {
  try {
    return yaml.load(fs.readFileSync(configPath, 'utf8'));
  } catch (err) {
    if (!fs.existsSync(configPath)) {
      fs.copyFileSync(defaultConfigPath, configPath);
      return yaml.load(fs.readFileSync(defaultConfigPath, 'utf8'));
    }
    throw err;
  }
}

function saveConfig(config) {
  fs.writeFileSync(configPath, yaml.dump(config), 'utf8');
}

let config = loadConfig();


function loadGroupConfig(groupId) {
  if (!config.groupBanWords) {
    config.groupBanWords = {};
  }
  if (!config.banWords) {
    config.banWords = {
      default: {
        exact: [],
        fuzzy: []
      }
    };
  }
  if (!config.groupBanWords[groupId]) {
    config.groupBanWords[groupId] = JSON.parse(JSON.stringify(config.banWords.default)); 
  }
  return config.groupBanWords[groupId];
}

function saveGroupConfig(groupId, groupConfig) {
  config.groupBanWords[groupId] = groupConfig;
  saveConfig(config);
}


function checkPermission(e) {
  if (!e.isGroup || (!e.member?.is_owner && !e.member?.is_admin && !e.isMaster)) {
    e.reply("你没有权限✘");
    return false;
  }
  return true;
}

function checkBanWords(message, groupConfig, mode) {
  if (!groupConfig) return false;
  if (mode === 'exact') {
    if (!Array.isArray(groupConfig.exact)) return false;
    return groupConfig.exact.some(word => {
      const exactPattern = new RegExp(`(?<!\\S)${word}(?!\\S)`, 'i'); 
      return exactPattern.test(message);
    });
  } else if (mode === 'fuzzy') {
    if (!Array.isArray(groupConfig.fuzzy)) return false;
    return groupConfig.fuzzy.some(word => typeof message === 'string' && message.includes(word)); 
  }
  return false;
}

export class kelitaocan extends plugin {
  constructor() {
    super({
      name: "[hl-ly-plugin]违禁词监听",
      dsc: "违禁词监听",
      event: "message",
      priority: 60000,
      rule: [
        {
          reg: '.*',
          fnc: 'kelitaocan'
        }
      ],
    });
  }

  async kelitaocan(e) {
    if (!e.isGroup || !e.group.is_admin) return true;

    
    if (!config.banWordSwitch) return true;

    const groupId = e.group_id;
    const userId = e.user_id;
    const message = e.msg;
    const groupConfig = loadGroupConfig(groupId);

    
    if (!config.triggerCount[groupId]) config.triggerCount[groupId] = {};
    if (!config.triggerCount[groupId][userId]) config.triggerCount[groupId][userId] = 0;

    const isPrivileged = e.member?.is_owner || e.member?.is_admin || e.isMaster;

    
    if (checkBanWords(message, groupConfig, 'exact') || checkBanWords(message, groupConfig, 'fuzzy')) {
      if (isPrivileged) {
        
        if (e.member?.is_owner) e.reply("群主大大怎么这么不小心鸭～");
        else if (e.member?.is_admin) e.reply("管理酱怎么这么不小心鸭～");
        else if (e.isMaster) e.reply("主人怎么这么不小心呀～");
      } else {
        
        config.triggerCount[groupId][userId]++;
        if (config.triggerCount[groupId][userId] >= 3 || config.mode === 2) {
          
          let muteTime = Math.round(Math.random() * (config.muteMax - config.muteMin) + config.muteMin);
          e.group.muteMember(userId, muteTime * 60);
          e.reply(`检测到触发违禁词，您已被禁言${muteTime}分钟！`);
          config.triggerCount[groupId][userId] = 0; 
        } else if (config.mode === 1) {
          let remainingAttempts = 3 - config.triggerCount[groupId][userId];
          e.reply(`检测到触发违禁词，您还有${remainingAttempts}次机会！`);
        }
      }
      saveConfig(config);
    }
    return true;
  }
}

export class banWordManager extends plugin {
  constructor() {
    super({
      name: '违禁词管理',
      dsc: '管理违禁词',
      event: 'message',
      priority: 600,
      rule: [
        { 
          reg: '^H新增违禁词(.+)$', 
          fnc: 'addExactBanWord' 
        },
        { 
          reg: '^H新增模糊违禁词(.+)$', 
          fnc: 'addFuzzyBanWord' 
        },
        { 
          reg: '^H删除违禁词(.+)$', 
          fnc: 'removeExactBanWord' 
        },
        { 
          reg: '^H删除模糊违禁词(.+)$', 
          fnc: 'removeFuzzyBanWord' 
        },
        { 
          reg: '^H违禁词列表$', 
          fnc: 'listBanWords' 
        },
        { 
          reg: '^H违禁词设置时间(\\d+)$', 
          fnc: 'setMuteTime' 
        },
        { 
          reg: '^H违禁词切换模式(1|2)$', 
          fnc: 'setWarningMode' 
        },
        { 
          reg: '^H违禁词开启$', 
          fnc: 'enableBanWords' 
        },
        { 
          reg: '^H违禁词关闭$', 
          fnc: 'disableBanWords' 
        }
      ],
    });
  }

  async enableBanWords(e) {
    if (!checkPermission(e)) return;
    config.banWordSwitch = true;
    saveConfig(config);
    e.reply('违禁词功能已开启');
  }

  async disableBanWords(e) {
    if (!checkPermission(e)) return;
    config.banWordSwitch = false;
    saveConfig(config);
    e.reply('违禁词功能已关闭');
  }

  async addExactBanWord(e) {
    if (!checkPermission(e)) return;
    const word = e.msg.replace(/^H新增违禁词/, '');
    const groupId = e.group_id;
    const groupConfig = loadGroupConfig(groupId);
    if (!groupConfig.exact.includes(word)) {
      groupConfig.exact.push(word);
      saveGroupConfig(groupId, groupConfig);
      e.reply(`已新增精准违禁词：“${word}”`);
    } else {
      e.reply('该精准违禁词已存在！');
    }
  }

  async addFuzzyBanWord(e) {
    if (!checkPermission(e)) return;
    const word = e.msg.replace(/^H新增模糊违禁词/, '');
    const groupId = e.group_id;
    const groupConfig = loadGroupConfig(groupId);
    if (!groupConfig.fuzzy.includes(word)) {
      groupConfig.fuzzy.push(word);
      saveGroupConfig(groupId, groupConfig);
      e.reply(`已新增模糊违禁词：“${word}”`);
    } else {
      e.reply('该模糊违禁词已存在！');
    }
  }

  async removeExactBanWord(e) {
    if (!checkPermission(e)) return;
    const word = e.msg.replace(/^H删除违禁词/, '');
    const groupId = e.group_id;
    const groupConfig = loadGroupConfig(groupId);
    const index = groupConfig.exact.indexOf(word);
    if (index !== -1) {
      groupConfig.exact.splice(index, 1);
      saveGroupConfig(groupId, groupConfig);
      e.reply(`已删除精准违禁词：“${word}”`);
    } else {
      e.reply('未找到该精准违禁词...');
    }
  }

  async removeFuzzyBanWord(e) {
    if (!checkPermission(e)) return;
    const word = e.msg.replace(/^H删除模糊违禁词/, '');
    const groupId = e.group_id;
    const groupConfig = loadGroupConfig(groupId);
    const index = groupConfig.fuzzy.indexOf(word);
    if (index !== -1) {
      groupConfig.fuzzy.splice(index, 1);
      saveGroupConfig(groupId, groupConfig);
      e.reply(`已删除模糊违禁词：“${word}”`);
    } else {
      e.reply('未找到该模糊违禁词...');
    }
  }

  async listBanWords(e) {
    const groupId = e.group_id;
    const groupConfig = loadGroupConfig(groupId);
    const exactWords = groupConfig.exact.length > 0 ? groupConfig.exact.join(', ') : '无';
    const fuzzyWords = groupConfig.fuzzy.length > 0 ? groupConfig.fuzzy.join(', ') : '无';

    const messages = [
      { message: `当前精准违禁词：\n${exactWords}` },
      { message: `当前模糊违禁词：\n${fuzzyWords}` }
    ];

    const forwardMsg = await this.e.runtime.common.makeForwardMsg(e, messages.map(m => m.message), '违禁词列表');
    await e.reply(forwardMsg);
    return true;
  }

  async setMuteTime(e) {
    if (!checkPermission(e)) return;
    let time = parseInt(e.msg.replace(/^H违禁词设置时间/, ''), 10);
    if (time < 1) time = Math.floor(Math.random() * (config.muteMax - config.muteMin)) + config.muteMin;
    config.muteMax = Math.min(Math.max(time, config.muteMin), 43200); 
    saveConfig(config);
    e.reply(`已将最大禁言时间设置为${config.muteMax}分钟`);
  }

  async setWarningMode(e) {
    if (!checkPermission(e)) return;
    const mode = parseInt(e.msg.replace(/^H违禁词切换模式/, ''), 10);
    config.mode = mode;
    saveConfig(config);
    e.reply(`违禁词模式已切换为${mode === 1 ? '提示模式' : '直接禁言模式'}`);
  }
}
