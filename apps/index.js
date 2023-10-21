import { help } from "./help.js";

export {
  help
};

let rule = {
  help: {
    reg: "^#*白纸帮助$",
    priority: 5,
    describe: "帮助文档，其实是图片"
  }
};

export { rule };

