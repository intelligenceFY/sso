function myclick(v) {
    var llis = document.getElementsByTagName("li");
    for (var i = 0; i < llis.length; i++) {
        var lli = llis[i];
        if (lli == document.getElementById("tab" + v)) {
            lli.style.backgroundColor = "#ccc";
            lli.style.color = "black";
        } else {
            lli.style.backgroundColor = "#175288";
            lli.style.color = "#fff";
        }
    }
    var divs = document.getElementsByClassName("tab_css");
    for (var i = 0; i < divs.length; i++) {
        var divv = divs[i];
        if (divv == document.getElementById("tab" + v + "_content")) {
            divv.style.display = "block";
        } else {
            divv.style.display = "none";
        }
    }
}
var ticketToken;
window.onload = function load() {
    // var username = localStorage.getItem('username'); 
    // var loginname = localStorage.getItem('loginname'); 
    // var joinTime = localStorage.getItem('joinTime'); 
    // var permission = localStorage.getItem('permission'); 
    ticketToken = sessionStorage.getItem('ticketToken'); 
    if (ticketToken) {
        // console.log(ticketToken);
        ajax(ticketToken);
    } else {
        window.location.href = "login.html";
    }
}

function ajax(ticketToken) {
    console.log(ticketToken);
    console.log('http://172.33.6.116:8080/person/' + ticketToken);
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://172.33.6.116:8080/person/' + ticketToken,
        success: function(json) {
            var info = json;
            console.log(info);   
            var info1 = info.loginName;
            var info2 = info.username;
            var info3 = info.joinTime;
            var info4 = info.permission;
            localStorage.setItem('username', info.username); 
            localStorage.setItem('loginname', info.loginName); 
            localStorage.setItem('joinTime', info.joinTime); 
            localStorage.setItem('permission', info.permission); 
            load1(info1, info2, info3, info4);
            load2(info2, info3);
        },
        error: function(json) {
            this.loginLoading = false;
            alert("页面错误" + json);
        },
    })
}
var loginname1 = document.getElementById('loginname');
var username1 = document.getElementById('username');
var password1 = document.getElementById('psw');
var identity = document.getElementById('identity');

function load1(info1, info2, info3, info4) {
    loginname1.value = info1;
    username1.value = info2;
    set_select_checked('identity', info4);

    function set_select_checked(selectId, checkValue) {
        var select = document.getElementById('identity');
        console.log(select.options[0].value, selectId, checkValue);
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value == checkValue) {
                select.options[i].selected = true;
                break;
            }
        }
    }

}

function checkpsw() {
    var psw = password1.value;
    var warning4 = document.getElementById('pspan4');
    if (psw == "") {
        warning4.style.color = "red";
        warning4.innerHTML = "密码不能为空!";
        return false;
    } else {
        // alert(4);
        warning4.innerHTML = "";
        return true;
    }
}

function checkuser() {
    var username = username1.value;
    var warning2 = document.getElementById('pspan2');
    if (username == "") {
        warning2.style.color = "red";
        warning2.innerHTML = "用户名不能为空!";
        return false;
    } else {
        // alert(6);
        warning2.innerHTML = "";
        return true;
    }
}

function checkinfo() {
    var judjeinfo1 = false;
    var judjeinfo2 = false;
    var judjeinfo3 = false;
    var judjeinfo4 = false;
    var option = identity.options[identity.selectedIndex].value;
    // if (loginname1.value != localStorage.getItem('loginname')) {
    //     judjeinfo1 = true;
    // }
    if (username1.value != localStorage.getItem('username')) {
        judjeinfo2 = true;
    }
    if (option != localStorage.getItem('permission')) {
        judjeinfo4 = true;
    }
    if (judjeinfo2 == true || judjeinfo4 == true) {
        // alert(2);
        return true;

    } else {
        return false;
    }
}

function checkinfo2() {
    if (checkinfo() == true) {
        if (checkpsw() && checkuser()) {
            update_user();
            alert('ok');
        } else if (!checkuser) {
            checkuser();
        } else if (!checkpsw()) {
            checkpsw();
        } else {
            checkpsw();
            checkuser();
        }
    }
}

function update_user() {
    $.ajax({
        type: "post",
        url: "url: 'http://172.33.6.116:8080/update_user" + ticketToken, //请求url
        data: {
            "loginName": loginname1.value,
            "loginPassword": password1.value,
            "username": username1.value,
        },
        success: function(json) {
            var info = json.data;
            if (json.code == 1) {
                alert(json.msg);
                location.reload();
            } else {
                alert("请求错误！错误信息：" + json.msg);
            }
        },
        error: function(json) {
            this.loginLoading = false;
            alert("页面错误");
        }
    })
}

// function load2(info2, info3) {
//     $('#table').pagination({
//         dataSource: '/fund/getProductList', //请求的url
//         locator: 'recordList', //返回值data的位置
//         totalNumberLocator: function (res) { //返回值总数量的位置
//             return Math.floor(res.totalCount);
//         },
//         numPerPage: 5,
//         pageRange: 1,
//         className: '',
//         prevText: '<&nbsp;上一页',
//         nextText: '下一页&nbsp;>',
//         showGoInput: false,
//         showGoButton: false,
//         callback: function (data, pagination) {   //回掉函数
//             $('#data-container').html(template(data));
//         }
//     });
// }