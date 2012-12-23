//LoadingDisplay.js 加载界面显示精灵类
function LoadingDisplay(imageSource) {
    Sprite.call(this, imageSource);
    this.width = 380;
    this.height = 380;
    this.positionX = 180;
    this.positionY = 200;
}
LoadingDisplay.prototype = new Sprite();

//血槽精灵类
function HpTrough(imageSource) {
    Sprite.call(this, imageSource);
    this.boardWidth = 44;
    this.boardHeight = 10;
    this.targetWidth = this.drawWidth = this.width = 40;
    this.height = 6;
    this.drawLayer = 4;

    this.barOffsetX = 2;
    this.barOffsetY = 2;
}
HpTrough.prototype = new Sprite();
HpTrough.prototype.draw = function () {
    mainCanvas.drawImage(this.img, 100, 0, this.boardWidth, this.boardHeight, this.positionX, this.positionY, this.boardWidth, this.boardHeight);
    mainCanvas.drawImage(this.img, 102, 16, this.width, this.height, this.positionX + this.barOffsetX, this.positionY + this.barOffsetY, this.width, this.height);
    mainCanvas.drawImage(this.img, 102, 10, this.drawWidth, this.height, this.positionX + this.barOffsetX, this.positionY + this.barOffsetY, this.drawWidth, this.height);
};
HpTrough.prototype.update = function () {
    if (this.drawWidth != this.targetWidth) {
        this.drawWidth += (this.targetWidth < this.drawWidth ? -1 : 1);
    }
    if (this.drawWidth <= 0) {
        this.isToDisposed = true;
    }
};
HpTrough.prototype.setPosition = function (point) {
    this.positionX = point.x;
    this.positionY = point.y - 8;
};
HpTrough.prototype.setWidthRate = function (widthRate) {
    this.targetWidth = Math.floor(widthRate * this.width);
};

//EnergyTrough.js 能量槽精灵类
function EnergyTrough(imageSource) {
    DynamicSprite.call(this, imageSource);
    this.width = 20;
    this.height = 80;
    this.drawLayer = 4;

    this.isIncreasing = false;
    this.drawHeight = 0;
    this.cutPositionY = 0;
}
EnergyTrough.prototype = new DynamicSprite();
EnergyTrough.prototype.draw = function () {
    if (this.isIncreasing) {
        mainCanvas.drawImage(this.img, 80, this.cutPositionY, this.width, this.drawHeight, this.positionX, this.positionY + this.cutPositionY, this.width, this.drawHeight);
    }
};
EnergyTrough.prototype.update = function () {
    //随玩家位置更新
    this.positionX = game.player.positionX + game.player.width + 10;
    this.positionY = game.player.positionY;
    if (this.isIncreasing) {
        //能量蓄满保持不动
        if (game.player.chargeForce >= game.player.MAX_FORCE) {
            this.cutPositionY = 0;
            this.drawHeight = this.height;
        }
        else {
            var h = game.player.chargeForce / game.player.MAX_FORCE * this.height;
            this.drawHeight = h;
            this.cutPositionY = this.height - h;
        }
    }
};

//SelectedRing.js 选择环精灵类（鼠标移到可控制的人物身上时，起指示作用的选择环会出现）
function SelectedRing(imageSource) {
    Sprite.call(this, imageSource);
    this.width = 56;
    this.height = 24;
    this.drawLayer = 4;
    this.isVisible = false;
}
SelectedRing.prototype = new Sprite();
SelectedRing.prototype.draw = function () {
    if (this.isVisible) {
        mainCanvas.drawImage(this.img, 0, 32, this.width, this.height, this.positionX, this.positionY, this.width, this.height);
    }
};
SelectedRing.prototype.setPosition = function (playerPosition) {
    this.positionX = playerPosition.x - 7;
    this.positionY = playerPosition.y + 68;
};

//MoveMarker.js 移动标记精灵类
function MoveMarker(imageSource) {
    Sprite.call(this, imageSource);
    this.width = 24;
    this.height = 12;
    this.drawLayer = 4;
    this.isVisible = false;
}
MoveMarker.prototype = new Sprite();
MoveMarker.prototype.draw = function () {
    if (this.isVisible) {
        mainCanvas.drawImage(this.img, 2, 58, this.width, this.height, this.positionX, this.positionY, this.width, this.height);
    }
};
MoveMarker.prototype.setPosition = function (playerPosition) {
    this.positionX = playerPosition.x - 12;
    this.positionY = playerPosition.y - 6;
};

//StageText.js 关卡标题精灵类
function StageText(imageSource, stageNum) {
    Sprite.call(this, imageSource);
//    this.width = this.targetWidth = 203;
    this.height = this.targetHeight = 67;
    this.width = this.targetWidth = 203;
//    this.height = this.targetHeight = 80;
    this.positionX = SCREEN_WIDTH / 2 - this.width / 2 - 30;
    this.positionY = SCREEN_HEIGHT / 2 - this.height / 2;
    this.drawLayer = 9;
    this.alpha = 0;

    this.stageNumberList = [];
    stageNum += "";
    for (var i = 0; i < stageNum.length; i++)
        this.stageNumberList.push(parseInt(stageNum.charAt(i)));
    this.state = 0;
    this.tickCount = 0;
    this.textIndex = 0;
    this.TEXT_INDEX_MAX = 2;
    this.isAppearing = true;
    this.isTriggleClear = false;
    this.TOTAL_COUNT = 15;
}
StageText.prototype = new Sprite();
StageText.prototype.init = function () {
    this.width = this.height = 0;
    this.positionX = SCREEN_WIDTH / 2;
    this.positionY = SCREEN_HEIGHT / 2;
};
StageText.prototype.draw = function () {
    if (this.state == 0) {
        mainCanvas.globalAlpha = this.alpha;
        for (var i in this.stageNumberList) {
            mainCanvas.drawImage(this.img, this.stageNumberList[i] * 50, 0, 50, 80,
                this.positionX + this.width + 30 * i, this.positionY - 8, 50, 80);
        }
        mainCanvas.drawImage(this.img, 0, 81, this.targetWidth,
            this.targetHeight, this.positionX, this.positionY, this.width, this.height);
        mainCanvas.globalAlpha = 1.0;
    }
    else {
        mainCanvas.drawImage(this.img, 0, this.targetHeight * this.textIndex + 148, this.targetWidth,
            this.targetHeight, this.positionX, this.positionY, this.width, this.height);
    }

};
StageText.prototype.update = function () {
    //状态0：STAGE淡入
    if (this.state == 0) {
        this.alpha += 0.05;
        if (this.alpha >= 1) {
            if (this.tickCount < this.TOTAL_COUNT / 3) {
                this.tickCount++;
            }
            else {
                this.state = 1;
                this.init();
            }
        }
    }
    //状态1：READY，FIGHT相继出现
    else if (this.state == 1) {
        if (this.tickCount < this.TOTAL_COUNT / 3 * 2) {
            var time = this.TOTAL_COUNT / 3;
            this.positionX -= this.targetWidth / 2 / time;
            this.positionY -= this.targetHeight / 2 / time;
            this.width += this.targetWidth / time;
            this.height += this.targetHeight / time;
            this.tickCount++;
        }
        else if (this.tickCount < this.TOTAL_COUNT) {
            //Do nothing
            this.tickCount++;
        }
        else if (this.textIndex < this.TEXT_INDEX_MAX - 1) {
            this.textIndex++;
            this.tickCount = this.TOTAL_COUNT / 3;
            this.init();
        }
        else {
            this.state = 2;
            this.init();
            this.textIndex = this.TEXT_INDEX_MAX;
            this.tickCount = this.TOTAL_COUNT / 3;
            game.stageState = "LOAD_ROLES";
        }
    }
    else if (this.state == 2 && this.isTriggleClear) {
        if (this.tickCount < this.TOTAL_COUNT / 3 * 2) {
            var time = this.TOTAL_COUNT / 3;
            this.positionX -= this.targetWidth / 2 / time;
            this.positionY -= this.targetHeight / 2 / time;
            this.width += this.targetWidth / time;
            this.height += this.targetHeight / time;
            this.tickCount++;
        }
        else if (this.tickCount < this.TOTAL_COUNT) {
            //Do nothing
            this.tickCount++;
        }
        else {
            game.stageState = "LOAD_STAGE";
        }
    }
};
StageText.prototype.triggleClear = function () {
    this.isTriggleClear = true;
};

//ExplosionEffect.js 爆炸效果精灵类
function ExplosionEffect(imageSource, position) {
    DynamicSprite.call(this, imageSource);
    this.width = 64;
    this.height = 64;
    this.positionX = position.x - this.width;
    this.positionY = position.y - this.height;
    this.drawLayer = 8;

    this.sheetColumn = 0;
    this.sheetLength = 14;
}
ExplosionEffect.prototype = new DynamicSprite();
ExplosionEffect.prototype.draw = function () {
    mainCanvas.drawImage(this.img, this.sheetColumn * this.width, 0, this.width,
        this.height, this.positionX, this.positionY, this.width * 2, this.height * 2);
};
ExplosionEffect.prototype.update = function () {
//    if (this.currentSwitchImageFrame < this.totalSwitchImageFrame) {
//        this.currentSwitchImageFrame++;
//    }
//    else if (this.sheetColumn < this.sheetLength) {
    if (this.sheetColumn < this.sheetLength) {
        this.sheetColumn++;
    }
    else {
        this.isToDisposed = true;
    }
};

//AchievementBoard.js 成就木板精灵类
function AchievementBoard(imageSource, text, stageClass, score) {
    Sprite.call(this, imageSource);
    this.width = 400;
    this.height = 60;
    this.positionX = 200;
    this.positionY = -this.height;
    this.text = "获得成就："+text;
    this.stageClass = stageClass;
    this.scoreText = "+" + score;
    this.drawLayer = 8;

    this.isDownMoving = true;
    this.waitCount = 0;
    this.WAIT_TOTAL_COUNT = 30;    //1s
}
AchievementBoard.prototype = new Sprite();
AchievementBoard.prototype.draw = function () {
    mainCanvas.drawImage(this.img, 0, this.stageClass * this.height + 80, this.width, this.height,
        this.positionX, this.positionY, this.width, this.height);
    mainCanvas.save();
    mainCanvas.fillStyle = FONT_FILL_STYLE[this.stageClass];
    mainCanvas.font = "24px 幼圆";
    mainCanvas.fillText(this.text, this.positionX + 20, this.positionY + 41);
    mainCanvas.fillText(this.scoreText, this.positionX + 380 - this.scoreText.length * 14,
        this.positionY + 41);
    mainCanvas.restore();
};
AchievementBoard.prototype.update = function () {
    if (this.isDownMoving && this.positionY < 0) {
        this.positionY += 2;
    }
    else if (!this.isDownMoving) {
        if (this.positionY > -50)
            this.positionY -= 2;
        else
            this.isToDisposed = true;
    }
    else if (this.waitCount < this.WAIT_TOTAL_COUNT)
        this.waitCount++;
    else
        this.isDownMoving = false;
};

//Background.js 背景精灵类
function Background(imageSource, isStartScreen) {
    Sprite.call(this, imageSource);
    this.positionX = this.positionY = 0;
    this.width = SCREEN_WIDTH;
    this.height = isStartScreen ? SCREEN_HEIGHT + 40 : SCREEN_HEIGHT;

    this.drawLayer = 0;
}
Background.prototype = new Sprite();
Background.prototype.draw = function () {
    mainCanvas.drawImage(this.img, 0, 0, this.width, this.height,
        this.positionX, this.positionY, this.width, this.height);
};

//StateBoard.js 状态栏精灵类
function StateBoard(imageSource) {
    Sprite.call(this, imageSource);
    this.positionX = 0;
    this.positionY = SCREEN_HEIGHT;
    this.width = SCREEN_WIDTH;
    this.height = 40;
    this.drawLayer = 7;
}
StateBoard.prototype = new Sprite();
StateBoard.prototype.draw = function () {
    mainCanvas.drawImage(this.img, 0, SCREEN_HEIGHT, this.width, this.height,
        this.positionX, this.positionY, this.width, this.height);
};

//GameoverGround.js 游戏结束背景精灵类
function GameoverGround(imageSource) {
    Background.call(this, imageSource);
    this.drawLayer = 8;
    this.isAppearing = true;
    this.alpha = 0;
}
GameoverGround.prototype = new Background();
GameoverGround.prototype.draw = function () {
    mainCanvas.save();
    mainCanvas.globalAlpha = this.alpha;
    Background.prototype.draw.call(this);
    mainCanvas.restore();
};
GameoverGround.prototype.update = function () {
    if (this.isAppearing) {
        this.alpha += 0.05;
        if (this.alpha >= 1.0) {
            this.isAppearing = false;
        }
    }
};

//GameoverGroundButton.js 游戏结束背景按钮精灵类
function GameoverGroundButton(imageSource, index) {
    Sprite.call(this, imageSource);
    this.width = 151;
    this.height = 57;
    this.index = index
    this.positionX = this.index == 0 ? 362 : 531;
    this.positionY = 436;
    this.drawLayer = 8;
    this.isVisible = false;
    this.isMouseOn = false;
}
GameoverGroundButton.prototype = new Background();
GameoverGroundButton.prototype.draw = function () {
    if (this.isVisible) {
        mainCanvas.drawImage(this.img, 800, this.index == 0 ? 0 : this.height, this.width, this.height,
            this.positionX, this.positionY, this.width, this.height);
    }
};

//GameoverScoreBoard.js 游戏结束分数精灵类
function GameoverScoreBoard(imageSource, index, score) {
    Sprite.call(this, imageSource);
    this.POSITIONX_LIST = [400, 400, 266];
    this.POSITIONY_LIST = [160, 180, 182];
    this.FILL_STYLE_LIST = ["#632A14", "6781A4", "DF3941"];
    this.width = 240;
    this.height = 160;
    this.index = index;
    this.scoreStr = score + "";
    this.showText = "";
    this.positionX = this.POSITIONX_LIST[this.index];
    this.positionY = this.POSITIONY_LIST[this.index];
    this.drawLayer = 8;
    this.isAppearing = true;
    this.alpha = 0;
    this.randomCount = 0;
    this.RANDOM_TOTAL_COUNT = 30;
    this.waitCount = 0;
    this.WAIT_TOTAL_COUNT = 50;
}
GameoverScoreBoard.prototype.draw = function () {
    mainCanvas.save();
    if (this.isAppearing) {
        mainCanvas.globalAlpha = this.alpha;
        mainCanvas.drawImage(this.img, 800, 114, this.width, this.height,
            this.positionX, this.positionY, this.width, this.height);
    }
    else {
        mainCanvas.font = "38px Impact";
        mainCanvas.fillStyle = this.FILL_STYLE_LIST[this.index];
        mainCanvas.drawImage(this.img, 800, 114, this.width, this.height,
            this.positionX, this.positionY, this.width, this.height);
        mainCanvas.fillText(this.showText, this.positionX + 38, this.positionY + 122);
    }
    mainCanvas.restore();
};
GameoverScoreBoard.prototype.update = function () {
    if (this.waitCount < this.WAIT_TOTAL_COUNT) {
        this.waitCount++;
    }
    else if (this.isAppearing) {
        this.alpha += 0.05;
        if (this.alpha >= 1.0) {
            this.isAppearing = false;
        }
    }
    else if (this.randomCount < this.RANDOM_TOTAL_COUNT) {
        this.showText = "";
        for (var i = 0; i < 8; i++) {
            this.showText += (Math.floor(Math.random() * 10) + "");
        }
        this.randomCount++;
    }
    else {
        for (var i = 0; i < 8 - this.scoreStr.length; i++) {
            this.scoreStr = "0" + this.scoreStr;
        }
        this.showText = this.scoreStr;
    }
};