//主屏幕宽度
var SCREEN_WIDTH = 800;
//屏幕高度
var SCREEN_HEIGHT = 600;
//canvas偏移量
var CANVAS_OFFSET_X;
var CANVAS_OFFSET_Y;
//刷新速率（ms）
var REFRESH_INTERVAL = 32;
//角色ID号（全局唯一，每名玩家或敌人都有一个ID号）
var CHARACTER_ID = 0;
//图片路径地址
var STARTSCREEN_IMAGE_PATH = "image/startScreen.png";
var BACKGROUND_IMAGE_PATH = ["image/background1.png", "image/background2.png", "image/background3.png"];
var ROLES_IMAGE_PATH = "image/roles.png";
var EXPLOSION_IMAGE_PATH = "image/explosion.png";
var WIDGET_IMAGE_PATH = "image/widget.png";
var TEXT_IMAGE_PATH = "image/text.png";
var GAMEOVER_IMAGE_PATH = ["image/gameover1.png", "image/gameover2.png", "image/gameover3.png"];
var LOADING_IMAGE_PATH = "/static/image/loading.png";
var SNOW_IMAGE_PATH = "image/snow.png";
var MANUAL_IMAGE_PATH = "image/manual.png";
var FONT_FILL_STYLE = ["#FFCC00", "#66FFCC", "#FF99FF"];

//预加载声音资源文件名
var SOUND_RESOURCE_NAME = [
    "sound/bgm.mp3",
    "sound/seCharge.mp3",
    "sound/seExplosion.mp3",
    "sound/seFrozen.mp3",
    "sound/seHit.mp3",
    "sound/seHitDead.mp3",
    "sound/seMove.mp3",
    "sound/sePause.mp3",
    "sound/seSnowballFly.mp3",
    "sound/seThrow.mp3",
    "sound/achievement/seKillingSpree.mp3",
    "sound/achievement/seDominating.mp3",
    "sound/achievement/seMegaKill.mp3",
    "sound/achievement/seUnstoppable.mp3",
    "sound/achievement/seWickedSick.mp3",
    "sound/achievement/seMonsterKill.mp3",
    "sound/achievement/seGodLike.mp3",
    "sound/achievement/seHolyShit.mp3",
    "sound/achievement/seDoubleKill.mp3",
    "sound/achievement/seTripleKill.mp3",
    "sound/achievement/seUltraKill.mp3",
    "sound/achievement/seRampage.mp3"
];
var SOUND_RESOURCE = new Array();
var SOUND_RESOURCE_URL = new Array();
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[0]] = "http://storage.live.com/items/314044073BEC6D79!1000";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[1]] = "http://storage.live.com/items/314044073BEC6D79!1001";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[2]] = "http://storage.live.com/items/314044073BEC6D79!1002";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[3]] = "http://storage.live.com/items/314044073BEC6D79!1003";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[4]] = "http://storage.live.com/items/314044073BEC6D79!1004";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[5]] = "http://storage.live.com/items/314044073BEC6D79!1005";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[6]] = "http://storage.live.com/items/314044073BEC6D79!1006";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[7]] = "http://storage.live.com/items/314044073BEC6D79!1007";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[8]] = "http://storage.live.com/items/314044073BEC6D79!1008";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[9]] = "http://storage.live.com/items/314044073BEC6D79!1009";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[10]] = "http://storage.live.com/items/314044073BEC6D79!1011";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[11]] = "http://storage.live.com/items/314044073BEC6D79!1012";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[12]] = "http://storage.live.com/items/314044073BEC6D79!1013";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[13]] = "http://storage.live.com/items/314044073BEC6D79!1014";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[14]] = "http://storage.live.com/items/314044073BEC6D79!1015";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[15]] = "http://storage.live.com/items/314044073BEC6D79!1016";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[16]] = "http://storage.live.com/items/314044073BEC6D79!1017";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[17]] = "http://storage.live.com/items/314044073BEC6D79!1018";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[18]] = "http://storage.live.com/items/314044073BEC6D79!1019";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[19]] = "http://storage.live.com/items/314044073BEC6D79!1020";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[20]] = "http://storage.live.com/items/314044073BEC6D79!1021";
SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[21]] = "http://storage.live.com/items/314044073BEC6D79!1022";

//预加载图片资源文件名
var IMAGE_RESOURCE_NAME = [
    "image/background1.png",
    "image/background2.png",
    "image/background3.png",
    "image/explosion.png",
    "image/gameover1.png",
    "image/gameover2.png",
    "image/gameover3.png",
    "image/loading.png",
    "image/roles.png",
    "image/startScreen.png",
    "image/text.png",
    "image/widget.png",
    "image/snow.png",
    "image/manual.png"
];
var IMAGE_RESOURCE = new Array();
var IMAGE_RESOURCE_URL = new Array();
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[0]] = "http://storage.live.com/items/314044073BEC6D79!1025";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[1]] = "http://storage.live.com/items/314044073BEC6D79!1026";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[2]] = "http://storage.live.com/items/314044073BEC6D79!1027";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[3]] = "http://storage.live.com/items/314044073BEC6D79!1028";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[4]] = "http://storage.live.com/items/314044073BEC6D79!1029";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[5]] = "http://storage.live.com/items/314044073BEC6D79!1030";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[6]] = "http://storage.live.com/items/314044073BEC6D79!1031";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[7]] = "http://storage.live.com/items/314044073BEC6D79!1032";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[8]] = "http://storage.live.com/items/314044073BEC6D79!1033";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[9]] = "http://storage.live.com/items/314044073BEC6D79!1034";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[10]] = "http://storage.live.com/items/314044073BEC6D79!1035";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[11]] = "http://storage.live.com/items/314044073BEC6D79!1036";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[12]] = "http://storage.live.com/items/314044073BEC6D79!1810";
IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[13]] = "http://storage.live.com/items/314044073BEC6D79!2173";

/*全局静态变量*/

//主画布
var mainCanvas;
//屏幕管理者，用于管理界面的切换
var screenManager;
//加载资源界面
var loadingScreen;
//故事介绍界面
var storyScreen;
//游戏起始界面
var startScreen;
//游戏主界面
var game;

//LoadingScreen.js 加载界面屏幕类
function LoadingScreen() {
    GameComponent.call(this);
    this.loadingImage = new Image();
    this.loadingImage.src = LOADING_IMAGE_PATH;
    this.showText = "";
    this.hintTextList = [
        "火球攻击可以产生范围伤害",
        "冰球攻击可以让敌人动弹不得",
        "毒球攻击可以让敌人在一段时间内不断掉血",
        "短时间内击杀更多敌人可以获得成就加分",
        "无伤情况下击杀敌人可以获得成就加分",
        "攻击力、移动速度、雪球速度的提升是永久性的",
        "每过一关都会恢复少许血量"];
    this.hintTextIndex = Math.floor(Math.random() * this.hintTextList.length);
    this.loadedCompleteCount = 0;
    this.loadedTotalCount = SOUND_RESOURCE_NAME.length + IMAGE_RESOURCE_NAME.length;
    this.resourceList = new Array();
}
LoadingScreen.prototype = new GameComponent();
LoadingScreen.prototype.initialize = function () {
    this.loadResource();
};
LoadingScreen.prototype.draw = function () {
    mainCanvas.save();
    mainCanvas.fillStyle = "#000000";
    mainCanvas.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT + 40);
    mainCanvas.fillStyle = "#FFFF00";
    mainCanvas.font = "64px Impact";
    mainCanvas.fillText(this.showText, 160, 120);
    mainCanvas.font = "24px 幼圆";
    mainCanvas.fillText(this.hintTextList[this.hintTextIndex], 180, 600);
    mainCanvas.restore();
    mainCanvas.drawImage(this.loadingImage, 180, 140);

};
LoadingScreen.prototype.update = function () {
    if (this.loadedCompleteCount >= this.loadedTotalCount) {
        startScreen = new StartScreen();
        screenManager.setComponent(startScreen);
    }
    else {
        this.showText = "NOW LOADING   " +
            Math.floor(this.loadedCompleteCount / this.loadedTotalCount * 100) + "%";
    }
};
LoadingScreen.prototype.loadResource = function () {
    for (var i = 0; i < SOUND_RESOURCE_NAME.length; i++) {
        var audio = new Audio();
        audio.src = SOUND_RESOURCE_URL[SOUND_RESOURCE_NAME[i]];
        if (SOUND_RESOURCE_NAME[i] == "sound/bgm.mp3")
            audio.loop = true;
        SOUND_RESOURCE[SOUND_RESOURCE_NAME[i]] = audio;
        audio.addEventListener("canplaythrough", function () {
            loadingScreen.loadedCompleteCount++;
        });
        this.resourceList.push(audio);
    }
    for (var j = 0; j < IMAGE_RESOURCE_NAME.length; j++) {
        var image = new Image();
        image.src = IMAGE_RESOURCE_URL[IMAGE_RESOURCE_NAME[j]];
        image.addEventListener("load", function () {
            loadingScreen.loadedCompleteCount++;
        }, false);
        IMAGE_RESOURCE[IMAGE_RESOURCE_NAME[j]] = image;
        this.resourceList.push(image);
    }
};

//StartScreen.js 起始界面屏幕类
function StartScreen() {
    GameComponent.call(this);
    this.index = 0;
    this.background = new Background(IMAGE_RESOURCE[STARTSCREEN_IMAGE_PATH], true);
}
StartScreen.prototype = new GameComponent();
StartScreen.prototype.draw = function () {
    mainCanvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT + 40);
    this.background.draw();
};
StartScreen.prototype.initialize = function () {
    $(window).click(startScreen.mouseClickEvent);
};
StartScreen.prototype.mouseClickEvent = function (e) {
    var btnStartX = 288, btnStartY = 417, btnStartW = 224, btnStartH = 76;
    var btnAboutX = 288, btnAboutY = 513, btnAboutW = 224, btnAboutH = 76;
    var mouseX = e.pageX - CANVAS_OFFSET_X;
    var mouseY = e.pageY - CANVAS_OFFSET_Y;
    if (mouseX > btnStartX &&
        mouseX < btnStartX + btnStartW &&
        mouseY > btnStartY &&
        mouseY < btnStartY + btnStartH) {
        $(window).unbind();
        storyScreen = new StoryScreen();
        screenManager.setComponent(storyScreen);
    }
    else if (mouseX > btnStartX &&
        mouseX < btnStartX + btnStartW &&
        mouseY > btnStartY &&
        mouseY < btnStartY + btnStartH) {
        //TODO:ABOUT
    }
};

//StoryScreen.js 起始界面屏幕类
function StoryScreen() {
    GameComponent.call(this);
    this.text = "";
    this.state = 0;
    this.textImage = IMAGE_RESOURCE["image/text.png"];
    this.manual = IMAGE_RESOURCE["image/manual.png"];
    this.positionY = 640;
}
StoryScreen.prototype = new GameComponent();
StoryScreen.prototype.initialize = function () {
    $(window).click(storyScreen.mouseClickEvent);
};
StoryScreen.prototype.draw = function () {
    if (this.state == 0) {
        mainCanvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT + 40);
        mainCanvas.drawImage(this.textImage, 201, 77, 633, 373,
            80, this.positionY, 633, 373);
    }
    else if (this.state == 1) {
        mainCanvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT + 40);
        mainCanvas.drawImage(this.manual, 0, 0);
    }
    mainCanvas.save();
    mainCanvas.font = "32px Impact";
    mainCanvas.fillStyle = "#00FF00";
    mainCanvas.fillText("CLICK TO SKIP", 30, 50);
    mainCanvas.restore();
};
StoryScreen.prototype.update = function () {
    if (this.state == 0 && this.positionY > 114) {
        this.positionY -= 2;
    }
};
StoryScreen.prototype.mouseClickEvent = function (e) {
    if (storyScreen.state == 0)
        storyScreen.state = 1;
    else {
        $(window).unbind();
        game = new SnowballFightGame();
        screenManager.setComponent(game);
    }
};

//SnowballFightGame.js 打雪仗游戏核心类
function SnowballFightGame() {
    GameComponent.call(this);
    this.BASE_ENEMY_SCORE = 200;
    this.ENEMY_STEP_SCORE = 50;

    //初始化全局参数
    this.isGameOver = false;
    this.isPause = false;
    this.gameScore = 0;
    this.stageNum = 0;
    this.stageClass = 0;
    this.stageState = "LOAD_STAGE";
    //鼠标是否在玩家上
    this.isMouseOnPlayer = false;
    //鼠标是否按下
    this.isMouseDown = false;
    this.showRetryHint = false;
    this.showSubmitHint = false;
    //玩家是否已经提交分数
    this.hasSubmitScore = false;

    //道具相关
    this.ITEM_RANDOM_TIME_MIN_LIST = [240, 180, 120];
    this.ITEM_RANDOM_TIME_MAX_LIST = [450, 360, 240];
    this.ITEM_RANDOM_TIME_MIN = this.ITEM_RANDOM_TIME_MIN_LIST[0];
    this.ITEM_RANDOM_TIME_MAX = this.ITEM_RANDOM_TIME_MAX_LIST[0];
    this.ITEM_BASENUMBER_LIST = [5, 8, 12];
    this.itemNumber = this.ITEM_BASENUMBER_LIST[0];
    this.itemTickCount = 0;
    this.playerInfoText = "";
    //日志列表
    this.LogList = [];

    //声音实例化
    this.bgm = new AudioSprite(SOUND_RESOURCE["sound/bgm.mp3"], true);
    this.seCharge = new AudioSprite(SOUND_RESOURCE["sound/seCharge.mp3"], false);
    this.seExplosion = new AudioSprite(SOUND_RESOURCE["sound/seExplosion.mp3"], false);
    this.seFrozen = new AudioSprite(SOUND_RESOURCE["sound/seFrozen.mp3"], false);
    this.seHit = new AudioSprite(SOUND_RESOURCE["sound/seHit.mp3"], false);
    this.seHitDead = new AudioSprite(SOUND_RESOURCE["sound/seHitDead.mp3"], false);
    this.sePause = new AudioSprite(SOUND_RESOURCE["sound/sePause.mp3"], false);
    this.seMove = new AudioSprite(SOUND_RESOURCE["sound/seMove.mp3"], true);
    this.seSnowballFly = new AudioSprite(SOUND_RESOURCE["sound/seSnowballFly.mp3"], false);
    this.seThrow = new AudioSprite(SOUND_RESOURCE["sound/seThrow.mp3"], false);

    this.seKillingSpree = new AudioSprite(SOUND_RESOURCE["sound/achievement/seKillingSpree.mp3"], false);
    this.seDominating = new AudioSprite(SOUND_RESOURCE["sound/achievement/seDominating.mp3"], false);
    this.seMegaKill = new AudioSprite(SOUND_RESOURCE["sound/achievement/seMegaKill.mp3"], false);
    this.seUnstoppable = new AudioSprite(SOUND_RESOURCE["sound/achievement/seUnstoppable.mp3"], false);
    this.seWickedSick = new AudioSprite(SOUND_RESOURCE["sound/achievement/seWickedSick.mp3"], false);
    this.seMonsterKill = new AudioSprite(SOUND_RESOURCE["sound/achievement/seMonsterKill.mp3"], false);
    this.seGodLike = new AudioSprite(SOUND_RESOURCE["sound/achievement/seGodLike.mp3"], false);
    this.seHolyShit = new AudioSprite(SOUND_RESOURCE["sound/achievement/seHolyShit.mp3"], false);

    this.seDoubleKill = new AudioSprite(SOUND_RESOURCE["sound/achievement/seDoubleKill.mp3"], false);
    this.seTripleKill = new AudioSprite(SOUND_RESOURCE["sound/achievement/seTripleKill.mp3"], false);
    this.seUltraKill = new AudioSprite(SOUND_RESOURCE["sound/achievement/seUltraKill.mp3"], false);
    this.seRampage = new AudioSprite(SOUND_RESOURCE["sound/achievement/seRampage.mp3"], false);

    this.spriteGroup = new SpriteGroup();
}
SnowballFightGame.prototype = new GameComponent();
SnowballFightGame.prototype.initialize = function () {

    //添加鼠标事件监听
    $(window).mousedown(game.mouseDownEvent);
    $(window).mousemove(game.mouseMoveEvent);
    $(window).mouseup(game.mouseUpEvent);
    $(window).click(game.mouseClickEvent);
    $(document).bind("contextmenu", function (e) {
        return false;
    });

    //将精灵加入精灵组
    //精灵实例化
    this.moveMarker = new MoveMarker(IMAGE_RESOURCE[WIDGET_IMAGE_PATH]);
    this.selectedRing = new SelectedRing(IMAGE_RESOURCE[WIDGET_IMAGE_PATH]);
    this.energyTrough = new EnergyTrough(IMAGE_RESOURCE[WIDGET_IMAGE_PATH]);
    this.itemGroup = new RoleGroup("Item");
    this.hpTroughGroup = new RoleGroup("HpTrough");
    this.player = new Player(IMAGE_RESOURCE[ROLES_IMAGE_PATH], {startPosition:new Point(600, 413)}, this.hpTroughGroup);
    this.enemyGroup = new RoleGroup("Enemy");

    this.spriteGroup.add(this.selectedRing);
    this.spriteGroup.add(this.moveMarker);
    this.spriteGroup.add(this.energyTrough);
    this.spriteGroup.add(this.player);
    this.spriteGroup.add(this.hpTroughGroup);
    this.spriteGroup.add(this.enemyGroup);
    this.spriteGroup.add(this.itemGroup);

    this.loadNewStage();
    this.bgm.play();
};
SnowballFightGame.prototype.draw = function () {
    mainCanvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.spriteGroup.draw();
    mainCanvas.save();
    mainCanvas.font = "20px Impact";
    mainCanvas.fillStyle = FONT_FILL_STYLE[this.stageClass];
    mainCanvas.fillText(this.playerInfoText, 10, SCREEN_HEIGHT + 28);
    mainCanvas.restore();
    if (this.showRetryHint || this.showSubmitHint) {
        mainCanvas.strokeRect(this.hintPosition.x - 140, this.hintPosition.y - 80,
            290, this.showRetryHint ? 46 : 72);
        mainCanvas.save();
        mainCanvas.fillStyle = "#3399FF";
        mainCanvas.fillRect(this.hintPosition.x - 140, this.hintPosition.y - 80,
            290, this.showRetryHint ? 46 : 72);
        mainCanvas.restore();
        mainCanvas.font = "16px 幼圆";
        if (this.showRetryHint) {
            mainCanvas.fillText("再玩一次挑战更高难度的关卡吧！",
                this.hintPosition.x - 140 + 24, this.hintPosition.y - 80 + 30);
        }
        else {
            mainCanvas.fillText("提交你的分数。",
                this.hintPosition.x - 140 + 8, this.hintPosition.y - 80 + 24);
            mainCanvas.fillText("截止至2013年1月1日晚上0点，TOP5",
                this.hintPosition.x - 140 + 8, this.hintPosition.y - 80 + 44);
            mainCanvas.fillText("将可以获得我们团队送出的特制礼物哦",
                this.hintPosition.x - 140 + 8, this.hintPosition.y - 80 + 64);
        }
    }
};
SnowballFightGame.prototype.update = function () {
    if (!this.isPause) {
        //根据关卡信息新增精灵
        switch (this.stageState) {
            case "LOAD_STAGE":
                this.loadNewStage();
                break;
            case "STAGE_TEXT":
                break;
            case "LOAD_ROLES":
                this.loadRoles();
                break;
            case "GAME_PLAYING":
                //判断是否游戏结束
                this.isGameOver = this.player.isDead;
                if (!this.isGameOver) {
                    this.updateMainGame();
                    this.updatePlayerInfo();
                }
                else {
                    this.gameOver();
                }
                break;
            case "STAGE_CLEAR":

                break;
            case "GAME_OVER":

                break;
            default:
                break;
        }
        //通知精灵群组更新
        this.spriteGroup.update();
    }
};
SnowballFightGame.prototype.loadNewStage = function () {
    //获取下一关的信息
    this.stageInfo = StageInfo[(++this.stageNum) - 1];
    this.spriteGroup.remove(this.stageText);
    this.stageText = new StageText(IMAGE_RESOURCE[TEXT_IMAGE_PATH], this.stageNum);
    this.spriteGroup.add(this.stageText);

    if (this.stageNum <= 5) {
        this.stageClass = 0;
    }
    else if (this.stageNum <= 12) {
        this.stageClass = 1;
    }
    else {
        this.stageClass = 2;
    }

    this.spriteGroup.remove(this.background);
    this.spriteGroup.remove(this.stateBoard);
    this.spriteGroup.remove(this.fallingSnow);
    this.background = new Background(IMAGE_RESOURCE[BACKGROUND_IMAGE_PATH[this.stageClass]], false);
    this.stateBoard = new StateBoard(IMAGE_RESOURCE[BACKGROUND_IMAGE_PATH[this.stageClass]]);
    this.spriteGroup.add(this.background);
    this.spriteGroup.add(this.stateBoard);
    //增加雪花
    if ((this.stageNum >= 3 && this.stageNum <= 5) ||
        (this.stageNum >= 9 && this.stageNum <= 12) ||
        this.stageNum >= 16) {
        this.fallingSnow = new FallingSnow(IMAGE_RESOURCE[SNOW_IMAGE_PATH]);
        this.spriteGroup.add(this.fallingSnow);
    }

    //根据阶段设置道具爆率
    this.ITEM_RANDOM_TIME_MIN = this.ITEM_RANDOM_TIME_MIN_LIST[this.stageClass];
    this.ITEM_RANDOM_TIME_MAX = this.ITEM_RANDOM_TIME_MAX_LIST[this.stageClass];
    this.itemNumber = this.ITEM_BASENUMBER_LIST[this.stageClass] +
        Math.floor(Math.random() * this.ITEM_BASENUMBER_LIST[this.stageClass]);
    this.itemTickCount = Math.floor(Math.random() *
        (this.ITEM_RANDOM_TIME_MAX - this.ITEM_RANDOM_TIME_MIN) + this.ITEM_RANDOM_TIME_MIN);
    this.enemyGroup.clear();
    this.stageState = "STAGE_TEXT";
};
SnowballFightGame.prototype.loadRoles = function () {
    //重置关卡状态，读取关卡信息
    for (var i in this.stageInfo) {
        this.enemyGroup.add(new Enemy(IMAGE_RESOURCE[ROLES_IMAGE_PATH], this.stageInfo[i], this.hpTroughGroup));
    }
    this.stageState = "GAME_PLAYING";
}
SnowballFightGame.prototype.updateMainGame = function () {
    //判断是否通关
    var isEnemyAllDead = true;
    for (var i in this.enemyGroup.group) {
        isEnemyAllDead = isEnemyAllDead && this.enemyGroup.group[i].isDead;
    }
    //过关回复最大生命的15%，读取新关卡信息
    if (!this.isGameOver && isEnemyAllDead) {
        var restoreRate = [0.15, 0.12, 0.1];
        this.player.hp += Math.floor(this.player.MAX_HP * restoreRate[this.stageClass]);
        if (this.player.hp > this.player.MAX_HP)
            this.player.hp = this.player.MAX_HP;
        this.stageText.triggleClear();
        this.stageState = "STAGE_CLEAR";
        this.itemGroup.clear();
        return;
    }
    //道具刷新逻辑
    if (this.itemTickCount == 0 && this.itemNumber > 0) {
        this.itemTickCount = Math.floor(Math.random() * (this.ITEM_RANDOM_TIME_MAX - this.ITEM_RANDOM_TIME_MIN) + this.ITEM_RANDOM_TIME_MIN);
        this.itemGroup.add(new Item(IMAGE_RESOURCE[WIDGET_IMAGE_PATH]));
        this.itemNumber--;
    }
    else {
        this.itemTickCount--;
    }
    this.spriteGroup.flush();
};
SnowballFightGame.prototype.updatePlayerInfo = function () {
    var attackTypeText = "普通";
    switch (this.player.attackType) {
        case this.player.ATTACK_TYPE_NORMAL:
        default:
            attackTypeText = "普通";
            break;
        case this.player.ATTACK_TYPE_FIRE:
            attackTypeText = "火焰";
            break;
        case this.player.ATTACK_TYPE_FROZEN:
            attackTypeText = "冰冻";
            break;
        case this.player.ATTACK_TYPE_POISON:
            attackTypeText = "剧毒";
            break;

    }
    this.playerInfoText = "攻击力LV:" + (this.player.attackLevel == this.player.MAX_LEVEL ? "MAX" : this.player.attackLevel) +
        "  移动速度LV:" + (this.player.moveSpeedLevel == this.player.MAX_LEVEL ? "MAX" : this.player.moveSpeedLevel) +
        "  雪球速度LV:" + (this.player.snowballSpeedLevel == this.player.MAX_LEVEL ? "MAX" : this.player.snowballSpeedLevel) +
        "  攻击类型:" + attackTypeText +
        "  关卡:" + this.stageNum +
        "  分数:" + this.gameScore;
};
SnowballFightGame.prototype.gameOver = function () {
    //鼠标移动事件
    var gameoverMouseMove = function (e) {
        var mouseX = e.pageX - CANVAS_OFFSET_X;
        var mouseY = e.pageY - CANVAS_OFFSET_Y;
        game.showRetryHint = game.retryButton.isVisible = game.retryButton.isMouseOn =
            (mouseX > game.retryButton.positionX
                && mouseX < game.retryButton.positionX + game.retryButton.width
                && mouseY > game.retryButton.positionY
                && mouseY < game.retryButton.positionY + game.retryButton.height);

        game.showSubmitHint = game.submitButton.isVisible = game.submitButton.isMouseOn =
            (!game.hasSubmitScore && mouseX > game.submitButton.positionX
                && mouseX < game.submitButton.positionX + game.submitButton.width
                && mouseY > game.submitButton.positionY
                && mouseY < game.submitButton.positionY + game.submitButton.height);
        if (game.showRetryHint || game.showSubmitHint) {
            game.hintPosition = new Point(mouseX, mouseY);
        }
    };
    //鼠标点击事件
    var gameoverMouseClick = function (e) {
        if (game.retryButton.isMouseOn) {
            game.restart();
        }
        else if (game.submitButton.isMouseOn && !this.hasSubmitScore) {
            $("#submitBox").show();
        }
    };
    //绑定新的窗口事件
    var bindEvent = function () {
        $(window).unbind();
        $(window).mousemove(gameoverMouseMove);
        $(window).click(gameoverMouseClick);
    };


    //添加背景和两个按钮
    this.spriteGroup.add(new GameoverGround(IMAGE_RESOURCE[GAMEOVER_IMAGE_PATH[this.stageClass]]));
    this.retryButton = new GameoverGroundButton(IMAGE_RESOURCE[GAMEOVER_IMAGE_PATH[this.stageClass]], 0);
    this.submitButton = new GameoverGroundButton(IMAGE_RESOURCE[GAMEOVER_IMAGE_PATH[this.stageClass]], 1);
    this.spriteGroup.add(this.retryButton);
    this.spriteGroup.add(this.submitButton);
    this.spriteGroup.add(new GameoverScoreBoard(IMAGE_RESOURCE[GAMEOVER_IMAGE_PATH[this.stageClass]],
        this.stageClass, this.gameScore, bindEvent));

    this.hpTroughGroup.clear();

    //跳转游戏状态
    this.stageState = "GAME_OVER";
};
SnowballFightGame.prototype.restart = function () {
    this.bgm.stop();
    $(window).unbind();
    game = new SnowballFightGame();
    screenManager.setComponent(game);
};
SnowballFightGame.prototype.addScore = function (scoreType, info) {
    var ACHIEVEMENT_LIST = ["KillingSpree", "Domanating", "MegaKill",
        "Unstoppable", "WickedSick", "MonsterKill", "GodLike", "HolyShit",
        "DoubleKill", "TripleKill", "UltraKill", "Rampage"];
    var ACHIEVEMENT_SCORE = [200, 300, 450, 650, 900, 1200, 1600, 2000, 500, 750, 1000, 1250];

    switch (scoreType) {
        case "ENEMY":
            this.gameScore += this.stageNum * this.ENEMY_STEP_SCORE + this.BASE_ENEMY_SCORE;
            break;
        case "ACHIEVEMENT":
            this.gameScore += ACHIEVEMENT_SCORE[ACHIEVEMENT_LIST.indexOf(info)];
            break;
    }
};
SnowballFightGame.prototype.pause = function () {
    this.isPause = !this.isPause;
    if (this.isPause) {
        this.bgm.pause();
        this.seMove.stop();
        this.sePause.play();
    }
    else {
        this.bgm.play();
    }
};
SnowballFightGame.prototype.mouseClickEvent = function (e) {
    var checkButton = function (e) {
        var mouseX = e.pageX - CANVAS_OFFSET_X;
        var mouseY = e.pageY - CANVAS_OFFSET_Y;
        if (mouseX > 735 && mouseX < 735 + 24 && mouseY > 608 && mouseY < 608 + 24) {
//            game.pause();
        }
    };
    var checkMouseRange = function (e) {
        var mouseX = e.pageX - CANVAS_OFFSET_X;
        var mouseY = e.pageY - CANVAS_OFFSET_Y;
        var verticalOffset = 30;
        var isLegalRange = (mouseX > game.player.width * 2
            && mouseX < SCREEN_WIDTH - game.player.width / 2
            && mouseY < SCREEN_HEIGHT
            && mouseY > -0.75 * mouseX + SCREEN_HEIGHT + verticalOffset);
        return isLegalRange;
    };
    checkButton(e);
    if (game.stageState == "GAME_PLAYING" && !game.isPause) {
        if (!game.isMouseOnPlayer && checkMouseRange(e)) {
            var targetPoint = new Point(e.pageX - CANVAS_OFFSET_X, e.pageY - CANVAS_OFFSET_Y);
            game.moveMarker.setPosition(targetPoint);
            game.moveMarker.isVisible = true;
            game.player.moveTo(targetPoint);
        }
    }
};
SnowballFightGame.prototype.mouseDownEvent = function (e) {
    if (game.stageState == "GAME_PLAYING" && !game.isPause) {
        if (game.isMouseOnPlayer && !game.isMouseDown && !this.isRigidity) {
            game.player.startForce();
            game.isMouseDown = true;
            //蓄力条开始增长
            game.energyTrough.isIncreasing = true;
            game.moveMarker.isVisible = false;
            game.seCharge.play();
        }
    }
};
SnowballFightGame.prototype.mouseMoveEvent = function (e) {
    var checkMouseRange = function (e, player) {
        var mouseX = e.pageX - CANVAS_OFFSET_X;
        var mouseY = e.pageY - CANVAS_OFFSET_Y;
        var offset = 0;
        var px = player.positionX;
        var py = player.positionY;
        var pw = player.width;
        var ph = player.height;
        var isOnPlayer = (mouseX > px + offset && mouseX < px + pw - offset
            && mouseY > py + 10 && mouseY < py + ph - offset);
        return isOnPlayer;
    };

    if (game.stageState == "GAME_PLAYING" && !game.isPause) {
        game.isMouseOnPlayer = checkMouseRange(e, game.player);
        if (game.isMouseOnPlayer) {
            game.selectedRing.setPosition(new Point(game.player.positionX, game.player.positionY));
            game.selectedRing.isVisible = true;
        }
        else {
            game.selectedRing.isVisible = false;
        }
    }
};
SnowballFightGame.prototype.mouseUpEvent = function (e) {
    if (game.stageState == "GAME_PLAYING" && game.player.isChargingForce && !this.isRigidity) {
        game.player.endForce();
        game.isMouseDown = false;
        game.energyTrough.isIncreasing = false;
        game.seCharge.stop();
    }
};

//HTML加载主入口
$(document).ready(documentReady);
function documentReady() {
    $("#submitBox").hide();
//    $("#rankList").show();
    //获取主画布
    mainCanvas = $("#gameCanvas").get(0).getContext("2d");
    $('#gameCanvas').on('selectstart', function () {
        return false;
    })
    var canvasOffset = $("#gameCanvas").offset();

    //获取常量
    CANVAS_OFFSET_X = canvasOffset.left;
    CANVAS_OFFSET_Y = canvasOffset.top;
    //加载关卡信息
    loadingScreen = new LoadingScreen();

    screenManager = new ScreenManager(loadingScreen);
    screenManager.start();
}