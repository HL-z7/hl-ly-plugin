import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

if (!global.segment) {
  const oicq = await import("oicq");
  global.segment = oicq.segment;
}

const apps = {};
global.hl_plugin = {
  apps: apps,
  puppeteer: null
};

// 输出提示
logger.mark('---------HL---------');
logger.debug('\x1b[36m崽崽正在加载中...\x1b[0m');
logger.info('\x1b[33mHL插件初始化~\x1b[0m');
logger.mark(`
            。 。 。 。
            ≧======≤
           |＿|＿|＿|     
　　　　　／＞　　   フ
　　　　　|    _　_  l
　 　　　／\` ミ ꒳  ノ
　　 　 /　　　 　  |
　　　 /　 ヽ　　  ﾉ
　 　 │　　 |　|　|
　／￣|　　 |　|　|
　| (￣ヽ＿_ヽ_)__)
　＼二つ
`);
logger.mark('---------HL---------');

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载插件
const pluginsDir = path.resolve(__dirname, './apps');
const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));

const ret = await Promise.allSettled(files.map(file => import(`file://${path.join(pluginsDir, file)}`)));

for (let i = 0; i < files.length; i++) {
  const name = files[i].replace('.js', '');

  if (ret[i].status !== 'fulfilled') {
    logger.error(`载入插件错误：${name}`);
    logger.error(ret[i].reason);
    continue;
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]];
}

export { apps };