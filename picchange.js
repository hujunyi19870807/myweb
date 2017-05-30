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

var _getArea = $('.area-btn-imgCng');

_getArea.each(function (index, element) {
    var _this = $(this),
        _now = _this.find('.now'),
        _nowNum, _imgObj = _this.parent().prev(),
        _imgSrc = _imgObj.find('.hsPhoto img.photo'),
        _loadimg = _imgObj.find('.hsPhoto img.loading'),
        _loadmask = _imgObj.find('.hsPhoto em.mask'),
        _pre = _this.find("i.fa.fa-chevron-left"),
        _next = _this.find("i.fa.fa-chevron-right");

    if (_imgSrc.attr('data-src') != '') {
        var _imgArry = eval('(' + _imgSrc.attr('data-src') + ')');
        _imgArry.unshift(_imgSrc.attr('src'));
        _pre.css('opacity', '0.2');

        _next.click(function () {
            _nowNum = _now.html() * 1;

            if (_now.html() != _imgArry.length) {
                _now.html(_nowNum + 1);
                _pre.css('opacity', '1');

                if ((_nowNum + 1) == _imgArry.length) {
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
                img.get(_imgArry[_nowNum].urlPrefix + _imgArry[_nowNum].filePath + _imgArry[_nowNum].fileName);

            } else {
                _next.css('opacity', '0.2');
            }
        });

        _pre.click(function () {
            _nowNum = _now.html() * 1;

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
                img.get(_imgArry[_nowNum-2].urlPrefix + _imgArry[_nowNum-2].filePath + _imgArry[_nowNum-2].fileName);
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