import _ from 'lodash'
import { createRequire } from 'module'
import moment from 'moment'
import os from 'os'
import plugin from '../../../lib/plugins/plugin.js'
import cfg from '../../../lib/config/config.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import State from '../model/State.js'
const require = createRequire(import.meta.url)
//此文件借鉴了 土块插件(https://gitee.com/SmallK111407/earth-k-plugin) qwq
export class NewState extends plugin {
  constructor() {
    super({
      name: 'HL状态',
      event: 'message',
      priority: 1145,
      rule: [{
        reg: '^#?(HL|hl)状态(pro)?$',
        fnc: 'state2'
      }]
    })
  }

  async state2(e) {
    let shuju = []
    
    // 系统信息获取
    let FastFetch;
    let HardDisk
    let otherInfo = []
    
    otherInfo.push({
      first: '系统',
      tail: State.osInfo?.distro || 'Unknown'
    })
    // 网络
    otherInfo.push(State.getnetwork)
    // 插件数量
    otherInfo.push(State.getPluginNum)

    let promiseTaskList = [
      State.getFastFetch(e).then(res => { FastFetch = res }),
      State.getFsSize().then(res => { HardDisk = res })
    ]

    // 网络测试
    let psTest = []
    let psTestSites = false 
    let psTestTimeout = 5000

    psTestSites && promiseTaskList.push(...psTestSites?.map(i => State.getNetworkLatency(i.url, psTestTimeout).then(res => psTest.push({
      first: i.name,
      tail: res
    }))))

    await Promise.all(promiseTaskList)

    // 可视化数据 (CPU/内存/GPU/Node)
    let visualData = _.compact(await Promise.all([
      State.getCpuInfo(),
      State.getMemUsage(),
      State.getGPU(),
      State.getNodeInfo()
    ]))

    // Redis数据
    const sent = await redis.get('Yz:count:sendMsg:total') || 0
    const screenshot = await redis.get('Yz:count:screenshot:total') || 0
    
    // 机器人名称处理
    let yunzaiName = cfg.package.name
    if (yunzaiName == 'miao-yunzai') yunzaiName = 'Miao-Yunzai'
    else if (yunzaiName == 'yunzai') yunzaiName = 'Yunzai-Bot'
    else if (yunzaiName == 'trss-yunzai') yunzaiName = 'TRSS-Yunzai'
    else yunzaiName = _.capitalize(yunzaiName)
    
    const BotName = yunzaiName
    const systime = await formatTime(os.uptime(), 'dd天hh小时mm分', false)
    const calendar = moment().format('YYYY-MM-DD HH:mm:ss')
    const nodeVersion = process.version

    /** bot列表逻辑 */
    let BotList = [e.self_id]
    if (e.msg.includes("pro") && Array.isArray(Bot?.uin)) {
      BotList = Bot.uin
    } else if (e.msg.includes("pro") && !Array.isArray(Bot?.uin) && Bot?.adapter && Bot?.adapter.includes(e.self_id)) {
      BotList = Bot.adapter
    }

    for (const i of BotList) {
      const bot = Bot[i]
      if (!bot?.uin) continue
      
      const avatar = bot.avatar || `https://q1.qlogo.cn/g?b=qq&s=0&nk=${bot.uin}`
      const nickname = bot.nickname || "不知道捏"
      const platform = bot.apk ? `${bot.apk.display} v${bot.apk.version}` : bot.version.version || "不知道捏"
      const recv = bot.stat?.recv_msg_cnt || "0"
      const friendQuantity = Array.from(bot.fl.values()).length
      const groupQuantity = Array.from(bot.gl.values()).length
      const runTime = await formatTime(Date.now() / 1000 - bot.stat?.start_time, 'dd天hh小时mm分', false)
      const botVersion = bot.version ? `${bot.version.name}(${bot.version.id})${bot.apk ? ` ${bot.version.version}` : ""}` : `ICQQ(QQ) v${require('icqq/package.json').version}`

      shuju.push({
        "avatar": avatar,
        "nickname": nickname,
        "platform": platform,
        "sent": sent,
        "screenshot": screenshot,
        "BotName": BotName,
        "systime": systime,
        "time": calendar,
        "calendar": nodeVersion,
        "recv": recv,
        "friendQuantity": friendQuantity,
        "groupQuantity": groupQuantity,
        "runTime": runTime,
        "botVersion": botVersion
      })
    }

    
    let url = "https://www.loliapi.com/acg/?v=" + Date.now()

    let data = {
      shuju,
      url, // 传递 URL
      HardDisk,
      FastFetch,
      fsStats: State.DiskSpeed,
      visualData,
      otherInfo: _.compact(otherInfo),
      psTest: _.isEmpty(psTest) ? false : psTest
    }

    let ml = process.cwd()
    let data1 = {
      tplFile: './plugins/hl-ly-plugin/resources/html/state/lyr.html',
      data: data,
      dz: ml,
      url: url, // 确保顶层也有
      HardDisk,
      visualData
    }

    let img = await puppeteer.screenshot("123", {
      ...data1,
    });
    e.reply(img)
  }
}

async function formatTime(time, format, repair = true) {
  const second = parseInt(time % 60)
  const minute = parseInt((time / 60) % 60)
  const hour = parseInt((time / (60 * 60)) % 24)
  const day = parseInt(time / (24 * 60 * 60))
  const timeObj = {
    day,
    hour: repair && hour < 10 ? `0${hour}` : hour,
    minute: repair && minute < 10 ? `0${minute}` : minute,
    second: repair && second < 10 ? `0${second}` : second
  }
  if (format == 'default') {
    let result = ''
    if (day > 0) result += `${day}天`
    if (hour > 0) result += `${timeObj.hour}小时`
    if (minute > 0) result += `${timeObj.minute}分`
    if (second > 0) result += `${timeObj.second}秒`
    return result
  }
  if (typeof format === 'string') {
    format = format
      .replace(/dd/g, day)
      .replace(/hh/g, timeObj.hour)
      .replace(/mm/g, timeObj.minute)
      .replace(/ss/g, timeObj.second)
    return format
  }
  return timeObj
}