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
    var divs = document.getElementsByClassName("data_display");
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

function quit() {
    ticketToken = sessionStorage.getItem('ticketToken'); 
    sessionStorage.removeItem("ticketToken");
    window.location.href = "login.html";
}
//上传账号
function upload() {
    var formData = new FormData();
    formData.append("file", $("#myfile")[0].files[0]);
    $.ajax({
        url: 'http://172.33.6.116:8080/addUsers',
        /*接口域名地址*/
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(res) {
            console.log(res.data);
            // if (res.data["code"] == "succ") {
            //     alert('成功');
            // } else if (res.data["code"] == "err") {
            //     alert('失败');
            // } else {
            //     console.log(res);
            // }
        }
    })
}

// function upload() {
//     alert(1);
//     // $("#x").html("");
//     // $("#list").html("");
//     var cvrp = new FormData();
//     cvrp.append("file", $("#myfile")[0].files[0]);
//     var xhr = new XMLHttpRequest();
//     xhr.upload.onprogress = function(event) {
//         if (event.lengthComputable) {
//             var percent = Math.round(event.loaded * 100 / event.total);
//         }
//     };
//     xhr.onloadstart = function(event) {
//         loading(true);
//     };
//     xhr.onload = function(event) { //请求完成
//         console.log(xhr.responseText);
//         var ret = JSON.parse(xhr.responseText);
//         console.log(ret);
//         var data = ret.data;
//         console.log(data);
//         var len = data.length; //返回消息的条数
//         getList(1, data);
//     };
//     xhr.error = function(event) { //请求失败
//         console.log('2');
//         alert("请求失败，请重新上传文件！");
//     };
//     xhr.onabort = function(event) {
//         console.log('3');
//     };
//     xhr.onloadend = function(event) {
//         loading(false);
//     };
//     xhr.open('POST', 'http://172.33.6.116:8080/addUsers', true);
//     xhr.send(cvrp);
// }
var url = 'http://172.33.6.116:8080/';
//如需要展示之前全部用户，则页面加载时，发起请求
//目前为不需要
function ajax(pageSize) {
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://172.33.6.116:8080/login',
        data: {
            pageSize: 1,
        },
        success: function(json) {
            var info = json.data;
            if (json.code == 1) {          
                console.log(json.data);

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
//分页组件，调用一次，请求ajax
function getList(index, data) {
    var list = ['<table>'];
    console.log(index);
    for (var i = 1; i <= 10; i++) {
        list.push('<tr><td>' + ((index - 1) * 10 + i) + '</td><td>' + ((index - 1) * 10 + i) + '</td></tr>');
    }

    list.push('</table>');

    return list.join('')
}

/***********使用示例*******/
var $table = $('.table2');
var $pagination = $('.pagination');


$pagination.eq(0).pagination({
    total: 100,
    onJump: function(index) {
        ajax(index);
        $table.eq(0).html(getList(index));
        console.log(index);
    }
});
$table.eq(0).html(getList(1));