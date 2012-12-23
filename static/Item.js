//Item.js 增益类物品精灵类
function Item(imageSource) {
    Sprite.call(this, imageSource);
    this.ITEM_INVISIBLE = 0;
    this.ITEM_FIRE = 1;
    this.ITEM_FROZEN = 2;
    this.ITEM_POISON = 3;
    this.ITEM_GOLD = 4;
    this.ITEM_HP_POTION = 5;
    this.ITEM_ATTACK_UP = 6;
    this.ITEM_MOVE_SPEED_UP = 7;
    this.ITEM_SNOWBALL_SPEED_UP = 8;
    this.ITEM_TYPE_LIST = ["Invisible", "Fire", "Frozen", "Poison", "Gold",
        "HpPotion", "AttackUp", "MoveSpeedUp", "SnowballSpeedUp"];
    this.ITEM_DRAW_TEXT_LIST = ["隐身", "火球攻击", "冰球攻击", "毒球攻击",
        "SCORE+", "HP+", "攻击力上升", "移动速度上升", "雪球速度上升"];
    this.ITEM_SCORE = [200, 300, 300, 300, 0, 0, 200, 200, 200];
    //HP回复量
    this.HP_RESTORE_COUNT = 200;

    //获取道具种类（按一定比率产生各种道具）
    this.itemType = this.getItemType();
//    this.itemType = this.ITEM_INVISIBLE;
    this.fallingWidth = 24;
    this.fallingHeight = 24;
    this.width = 24;
    this.height = 24;
    var OFFSET = 40;
    this.positionX = Math.floor(Math.random() * (SCREEN_WIDTH - this.width));
    this.positionY = Math.floor(Math.random() * SCREEN_HEIGHT) - SCREEN_HEIGHT + OFFSET;
    while (this.positionY + SCREEN_HEIGHT < -0.75 * this.positionX + SCREEN_HEIGHT
        || this.positionY > SCREEN_HEIGHT - this.height * 4) {
        this.positionX = Math.floor(Math.random() * (SCREEN_WIDTH - this.width));
        this.positionY = Math.floor(Math.random() * SCREEN_HEIGHT) - SCREEN_HEIGHT + OFFSET;
    }
    this.drawLayer = 3;

    this.tickCount = 0;
    this.FALL_TOTAL_COUNT = 29;
    this.VANISH_TOTAL_COUNT = 450;
    this.FALL_DY = 3;

    this.isFalling = true;
    this.isVanishing = false;
    this.vanishFactor = 1.0;
}
Item.prototype = new Sprite();
Item.prototype.draw = function () {
    if (this.isFalling) {
        mainCanvas.drawImage(this.img, 27, 56, this.fallingWidth, this.fallingHeight, this.positionX, this.positionY, this.fallingWidth, this.fallingHeight);
    }
    else {
        mainCanvas.globalAlpha = this.vanishFactor;
        mainCanvas.drawImage(this.img, 27, 56, this.width, this.height, this.positionX, this.positionY, this.width, this.height);
        mainCanvas.globalAlpha = 1.0;
    }
};
Item.prototype.update = function () {
    //道具下落过程
    if (this.isFalling) {
        //做加速移动
        this.positionY += this.FALL_DY;
        this.FALL_DY++;
        //模拟在一段时间之后落地
        if (this.tickCount > this.FALL_TOTAL_COUNT) {
            this.isFalling = false;
            this.tickCount = 0;
        }
    }
    //道具消失逻辑
    else if (this.isVanishing) {
        this.vanishFactor -= 0.1;
        if (this.vanishFactor <= 0) {
            this.isToDisposed = true;
        }
    }
    //道具着地逻辑
    else {
        //检测是否捡到道具
        if (this.checkCollision(game.player)) {
            this.gainEffect();
            this.isVanishing = true;
        }
        //过一段时间即消失
        if (this.tickCount > this.VANISH_TOTAL_COUNT) {
            this.isVanishing = true;
        }
    }
    this.tickCount++;
};
//道具产生效果
Item.prototype.gainEffect = function () {
    var player = game.player;
    var INVISIBLE_TIME = 10000;
    var ATTACK_ELEMENT_TIME = 5000;
    var addedText = "";

    switch (this.itemType) {
        case this.ITEM_INVISIBLE:
            player.setInvisible();
            break;
        case this.ITEM_FIRE:
            player.setAttackType(player.ATTACK_TYPE_FIRE);
            break;
        case this.ITEM_FROZEN:
            player.setAttackType(player.ATTACK_TYPE_FROZEN);
            break;
        case this.ITEM_POISON:
            player.setAttackType(player.ATTACK_TYPE_POISON);
            break;
        case this.ITEM_GOLD:
            var score = Math.floor(Math.random() * 5) * 100 + 1000;
            game.LogList.push(new Log(EVENT_GET_ITEM, {
                stage:game.stageNum,
                item:this.ITEM_TYPE_LIST[this.itemType],
                gold:score}));
            game.gameScore += score;
            addedText += score;
            break;
        case this.ITEM_HP_POTION:
            player.hp += this.HP_RESTORE_COUNT;
            if (player.hp > player.MAX_HP) {
                player.hp = player.MAX_HP;
            }
            addedText += this.HP_RESTORE_COUNT;
            break;
        case this.ITEM_ATTACK_UP:
            player.attackLevel = (player.attackLevel < player.MAX_LEVEL ? player.attackLevel + 1 : player.MAX_LEVEL);
            break;
        case this.ITEM_MOVE_SPEED_UP:
            player.moveSpeedLevel = (player.moveSpeedLevel < player.MAX_LEVEL ? player.moveSpeedLevel + 1 : player.MAX_LEVEL);
            break;
        case this.ITEM_SNOWBALL_SPEED_UP:
            player.snowballSpeedLevel = (player.snowballSpeedLevel < player.MAX_LEVEL ? player.snowballSpeedLevel + 1 : player.MAX_LEVEL);
            break;
    }
    game.spriteGroup.add(new ItemText(this.ITEM_DRAW_TEXT_LIST[this.itemType] + addedText));
    if (this.itemType != this.ITEM_GOLD) {
        game.gameScore += this.ITEM_SCORE[this.itemType];
        game.LogList.push(new Log(EVENT_GET_ITEM, {
            stage:game.stageNum,
            item:this.ITEM_TYPE_LIST[this.itemType]}));
    }
};
//道具与玩家做碰撞检测
Item.prototype.checkCollision = function (player) {
    //矩形碰撞检测方法
    // | Xb2+Xb1-Xa2-Xa1 |  <=  Xa2-Xa1 + Xb2-Xb1
    var xA1 = this.positionX;
    var yA1 = this.positionY;
    var xA2 = this.positionX + this.width;
    var yA2 = this.positionY + this.height;
    var xB1 = player.positionX + 10;
    var yB1 = player.positionY + player.height / 3 * 2;
    var xB2 = player.positionX + player.width - 10;
    var yB2 = player.positionY + player.height;
    return Math.abs(xB2 + xB1 - xA2 - xA1) <= xA2 - xA1 + xB2 - xB1
        && Math.abs(yB2 + yB1 - yA2 - yA1) <= yA2 - yA1 + yB2 - yB1;
};
//道具种类生成器
Item.prototype.getItemType = function () {
    return Math.floor(Math.random() * 9);
}

//ItemText.js 增益类物品精灵类
function ItemText(text) {
    Sprite.call(this);
    this.width = 40;
    this.height = 20;

    this.text = text;
    this.alpha = 0;
    this.isUpMoving = true;
    this.isVanishing = false;
    this.waitCount = 0;
    this.WAIT_TOTAL_COUNT = 30;    //1s
}
ItemText.prototype = new Sprite();
ItemText.prototype.draw = function () {
    mainCanvas.save();
    mainCanvas.fillStyle = "#0000FF";
    mainCanvas.font = "20px 幼圆";
    mainCanvas.globalAlpha = this.alpha;
    mainCanvas.fillText(this.text, game.player.positionX - this.text.length * 3, game.player.positionY - 20);
    mainCanvas.restore();
};
ItemText.prototype.update = function () {
    //消失中状态
    if (this.isVanishing) {
        this.alpha -= 0.1;
        if (this.alpha <= 0)
            this.isToDisposed = true;
    }
    //上升状态
    if (this.isUpMoving) {
        this.alpha += 0.1;
        if (this.alpha >= 1.0)
            this.isUpMoving = false;
    }
    //等待状态
    else if (this.waitCount < this.WAIT_TOTAL_COUNT)
        this.waitCount++;
    else
        this.isVanishing = true;
};
