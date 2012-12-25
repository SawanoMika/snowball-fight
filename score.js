var getCalcFunc = function () {
    var EVENT_ENEMY_DIE = 0;
    var EVENT_ACHIEVEMENT = 1;
    var EVENT_GET_ITEM = 2;
    var EVENT_PLAYER_DIE = 3;
    var __ACHIEVEMENT_LIST = ["KillingSpree", "Dominating", "MegaKill",
        "Unstoppable", "WickedSick", "MonsterKill", "GodLike", "HolyShit",
        "DoubleKill", "TripleKill", "UltraKill", "Rampage"];
    var __ACHIEVEMENT_SCORE = [200, 300, 450, 650, 900, 1200, 1600, 2000, 500, 750, 1000, 1250];
    var __ITEM_LIST = ["Invisible", "Fire", "Frozen", "Poison",
        "HpPotion", "AttackUp", "MoveSpeedUp", "SnowballSpeedUp"];
    var __ITEM_SCORE = [200, 300, 300, 300, 0, 0, 200, 200, 200];
    var __ENEMY_STEP_SCORE = 50;
    var __BASE_ENEMY_SCORE = 200;

    var Log = function (event, info) {
        this.time = new Date().getTime();
        this.event = event;
        this.info = info;
    };

    return function (logList) {
        var score = 0;
        for (var i in logList) {
            var log = logList[i];
            var info = log.info;
            switch (log.event) {
                case EVENT_ENEMY_DIE:
                    score += info.stage * __ENEMY_STEP_SCORE + __BASE_ENEMY_SCORE;
                    break;
                case EVENT_ACHIEVEMENT:
                    score += __ACHIEVEMENT_SCORE[__ACHIEVEMENT_LIST.indexOf(info.type)];
                    break;
                case EVENT_GET_ITEM:
                    score += __ITEM_SCORE[__ITEM_LIST.indexOf(info.item)];
                    break;
            }
        }
        return score;
    };
};

this.calcScore = getCalcFunc();