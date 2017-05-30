

jQuery.browser = {}; (function () { jQuery.browser.msie = false; jQuery.browser.version = 0; if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) { jQuery.browser.msie = true; jQuery.browser.version = RegExp.$1; } })();
function SImage(callback) {
    var img = new Image();
    this.img = img;
    var appname = navigator.appName.toLowerCase();
    debugger;
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
    var _this = $(this), _now = _this.find('.now'), _nowNum, _total = _this.find('.total'), _totalNum,
        _imgSrc = _this.closest('div').find('.hsPhoto img.photo'),
        _loadimg = _this.closest('div').find('.hsPhoto img.loading'),
        _loadmask = _this.closest('div').find('.hsPhoto em.mask'),
        _pre = _this.find('.pre'),
        _next = _this.find('.next');

    if (_imgSrc.attr('datasrc') != '') {
        var _imgArry = eval('(' + _imgSrc.attr('datasrc') + ')');

        _total.html(_imgArry.length + 1);

        _imgArry.unshift(_imgSrc.attr('src'));
        _pre.css('opacity', '0.2');

        _next.click(function () {

            _nowNum = _now.html() * 1,
                _totalNum = _total.html() * 1;

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
                img.get(_imgArry[_nowNum]);



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
                img.get(_imgArry[_nowNum - 2]);



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