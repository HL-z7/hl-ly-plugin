import plugin from '../../../lib/plugins/plugin.js'
/* 作者：HL 插件名hl-ly-plugin 仓库链接https://gitee.com/fox-glaze/hl-ly-plugin*/
/*因不想自己手写，所以写了个简单的随机魔法*/
export class tags extends plugin {
  constructor () {
    super({
      name: '来点魔法',
      dsc: 'HL插件',
      event: 'message',
      priority: -114514,
      rule: [
        {
          reg: '^#?(htag帮助|Htag帮助|H魔法帮助|h魔法帮助)$',
          fnc: 'cs'
        },
        {
          reg: '^#?(H魔法盲盒|h魔法盲盒)$',
          fnc: 'mofa'
        },
        {
          reg: '^#?来点魔法$',
          fnc: 'magic'
        },
        {
          reg: "^#?随机(kfc|KFC|疯狂星期四)$",  
          fnc: 'generateCrazyThursday'  
        },
        {
          reg: "^#?(H|h)翻(.*)$",  
          fnc: 'translateText' 
        }
      ]
    })
  }

   async cs (e) {
    logger.info('[HL-LY-Plugin]')
    let msg = "【HL-LY-Plugin】\n"+
    "【tag帮助”】\n"+
    "1.发送“来点魔法”即可随机获取魔法\n"+
     "2.发送“H魔法盲盒”即可获取随机魔法\n"+
    "❤️后续将提供更多可玩性功能！阿巴阿巴"
    e.reply(msg,true)
    return true
  }

  async magic (e) {
    const tags = [
      'best quality','masterpiece','illustration','1girl','an extremely delicate and beautiful','8k_wallpaper','small breast',
      'hairs between eyes','Bright stars','glowing eyes','floating hair','bare_shoulder','white_thighhighs','flowering shrubs',
      'bare shoulders','Flowery meadow','black ribbon','dynamic angle','beautiful detailed glow','shine','beautiful detailed sky',
      'ice crystal texture wings','medium_breast','Depth of field','finely detail','red eyes','loli','very_close_to_viewers',
      'beautiful detailed water','big top sleeves','beautiful detailed white gloves','lens_flare','pleated skirt','disheveled hair',
      'beautiful and delicate water','white bowties','expressionless','nature','watercolor_medium','beautiful detailed girl','highres',
      'red moon','best shadow','bright_eyes','sunlight','extremely detailed CG unity 8k wallpaper','anime face','frills','mecha clothes',
      'side blunt bangs','long bangs','solo','cumulonimbus calvus','full body','an extremely delicate and beautiful girl',
      'starry detailed water','beautiful detailed starry sky','detailed ice','upper_body','cumulonimbus capillatus','light_leaks',
      'focus_on_face','blue eyes','best illustration','navel','robot girl','skyblue dress','best quality','messy_long_hair','azure hair',
      'randomly distributed clouds','overexposure','big forhead','world masterpiece theater','forest','black kneehighs','dramatic_angle',
      'medium_breasts','detailed light','looking at viewer','extremely_detailed_eyes_and_face','hiten_1','sunset','extremely detailed CG',
      'bowties','starry sky','beautiful detailed eyes','artbook','personification','watercolor_(medium)','bust','column_lineup','silhouette',
      'optical_illusion','landscape/scenery','science_fiction','fine_art_parody','transparent_background','expressions','realistic',
      'shorts under skirt','Long skirt','wet clothes','school uniform','bikini','seifuku','cleavage dress','sweater dress','Sailor dress',
      'brown cardigan','hoodie','off_shoulder','gothic','whitedress','sweater jacket','white silk stocking','evening dress','collared shirt',
      'gothic_lolita','barefoot','buruma','detached_sleeves','one-piece swimsuit','sexy lingerie','side-tie_bikini','panties','striped_panties',
      'transparent underwear','competition swimsuit','sling bikini','summer_dress','white bloomers','pajamas','gym_uniform','bare_legs',
      'wedding_dress','striped','apron','high-waist shorts','bikini top only','bikini under clothes','fundoshi','no_panties','thong','lingerie',
      'lowleg_panties/low_leg_panties','bustier','no bra','side-tie bikini bottom','underwear','side-tie_panties','chemise','bra',
      'sleeveless dress','robe','black silk stocking','JK','business_suit','slit pupils','stare','animal_ears','mouse_ears','hair ear',
      'animal ear fluff','heart-shaped pupils','heart in eye','visible through hair','heterochromia','long eyelashes','light blush',
      'white eyebrows','bunny_ears','facepaint','gradient_eyes','cat_ears','dog_ears','cute face','tareme','smelling','run','jump',
      'looking up','looking back','grovel','squat','head tilt','lie','looking down','bathing','fly','stand','sitting','walk','sleeping',
      'over the sea','plateau','sky','sea','Bare navel','Bare arms','Bare thigh','Bare shoulders','spread legs','bed','striped_socks',
      'fishnet_pantyhose','ankle_lace-up','socks','fishnets','shoes','leg_garter','striped_thighhighs','leggings','garter straps','high heels',
      'pantyhose','loose_socks','kneehighs','torn_thighhighs','thigh strap','legwear under shorts','tabi','stockings','legwear','thighband pantyhose',
      'garter_belt','black leggings','thighhighs','lace-trimmed legwear','crying with eyes open','drunk','excited','annoyed','tongue','clenched teeth',
      'wide eyed','laughing','smirk','nose blush','sad','seductive smile','pout','one eye closed','tongue out',':3','smug','big breast','medium breast',
      'small breast','yellow hair','red hair','purple hair','grey hair','brown hair','silver hair','black hair','blonde hair','blue hair','white hair',
      'green hair','short hair','grey gradient hair','ponytail','hair bun','hair wings','short_ponytail','curly_hair','long hair','twin_braids',
      'Side ponytail','crossed bangs','braided ponytail','twintails','drill hair','bangs','ultra-detailed','watercolor','sketch','large top sleeves',
      'flower ribbon','headphones around neck','fox_ears'
    ];

    const getRandomTags = (min, max) => {
      const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
      const shuffledTags = tags.sort(() => 0.5 - Math.random());
      return shuffledTags.slice(0, randomCount).join(', ');
    };

    const randomTags = getRandomTags(20, 150);
    e.reply(`看吧！涩批！随机生成的魔法 ${randomTags}`);
    return true;
  }
  
  
  async mofa (e) {
    const tags = [
      '1girl','an extremely delicate and beautiful','8k_wallpaper','small breast','hairs between eyes','Bright stars','glowing eyes','floating hair','bare_shoulder','white_thighhighs','monochrome','colorful','flowering shrubs','bare shoulders','Flowery meadow','black ribbon','dynamic angle','beautiful detailed glow','shine','beautiful detailed sky','ice crystal texture wings','medium_breast','Depth of field','finely detail','red eyes','loli','very_close_to_viewers','beautiful detailed water','big top sleeves','beautiful detailed white gloves','lens_flare','pleated skirt','disheveled hair','beautiful and delicate water','white bowties','expressionless','nature','watercolor_medium','beautiful detailed girl','highres','red moon','best shadow','bright_eyes','sunlight','extremely detailed CG unity 8k wallpaper','anime face','frills','mecha clothes','side blunt bangs','long bangs','solo','cumulonimbus calvus','full body','an extremely delicate and beautiful girl','starry detailed water','beautiful detailed starry sky','detailed ice','upper_body','cumulonimbus capillatus','light_leaks','focus_on_face','blue eyes','best illustration','navel','robot girl','skyblue dress','best quality','messy_long_hair','azure hair','randomly distributed clouds','overexposure','big forhead','world masterpiece theater','forest','black kneehighs','dramatic_angle','medium_breasts','detailed light','looking at viewer','extremely_detailed_eyes_and_face','hiten_1','sunset','solo','extremely detailed CG','bowties','starry sky','beautiful detailed eyes','artbook','personification','watercolor_(medium)','bust','column_lineup','silhouette','optical_illusion','landscape/scenery','science_fiction','fine_art_parody','transparent_background','expressions','realistic','shorts under skirt','Long skirt','wet clothes','school uniform','bikini','seifuku','cleavage dress','sweater dress','Sailor dress','brown cardigan','hoodie','off_shoulder','gothic','whitedress','sweater jacket','white silk stocking','evening dress','collared shirt','gothic_lolita','barefoot','buruma','detached_sleeves','one-piece swimsuit','sexy lingerie','side-tie_bikini','panties','striped_panties','transparent underwear','competition swimsuit','sling bikini','summer_dress','white bloomers','pajamas','gym_uniform','bare_legs','wedding_dress','striped','apron','high - waist shorts','bikini top only','bikini under clothes','fundoshi','no_panties','thong','lingerie','lowleg_panties/low_leg_panties','bustier','no bra','side - tie bikini bottom','underwear','side-tie_panties','chemise','bra','sleeveless dress','robe','black silk stocking','JK','business_suit','slit pupils','stare','animal_ears','mouse_ears','hair ear','animal ear fluff','heart-shaped pupils','heart in eye','visible through hair','heterochromia','longeyelashes','light blush','white eyebrows','bunny_ears','facepaint','gradient_eyes','cat_ears','dog_ears','cute face','tareme','smelling','run','jump','looking up','looking back','grovel','squat','head tilt','lie','looking down','bathing','fly','stand','sitting','walk','sleeping','over the sea','plateau','sky','sea','Bare navel','Bare arms','Bare thigh','Bare shoulders','spread legs','bed','striped_socks','fishnet_pantyhose','ankle_lace-up','socks','fishnets','shoes','leg_garter','striped_thighhighs','leggings','garter straps','high heels','pantyhose','loose_socks','kneehighs','torn_thighhighs','thigh strap','legwear under shorts','tabi','stockings','legwear','thighband pantyhose','garter_belt','black leggings','thighhighs','lace-trimmed legwear','crying with eyes open','drunk','excited','annoyed','tongue','clenched teeth','wide eyed','laughing','smirk','nose blush','sad','seductive smile','pout','one eye closed','tongue out',':3','smug','big breast','medium breast','small breast','yellow hair','red hair','purple hair','grey hair','brown hair','silver hair','black hair','blonde hair','blue hair','white hair','green hair','short hair','grey gradient hair','ponytail','hair bun','hair wings','short_ponytail','curly_hair','long hair','twin_braids','Side ponytail','crossed bangs','braided ponytail','twintails','drill hair','bangs','watercolor','sketch','large top sleeves','flower ribbon','headphones around neck','fox_ears','highres','guro','cross-laced_footwear','holding sword','milf','yaoi','eyeball','middle_finger','crossed_legs','upside-down','curtain','wine glass','in the rain','on the beach','beautiful detailed eyes','huge_filesize','real','Sukumizu','knee_boots','cone hair bun','little boy','trap','blood on face','cat_pose','smoking','eye_contact','indoor','butterfly','sun','against backlight at dusk','gorgeous','incredibly_absurdres','gradient_background','long bangs','headphones','gyaru','witch','teeth','hair scrunchie','seiza','holding_hands','grove','cat','night','golden hour lighting','absurdres','light','high ponytail','revealing dress','cross necklace','mature female','monster','looking to the side','arms behind back','fetal_position','symmetrical_hand_pose','sandbeach','book','rainy days','shackles','sisters','mermaid','waving','back-to-back','castle','full_moon','on a desert','profile','arm strap','shota','police',':t','aqua eyes','armpits','on_stomach','fighting_stance','chair','dusk','in winter','pixel_art','sketch','hime_cut','lace','halo','kawaii','female','nosebleed','leg hold','leaning forward','undressing','sunset','wallpaper','album','skirt','bell','loli','devil','dark_persona','constricted pupils','spread_arms','leg_hug','shirt lift','seaside','day','in autumn','checkered','cityscape','Skirt','wrist_cuffs','little girl','elf',':q','hands on hip','indian_style','symmetrical_docking','moon','on the ocean','comic','short shorts','satchel','solo','doll',':p','shushing','fetal position','lap_pillow','rain','smartphone','bishoujo','vampire',':d','no_nose','stretch','kneeling','bent_over','cloudy','stars','hair pink flowers','tank_top','hair_ornament','female pervert','angel','endured_face','eyes closed','arms_crossed','legs_up','hug','blunt bangs','hairband','multiple girls','yuri','sigh','salute','leg_lift','princess_carry','in hawaii','dakimakura','messy_hair','loafers','glasses','adorable girl','nurse','serious','food on face','hand on own chest','wariza/w-sitting','adjusting_thighhigh','in a meadow','original','double_bun','boots','mesugaki','male','heterochromia blue red','hands up','yokozuwari','arched_back','strong rim light','cosplay','hair in takes','garreg mach monastery uniform','slippers','necklace','mature','ninja','fangs','holding','straddling','all_fours','in summer','feather','swept bangs','heart hair ornament','ojousama','idol','naughty_face','hair_pull','against wall','top-down_bottom-up','intense shadows','4koma','very long hair','minigirl','sleepy','wink','grabbing','arm_support','skirt lift','in spring','simple_background','wristwatch','queen','angry','peace symbol','mimikaki','mountain','light brown hair','hair ornament','orc','expressionless eyes','w','in the ocean','disheveled hair','western','hair_flower','waitress','blush','hand on anothers hip','on a hill','white_hair','tartan','wristband','no_humans','white colored eyelashes','fingersmile','beautiful detailed sky','multicolored hair','jacket','tiara','knight','eyelid pull','hand_on_hip','beautiful detailed water','Amazing','holding book','furry','symbol-shaped pupils','hand_to_mouth','the top of the hill'
    ];

    const getRandomTags = (min, max) => {
      const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
      const shuffledTags = tags.sort(() => 0.5 - Math.random());
      return shuffledTags.slice(0, randomCount).join(', ');
    };

    const randomTags = getRandomTags(20, 150);
    e.reply(`看吧！涩批！惊喜的魔法盲盒！ ${randomTags}`);
    return true;
  }

//KFC
  async generateCrazyThursday(e) {  
    logger.info(`收到疯狂星期四请求`);

    try {
      const apiUrl = 'http://kfc.api.hlz7.com/index.php?type=json&hh=%3Cbr%3E'; 
      const response = await fetch(apiUrl);  
      if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
      }

      const data = await response.json();  
      logger.info(`API响应数据: ${JSON.stringify(data)}`);

      
      if (data && data.msg) {
        const crazyThursdayMessage = data.msg.trim();  
        await this.e.reply(crazyThursdayMessage, true);  
      } else {
        await this.e.reply("获取疯狂星期四文案失败，请联系开发者修复。", true);  
      }
    } catch (error) {
      logger.error(`获取疯狂星期四文案时出错：${error}`);
      await this.e.reply("获取疯狂星期四文案失败，请联系开发者修复。", true);  
    }
  }

  //翻译
  async translateText(e) {  
    let textToTranslate = e.msg.replace(/#?(H|h)翻/g, "").trim();  
    logger.info(`收到翻译请求: ${textToTranslate}`);  

    let apiUrl = `https://findmyip.net/api/translate.php?text=${encodeURIComponent(textToTranslate)}`;  
    logger.info(`API请求URL: ${apiUrl}`);

    try {
      const response = await fetch(apiUrl);  
      if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
      }
      
      const data = await response.json();  
      logger.info(`API响应数据: ${JSON.stringify(data)}`);

      
      if (data && data.code === 200 && data.data && data.data.translate_result) {
        const translationResult = data.data.translate_result;
        await this.e.reply(translationResult, true);  
      } else {
        await this.e.reply("翻译失败，请稍后重试。", true);  
      }
    } catch (error) {
      logger.error(`翻译时出错：${error}`);
      await this.e.reply("翻译失败，请稍后重试。", true); 
    }
  }
}