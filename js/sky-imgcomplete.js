(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();

function SImage(callback) {
    var img = new Image();
    this.img = img;
    var appname = navigator.appName.toLowerCase();
    if (appname.indexOf("netscape") == -1) {
        img.onreadystatechange = function () {
            if (img.readyState == "complete") {
                callback(img);
            }
        };
    } else {
        img.onload = function () {
            if (img.complete == true) {
                callback(img);
            }
        }
    }
}
SImage.prototype.get = function (url) {
    this.img.src = url;
}

function checkImageComplete(img1, img2) {
    var img = new SImage(call1(img2));
    img.get(img1.attr("src"));
}

function call1(img2) {
    var img1 = new SImage(callback);
    img1.get(img2.attr("src"));
}