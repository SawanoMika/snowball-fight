/*
 * 精灵的绘图层次说明：
 * Background:0
 * Item:3
 * EnergyTrough,SelectedRing,MoveMarker,HpTrough:4
 * Character:5 (Dead:2)
 * Snowball:6
 * StateBoard:7
 * StageText:9
 * */

//Character.js 玩家精灵类
function Character(imageSource) {
    DynamicSprite.call(this, imageSource);
    /* 常量定义 */
    //人物状态
    this.STATUS_STAND = 0;
    this.STATUS_MOVE1 = 1;
    this.STATUS_MOVE2 = 2;
    this.STATUS_CHARGEFORCE = 3;
    this.STATUS_THROW = 4;
    this.STATUS_HIT = 5;
    //人物类型
    this.CHARACTER_TYPE_PLAYER = 0;
    this.CHARACTER_TYPE_ENEMY = 1;
    //人物攻击类型
    this.ATTACK_TYPE_NORMAL = 0;
    this.ATTACK_TYPE_FIRE = 1;
    this.ATTACK_TYPE_FROZEN = 2;
    this.ATTACK_TYPE_POISON = 3;

    this.width = 40;
    this.height = 80;
    this.positionX = 0;
    this.positionY = 0;
    this.moveDx = 0;
    this.moveDy = 0;
    this.drawLayer = 5;
    this.tickCount = 0;
    this.TOTAL_COUNT = 0;
    this.id = CHARACTER_ID++;
    this.status = this.STATUS_STAND;
    this.characterType = this.CHARACTER_TYPE_PLAYER;

    //人物阴影位移增量
    this.shadowWidth = 30;
    this.shadowHeight = 12;
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 66;

    //人物是否死亡
    this.isDead = false;
    //人物是否正在移动
    this.isMoving = false;
    //人物是否正在蓄力
    this.isChargingForce = false;
    //蓄力点数
    this.chargeForce = 0;
    //最大蓄力数值
    this.MAX_FORCE = 100;

    //人物基本属性与常量
    this.hp = 1000;
    this.MAX_HP = 1000;
    this.attackLevel = 1;
    this.moveSpeedLevel = 1;
    this.snowballSpeedLevel = 1;
    this.MAX_LEVEL = 5;
    this.ATTACK_FACTOR = 100;
    this.INIT_ATTACK = 200;
    this.MOVE_SPEED_FACTOR = 1.5;
    this.MOVE_INIT_SPEED = 4.5;
    this.SNOWBALL_SPEED_FACTOR = 2;
    this.SNOWBALL_INIT_SPEED = 6;

    //人物是否处于硬直状态
    this.isRigidity = false;
    this.rigidityCount = 0;
    this.RIGIDITY_TOTAL_COUNT = 45;   //1.5s
    //攻击类型，属性攻击计数变量和持续时间
    this.attackType = this.ATTACK_TYPE_NORMAL;
    this.attackSpecialCount = 0;
    this.ATTACK_SPECIAL_TOTAL_COUNT = 300; //10s
    //是否隐身，隐身计数变量和持续时间
    this.isInvisible = false;
    this.invisibleCount = 0;
    this.INVISIBLE_TOTAL_COUNT = 150;   //5s
    //是否冰冻
    this.isFrozen = false;
    this.frozenCount = 0;
    this.FROZEN_TOTAL_COUNT = 90; //3s
    //是否中毒
    this.isPoisoning = false;
    this.poisoningCount = 0;
    this.POISONING_TOTAL_COUNT = 150; //5s

    //血条
    this.hpTrough = new HpTrough(WIDGET_IMAGE_PATH);
}
Character.prototype = new DynamicSprite();
Character.prototype.draw = function () {
    if (!this.isDead) {
        mainCanvas.drawImage(this.img, this.status * this.width, this.characterType * this.height,
            this.width, this.height, this.positionX, this.positionY, this.width, this.height);
        mainCanvas.drawImage(this.img, 320, 0, this.shadowWidth, this.shadowHeight,
            this.positionX + this.shadowOffsetX, this.positionY + this.shadowOffsetY,
            this.shadowWidth, this.shadowHeight);
    }
};
Character.prototype.update = function () {
    if (!game.isGameOver) {
        this.hpTrough.setPosition(new Point(this.positionX, this.positionY));
        this.hpTrough.setWidthRate(this.hp / this.MAX_HP);
        if (!this.isRigidity) {
            this.chargeForceUpdate();
            this.specialStatusUpdate();
            if (this.isMoving) {
                this.moveUpdate();
            }
        }
        //硬直状态计时
        else if (this.rigidityCount < this.RIGIDITY_TOTAL_COUNT) {
            this.rigidityCount++;
            this.status = this.STATUS_HIT;
        }
        //恢复硬直
        else {
            this.status = this.STATUS_STAND;
            this.isRigidity = false;
            this.isDoingAction = false;
        }
    }
};
//人物蓄力状态更新
Character.prototype.chargeForceUpdate = function () {
    //蓄力相关逻辑
    if (this.isChargingForce && this.chargeForce <= this.MAX_FORCE) {
        this.chargeForce += 5;
    }
};
//人物特殊状态更新
Character.prototype.specialStatusUpdate = function () {
    //隐身倒计数逻辑
    if (this.isInvisible && this.invisibleCount < this.INVISIBLE_TOTAL_COUNT) {
        this.invisibleCount++;
    }
    else {
        this.isInvisible = false;
    }
    //攻击效果倒计数逻辑
    if (this.attackType != this.ATTACK_TYPE_NORMAL && this.attackSpecialCount < this.ATTACK_SPECIAL_TOTAL_COUNT) {
        this.attackSpecialCount++;
    }
    else {
        this.attackType = this.ATTACK_TYPE_NORMAL;
    }
    //冰冻状态倒计数逻辑
    if (this.isFrozen && this.frozenCount < this.FROZEN_TOTAL_COUNT) {
        if (this.timer != null) {
            clearTimeout(this.timer);
        }
        this.frozenCount++;
    }
    else {
        this.isFrozen = false;
    }
    //中毒状态倒计数逻辑
    if (this.isPoisoning && this.poisoningCount < this.POISONING_TOTAL_COUNT) {
        this.hp -= 2;
        this.poisoningCount++;
    }
    else {
        this.isPoisoning = false;
    }
};
//人物移动更新
Character.prototype.moveUpdate = function () {
    //移动人物到目标点
    if (this.tickCount < this.TOTAL_COUNT) {
        if (this.positionX + this.moveDx <= 0 || this.positionY + this.moveDy <= 0) {
            this.stopMove();
            return;
        }
        this.positionX += this.moveDx;
        this.positionY += this.moveDy;
        if (this.tickCount % 10 == 0) {
            this.status = (this.status == this.STATUS_MOVE1 ? this.STATUS_MOVE2 : this.STATUS_MOVE1);
        }
        this.tickCount++;
    }
    else {
        this.isMoving = false;
        this.isDoingAction = false;
        this.status = this.STATUS_STAND;
        game.moveMarker.isVisible = false;
        game.seMove.stop();
    }
};
//开始蓄力
Character.prototype.startForce = function () {
    //蓄力的时候停止移动
    this.stopMove();
    this.isChargingForce = true;
    this.isDoingAction = true;
    //改变动作
    this.status = this.STATUS_CHARGEFORCE;
};
//蓄力结束
Character.prototype.endForce = function (chargedForce) {
    //发射雪球
    if (this.chargeForce > 0) {
        game.spriteGroup.add(new Snowball(WIDGET_IMAGE_PATH, {
            positionX:this.positionX,
            positionY:this.positionY,
            force:chargedForce || this.chargeForce,
            directionToEnemy:(chargedForce == undefined ? true : false),
            host:this
        }));
        //投掷动作并在一定时间之后恢复站立动作
        this.status = this.STATUS_THROW;
        setTimeout((function () {
            this.status = this.STATUS_STAND;
        }).bind(this), 500);
        //播放音效
        if (this.chargeForce > 60) {
            game.seSnowballFly.play();
        }
        else {
            game.seThrow.play();
        }
        //发射完雪球之后重置相关数据
        this.isChargingForce = false;
        this.chargeForce = 0;
        this.isDoingAction = false;
    }
};
Character.prototype.moveTo = function (targetPoint) {
    var currentStandX = this.positionX + this.width / 2;
    var currentStandY = this.positionY + this.height;
    var v = (this.moveSpeedLevel - 1) * this.MOVE_SPEED_FACTOR + this.MOVE_INIT_SPEED;
    var s = Math.sqrt((targetPoint.x - currentStandX) * (targetPoint.x - currentStandX)
        + (targetPoint.y - currentStandY) * (targetPoint.y - currentStandY));
    this.TOTAL_COUNT = Math.round(s / v);
    this.moveDx = (targetPoint.x - currentStandX) / this.TOTAL_COUNT;
    this.moveDy = (targetPoint.y - currentStandY) / this.TOTAL_COUNT;
    this.tickCount = 0;
    this.isMoving = true;
    game.seMove.play();
};
Character.prototype.stopMove = function () {
    this.moveTo(new Point(this.positionX, this.positionY));
    this.status = this.STATUS_STAND;
    this.isDoingAction = false;
    this.isMoving = false;
    game.seMove.stop();
};
Character.prototype.beHit = function (hitPoint, host) {
    //掉血
    this.hp -= hitPoint;
    if (this.hp <= 0) {
        this.die(host);
    }
    switch (host.attackType) {
        case this.ATTACK_TYPE_FIRE:
            //火焰爆炸，在雪球逻辑处处理
            break;
        case this.ATTACK_TYPE_FROZEN:
            this.isFrozen = true;
            this.frozenCount = 0;
            this.chargeForce = 0;
            game.seFrozen.play();
            break;
        case this.ATTACK_TYPE_POISON:
            this.isPoisoning = true;
            this.poisoningCount = 0;

            break;
        case this.ATTACK_TYPE_NORMAL:
            break;
    }
    game.seHit.play();
    game.seCharge.stop();
    //设置被击中动作并在一定时间之后恢复站立动作
    this.status = this.STATUS_HIT;
    this.isRigidity = true;
    this.rigidityCount = 0;
    this.isDoingAction = true;
};
//设置角色攻击类型
Character.prototype.setAttackType = function (type) {
    this.attackType = type;
    this.attackSpecialCount = 0;
}
//设置角色的隐形状态
Character.prototype.setInvisible = function () {
    this.isInvisible = true;
    this.invisibleCount = 0;
}
//人物死亡
Character.prototype.die = function (host) {
    this.isDead = true;
    this.hpTrough.isToDisposed = true;
    this.drawLayer = 2;
    //防止人物死亡之后继续丢雪球
    this.chargeForce = 0;
    if (this.timer != null) {
        clearTimeout(this.timer);
    }
    //播放死亡音效
    game.seHitDead.play();
    //加杀敌分
    game.addScore("ENEMY");
    game.LogList.push(new Log(EVENT_ENEMY_DIE, {
        stage:game.stageNum,
        id:this.id}));
}

//Player.js 玩家精灵类
function Player(imageSource, constructInfo, hpTroughGroup) {
    Character.call(this, imageSource, constructInfo);
    this.characterType = this.CHARACTER_TYPE_PLAYER;
    this.attackType = this.ATTACK_TYPE_NORMAL;
    this.positionX = 600;
    this.positionY = 413;
    this.shadowOffsetX = -2;
    this.shadowOffsetY = 70;
    this.hp = 3000;
    this.MAX_HP = 3000;
    this.INIT_ATTACK = 200;

    this.ckNoDamageAchievement = [false, false, false, false, false, false, false, false];
    this.ckNoDamage = 0;
    this.ckShortTimeAchievement = [false, false, false, false];
    this.ckShortTime = 0;
    this.ckShortTimeCount = 0;
    this.CK_SHORT_TIME_TOTAL_COUNT = 210;    //7s
    hpTroughGroup.add(this.hpTrough);
}
Player.prototype = new Character();
Player.prototype.draw = function () {
    if (!this.isDead) {
        if (this.isInvisible) {
            mainCanvas.globalAlpha = 0.4;
        }
        //画影子
        mainCanvas.drawImage(this.img, 320, 0, this.shadowWidth, this.shadowHeight,
            this.positionX + this.shadowOffsetX, this.positionY + this.shadowOffsetY,
            this.shadowWidth, this.shadowHeight);
        //画人物
        mainCanvas.drawImage(this.img, this.status * this.width, this.characterType * this.height,
            this.width, this.height, this.positionX, this.positionY, this.width, this.height);
        mainCanvas.globalAlpha = 1.0;
    }
    else {
        mainCanvas.drawImage(this.img, 240, 16, 62, 64, this.positionX + 13, this.positionY + 67, 62, 64);
    }
}
Player.prototype.update = function () {
    if (!this.isDead) {
        Character.prototype.update.call(this);
        if (game.isMouseOnPlayer) {
            game.selectedRing.setPosition(new Point(game.player.positionX, game.player.positionY));
        }
        //连杀逻辑更新，记录一段时间内的连杀个数
        if (this.ckShortTime > 0) {
            if (this.ckShortTimeCount < this.CK_SHORT_TIME_TOTAL_COUNT) {
                this.ckShortTimeCount++;
            }
            else {
                this.ckShortTime = 0;
                this.ckShortTimeCount = 0;
                this.ckShortTimeAchievement = [false, false, false, false];
            }
        }
    }
}
Player.prototype.die = function () {
    this.isDead = true;
    this.drawLayer = 2;
    //播放死亡音效
    game.seHitDead.play();
    game.LogList.push(new Log(EVENT_PLAYER_DIE, {
        stage:game.stageNum,
        id:this.id}));
};


//Enemy.js 敌人精灵类
function Enemy(imageSource, constructInfo, hpTroughGroup) {
    Character.call(this, imageSource, constructInfo);
    this.ACTION_TYPE_STOP = 0;
    this.ACTION_TYPE_ATTACK = 1;
    this.ACTION_TYPE_MOVE = 2;

    this.NO_DAMAGE_ACHIEVEMENT_LIST = ["KillingSpree", "Domanating", "MegaKill",
        "Unstoppable", "WickedSick", "MonsterKill", "GodLike", "HolyShit"];
    this.NO_DAMAGE_ACHIEVEMENT_CHN_LIST = ["大杀特杀", "主宰比赛", "杀人如麻",
        "无人能挡", "变态杀戮", "如同妖怪一般", "如同神一般", "超越神的存在"];
    this.SHORT_TIME_ACHIEVEMENT_LIST = ["DoubleKill", "TripleKill", "UltraKill", "Rampage"];
    this.SHORT_TIME_ACHIEVEMENT_CHN_LIST = ["双杀", "三杀", "四杀", "暴走"];

    this.aiLevel = 1;
    this.attackLevel = constructInfo.attackLevel;
    this.moveSpeedLevel = constructInfo.moveSpeedLevel;
    this.snowballSpeedLevel = constructInfo.snowballSpeedLevel;
    this.hp = this.MAX_HP = constructInfo.MAX_HP;

    this.characterType = this.CHARACTER_TYPE_ENEMY;
    this.positionX = constructInfo.startPosition.x;
    this.positionY = constructInfo.startPosition.y;
    this.shadowOffsetX = 4;
    this.shadowOffsetY = 72;

    this.jumpDy = 10;
    this.jumpCount = 0;
    this.JUMP_TOTAL_COUNT = 21;

    this.timer = null;
    this.isDoingAction = false;
    hpTroughGroup.add(this.hpTrough);
}
Enemy.prototype = new Character();
Enemy.prototype.draw = function () {
    if (!game.isGameOver) {
        if (!this.isDead) {
            //冰冻状态
            if (this.isFrozen) {
                mainCanvas.drawImage(this.img, 321, 80, 64, 76,
                    this.positionX - 15, this.positionY + 7, 64, 76);
            }
            //正常状态
            else {
                mainCanvas.drawImage(this.img, 320, 0, this.shadowWidth, this.shadowHeight,
                    this.positionX + this.shadowOffsetX, this.positionY + this.shadowOffsetY,
                    this.shadowWidth, this.shadowHeight);
                mainCanvas.drawImage(this.img, this.status * this.width, this.characterType * this.height,
                    this.width, this.height, this.positionX, this.positionY, this.width, this.height);
            }
            //叠加中毒效果
            if (this.isPoisoning) {
                mainCanvas.drawImage(this.img, 6 * this.width, 160, this.width, this.height,
                    this.positionX, this.positionY, this.width, this.height);
                mainCanvas.drawImage(this.img, 320, 0, this.shadowWidth, this.shadowHeight,
                    this.positionX + this.shadowOffsetX, this.positionY + this.shadowOffsetY,
                    this.shadowWidth, this.shadowHeight);
            }
        }
        //人物死亡状态
        else {
            mainCanvas.drawImage(this.img, 241, 80, 64, 78, this.positionX - 36, this.positionY + 2, 64, 78);
        }
    }
    //游戏结束状态
    else {
        mainCanvas.drawImage(this.img, this.status * this.width, this.characterType * this.height, this.width, this.height, this.positionX, this.positionY, this.width, this.height);
    }
};
Enemy.prototype.update = function () {
    if (!this.isDead) {
        Character.prototype.update.call(this);
        if (!this.isDoingAction) {
            this.setNewAction();
        }
        if (game.isGameOver) {
            this.status = this.STATUS_STAND;
            if (this.jumpCount < this.JUMP_TOTAL_COUNT) {
                this.positionY -= this.jumpDy;
                this.jumpDy--;
                this.jumpCount++;
            }
            else {
                this.jumpCount = 0;
                this.jumpDy = 10;
            }
        }
    }
};
Enemy.prototype.moveTo = function (targetPoint) {
    var OFFSET = 40;
    if (targetPoint.x < this.width / 2) {
        targetPoint.x = Math.floor(Math.random() * OFFSET);
        targetPoint.y += Math.floor(Math.random() * OFFSET);
    }
    if (targetPoint.y < this.height) {
        targetPoint.y = Math.floor(Math.random() * OFFSET);
        targetPoint.x += Math.floor(Math.random() * OFFSET);
    }
    while (targetPoint.y > -0.75 * targetPoint.x + SCREEN_HEIGHT - OFFSET) {
        var d = Math.floor(Math.random() * OFFSET + 20);
        targetPoint.x -= d * 0.8;
        targetPoint.y -= d * 0.6;
    }
    if (targetPoint.x < this.width / 2 || targetPoint.y < this.height
        || targetPoint.y > -0.75 * targetPoint.x + SCREEN_HEIGHT - OFFSET) {
        targetPoint.x = this.positionX + this.width / 2;
        targetPoint.y = this.positionY + this.height;
    }
    Character.prototype.moveTo.call(this, targetPoint);
};
Enemy.prototype.setNewAction = function () {
    if (this.isRigidity) return;
    this.getAIFunc(this.aiLevel)(this);

    //动作开关关闭
    this.isDoingAction = true;
};
Enemy.prototype.die = function (host) {
    Character.prototype.die.call(this, host);

    //无伤连杀音效
    var index_cknd = (++host.ckNoDamage) - 3;
    if (index_cknd > 7) index_cknd = 7;
    if (index_cknd >= 0 && !host.ckNoDamageAchievement[index_cknd]) {
        host.ckNoDamageAchievement[index_cknd] = true;
        switch (host.ckNoDamage) {
            case 3:
                game.seKillingSpree.play();
                break;
            case 4:
                game.seDominating.play();
                break;
            case 5:
                game.seMegaKill.play();
                break;
            case 6:
                game.seUnstoppable.play();
                break;
            case 7:
                game.seWickedSick.play();
                break;
            case 8:
                game.seMonsterKill.play();
                break;
            case 9:
                game.seGodLike.play();
                break;
            default :
                host.ckNoDamageAchievement[7] = false;
                game.seHolyShit.play();
                break;
        }
        var score = [200, 300, 450, 650, 900, 1200, 1600, 2000];
        game.addScore("ACHIEVEMENT", this.NO_DAMAGE_ACHIEVEMENT_LIST[index_cknd]);
        game.spriteGroup.add(new AchievementBoard(IMAGE_RESOURCE_URL[WIDGET_IMAGE_PATH],
            this.NO_DAMAGE_ACHIEVEMENT_CHN_LIST[index_cknd],
            game.stageClass, score[index_cknd]));
        game.LogList.push(new Log(EVENT_ACHIEVEMENT, {
            stage:game.stageNum,
            type:this.NO_DAMAGE_ACHIEVEMENT_LIST[index_cknd]}));
        //禁止同时获得两个成就
        return;
    }

    //短时间连杀音效
    var index_ckst = (++host.ckShortTime) - 2;
    if (index_ckst > 3) index_cknd = 3;
    if (index_ckst >= 0 && index_ckst <= 3 && !host.ckShortTimeAchievement[index_ckst]) {
        host.ckShortTimeCount = 0;
        host.ckShortTimeAchievement[index_ckst] = true;
        switch (host.ckShortTime) {
            case 2:
                game.seDoubleKill.play();
                break;
            case 3:
                game.seTripleKill.play();
                break;
            case 4:
                game.seUltraKill.play();
                break;
            default :
                host.ckShortTimeAchievement[3] = false;
                game.seRampage.play();
                break;
        }
        var score = [500, 750, 1000, 1250];
        game.addScore("ACHIEVEMENT", this.SHORT_TIME_ACHIEVEMENT_LIST[index_ckst]);
        game.spriteGroup.add(new AchievementBoard(IMAGE_RESOURCE_URL[WIDGET_IMAGE_PATH],
            this.SHORT_TIME_ACHIEVEMENT_CHN_LIST[index_ckst],
            game.stageClass, score[index_ckst]));
        game.LogList.push(new Log(EVENT_ACHIEVEMENT, {
            stage:game.stageNum,
            type:this.SHORT_TIME_ACHIEVEMENT_LIST[index_ckst]}));

    }
};


//Snowball.js 雪球精灵类
function Snowball(imageSource, constructInfo) {
    DynamicSprite.call(this, imageSource);

    this.width = 20;
    this.height = 20;
    this.positionX = constructInfo.positionX;
    this.positionY = constructInfo.positionY;
    this.drawLayer = 6;
    this.shadowX = this.positionX - 6;
    this.shadowY = this.positionY + 53;
    this.shadowHeight = 12;
    //雪球半径
    this.radius = 10;
    //雪球初始蓄力大小（影响飞行距离）
    this.force = constructInfo.force;
    //雪球是否飞向敌人（若为false则飞向玩家）
    this.directionToEnemy = constructInfo.directionToEnemy;
    //雪球投掷者的引用
    this.host = constructInfo.host;
    //雪球属性
    this.attackType = this.host.attackType;
    //雪球位移增量
    var _snowballSpeed = (this.host.snowballSpeedLevel - 1) * this.host.SNOWBALL_SPEED_FACTOR
        + this.host.SNOWBALL_INIT_SPEED + this.force * 0.1;
    this.moveDx = _snowballSpeed * 0.8 * (this.directionToEnemy ? -1 : 1);
    this.moveDy = _snowballSpeed * 0.6 * (this.directionToEnemy ? -1 : 1);
    //雪球阴影位移增量
    this.shadowMoveDx = this.moveDx;
    this.shadowMoveDy = this.moveDy;
    //雪球是否下落
    this.isFalling = true;

    //飞行和下落过程的计数变量
    this.flyCount = 0;
    this.flyTotalCount = this.force / 5 * 3;
    this.fallingCount = 0;
    this.fallingTotalCount = 3;
}
Snowball.prototype = new DynamicSprite();
Snowball.prototype.draw = function () {
    if (this.attackType == this.host.ATTACK_TYPE_FIRE) {
        mainCanvas.drawImage(this.img, 100, 27, 43, 43,
            this.positionX, this.positionY, 43, 43);
    }
    else {
        mainCanvas.drawImage(this.img, this.attackType * this.width, 0, this.width,
            this.height, this.positionX, this.positionY, this.width, this.height);
    }
    mainCanvas.drawImage(this.img, 0, 20, this.width, this.shadowHeight,
        this.shadowX, this.shadowY, this.width, this.shadowHeight);
};
Snowball.prototype.update = function () {
    //飞出屏幕之外或下落完毕即销毁
    if (this.positionX + this.width < 0 || this.positionX > SCREEN_WIDTH
        || this.positionY + this.height < 0 || this.positionY > SCREEN_HEIGHT
        || (this.isFalling && this.fallingCount > this.fallingTotalCount)) {
        //判断爆炸效果
        if (this.host.attackType == this.host.ATTACK_TYPE_FIRE) {
            var hitPoint = (this.host.attackLevel - 1) * this.host.ATTACK_FACTOR + this.host.INIT_ATTACK;
            this.explode({hitEnemy:null, hitPoint:hitPoint});
        }
        this.isToDisposed = true;
    }
    else {
        //雪球平飞过程
        if (this.flyCount < this.flyTotalCount) {
            this.flyCount++;
        }
        //当飞行距离达到一定程度是雪球即开始下落
        else if (!this.isFalling) {
            this.moveDy = 0;
            this.isFalling = true;
        }
        //雪球下落逻辑
        else {
            this.moveDy += 3;
            this.fallingCount++;
        }
        this.positionX += this.moveDx;
        this.positionY += this.moveDy;
        this.shadowX += this.shadowMoveDx;
        this.shadowY += this.shadowMoveDy;
        //雪球与敌人碰撞检测
        this.collisionDetect(game.player, game.enemyGroup.group);
    }
};
Snowball.prototype.explode = function (explodeInfo) {
    game.spriteGroup.add(new ExplosionEffect(IMAGE_RESOURCE_URL[EXPLOSION_IMAGE_PATH],
        new Point(this.positionX, this.positionY)));
    var enemies = game.enemyGroup.group;
    //雪球接触点坐标
    var sx = Math.floor(this.positionX + this.radius);
    var sy = Math.floor(this.positionY + this.radius);
    //爆炸半径
    var effectRadius = 60;
    //敌人的判断点
    var ex = 0;
    var ey = 0;
    for (var i in enemies) {
        var checkEnemy = enemies[i];
        //雪球坠地没有打中敌人的情况
        if (explodeInfo.hitEnemy == null) {
            ex = Math.floor(checkEnemy.positionX + checkEnemy.width / 2);
            ey = Math.floor(checkEnemy.positionY + checkEnemy.height);
        }
        //打中敌人的情况
        else if (checkEnemy != explodeInfo.hitEnemy) {
            ex = Math.floor(checkEnemy.positionX + explodeInfo.referenceOffsetX);
            ey = Math.floor(checkEnemy.positionY + explodeInfo.referenceOffsetY);
        }
        else {
//            checkEnemy.beHit(explodeInfo.hitPoint / 2, this.host);
            continue;
        }
        //爆炸效果：弹开敌人
        var d = Math.sqrt((sx - ex) * (sx - ex) + (sy - ey) * (sy - ey));
        if (!checkEnemy.isDead && d < effectRadius) {
            var sita = Math.atan2(ey - sy, ex - sx);
            var dx = effectRadius * 5 / d * Math.cos(sita);
            var dy = effectRadius * 5 / d * Math.sin(sita);
            if (dx > effectRadius * 0.7) dx = effectRadius * 0.7;
            if (dy > effectRadius * 0.7) dy = effectRadius * 0.7;
            checkEnemy.moveDx = Math.floor(dx);
            checkEnemy.moveDy = Math.floor(dy) / 2;
            checkEnemy.isMoving = true;
            checkEnemy.tickCount = 0;
            checkEnemy.TOTAL_COUNT = 5;
            checkEnemy.hp -= explodeInfo.hitPoint / 2;
            if (checkEnemy.hp <= 0) {
                checkEnemy.die(this.host);
            }
        }
    }
    game.seExplosion.play();
};
//雪球与人的碰撞检测及相关处理方法
Snowball.prototype.collisionDetect = function (player, enemies) {
    //雪球与人的碰撞检测算法
    var checkHit = function (snowball, checkRole) {
        var ox = snowball.positionX + snowball.radius;
        var oy = snowball.positionY + snowball.radius;
        var rx = checkRole.positionX + 10;
        var ry = checkRole.positionY + 10;
        var rw = checkRole.width - 20;
        var rh = checkRole.height - 20;
        return (ox > rx && ox < rx + rw && oy > ry && oy < ry + rh);
    }

    //雪球的发射者是玩家的情况
    if (this.host == player) {
        //遍历每一个敌人
        for (var i in enemies) {
            //如果敌人不为null且敌人未死亡
            if (enemies[i] != null && !enemies[i].isDead && checkHit(this, enemies[i])) {
                //球与敌人碰撞的处理方法
                var hitPoint = (this.host.attackLevel - 1) * this.host.ATTACK_FACTOR + this.host.INIT_ATTACK;
                enemies[i].beHit(hitPoint, this.host);
                //判断爆炸效果
                if (this.host.attackType == this.host.ATTACK_TYPE_FIRE) {
                    this.explode({hitEnemy:enemies[i],
                        hitPoint:hitPoint,
                        referenceOffsetX:this.positionX + this.radius - enemies[i].positionX,
                        referenceOffsetY:this.positionY + this.radius - enemies[i].positionY});
                }
                this.isToDisposed = true;
            }
        }
    }
    //雪球的发射者是敌人的情况
    else {
        //球与玩家碰撞的处理方法
        if (!player.isDead && !player.isInvisible && checkHit(this, player)) {
            player.beHit((this.host.attackLevel - 1) *
                this.host.ATTACK_FACTOR + this.host.INIT_ATTACK, this.host);
            player.ckNoDamage = 0;
            this.isToDisposed = true;
        }
    }
};

//RoleGroup.js 角色集合类（有玩家角色和敌人角色两种）
function RoleGroup(groupType) {
    this.group = new Array();
    this.groupType = groupType;
    this.drawLayer = 0;
    switch (this.groupType) {
        case "Item":
            this.drawLayer = 4;
            break;
        case "HpTrough":
            this.drawLayer = 7;
            break;
        case "Enemy":
            this.drawLayer = 5;
            break;
    }
}
RoleGroup.prototype.draw = function () {
    for (i in this.group) {
        if (this.group[i] != null) {
            this.group[i].draw();
        }
    }
};
RoleGroup.prototype.update = function () {
    for (var i in this.group) {
        if (this.group[i] != null) {
            this.group[i].update();
        }
        if (this.group[i].isToDisposed) {
            this.group.splice(i, 1);
        }
    }
    if (this.groupType == "Enemy") {
        this.group.sort(function (enemyA, enemyB) {
            if (enemyA.positionY > enemyB.positionY)
                return 1;
            else if (enemyA.positionY == enemyB.positionY)
                return 0;
            else return -1;
        });
    }
    this.group.sort(function (spriteA, spriteB) {
        return spriteA.drawLayer - spriteB.drawLayer;
    });
};
RoleGroup.prototype.add = function (role) {
    this.group.push(role);
};
RoleGroup.prototype.clear = function () {
    this.group.splice(0);
};
