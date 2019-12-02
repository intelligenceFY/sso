var loginName;
var loginPassword;
var warning1 = document.getElementById('pspan1');
var warning2 = document.getElementById('pspan2');

function checkuser() {
    var loginName = document.getElementById('username').value;
    if (loginName == "") {
        warning1.style.color = "red";
        warning1.innerHTML = "用户名不能为空!";
        return false;
    } else {
        warning1.innerHTML = "";
        return true;
    }
}

function checkpsw() {
    var loginPassword = document.getElementById('password').value;
    if (loginPassword == "") {
        warning2.style.color = "red";
        warning2.innerHTML = "密码不能为空!";
        return false;
    } else {
        warning2.innerHTML = "";
        return true;
    }
}

function checkForm() {
    if (checkuser() && checkpsw()) {
        ajax();
    } else if (!checkuser()) {
        checkuser();
    } else if (!checkpsw()) {
        checkpsw();
    } else {
        checkpsw();
        checkuser();
    }
}


function ajax() {
    loginName = document.getElementById('username').value;
    loginPassword = document.getElementById('password').value;
    console.log(loginName);
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://172.33.6.116:8080/login',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,

        data: {
            "loginName": loginName,
            "loginPassword": loginPassword,
        },

        success: function(json) {
            var info = json.data;
            if (json.code == 1) {      
                alert(json.code);         
                console.log(json.data);
                sessionStorage.setItem('ticketToken', info.ticketToken); 
                window.location.href = 'personal_center.html';

            } else if (json.code == 2) {

                warning1.style.color = "red";
                warning1.innerHTML = json.msg;
            } else {
                warning2.style.color = "red";
                warning2.innerHTML = json.msg;
            }

        },
        error: function(data) {
            alert('页面错误');
        }
    })
}