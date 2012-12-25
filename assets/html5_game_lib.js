//GameComponent.js 游戏组件类
function GameComponent() {
}
GameComponent.prototype = {
    //定义三个抽象方法，子类必须实现
    //组件初始化
    initialize:function () {
    },
    //组件绘制
    draw:function () {
    },
    //组件更新
    update:function () {
    }
};

//ScreenManager.js 屏幕管理者类
function ScreenManager(component) {
    //当前活动中的游戏组件
    this.currentComponent = component;
}
ScreenManager.prototype.draw = function () {
    screenManager.currentComponent.draw();
};
ScreenManager.prototype.update = function () {
    screenManager.currentComponent.update();
};
//设置活动组件并初始化
ScreenManager.prototype.setComponent = function (component) {
    screenManager.currentComponent = component;
    screenManager.currentComponent.initialize();
};
//启动组件（激活组件的绘制和更新）
ScreenManager.prototype.start = function () {
    screenManager.currentComponent.initialize();
    setInterval(screenManager.update, REFRESH_INTERVAL);
    setInterval(screenManager.draw, REFRESH_INTERVAL);
};

//Sprite.js 精灵基类
function Sprite(imageSource) {
//    this.img = new Image();
//    this.img.src = imageSource || null;
    this.img = imageSource;
    this.positionX = 0;
    this.positionY = 0;
    this.width = 0;
    this.height = 0;
    this.drawLayer = 0;
    this.isToDisposed = false;
}
Sprite.prototype.draw = function () {
    mainCanvas.drawImage(this.img, this.positionX, this.positionY);
};
Sprite.prototype.update = function () {
};

//DynamicSprite.js 动态精灵类
function DynamicSprite(imageSource) {
    Sprite.call(this, imageSource);
    this.totalSwitchImageFrame = 16;
    this.currentSwitchImageFrame = 0;
    this.sheetRow = 0;
    this.sheetColumn = 0;
    this.sheetLength = 1;
}
DynamicSprite.prototype = new Sprite();
DynamicSprite.prototype.draw = function () {
    mainCanvas.drawImage(this.img, this.sheetColumn * this.width, this.sheetRow * this.height, this.width, this.height, this.positionX, this.positionY, this.width, this.height);
};
DynamicSprite.prototype.update = function () {
    if (this.currentSwitchImageFrame < this.totalSwitchImageFrame) {
        this.currentSwitchImageFrame++;
    }
    else {
        this.sheetColumn = this.sheetColumn < this.sheetLength - 1 ? this.sheetColumn + 1 : 0;
        this.currentSwitchImageFrame = 0;
    }
};

//TriggleSprite.js 动态精灵类
function TriggleSprite(imageSource, constructInfo) {
    Sprite.call(this, imageSource);
    this.tickCount = 0;
    if (constructInfo.position != undefined) {
        this.positionX = constructInfo.position.x;
        this.positionY = constructInfo.position.y;
    }
    this.width = constructInfo.width || this.width;
    this.height = constructInfo.height || this.height;
    this.TOTAL_COUNT = Math.round(constructInfo.duration / REFRESH_INTERVAL);
}
TriggleSprite.prototype = new Sprite();
//TriggleSprite.prototype.draw = function () {
//    mainCanvas.drawImage(this.img, this.width, this.height, this.width, this.height, this.positionX, this.positionY, this.width, this.height);
//};
TriggleSprite.prototype.update = function () {
    if (this.tickCount < this.TOTAL_COUNT) {
        this.tickCount++;
    }
    else {
        this.isToDisposed = true;
    }
};

//SpriteGroup.js 精灵组类
function SpriteGroup() {
    this.collections = new Array();
}
SpriteGroup.prototype.add = function (sprite) {
    this.collections.push(sprite);
    this.flush();
    return this.collections.indexOf(sprite);
};
SpriteGroup.prototype.remove = function (sprite) {
    var index = this.collections.indexOf(sprite);
    if(index>=0){
    this.collections.splice(index,1);
    }
};
SpriteGroup.prototype.change = function (index, newSprite) {
    this.collections.splice(index, 1, newSprite);
    this.flush();
};
SpriteGroup.prototype.flush = function () {
    this.collections.sort(function (spriteA, spriteB) {
        return spriteA.drawLayer - spriteB.drawLayer;
    });
}
SpriteGroup.prototype.draw = function () {
    for (index in this.collections) {
        if (this.collections[index] != null) {
            this.collections[index].draw();
        }
    }
};
SpriteGroup.prototype.update = function () {
    for (index in this.collections) {
        if (this.collections[index] != null) {
            this.collections[index].update();
        }
        if (this.collections[index] == null || this.collections[index].isToDisposed) {
            this.collections.splice(index, 1);
        }
    }
};

function Point(x, y) {
    this.y = y;
    this.x = x;
}

//AudioSprite.js 音频播放精灵类，用于播放音频
function AudioSprite(audio, isLoop) {
    this.audioSprite = audio;
//    this.audioSprite.src = src;
    this.audioSprite.loop = isLoop;
}
AudioSprite.prototype.play = function () {
    this.audioSprite.play();
};
AudioSprite.prototype.pause = function () {
    this.audioSprite.pause();
};
AudioSprite.prototype.stop = function () {
    this.audioSprite.currentTime = 0;
    this.audioSprite.pause();
};

function loadJs(jsFile) {
    if (!jsFile) return;
    var oHead = document.getElementsByTagName('HEAD')[0];
    var oScript = document.createElement('script');
    oScript.type = "text/javascript";
    oScript.src = jsFile;
    oHead.appendChild(oScript);
}