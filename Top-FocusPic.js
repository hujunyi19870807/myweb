(function () {
	function $(id) {
		return typeof(id) == 'string' ? document.getElementById(id) : id;
	}
    function $C(o){
        return document.createElement(o);
    }
	var FocusPic = {
		MaxScreen : 7,
		CurScreen : 0,
		Width : 240,
		Height : 200,
		changeTime : 5000,
		FocusObj : null,
		Pics : "",
		Titles : "",
		STitles : "",
		Links : "",
		lnum : 0,
		_obj_pic : null,
		_obj_num : null,
		_obj_tit : null,
		refreshTimer : 0,
		imageCache : {},
		init : function(){
			this.lnum ++;
			this.FocusObj = $(this.FocusObj);
			this.Pics = this.Pics.split("|");
			this.Titles = this.Titles.split("|");
			this.STitles = this.STitles.split("|");
			this.Links = this.Links.split("|");
			if(this.Titles.length < this.MaxScreen) this.MaxScreen = this.Titles.length;
			
			this.CreateStyle();
			this.CreatePicBox();
			this.switchPic(this.CurScreen);
			this.refreshSwitchTimer = setTimeout('FocusPic.reSwitchPic();', this.changeTime);
		},
		CreateStyle : function(){
			var styleStr = "";
			styleStr += ".gee_foucspic_box { height:"+this.Height+"px; width:"+this.Width+"px; position:relative; }";
            styleStr += ".gee_foucstit { position:absolute; overflow:hidden; bottom:0;_bottom:-1px; width:100%; left:0; padding:0px 0 0px; margin-bottom:30px; z-index:998; background: rgba(236, 74, 15, 0.86);}";
			styleStr += ".gee_foucstit:after {content:\".\";display:block;height:0;clear:both;visibility:hidden;}";
			
			styleStr += ".gee_foucstit_mask { height:"+this.Height+"px; position:absolute;left:0;top:0;width:100%;z-index:999;text-indent:-999em; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50); -moz-opacity:.5; opacity:0.5;}";
			
			styleStr += ".gee_foucstit_n { position:relative;z-index:1000;float:left; display:inline;}";
			styleStr += ".gee_foucstit_n h3{ line-height:28px; height:25px; font-size:18px; overflow:hidden; display:inline; padding:0 12px; margin:0; font-family:\"微软雅黑\"; font-weight:lighter; }";
			styleStr += ".gee_foucstit_n p{ line-height:20px; font-size:12px; padding:0 12px; margin:0;}";
			styleStr += ".gee_foucstit_n a { color:#FFF !important; text-decoration:none;}";
			styleStr += ".gee_foucstit_n a:hover { text-decoration:underline;}";
			
			styleStr += ".gee_foucspic,.gee_foucspicnum { margin:0; padding:0; list-style:none; position:absolute;}";
			styleStr += ".gee_foucspic { left:0; overflow:visible;}";
			styleStr += ".gee_foucspic li { display:inline; position:absolute;}";
			
			styleStr += ".gee_foucspicnum { line-height:16px; right:0; bottom:0;_bottom:-1px; z-index:1001; }";
			styleStr += ".gee_foucspicnum li { float:left; font-size:12px; font-family:Verdana; margin:8px 6px; display:inline;}";
			styleStr += ".gee_foucspicnum li a { width:15px; height:15px; border-radius: 10px; color:#FFF !important; text-decoration:none; font-size:10px; background:#FFF; display:block;}";
			styleStr += ".gee_foucspicnum li a:hover { text-decoration:none; background:#F60;}";
			styleStr += ".gee_foucspicnum li.at a { background:#F60;}";

			
			var styleId = "FocusPicSheet";
			var _head = document.getElementsByTagName("head").item(0);
			var _old = document.getElementById(styleId);
			if (_old) _head.removeChild(_old);
			var mystyle = document.createElement("style");
			mystyle.type = "text/css";
			mystyle.id = styleId;
			if(mystyle.styleSheet){// IE
				mystyle.styleSheet.cssText = styleStr;
			} else {// w3c
				var cssText = document.createTextNode(styleStr);
				mystyle.appendChild(cssText);
			}
			_head.appendChild(mystyle);
		},
		CreatePicBox : function(){
			var PicBox = $C("div");
			PicBox.className = "gee_foucspic_box";
			//图片显示
			this._obj_pic = $C("ul");
			this._obj_pic.id = "_foucspic_ul_" + this.lnum;
			this._obj_pic.className = "gee_foucspic";
			var liHtml = "";
			for(var i in this.Pics){
				//if(i <= 0) 
					liHtml += "<li>";
				//else  liHtml += "<li>";
				liHtml += "<a href=\"" + this.Links[i] + "\" target=\"_blank\"><img name=\"_focusPic_"+i+"\" src=\"" + this.Pics[i] + "\" width=\"" + this.Width + "\" height=\"" + this.Height + "\" border=\"0\" onfocus=\"this.blur();\" onmouseover=\"FocusPic.pause();\" onerror=\"FocusPic.onError(this);\" onmouseout=\"FocusPic.goon();\" /></a></li>";
			}
			this._obj_pic.innerHTML = liHtml;
			PicBox.appendChild(this._obj_pic);
			//滚动数字
			this._obj_num = $C("ul");
			this._obj_num.id = "_foucspicnum_ul_" + this.lnum;
			this._obj_num.className = "gee_foucspicnum";
			var NavStr = "" ;
			for (i = 1; i <= this.MaxScreen; i++) {
				if (i == 1) {
					NavStr += '<li onmouseout="FocusPic.goon();" onmouseover="FocusPic.goSwitch('+(i-1)+');FocusPic.pause();" class="at"><a href="javascript:void(0);" onfocus=\"this.blur();\" target="_self"></a></li>' ;
				}
				else {
					NavStr += '<li onmouseout="FocusPic.goon();" onmouseover="FocusPic.goSwitch('+(i-1)+');FocusPic.pause();"><a href="javascript:void(0);" onfocus=\"this.blur();\" target="_self"></a></li>' ;
				}
				
			}
			this._obj_num.innerHTML = NavStr;
			PicBox.appendChild(this._obj_num);
			//标题部分
			var titDiv = $C("div");
			titDiv.className = "gee_foucstit";
			
			var maskDiv = $C("div");
			maskDiv.className = "gee_foucstit_mask";
			titDiv.appendChild(maskDiv);
			
			this._obj_tit = $C("div");
			this._obj_tit.id = "_foucspictit_" + this.lnum;
			this._obj_tit.className = "gee_foucstit_n";
			titDiv.appendChild(this._obj_tit);
			
			PicBox.appendChild(titDiv);
			
			this.FocusObj.appendChild(PicBox);
		},
		switchPic : function (index) {
			if (index > this.MaxScreen) {
				index = 1 ;
			}
			var _obj_pic_li = this._obj_pic.getElementsByTagName("li");
			for (var i = 0; i < this.MaxScreen; i++) {
				_obj_pic_li[i].style.zIndex = 99+i;
				//_obj_pic_li[i].style.display = "none";
			}
			_obj_pic_li[index].style.zIndex = 99+this.MaxScreen;
			//_obj_pic_li[index].style.display = "block";
			this.showSwitchNav(index);
			this.showSwitchTitle(index);
			this.CurScreen = index;
		},
		showSwitchTitle : function(index) {
			var titlestr = "";
			if(this.Titles[index]!="" && this.Titles[index].length>0){
				titlestr += "<h3><a href=\""+this.Links[index]+"\" target=\"_blank\">" + this.Titles[index] + "</a></h3>";
				if(this.STitles!="" && this.STitles.length > 0){
					titlestr += '<p><a href="'+this.Links[index]+'" target="_blank">' + this.STitles[index] + '</a></p>';
				}
				this._obj_tit.parentNode.firstChild.style.display = "";
			}else{
				this._obj_tit.parentNode.firstChild.style.display = "none";
			}
			this._obj_tit.innerHTML = titlestr;
		},
		showSwitchNav : function(index){
			var _obj_num_li = this._obj_num.getElementsByTagName("li");
			for (var i = 0; i < this.MaxScreen; i++) {
				_obj_num_li[i].className = "";
			}
			_obj_num_li[index].className = "at";
		},
		reSwitchPic : function () {
			this.refreshSwitchTimer = null;
			this.CurScreen = this.CurScreen + 1;
			if(this.CurScreen >= this.MaxScreen) this.CurScreen = 0;
			this.switchPic(this.CurScreen);
			this.refreshSwitchTimer = setTimeout('FocusPic.reSwitchPic();', this.changeTime);
		},
		onError:function(obj){
			if(typeof this.imageCache[obj.name] == "undefined"){
				this.imageCache[obj.name] = {};
				this.imageCache[obj.name].errTime = 0;
			}
			var cacheObj = this.imageCache[obj.name];
			cacheObj.errTime += 1;
			
			if(cacheObj.errTime < 3){
				//alert(obj.name + " Error TIME:" +cacheObj.errTime);
				if(!!(window.attachEvent && !window.opera)){
					var tempImg = new Image();
					tempImg.src = obj.src;
					tempImg.onreadystatechange = processReqChange
					
					function processReqChange() {
						if(tempImg.readyState == "complete"){
							obj.src = tempImg.src;
						}
					}
				}else{
					obj.src = obj.src;
				}
			}
		},
		pause : function(){
			clearTimeout(this.refreshSwitchTimer);
		},
		goon : function(){
			clearTimeout(this.refreshSwitchTimer);
			this.refreshSwitchTimer = setTimeout('FocusPic.reSwitchPic();', this.changeTime);
		},
		goSwitch : function (index) {
			clearTimeout(this.refreshSwitchTimer);
			this.CurScreen = index - 1;
			this.reSwitchPic();
		}
	};
	window.FocusPic = FocusPic;
})();
