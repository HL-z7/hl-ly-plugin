import { help } from "./help.js"

export {
  help,
};

let rule = {
  // ...
  help: {
    reg: "^#*hl帮助$",
    priority: 5,
    describe: "帮助文档，其实是图片"
  }
};

