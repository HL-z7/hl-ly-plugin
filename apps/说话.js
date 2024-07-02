import plugin from '../../../lib/plugins/plugin.js'
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
import YAML from 'yaml';
export class RandomMP3 extends plugin {
    constructor() {
        super({
            name: 'hl-随机语音',
            dsc: '随机发送本地MP3可配置',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: null,
                    fnc: 'MP3'
                }
            ]
        });

        const configPath = path.join(__dirname, 'plugins/hl-ly-plugin/config/shuo.yaml'); 
        const configFile = fs.readFileSync(configPath, 'utf-8'); 
        const { reg } = YAML.parse(configFile); 
        this.rule[0].reg = new RegExp(`(${reg.join('|')})`);
        this.mp3DirPath = path.join(__dirname, 'plugins/hl-ly-plugin/resources/shuoMP3');
    }
    async MP3(e) { 
    const files = fs.readdirSync(this.mp3DirPath).filter(file => file.endsWith('.mp3')); 
    if (files.length === 0) {
        return false;
    }
    const number = Math.floor(Math.random() * files.length);
    const mp3Path = path.join(this.mp3DirPath, files[number]);
    await this.reply(segment.record(mp3Path)); 
    return; 
   }
 }