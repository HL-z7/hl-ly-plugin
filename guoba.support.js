/**
 *  支持锅巴配置
 */
export function supportGuoba() {
    return {
    pluginInfo: {
     pluginInfo: {
            name: "hl-plugin",
            title: "狐璃插件",
            author: "@狐璃",
            authorLink: "https://gitee.com/fox-glaze",
            link: "https://gitee.com/fox-glaze/hl-plugin",
      isV3: true, //支持V3
      isV2: true, //支持V2
      description: ` hl-plugin${versionData[0].version}「${versionData[0].name}」]`,
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