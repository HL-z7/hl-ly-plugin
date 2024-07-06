export class jrys extends plugin {
  constructor() {
    super({
      name: '今日运势',
      dsc: '运势',
      event: 'message',
      priority: -1141145514,
      rule: [
        {
          reg: '^#?运势$',
          fnc: 'yunshi',
        },
        {
          reg: '^#?逆天改命$',
          fnc: 'changeFate',
        },
      ],
    });
  }

  getMentionedInfo() {

    const mention = this.e.message.find(msg => msg.type === 'at');

    if (mention) {
      return { qq: mention.qq, mentionUserId: mention.qq };
    } else {
      return { qq: this.e.user_id, mentionUserId: this.e.user_id };
    }
  }

  async yunshi() {
    const { qq, mentionUserId } = this.getMentionedInfo();
    const url = `http://jrys.api.zhilaohu.icu/?qq=${qq}&starRating=0&changeFate=false`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('API 访问错误');
      }
      const data = await response.json();
      if (data.code === 200 && data.status === 'Success') {
        const content = data.data;
        const reply = [
          segment.at(mentionUserId), 
          `\n【今日运势】\n\n运势总结: ${content.fortuneSummary}\n幸运星: ${content.luckyStar}\n签文: ${content.signText}\n解签: ${content.unSignText}`
        ];
        await this.e.reply(reply);
      } else {
        await this.e.reply('获取运势失败');
      }
    } catch (error) {
      console.error(error);
      await this.e.reply('API 访问出错');
    }
  }

  async changeFate() {
    const { qq, mentionUserId } = this.getMentionedInfo();
    const url = `http://jrys.api.zhilaohu.icu/?qq=${qq}&starRating=7&changeFate=true`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('API 访问错误');
      }
      const data = await response.json();
      if (data.code === 200 && data.status === 'Success') {
        const content = data.data;
        const reply = [
          segment.at(mentionUserId), 
          `\n【逆天改命】\n\n运势总结: ${content.fortuneSummary}\n幸运星: ${content.luckyStar}\n签文: ${content.signText}\n解签: ${content.unSignText}`
        ];
        await this.e.reply(reply);
      } else {
        await this.e.reply('获取运势失败');
      }
    } catch (error) {
      console.error(error);
      await this.e.reply('API 访问出错');
    }
  }
}