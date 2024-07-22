import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getconfig from './model/cfg.js';
import fs from 'fs';
import yaml from 'yaml';
import lodash from 'lodash'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 *  支持锅巴配置
 */
export function supportGuoba() {
    return {
        pluginInfo: {
            name: "hl-ly-plugin",
            title: "hl-ly-plugin",
            author: "@狐璃 @落雨天阳",
            authorLink: "https://gitee.com/fox-glaze",
            link: "https://gitee.com/fox-glaze/hl-ly-plugin",
            isV3: true,
            isV2: false,
            description: `hl-ly-plugin`,
            // 显示图标，此为个性化配置
            // 图标可在 https://icon-sets.iconify.design 这里进行搜索
            icon: "mdi:stove",
            // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
            iconColor: "#d19f56",
            // 如果想要显示成图片，也可以填写图标路径（绝对路径）
            iconPath: path.join(__dirname,"img/hl-ly-plugin.png"),
        },
        configInfo: {
            schemas: [
                {
                    component: 'Divider',
                    label: '设置'
                },
                {
                    field: 'emocyc',
                    label: 'emoji戳一戳',
                    component: 'Switch',
                },
                {
                    field: 'zmcyc',
                    label: '早苗戳一戳',
                    component: 'Switch',
                },
                {
                    field: 'mysqd',
                    label: '米游社手动签到',
                    component: 'Switch',
                },
                {
                    field: 'zrcyc',
                    label: '戳一戳主人',
                    component: 'Switch',
                },
                {
                    field: 'cyczm',
                    label: '早苗戳一戳TRSS',
                    component: 'Switch',
                },
                {
                    field: 'jinqun',
                    label: '进群通知',
                    component: 'Switch',
                },
                {
                    field: 'biaoqing',
                    label: '表情合成',
                    component: 'Switch',
                },
                
                
            ],
            async getConfigData() {
                let { config } = getconfig(`config`, `set.sz`)
                return config;
            },
            async setConfigData(data, { Result }) {
                // 1.读取现有配置文件
                const configFilePath = path.join(__dirname,'config','set.sz.yaml');
                let config = {};
                if (fs.existsSync(configFilePath)) {
                    const configContent = fs.readFileSync(configFilePath, 'utf8');
                    config = yaml.parse(configContent) || {};
                }
                // 2. 更新配置对象
                for (const [keyPath, value] of Object.entries(data)) {
                    lodash.set(config, keyPath, value);
                }
                // 3. 将更新后的配置对象写回文件
                const updatedConfigYAML = yaml.stringify(config);
                fs.writeFileSync(configFilePath, updatedConfigYAML, 'utf8');
                logger.mark(`[hl-ly-plugin插件:配置文件]配置文件更新`)
                return Result.ok({}, '保存成功~');
            }
        }
    }
}