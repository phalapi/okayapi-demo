
function verifyCaptcha() {
    var code = $("#input_verifycode_str").val();
    if (code == undefined || code.length == 0) {
        alert("请先输入验证码~~");
        return;
    }

    var params = {
        s: 'App.Captcha.Verify',
        captcha_id: window.captcha_id,
        captcha_code: code
    }

    $.ajax({
        url: '/okayapi.php',
        dataType: 'json',
        data: params
    }).done(function (rs) {
        if (rs.data && rs.data.err_code == 0) {
            alert("恭喜，验证码正确！");
        } else {
            alert("验证码错误！错误信息：" + rs.data.err_msg);
            console.log(rs.data.err_msg)
        }
    });
}

function createCaptcha() {
    var params = {
        s: 'App.Captcha.Create',
        return_format: 'data'
    }
    $.ajax({
        url: '/okayapi.php',
        dataType: 'json',
        data: params
    }).done(function (rs) {
        if (rs.data && rs.data.err_code == 0) {
            $("#verifycode_img").attr("src", "data:image/gif;base64," + rs.data.captcha_img);

            window.captcha_id = rs.data.captcha_id;
        } else {
            console.log(rs.data.err_msg)
        }
    });
}

$(createCaptcha());
