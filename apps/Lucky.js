import plugin from '../../../lib/plugins/plugin.js'; //可以当成独立JS插件，这行删掉一个../就可以了
// 存储发起游戏的玩家
let gameInitiator = null;
// 存储参与游戏的玩家
let players = [];
// 游戏是否已经开始
let gameStarted = false;

// 处理玩家发送的消息
function handleMessage(message) {
  // 确保message对象包含message属性
  const lowerCaseMessage = (message.message || '').toLowerCase();
  
  // 玩家加入游戏
  if (lowerCaseMessage === '#加入游戏' && !gameStarted) {
    if (!players.includes(message.sender)) {
      players.push(message.sender);
      sendMessage(`${message.sender}加入了游戏！`);
    } else {
      sendMessage(`${message.sender}已经在游戏中！`);
    }
  }
  
  // 发起游戏
  if (lowerCaseMessage === '#发起游戏' && !gameStarted) {
    initiateGame(message.sender);
  }

  // 开始游戏
  if (lowerCaseMessage === '#开始游戏' && !gameStarted) {
    if (message.sender === gameInitiator) {
      startGame();
    } else {
      sendMessage('您不是发起人哦，不能开始游戏！');
    }
  }
  
  // 结束游戏
  if (lowerCaseMessage === '#结束游戏') {
    if (message.sender === gameInitiator) {
      endGame();
    } else {
      sendMessage('您不是发起人哦，不能结束游戏！');
    }
  }
  
  // 玩家发抽奖
  if (gameStarted && lowerCaseMessage.startsWith('#抽奖') && players.includes(message.sender)) {
    drawLottery(message.sender);
  }
}

// 发起游戏
function initiateGame(initiator) {
  gameInitiator = initiator;
  sendMessage(`${initiator}发起了游戏！`);
}

// 开始游戏
function startGame() {
  gameStarted = true;
  sendMessage('游戏开始！');
}

// 结束游戏
function endGame() {
  gameInitiator = null;
  gameStarted = false;
  players = [];
  sendMessage('游戏结束！');
}

// 抽奖
function drawLottery(player) {
  const eliminatedPlayer = getRandomPlayer();
  sendMessage(`${eliminatedPlayer}被淘汰！`);
  // 可以在这里添加更多的游戏逻辑，例如禁言被淘汰的玩家
}

// 随机选择一个玩家
function getRandomPlayer() {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}

// 发送消息
function sendMessage(message) {
  console.log(message); // 这里用console.log模拟发送消息
}

// 示例：处理玩家发送的消息
handleMessage({ sender: '玩家A', message: '#发起游戏' });
handleMessage({ sender: '玩家B', message: '#加入游戏' });
handleMessage({ sender: '玩家C', message: '#开始游戏' });
handleMessage({ sender: '玩家A', message: '#抽奖' });
handleMessage({ sender: '玩家B', message: '#抽奖' });
handleMessage({ sender: '玩家C', message: '#抽奖' });
handleMessage({ sender: '玩家A', message: '#结束游戏' });
