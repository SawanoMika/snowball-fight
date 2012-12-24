Enemy.prototype.getAIFunc = function (aiLevel) {
    var aiFuncList = [
        //初级AI
        function (_this) {
            var actionType = 0;
            //若被冰冻则总是停止
            if (_this.isFrozen) {
                actionType = _this.ACTION_TYPE_STOP;
            }
            //随机行为产生器
            else {
                var r = Math.random();
                if (r < 0.1) {
                    actionType = _this.ACTION_TYPE_STOP;
                }
                else if (r < 0.6) {
                    actionType = _this.ACTION_TYPE_ATTACK;
                }
                else {
                    actionType = _this.ACTION_TYPE_MOVE;
                }
            }
//            actionType = _this.ACTION_TYPE_STOP;
            switch (actionType) {
                case _this.ACTION_TYPE_STOP:
                    //随机停止0.5~3.5秒
                    _this.timer = setTimeout((function () {
                        _this.isDoingAction = false;
                    }).bind(_this), Math.floor(Math.random() * 2000) + 200);
                    break;
                case _this.ACTION_TYPE_ATTACK:
                    _this.timer = setTimeout((function () {
                        _this.startForce();
                        setTimeout((function () {
                            _this.endForce(Math.random() * 50 + 40);
                        }).bind(_this), Math.floor(Math.random() * 2000) + 400);
                    }).bind(_this), Math.floor(Math.random() * 400) + 200);
                    break;
                case _this.ACTION_TYPE_MOVE:
                    var range = Math.floor(Math.random() * 10 + 10);
                    var sita = Math.random() * 2 * Math.PI;
                    var tx = _this.positionX + _this.width / 2 + range * Math.cos(sita);
                    var ty = _this.positionY + _this.height + range * Math.sin(sita);
                    //目标是非法地点的情况，则重新计算
                    while (tx < _this.width / 2 || ty < _this.height || ty > -0.75 * tx + SCREEN_HEIGHT-80) {
                        range = Math.floor(Math.random() * 10 + 10);
                        sita = Math.random() * 2 * Math.PI;
                        tx = _this.positionX + _this.width / 2 + range * Math.cos(sita);
                        ty = _this.positionY + _this.height + range * Math.sin(sita);
                    }
                    Character.prototype.moveTo.call(_this, new Point(tx, ty));
                    break;
            }
        },

        //中级AI
        function (_this) {
            var actionType = 0;
//            若被冰冻则总是停止
            if (_this.isFrozen) {
                actionType = _this.ACTION_TYPE_STOP;
            }
            //随机行为产生器
            else {
                var r = Math.random();
                if (r < 0.1) {
                    actionType = _this.ACTION_TYPE_STOP;
                }
                else if (r < 0.6) {
                    actionType = _this.ACTION_TYPE_ATTACK;
                }
                else {
                    actionType = _this.ACTION_TYPE_MOVE;
                }
            }
//            actionType = _this.ACTION_TYPE_MOVE;
            switch (actionType) {
                case _this.ACTION_TYPE_STOP:
                    //随机停止0.5~3.5秒
                    _this.timer = setTimeout((function () {
                        _this.isDoingAction = false;
                    }).bind(_this), Math.floor(Math.random() * 2000) + 500);
                    break;
                case _this.ACTION_TYPE_ATTACK:
//                    var dx = game.player.positionX - _this.positionX;
//                    var dy = game.player.positionY - _this.positionY;
                    _this.timer = setTimeout((function () {
//                        var d = Math.sqrt(dx * dx + dy * dy);
                        _this.startForce();
                        setTimeout((function () {
                            _this.endForce(Math.floor(Math.random() * 60) + 40);
                        }).bind(_this), Math.floor(Math.random() * 2000) + 400);
                    }).bind(_this), Math.floor(Math.random() * 400 + 200));
                    break;
                case _this.ACTION_TYPE_MOVE:
                    var playerX = Math.floor(game.player.positionX + game.player.width / 2);
                    var playerY = Math.floor(game.player.positionY + game.player.height);
                    var enemyX = Math.floor(_this.positionX + _this.width / 2);
                    var enemyY = Math.floor(_this.positionY + _this.height);
                    //D1为前后修正参数,D2为水平修正参数
                    var D1 = Math.floor(Math.random() * 50 - 20);
                    var D2 = 16;
                    var targetX = Math.floor((4 * (enemyY - playerY) + 3 * (playerX + enemyX)) / 6
                        + D1 * 0.8 - D2 *0.8);
                    var targetY = Math.floor((4 * (playerY + enemyY) + 3 * (enemyX - playerX)) / 8
                        + D1 * 0.6+D2*0.8);
                    if (targetX > 0 && targetY < _this.height) {
                        targetY = Math.floor(_this.height + 1);
                    }
                    if (targetX < _this.width/2 && targetY > 0) {
                        targetX = Math.floor(_this.width/2 + 1);
                    }
                    if (targetY > -0.75 * targetX + SCREEN_HEIGHT - 80) {
                        targetX = enemyX;
                        targetY = enemyY;
                    }
                    _this.moveTo.call(_this, new Point(targetX, targetY));

                    break;

            }
        }
    ];
    return aiFuncList[aiLevel];
};