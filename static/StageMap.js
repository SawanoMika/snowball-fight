function Point(x, y) {
    this.y = y;
    this.x = x;
}

function EnemyAction(type, actionInfo) {
    this.type = type || "stop";
    this.duration = actionInfo.duration || 10000;
    this.endPosition = actionInfo.endPosition || new Point(0, 0);
    this.startPosition = actionInfo.startPosition || new Point(0, 0);
    this.bulletCount = actionInfo.bulletCount || 0;
    this.interval = actionInfo.interval;
    this.acceleration = actionInfo.acceleration;
    this.v0 = actionInfo.v0 || 0;
}

var StageInfo = new Array(999);
StageInfo[0] = [
    {aiLevel:0, startPosition:new Point(70, 141), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1000},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1000},
    {aiLevel:0, startPosition:new Point(341, 34), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1000}
];
StageInfo[1] = [
    {aiLevel:0, startPosition:new Point(290, 147), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1000},
    {aiLevel:0, startPosition:new Point(340, 47), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1000},
    {aiLevel:0, startPosition:new Point(119, 174), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1250}
];
StageInfo[2] = [
    {aiLevel:0, startPosition:new Point(40, 121), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:2, MAX_HP:1250},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1250},
    {aiLevel:0, startPosition:new Point(341, 34), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500}
];
StageInfo[3] = [
    {aiLevel:1, startPosition:new Point(70, 141), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1250},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(341, 44), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(241, 34), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:2, MAX_HP:1500}
];
StageInfo[4] = [
    {aiLevel:1, startPosition:new Point(50, 41), attackLevel:1, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(341, 130), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(241, 34), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:2, MAX_HP:1500}
];
StageInfo[5] = [
    {aiLevel:1, startPosition:new Point(70, 141), attackLevel:1, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(341, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(141, 14), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750}
];
StageInfo[6] = [
    {aiLevel:1, startPosition:new Point(170, 41), attackLevel:1, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(150, 158), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:1, startPosition:new Point(341, 256), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(41, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750}
];
//5
StageInfo[7] = [
    {aiLevel:0, startPosition:new Point(70, 141), attackLevel:1, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:1, startPosition:new Point(50, 358), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(241, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750}
];
StageInfo[8] = [
    {aiLevel:0, startPosition:new Point(241, 41), attackLevel:1, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:1, startPosition:new Point(50, 388), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:2, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(70, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750}
];
StageInfo[9] = [
    {aiLevel:1, startPosition:new Point(70, 341), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1500},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(150, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(241, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750}
];
StageInfo[10] = [
    {aiLevel:0, startPosition:new Point(70, 241), attackLevel:2, moveSpeedLevel:1, snowballSpeedLevel:1, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(320, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:1, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(141, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(241, 334), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750}
];
StageInfo[11] = [
    {aiLevel:1, startPosition:new Point(241, 70), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(70, 141), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(341, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(141, 255), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750}
];
//6
StageInfo[12] = [
    {aiLevel:1, startPosition:new Point(70, 141), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(170, 41), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(70, 141), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(380, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(41, 455), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000}
];

StageInfo[13] = [
    {aiLevel:1, startPosition:new Point(90, 441), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(50, 58), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(141, 34), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(381, 134), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(441, 55), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000}
];
StageInfo[14] = [
    {aiLevel:1, startPosition:new Point(441, 110), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(141, 58), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(50, 26), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(341, 34), attackLevel:2, moveSpeedLevel:3, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(241, 214), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(241, 295), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:2, MAX_HP:2000}
];
StageInfo[15] = [
    {aiLevel:1, startPosition:new Point(470, 68), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(170, 141), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:1750},
    {aiLevel:0, startPosition:new Point(299, 58), attackLevel:2, moveSpeedLevel:3, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(41, 380), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(141, 34), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(229, 95), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2000}
];
StageInfo[16] = [
    {aiLevel:1, startPosition:new Point(50, 111), attackLevel:2, moveSpeedLevel:3, snowballSpeedLevel:2, MAX_HP:1750},
    {aiLevel:1, startPosition:new Point(256, 191), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(169, 288), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(341, 34), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(121, 384), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(241, 55), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2000}
];
StageInfo[17] = [
    {aiLevel:1, startPosition:new Point(90, 141), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(10, 241), attackLevel:2, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(250, 158), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(141, 94), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(41, 430), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2000}
];
//7
StageInfo[18] = [
    {aiLevel:0, startPosition:new Point(51, 421), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(90, 111), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(270, 291), attackLevel:2, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(250, 158), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(341, 214), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(141, 94), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(241, 15), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250}
];
StageInfo[19] = [
    {aiLevel:1, startPosition:new Point(270, 91), attackLevel:2, moveSpeedLevel:2, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(350, 188), attackLevel:3, moveSpeedLevel:2, snowballSpeedLevel:3, MAX_HP:2000},
    {aiLevel:0, startPosition:new Point(45, 134), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:2, MAX_HP:2000},
    {aiLevel:1, startPosition:new Point(241, 234), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:0, startPosition:new Point(441, 34), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:0, startPosition:new Point(141, 296), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:1, startPosition:new Point(191, 155), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250}
];
StageInfo[20] = [
    {aiLevel:1, startPosition:new Point(70, 10), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:1, startPosition:new Point(350, 168), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:0, startPosition:new Point(221, 79), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:0, startPosition:new Point(291, 99), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:1, startPosition:new Point(41, 134), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:0, startPosition:new Point(441, 24), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:0, startPosition:new Point(141, 296), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250}
];
StageInfo[21] = [
    {aiLevel:0, startPosition:new Point(170, 11), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:1, startPosition:new Point(90, 258), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2250},
    {aiLevel:0, startPosition:new Point(290, 58), attackLevel:4, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2500},
    {aiLevel:0, startPosition:new Point(21, 134), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2500},
    {aiLevel:1, startPosition:new Point(121, 64), attackLevel:3, moveSpeedLevel:4, snowballSpeedLevel:3, MAX_HP:2500},
    {aiLevel:0, startPosition:new Point(341, 164), attackLevel:4, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2500},
    {aiLevel:1, startPosition:new Point(241, 95), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:2500}
];
StageInfo[22] = [
    {aiLevel:1, startPosition:new Point(70, 11), attackLevel:3, moveSpeedLevel:4, snowballSpeedLevel:3, MAX_HP:2500},
    {aiLevel:0, startPosition:new Point(250, 198), attackLevel:4, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2500},
    {aiLevel:1, startPosition:new Point(170, 111), attackLevel:3, moveSpeedLevel:3, snowballSpeedLevel:4, MAX_HP:2500},
    {aiLevel:0, startPosition:new Point(41, 334), attackLevel:4, moveSpeedLevel:3, snowballSpeedLevel:3, MAX_HP:2750},
    {aiLevel:1, startPosition:new Point(241, 134), attackLevel:3, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:2750},
    {aiLevel:0, startPosition:new Point(141, 64), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:3, MAX_HP:2750},
    {aiLevel:1, startPosition:new Point(441, 56), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:2750}
];
StageInfo[23] = [
    {aiLevel:1, startPosition:new Point(170, 141), attackLevel:3, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:2750},
    {aiLevel:1, startPosition:new Point(12, 21), attackLevel:4, moveSpeedLevel:3, snowballSpeedLevel:4, MAX_HP:2750},
    {aiLevel:1, startPosition:new Point(250, 198), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:3, MAX_HP:2750},
    {aiLevel:0, startPosition:new Point(341, 234), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3000},
    {aiLevel:0, startPosition:new Point(141, 168), attackLevel:4, moveSpeedLevel:3, snowballSpeedLevel:4, MAX_HP:3000},
    {aiLevel:1, startPosition:new Point(451, 24), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3000},
    {aiLevel:0, startPosition:new Point(241, 255), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3000}
];
StageInfo[24] = [
    {aiLevel:1, startPosition:new Point(266, 41), attackLevel:4, moveSpeedLevel:3, snowballSpeedLevel:4, MAX_HP:3000},
    {aiLevel:0, startPosition:new Point(220, 158), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:3, MAX_HP:3000},
    {aiLevel:0, startPosition:new Point(341, 34), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:3, MAX_HP:3000},
    {aiLevel:1, startPosition:new Point(151, 34), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3000},
    {aiLevel:1, startPosition:new Point(41, 365), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:0, startPosition:new Point(96, 264), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:0, startPosition:new Point(70, 141), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250}
];
//8
StageInfo[25] = [
    {aiLevel:0, startPosition:new Point(70, 34), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:0, startPosition:new Point(141, 94), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:0, startPosition:new Point(41, 64), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:1, startPosition:new Point(50, 388), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:0, startPosition:new Point(241, 234), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:1, startPosition:new Point(270, 291), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250}
];
StageInfo[26] = [
    {aiLevel:0, startPosition:new Point(70, 11), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:1, startPosition:new Point(250, 158), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:0, startPosition:new Point(91, 398), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3250},
    {aiLevel:0, startPosition:new Point(141, 134), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3500},
    {aiLevel:1, startPosition:new Point(41, 64), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3500},
    {aiLevel:0, startPosition:new Point(10, 264), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:3500},
    {aiLevel:0, startPosition:new Point(165, 164), attackLevel:4, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:3500},
    {aiLevel:1, startPosition:new Point(441, 55), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3500}
];
StageInfo[27] = [
    {aiLevel:1, startPosition:new Point(70, 141), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:3500},
    {aiLevel:1, startPosition:new Point(250, 258), attackLevel:4, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:3500},
    {aiLevel:0, startPosition:new Point(91, 398), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3500},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:4, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:3750},
    {aiLevel:0, startPosition:new Point(141, 124), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3750},
    {aiLevel:0, startPosition:new Point(41, 64), attackLevel:4, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:3750},
    {aiLevel:1, startPosition:new Point(41, 164), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:3750},
    {aiLevel:1, startPosition:new Point(441, 55), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:3750}
];
//9
StageInfo[28] = [
    {aiLevel:1, startPosition:new Point(17, 141), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:3750},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3750},
    {aiLevel:1, startPosition:new Point(91, 398), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:4, MAX_HP:3750},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:4, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:3750},
    {aiLevel:0, startPosition:new Point(221, 334), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:4000},
    {aiLevel:1, startPosition:new Point(41, 64), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:4000},
    {aiLevel:1, startPosition:new Point(121, 164), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4000},
    {aiLevel:1, startPosition:new Point(291, 255), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4000},
    {aiLevel:0, startPosition:new Point(141, 94), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4000}
];
StageInfo[29] = [
    {aiLevel:1, startPosition:new Point(70, 141), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:4000},
    {aiLevel:1, startPosition:new Point(250, 158), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:4000},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:4000},
    {aiLevel:0, startPosition:new Point(141, 34), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:4000},
    {aiLevel:1, startPosition:new Point(41, 64), attackLevel:4, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4000},
    {aiLevel:1, startPosition:new Point(12, 164), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4250},
    {aiLevel:1, startPosition:new Point(83, 194), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4250},
    {aiLevel:0, startPosition:new Point(144, 114), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4250},
    {aiLevel:1, startPosition:new Point(145, 94), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4250}
];
StageInfo[30] = [
    {aiLevel:1, startPosition:new Point(70, 341), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:4250},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:4250},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:4250},
    {aiLevel:0, startPosition:new Point(141, 34), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(41, 64), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(212, 164), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4250},
    {aiLevel:1, startPosition:new Point(83, 194), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(194, 114), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(445, 34), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500}
];
StageInfo[31] = [
    {aiLevel:1, startPosition:new Point(70, 341), attackLevel:5, moveSpeedLevel:4, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(341, 74), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:4, MAX_HP:4500},
    {aiLevel:0, startPosition:new Point(141, 34), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(41, 64), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(212, 164), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(83, 194), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(194, 114), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(445, 23), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500}
];
StageInfo[32] = [
    {aiLevel:1, startPosition:new Point(70, 341), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:0, startPosition:new Point(288, 158), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(341, 54), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:0, startPosition:new Point(141, 214), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(21, 64), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(252, 164), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(83, 194), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(194, 114), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:5000},
    {aiLevel:1, startPosition:new Point(445, 34), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:5000}
];
StageInfo[33] = [
    {aiLevel:1, startPosition:new Point(70, 341), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:0, startPosition:new Point(288, 158), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:1, startPosition:new Point(341, 54), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4500},
    {aiLevel:0, startPosition:new Point(141, 214), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(21, 64), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(252, 164), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(83, 194), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(194, 114), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:5000},
    {aiLevel:1, startPosition:new Point(445, 34), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:5000}
];
StageInfo[34] = [
    {aiLevel:1, startPosition:new Point(17, 141), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:0, startPosition:new Point(250, 158), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(91, 398), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(341, 34), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:0, startPosition:new Point(221, 275), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:4750},
    {aiLevel:1, startPosition:new Point(41, 64), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:5000},
    {aiLevel:1, startPosition:new Point(121, 164), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:5000},
    {aiLevel:1, startPosition:new Point(291, 255), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:5000},
    {aiLevel:0, startPosition:new Point(141, 94), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:5000}
];
StageInfo[35] = [
    {aiLevel:1, startPosition:new Point(68, 29), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:1, startPosition:new Point(128, 53), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:0, startPosition:new Point(16, 105), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:1, startPosition:new Point(68, 145), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:1, startPosition:new Point(121, 212), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:1, startPosition:new Point(75, 262), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:0, startPosition:new Point(16, 234), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:0, startPosition:new Point(366, 23), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:0, startPosition:new Point(294, 9), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:0, startPosition:new Point(260, 85), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:0, startPosition:new Point(300, 151), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000},
    {aiLevel:0, startPosition:new Point(366, 138), attackLevel:5, moveSpeedLevel:5, snowballSpeedLevel:5, MAX_HP:10000}
];

for (var i = 36; i < 999; i++) {
    StageInfo[i] = StageInfo[35];
}

