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

function upload() {
    // $("#x").html("");
    // $("#list").html("");
    var cvrp = new FormData();
    cvrp.append("file", $("#myfile")[0].files[0]);
    var xhr = new XMLHttpRequest();
    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            var percent = Math.round(event.loaded * 100 / event.total);
        }
    };
    xhr.onloadstart = function(event) {
        loading(true);
    };
    xhr.onload = function(event) { //请求完成
        console.log(xhr.responseText);
        var ret = JSON.parse(xhr.responseText);
        var username = ret.cost;
        var pointes = ret.pointes;
        console.log(pointes.length);
        pay(huafei);
        way(pointes);
        console.log(ret.cost);
    };
    xhr.error = function(event) { //请求失败
        console.log('2');
        alert("请求失败，请重新上传文件！");
    };
    xhr.onabort = function(event) {
        console.log('3');
        $("#upprog").text('3');
    };
    xhr.onloadend = function(event) {
        loading(false);
    };
    xhr.open('POST', 'http://172.33.6.116:8080/cvrp', true);
    xhr.send(cvrp);
}

function getList(index) {
    var list = ['<table>'];

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
        $table.eq(0).html(getList(index));
    }
});
$table.eq(0).html(getList(1));