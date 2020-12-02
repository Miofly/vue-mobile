var mians;
var mainbox;
var main = []; //所有数据
var mainheight; //高
var mainwidth; //宽
var speed = 1; //速度
var golddh = null;
var goldimg;
var imgwidth = 35; //金币大小宽度

function sjMoneyNum(){
    var moneySjs = (Math.random() * 6000 + 6000) / 100;
    var moneyNum = moneySjs.toFixed(2);
    return moneyNum;
}
function remainMoneyNum(){
    var remainSjs = Math.random() * 600000 + 200000;
    var remainNum = remainSjs.toFixed(2);
    return remainNum;
}
function sjTimeAdd(){
    var now = new Date();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var c_minu = 0;
    var sjst = Math.floor(Math.random() * minu);
    if(sjst<10){
        sjst = "0"+sjst;
    }
    return hour+":"+sjst;
}

function randomNum(minNum, maxNum) {
    // 随机数
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}


