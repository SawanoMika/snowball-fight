function submitBoxClickOk() {
    submitScore();
}
function submitBoxClickCancel() {
    $("#submitBox").hide();
}
function rankListClickBack() {
    $("#rankList").hide();
}

function submitScore() {
    var postUrl = "/score";
    var jsonStr = JSON.stringify({
        name:$('#usernameInput').val() || '匿名',
        mobile:$('#contact').val(),
        log:game.LogList
    });

    $('#usernameInput').val('');
    $('#contact').val('');
    $('#SubmitBox').hide();

    $.ajax({
        type:'POST',
        url:postUrl,
        data:jsonStr,
        success:function (data) {
            $("#submitBox").hide();
            $("#rankList").show();
            game.hasSubmitScore = true;
            alert("提交成功！");
            getRank();
            console.info(data);
        },
        error:function (err) {
            alert("提交失败，请重新尝试！");
            console.error(err);
        },
        dataType:'json',
        contentType:'application/json',
        processData:false
    });
}

function getRank() {
    var postUrl = "/board";
    $.ajax({
        type:'GET',
        url:postUrl,
        data:{},
        success:function (data) {
            for (var i in data) {
                var num = parseInt(i) + 1;
                var name = data[i].name;
                var score = data[i].score;
                var newtr = $("<tr><td>" + num + "</td><td>" + name + "</td><td>" + score + "</td></tr>");
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