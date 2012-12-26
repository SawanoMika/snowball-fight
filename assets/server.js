function submitBoxClickOk() {
    if (!game.hasSubmitScore) {
        submitScore();
    }
}

function submitBoxClickCancel() {
    $("#submitBox").hide();
}

function rankListClickBack() {
    $("#rankList").hide();
}

var userInfo;

function submitScore() {
    //锁定用户提交，在提交失败的时候解锁
    game.hasSubmitScore = true;
    //本地用户信息
    userInfo = {
        name:$('#usernameInput').val(),
        score:game.gameScore
    };
    //
    var postUrl = "/score";
    var jsonStr = JSON.stringify({
        name:$('#usernameInput').val() || '匿名',
        mobile:$('#contact').val(),
        log:game.LogList
    });
    $.ajax({
        type:'POST',
        url:postUrl,
        data:jsonStr,
        success:function (data) {
            $("#submitBox").hide();
            $("#rankList").show();
            alert("提交成功！");

            //清空排行榜，显示用户就近排名
            $("#rankTable").empty();
            $("#rankTable").append("<tr><th>排名</th><th>昵称</th><th>得分</th></tr>");
            var appendList = [];
            var surrounding = data.surrounding;
            var userIndex = 0;
            //查找用户的索引
            for (var i in surrounding) {
                if (surrounding[i].rank == data.rank) {
                    userIndex = parseInt(i);
                    break;
                }
            }
            //加入用户本身
            appendList.push(surrounding[userIndex]);
            //查找用户前面四名
            var leftIndex = userIndex - 1;
            while (leftIndex >= 0 && appendList.length < 5) {
                appendList.push(surrounding[leftIndex]);
                leftIndex--;
            }
            appendList.reverse();
            var rightIndex = userIndex + 1;
            while (rightIndex < surrounding.length && appendList.length < 10) {
                appendList.push(surrounding[rightIndex]);
                rightIndex++;
            }
            for (var i in appendList) {
                var rank = appendList[i].rank;
                var name = appendList[i].name;
                var score = appendList[i].score;
                var newtr;
                if (rank == data.rank) {
                    newtr = $("<tr><td><font color='#3399FF'>" + rank +
                        "</td><td><font color='#3399FF'>" + name +
                        "</td><td><font color='#3399FF'>" + score + "</td></tr>");
                }
                else {
                    newtr = $("<tr><td>" + rank +
                        "</td><td>" + name +
                        "</td><td>" + score + "</td></tr>");
                }
                $("#rankTable").append(newtr);
            }
            console.info(data);
        },
        error:function (err) {
            alert("提交失败，请重新尝试！");
            game.hasSubmitScore = false;
            console.error(err);
        },
        dataType:'json',
        contentType:'application/json',
        processData:false
    });
}

//获取
function getTop10() {
    var postUrl = "/board";
    $.ajax({
        type:'GET',
        url:postUrl,
        data:{},
        success:function (data) {
            for (var i in data[i]) {
                var rank = parseInt(i) + 1;
                var name = data[i].name;
                var score = data[i].score;
                var newtr;
                if (rank == data[i].rank) {
                    newtr = $("<tr><td><font color='#3399FF'>" + rank +
                        "</td><td><font color='#3399FF'>" + name +
                        "</td><td><font color='#3399FF'>" + score + "</td></tr>");
                }
                else {
                    newtr = $("<tr><td>" + rank +
                        "</td><td>" + name +
                        "</td><td>" + score + "</td></tr>");
                }
                $("#rankTable").append(newtr);
            }
            console.info(data);
        },
        error:function (err) {
            //alert("获取排行榜失败！");
            console.error(err);
        },
        dataType:'json',
        contentType:'application/json',
        processData:false
    });
}