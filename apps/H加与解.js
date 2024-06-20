import plugin from '../../../lib/plugins/plugin.js';

import { createHash } from 'crypto';

export class jyj extends plugin {
  constructor() {
    super({
      name: '解与加',
      dsc: '阿巴阿巴',
      event: 'message',
      rule: [
        {
          reg: "^Hurl加密(.*)$",
          fnc: 'jiaurl'
        },
        {
          reg: "^Hurl解密(.*)$",
          fnc: 'jieurl'
        },
        {
          reg: "^Hbase64加密(.*)$",
          fnc: 'encodeBase64'
        },
        {
          reg: "^Hbase64解密(.*)$",
          fnc: 'decodeBase64'
        },
        {
          reg: "^Hb64加密(.*)$",
          fnc: 'encodeHexToBase64'
        },
        {
          reg: "^Hb64解密(.*)$",
          fnc: 'decodeBase64ToHex'
        },
        {
          reg: "^Hmd5加密(.*)$",
          fnc: 'encodeMD5'
        },
        {
          reg: "^HUnicode加密(.*)$",
          fnc: 'encodeUnicode'
        },
        {
          reg: "^HUnicode解密(.*)$",
          fnc: 'decodeUnicode'
        }
      ]
    });
  }

  async jiaurl(e) {
    let textToEncode = e.msg.replace(/^Hurl加密/, "").trim();
    let encodedText = encodeURIComponent(textToEncode);
    e.reply(`${encodedText}`, true);
    return false;
  }

  async jieurl(e) {
    let textToDecode = e.msg.replace(/^Hurl解密/, "").trim();
    let decodedText = decodeURIComponent(textToDecode);
    e.reply(`${decodedText}`, true);
    return false;
  }

  async encodeBase64(e) {
    let textToEncode = e.msg.replace(/^Hbase64加密/, "").trim();
    let encodedText = Buffer.from(textToEncode).toString('base64');
    e.reply(`${encodedText}`, true);
    return false;
  }

  async decodeBase64(e) {
    let textToDecode = e.msg.replace(/^Hbase64解密/, "").trim();
    let decodedText = Buffer.from(textToDecode, 'base64').toString('utf-8');
    e.reply(`${decodedText}`, true);
    return false;
  }

  async encodeHexToBase64(e) {
    let textToEncode = e.msg.replace(/^Hb64加密/, "").trim();
    let hexBuffer = Buffer.from(textToEncode, 'hex');
    let base64Text = hexBuffer.toString('base64');
    e.reply(`${base64Text}`, true);
    return false;
  }

  async decodeBase64ToHex(e) {
    let textToDecode = e.msg.replace(/^Hb64解密/, "").trim();
    // 过滤非 Base64 字符
    textToDecode = textToDecode.replace(/[^A-Za-z0-9+/=]/g, '');
    let decodedBuffer = Buffer.from(textToDecode, 'base64');
    let hexText = decodedBuffer.toString('hex');
    e.reply(`${hexText}`, true);
    return false;
  }

  async encodeMD5(e) {
    let textToEncode = e.msg.replace(/^Hmd5加密/, "").trim();
    let hashedText = createHash('md5').update(textToEncode).digest('hex');
    e.reply(`${hashedText}`, true);
    return false;
  }

  async encodeUnicode(e) {
    let textToEncode = e.msg.replace(/^HUnicode加密/, "").trim();
    let unicodeText = textToEncode.split('').map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')).join('');
    e.reply(`${unicodeText}`, true);
    return false;
  }

  async decodeUnicode(e) {
    let textToDecode = e.msg.replace(/^HUnicode解密/, "").trim();
    let decodedText = textToDecode.replace(/\\u[\dA-Fa-f]{4}/g, match => String.fromCharCode(parseInt(match.replace('\\u', ''), 16)));
    e.reply(`${decodedText}`, true);
    return false;
  }
}