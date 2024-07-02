export class jrys extends plugin {
  constructor() {
    super({
      name: '今日运势',
      dsc: '运势',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '#运势',
          fnc: 'yunshi',
        },
      ],
    });
  }

  async yunshi() {
    const url = 'https://image-api.api.luoyutianyang.icu/api/yunshi';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('API 访问错误');
      }
      const content = await response.text();
      await this.e.reply(`今日${content}`);
    } catch (error) {
      console.error(error);
      await this.e.reply('API 访问出错');
    }
  }
}