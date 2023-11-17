import plugin from '../../../lib/plugins/plugin.js'; //可以当成独立JS插件，这行删掉一个../就可以了
import { segment } from "oicq";

const _path = process.cwd();

let tx = {};
let tututu = false;

export class run extends plugin {
	constructor() {
		super({
			name: '幸运抽奖',
			dsc: '幸运抽奖',
			event: 'message',
			priority: 1000,
			rule: [
				{
					reg: "^幸运抽奖$",
					fnc: 'whoismyGay'
				}
			],
			keywords: ["原神", "原神启动"] // 添加关键词数组
		});
	}

	async whoismyGay(e) {
		if (!e.isGroup) {
			return true;
		}

		// 检查消息是否包含关键词
		const containsKeyword = this.checkKeywords(e.raw_message);
		if (containsKeyword) {
			// 触发禁言概率
			if (Math.random() < 5) { // 修改概率值
				// 进行禁言逻辑
				if (tx[e.group_id]) {
					Bot.pickGroup(e.group_id).muteMember(tx[e.group_id].user_id, 0);
				}

				let mmap = await e.group.getMemberMap();
				let arrMember = Array.from(mmap.values()).filter(member => member.role == "member");
				let randomGay = arrMember[Math.round(Math.random() * (arrMember.length - 1))];

				let name = randomGay.card;
				if (name.length == 0) {
					name = randomGay.nickname;
				}
				let who = randomGay.user_id;

				if (tututu) {
					who = e.user_id;
					name = e.sender.card;
					if (name.length == 0) {
						name = e.sender.nickname;
					}
				}
				e.group.muteMember(who, 60);

				tx[e.group_id] = { user_id: who };

				e.reply(`本轮中奖为   \n${name}  \n ${who}    \n恭喜您喜提1分钟OP套餐！`);
				return true;
			}
		}

		return true; // 返回 true 阻挡消息不再往下
	}

	// 检查消息是否包含关键词
	checkKeywords(message) {
		const keywords = this.rule[0].keywords || [];
		for (const keyword of keywords) {
			if (message.includes(keyword)) {
				return true;
			}
		}
		return false;
	}
}