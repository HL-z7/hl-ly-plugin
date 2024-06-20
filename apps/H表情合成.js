import { Config} from '../components/index.js'
import plugin from '../../../lib/plugins/plugin.js';
const help = 'https://tu.zhilaohu.icu/file/2c17d54f1ef8e6293cffc.png';

// 此插件是由千佬写的，我只是借鉴（cv）请支持原作者 谢谢！
// 原作者：千奈千祁(QQ:2632139786) https://gitee.com/qiannqq

export class bqhc extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'H表情合成',
            /** 功能描述 */
            dsc: 'H表情合成',
            event: 'message',
            priority: 2,
            rule: [
                {
                    reg: '^#?H表情帮助?$',
                    fnc: 'showHelp'
                },
                {
                    reg: '^摸摸你(.*)$',
                    fnc: 'mo'
                },
                {
                    reg: '^猫虫举(.*)$',
                    fnc: 'jupai'
                },
                {
                    reg: '^差评(.*)$',
                    fnc: 'badReview'
                },
                {
                    reg: '^好评(.*)$',
                    fnc: 'goodReview'
                },
                {
                    reg: '^幽灵猎手(.*)$',
                    fnc: 'ghostHunter'
                },
                {
                    reg: '^抱着哭(.*)$',
                    fnc: 'cryHug'
                },
                {
                    reg: '^滚出QQ(.*)$',
                    fnc: 'kickOutQQ'
                },
                {
                    reg: '^教你做事(.*)$',
                    fnc: 'teachYou'
                },
                {
                    reg: '^高质量(.*)$',
                    fnc: 'highQuality'
                },
                {
                    reg: '^羡慕(.*)$',
                    fnc: 'xianmu'
                },
                {
                    reg: '^你爬(.*)$',
                    fnc: 'nipa'
                },
                {
                    reg: '^跑路(.*)$',
                    fnc: 'paolu'
                },
                {
                    reg: '^听不懂(.*)$',
                    fnc: 'ting'
                },
                {
                    reg: '^受害人(.*)$',
                    fnc: 'shouhai'
                },
                {
                    reg: '^咸鱼(.*)$',
                    fnc: 'xianyu'
                },
                {
                    reg: '^膜拜(.*)$',
                    fnc: 'mobai'
                },
                {
                    reg: '^你可能需要它(.*)$',
                    fnc: 'xuyao'
                },
                {
                    reg: '^我是萌新(.*)$',
                    fnc: 'newbie'
                }
            ]
        });
    }

    /** 帮助信息 */
    async showHelp(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        let msg = [help ? segment.image(help) : ''];
        await e.reply(msg);
        return true;
    }

    /** 摸摸你 */
    async mo(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/lieshou.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 猫虫举 */
    async jupai(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/ju.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 差评 */
    async badReview(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/cp.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 好评 */
    async goodReview(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/hp.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 幽灵猎手 */
    async ghostHunter(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/lieshou2.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 抱着哭 */
    async cryHug(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/bao.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 滚出QQ */
    async kickOutQQ(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/gun.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

 /** 跑路 */
    async paolu(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`https://api.mhimg.cn/api/biaoqingbao_paolu?qq=${e.message[1].qq}`));
        }
        return true;
    }

 /** 听不懂 */
    async ting(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`https://api.mhimg.cn/api/biaoqingbao_smd?qq=${e.message[1].qq}`));
        }
        return true;
    }

 /** 受害人 */
    async shouhai(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`https://api.mhimg.cn/api/biaoqingbao_shouhairen?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 教你做事 */
    async teachYou(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/jnzs.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 高质量 */
    async highQuality(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/gzl.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

    /** 我是萌新 */
    async newbie(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/wsmx.php?qq=${e.message[1].qq}`));
        }
        return true;
    }

     /** 咸鱼 */
    async xianyu(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`https://api.lolimi.cn/API/face_yu/?QQ=${e.message[1].qq}`));
        }
        return true;
    }

     /** 膜拜 */
    async mobai(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`https://api.lolimi.cn/API/face_worship/?QQ=${e.message[1].qq}`));
        }
        return true;
    }

     /** 你可能需要它 */
    async xuyao(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`https://api.lolimi.cn/API/face_need/?QQ=${e.message[1].qq}`));
        }
        return true;
    }
    
    /** 你爬 */
    async nipa(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/pa.php?qq=${e.message[1].qq}`));
        }
        return true;
    }
    
    /** 羡慕 */
    async xianmu(e) {
        if (!Config.getConfig('set', 'sz')['biaoqing']) {
            return false;
        }

        if (e.message[1]?.type === 'at') {
            await e.reply(segment.image(`http://api.yujn.cn/api/xianmu.php?qq=${e.message[1].qq}`));
        }
        return true;
    }
}