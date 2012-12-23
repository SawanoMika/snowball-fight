function submitScore() {
    var postUrl = "/score";
    var jsonStr = JSON.stringify({
        name: $('#usernameInput').val() || '匿名',
        mobile: $('#contact').val(),
        log: game.LogList
    });

    $('#usernameInput').val('');
    $('#contact').val('');
    $('#SubmitBox').hide();

    $.ajax({
        type: 'POST',
        url: postUrl,
        data: jsonStr,
        success: function (data) { console.info(data); },
        error: function (err) { console.error(err); },
        dataType: 'json',
        contentType: 'application/json',
        processData: false
    });
}