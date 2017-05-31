jQuery.browser = {}; (function () { jQuery.browser.msie = false; jQuery.browser.version = 0; if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) { jQuery.browser.msie = true; jQuery.browser.version = RegExp.$1; } })();

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
var imgIndex = 0;

$(".indexhomes").each(function () {
    var _imgObj = $(this).children(0),
        _countpart = $(this).children(1),
        _imgSrc = _imgObj.find('.hsPhoto img.photo'),
        _loadimg = _imgObj.find('.hsPhoto img.loading'),
        _loadmask = _imgObj.find('.hsPhoto em.mask'),
        _pre = _countpart.find("span i.fa.fa-chevron-left"),
        _next = _countpart.find("span i.fa.fa-chevron-right"),
        _now = _countpart.find("span i:eq(1) em:eq(0)"),
        _total = _countpart.find("span i:eq(1) em:eq(1)"),
        _nowNum;

    var jsonObjList = $.parseJSON(_imgSrc.attr("data-src"));
    _pre.css('opacity', '0.2');
    if (jsonObjList.length >=2 ) {
        
        _next.click(function () {
            _nowNum = _now.html() * 1,
                _totalNum = _total.html() * 1;

            if (_now.html() != jsonObjList.length) {

                _now.html(_nowNum + 1);

                _pre.css('opacity', '1');

                if ((_nowNum + 1) == jsonObjList.length) {

                    _next.css('opacity', '0.2');

                } else {

                    _loadimg.show();
                    _loadmask.show();

                }
                
                function icall(obj) {
                    _loadimg.hide();
                    _loadmask.hide();
                    _imgSrc.attr('src', obj.src);
                }

                var img = new SImage(icall);
                img.get(jsonObjList[_nowNum].urlPrefix + jsonObjList[_nowNum].filePath + jsonObjList[_nowNum].fileName);

            } else {
                _next.css('opacity', '0.2');
            }
        });

        _pre.click(function () {
            _nowNum = _now.html() * 1,
                _totalNum = _total.html() * 1;

            if (_now.html() != 1) {
                _now.html(_nowNum - 1);

                _next.css('opacity', '1');

                if ((_nowNum - 1) == 1) {
                    _pre.css('opacity', '0.2');
                } else {
                    _loadimg.show();
                    _loadmask.show();
                }

                function icall(obj) {
                    _loadimg.hide();
                    _loadmask.hide();
                    _imgSrc.attr('src', obj.src);
                }

                var img = new SImage(icall);
                img.get(jsonObjList[_nowNum - 2].urlPrefix + jsonObjList[_nowNum - 2].filePath + jsonObjList[_nowNum - 2].fileName);

            } else {
                _pre.css('opacity', '0.2');
            }
        });
    }
    else {
        _total.html(1);
        _next.css('opacity', '0.2');
        _pre.css('opacity', '0.2');
    }
});