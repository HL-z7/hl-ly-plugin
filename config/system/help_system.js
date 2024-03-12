/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: 'HL帮助',
  subTitle: 'Yunzai-Bot & hl-ly-Plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
  {
    "group": "实用功能",
    "list": [
      {
        "icon": 71,
        "title": "米游社手动过验证码",
        "desc": "当遇到原神验证码时触发"
      },
      {
        "icon": 23,
        "title": "hl天气广东",
        "desc": "使用方法：在天气后面加上名称即可，注意不要加#"
      },
      {
        "icon": 75,
        "title": "#h翻+要翻译的内容",
        "desc": "翻译指定文本"
      }
    ]
  },
  {
    "group": "娱乐功能",
    "list": [
      {
        "icon": 18,
        "title": "#随机kfc",
        "desc": "发送疯狂星期四文案"
      },
      {
        "icon": 74,
        "title": "重制版早苗戳一戳",
        "desc": "戳一戳机器人即可触发（仅喵崽可用）"
      },
      {
        "icon": 82,
        "title": "H随机语音",
        "desc": "随机发送一条奇怪的语音～"
      },
      {
        "icon": 16,
        "title": "遥遥领先",
        "desc": "怎么感觉有好强烈的杂音"
      },
      {
        "icon": 51,
        "title": "菜就多练",
        "desc": "菜就多练！输不起就别玩！"
      },
      {
        "icon": 84,
        "title": "厵神/真寻",
        "desc": "发送其一即可触发"
      }
    ]
  },
  {
    "group": "图片功能",
    "desc": "需要绑定cookie",
    "list": [
      {
        "icon": 6,
        "title": "hl列表",
        "desc": "可立即查看所有图片列表"
      },
      {
        "icon": 86,
        "title": "#H随机二次元",
        "desc": "发送随机一张二次元图片"
      },
      {
        "icon": 78,
        "title": "H随机猫猫",
        "desc": "发送随机猫猫图片"
      },
      {
        "icon": 88,
        "title": "H随机三次元",
        "desc": "发送随机三次元图片"
      },
      {
        "icon": 79,
        "title": "H随机甘城",
        "desc": "发送随机甘城图片"
      },
      {
        "icon": 27,
        "title": "H心脏弱",
        "desc": "随机发送心脏弱系列漫画（需要开代理才能访问api）"
      },
      {
        "icon": 35,
        "title": "H随机2次元",
        "desc": "与随机二次元截然不同啦～"
      },
      {
        "icon": 57,
        "title": "美女/小姐姐",
        "desc": "字面意思【温馨提 示：少看点，小心虚了]"
      },
      {
        "icon": 90,
        "title": "柴郡",
        "desc": "随机发送柴郡猫猫图！"
      },
      {
        "icon": 60,
        "title": "Hcos",
        "desc": "发送随机cos图"
      }
    ]
  },
  {
    "group": "其他查询指令",
    "list": [
      {
        "icon": 72,
        "title": "HL统计",
        "desc": "统计本地图库数量（目前还未更新其他）"
      }
    ]
  },
  {
    "group": "管理命令，仅管理员可用",
    "auth": "master",
    "list": [
      {
        "icon": 29,
        "title": "#hl更新/#hl强制更新",
        "desc": "插件更新"
      }
    ]
  }]

export const isSys = true  //