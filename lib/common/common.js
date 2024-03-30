import _ from 'lodash'
import moment from 'moment'
import sendMsgMod from './sendMsgMod.js'
import Config from '../../components/Config/Config.js'


export default new class extends sendMsgMod {
  /**
   * 判断用户权限
   * @param {*} e - 接收到的事件对象
   * @param {"master"|"admin"|"owner"|"all"} [permission] - 命令所需的权限
   * @param {"admin"|"owner"|"all"} [role] - 用户的权限
   * @returns {boolean} - 是否具有权限
   */
  checkPermission (e, permission = 'all', role = 'all') {
    if (role == 'owner' && !e.group.is_owner) {
      e.reply('我连群主都木有，这种事怎么可能做到的辣！！！', true)
      return false
    } else if (role == 'admin' && !e.group.is_admin && !e.group.is_owner) {
      e.reply('我连管理员都木有，这种事怎么可能做到的辣！！！', true)
      return false
    }
    // 判断权限
    if (e.isMaster) return true
    if (permission == 'master' && !e.isMaster) {
      e.reply('❎ 该命令仅限主人可用', true)
      return false
    } else if (permission == 'owner' && !e.member.is_owner) {
      e.reply('❎ 该命令仅限群主可用', true)
      return false
    } else if (permission == 'admin' && !e.member.is_admin && !e.member.is_owner) {
      e.reply('❎ 该命令仅限管理可用')
      return false
    }
    return true
  }

  
  /**
   * 判断一个对象或数组中的所有值是否为空。
   * @param {object | Array} data - 需要检查的对象或数组。
   * @param {Array} omits - 需要忽略的属性列表。默认为空数组，表示不忽略任何属性。
   * @returns {boolean} - 如果对象或数组中的所有值都是空值，则返回 true；否则返回 false。
   */
  checkIfEmpty (data, omits) {
    const filteredData = _.omit(data, omits)
    return _.every(filteredData, (value) =>
      _.isPlainObject(value) ? this.checkIfEmpty(value) : _.isEmpty(value))
  }

  /**
   * 处理异常并返回错误消息。
   * @param {object} e - 事件对象。
   * @param {Error} ErrorObj - 要检查的错误对象。
   * @param {object} options - 可选参数。
   * @param {string} options.MsgTemplate - 错误消息的模板。
   * @returns {Promise<import("icqq").MessageRet>|false} 如果 ErrorObj 不是 Error 的实例，则返回 false；否则返回oicq消息返回值。
   */
  handleException (e, ErrorObj, { MsgTemplate } = {}) {
    if (!(ErrorObj?.prototype instanceof Error)) return false
    let ErrMsg = ''
    if (ErrorObj instanceof ReplyError) {
      ErrMsg = ErrorObj.message
    } else {
      ErrMsg = ErrorObj.stack
      logger.error(ErrorObj)
    }
    ErrMsg = MsgTemplate ? MsgTemplate.replace(/{error}/g, ErrMsg) : ErrMsg
    return e.reply(ErrMsg)
  }
}()
