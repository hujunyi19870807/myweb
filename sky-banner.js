//获取Cookie
function getCookie(cname) {
    var name = cname + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i].trim();
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

//设置Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (1 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function checkTianmuCookie() {
    var flag = false;
    var tianmu_banner = getCookie("tianmu_banner");
    if (tianmu_banner == "" || tianmu_banner == null) {
        setCookie("tianmu_banner", 2325, 20);
        flag = true;
    }
    return flag;
}

function checkTonglanCookie() {
    var flag = false;
    var tonglan_banner = getCookie("tonglan_banner");
    if (tonglan_banner == "" || tonglan_banner == null) {
        setCookie("tonglan_banner", 2307, 20);
        flag = true;
    }
    return flag;
}

function endReplay() {
    clearInterval(timer1);
    clearTimeout(timer2);
    $("#div-first-banner").slideUp(900);
}
/*天幕广告 begin*/
var timer1 = "";
var timer2 = "";
var timer3 = "";
var x = 3; //利用了全局变量来执行
function callback1() {
    var img1 = new SImage(callback2);
    img1.get($("#div-secend-banner>a>img").attr("src"));
}
function callback2() {
    $("#div-first-banner").show();
    timer1 = setInterval("showTime()", 1000);
    timer2 = setTimeout("hideBanner()", 3000);
}
function showTime() {
    x--;
    $("#div-banner-count").html(x + "秒");
}
function hideBanner() {
    clearInterval(timer1);
    clearTimeout(timer2);
    $("#div-first-banner").slideUp(900, function () {
        $("#div-secend-banner").show();
        $("#btn-banner-replay").show();
        //判断通栏广告
        showTonglan();
    });
}
/*天幕广告 end*/
/*通栏 begin*/
function callbacksmall() {
    var imgsmall = new SImage(callbackcomplete);
    imgsmall.get($("#div-small-bottombanner>a>img").attr("src"));
}
function callbackcomplete() {
    $("#div-big-bottombanner").slideDown(900);
    timer3 = setTimeout("changebanner()", 3000);
}
function changebanner() {
    clearTimeout(timer3);
    $("#div-big-bottombanner").animate({ width: "0px", paddingLeft: "1180px" }, 900, "linear", function () {
        $(this).hide();
        $("#div-small-bottombanner").show();
        $("#div-tonglan-replay").show();
        $("#btn-tonglan-replay").show();
    });
}
function closeBigBannner() {
    $("#div-big-bottombanner").hide();
    $("#div-small-bottombanner").show();
    $("#div-tonglan-replay").show();
    $("#btn-tonglan-replay").show();
    clearTimeout(timer3);
}

$(function () {
    /*天幕广告 begin*/
    if ($("#div-first-banner>a>img").length > 0) {
        if (checkTianmuCookie()) {
            var img = new SImage(callback1);
            img.get($("#div-first-banner>a>img").attr("src"));
        }
        else {
            $("#div-secend-banner").show();
            if ($("#div-big-bottombanner>a>img").length > 0) {
                    $("#div-small-bottombanner").show();
            }
        }
    }
    /*天幕广告 end*/
    else {
        /*通栏广告 begin*/
        showTonglan();
        /*通栏广告 end*/
    }

    $(".absolute").click(function () {
        clearInterval(timer1);
        clearTimeout(timer2);
        $("#div-first-banner").hide();
        /*通栏广告 begin  关闭天幕广告开始通栏广告*/
        if ($("#div-secend-banner :visible").length == 0) {
            if ($("#div-big-bottombanner>a>img").length > 0) {
                var imgbig = new SImage(callbacksmall);
                imgbig.get($("#div-big-bottombanner>a>img").attr("src"));
            }
            $("#div-secend-banner").show();
            $("#btn-banner-replay").show();
        }
        /*通栏广告 end*/
    });
    $("#btn-banner-replay").click(function () {
        x = 3;
        $("#div-banner-count").html("3秒");
        $("#div-first-banner").show();
        timer1 = setInterval("showTime()", 1000);
        timer2 = setTimeout("endReplay()", 3000);
    });
    $("#btn-tonglan-replay").click(function () {
        $("#div-big-bottombanner").css({ "padding-left": "0px", "width": "1180px" });
        $(this).hide();
        callbackcomplete();
    });
});

function showTonglan() {
    if ($("#div-big-bottombanner>a>img").length > 0) {
        if (checkTonglanCookie()) {
            var imgbig = new SImage(callbacksmall);
            imgbig.get($("#div-big-bottombanner>a>img").attr("src"));
        }
        else {
            $("#div-small-bottombanner").show();
        }
    }
}