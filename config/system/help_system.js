/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: 'hl帮助',
  subTitle: 'Yunzai-Bot & hl-Plugin',
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
  group: 'hl插件功能',
    "list": [
      {
        "icon": 71,
        "title": "米游社绕验证",
        "desc": "这个没指令，你发类似于体力的指令的时候会触发这个"
      },
      {
        "icon": 63,
        "title": "柴郡",
        "desc": "发柴郡就会触发"
      },
      {
        "icon": 66,
        "title": "美女 小姐姐",
        "desc": "发美女或小姐姐就会触发（温馨提示：少看点，小心虚了）"
      },
      {
        "icon": 65,
        "title": "重置版早苗戳一戳",
        "desc": "戳一戳机器人就可以了，戳完会发文本"
      },
      {
        "icon": 79,
        "title": "真寻",
        "desc": "发真寻就会触发一个视频（不是随机类）"
      },
      {
        "icon": 64,
        "title": "厵神",
        "desc": "会触发一个视频（跟真寻一样，不是随机的）"
      },
      {
        "icon": 67,
        "title": "原神启动！",
        "desc": "会触发原神启动四字的连续图片（很刷屏）"
      },
      {
        "icon": 62,
        "title": "随机语音",
        "desc": "触发会发语音（这是废话（bushi））"
      },
      {
        "icon": 1,
        "title": "遥遥领先",
        "desc": "会发遥遥领先的语音"
      },
      {
        "icon": 1,
        "title": "hl列表",
        "desc": "输入hl列表即可触发"
      },
      {
        "icon": 77,
        "title": "随机二次元",
        "desc": "会触发随机壁纸"
      }]
      },
     {
    "group": "管理命令，仅管理员可用",
    "auth": "master",
    "list": [
      {
        "icon": 71,
        "title": "#hl更新 #hl强制更新",
        "desc": "更新插件"
      }
    ]
  }]

export const isSys = true  //