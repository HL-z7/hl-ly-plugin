import path from "path";
import Config from "./components/Config.js";

const _path = process.cwd() + "/plugins/xiuxian-emulator-plugin";
//定义一个版本信息的常量,获取默认文件配置文件信息
const versionData = Config.getdefSet("version", "version");

/**
 *  支持锅巴配置
 */
export function supportGuoba() {
    return {
        pluginInfo: {
            name: "hl-plugin",
            title: "hl-plugin",
            author: "@狐璃 @落雨天阳",
            authorLink: "https://gitee.com/fox-glaze",
            link: "https://gitee.com/fox-glaze/hl-plugin",
            isV3: true,
            isV2: false,
            description: `hl-plugin`,
            // 显示图标，此为个性化配置
            // 图标可在 https://icon-sets.iconify.design 这里进行搜索
            icon: "mdi:stove",
            // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
            iconColor: "#d19f56",
            // 如果想要显示成图片，也可以填写图标路径（绝对路径）
            iconPath: path.join(_path, "img/hl-plugin.png"),
        }
    }
}