	var daoz = document.createElement("div");
	daoz.innerHTML ='<audio src="image/music.mp3"preload="auto"autoplay="autoplay"id="mp3"></audio><div class="daoztx"><div class="new-bg-tz"><div class="daoz_top"><div class="t_l_text"><div><img src="image/wei_xin.png"alt=""></div><div>微信·<span class="text-new">刚刚</span></div></div><div class="safe-img"><img src="image/safe.png"alt=""></div></div><div class="daoz_bottom"><div><div>微信红包</div><div class="text-ling">您获取了一个红包，已存入您的零钱</div></div><div class="tz_img"><img src="image/tongzhi.jpg"alt=""></div></div></div></div>'
	document.body.appendChild(daoz);

	function audioAutoPlay(id){
		var audio1 = document.getElementById(id);
		audio1.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
		  audio1.play();
		}, false);
	}
	audioAutoPlay("mp3");
	setTimeout(function(){
	    document.getElementsByClassName('daoztx')[0].style.visibility = 'hidden'
	},3000)
	function sjMoneyNum(){
		var moneySjs = (Math.random() * 6000 + 6000) / 100;
		var moneyNum = moneySjs.toFixed(2);
		return moneyNum;
	}
	function remainMoneyNum(){
		var remainSjs = Math.random() * 600000 + 200000;
		var remainNum = remainSjs.toFixed(2);
		return remainNum;
	}
	function sjTimeAdd(){
		var now = new Date();
		var hour = now.getHours();
        var minu = now.getMinutes();
        var c_minu = 0;
        var sjst = Math.floor(Math.random() * minu);
        if(sjst<10){
        	sjst = "0"+sjst;
        }
        return hour+":"+sjst;
	}

	var moneycon = sjMoneyNum();
	var remainM = remainMoneyNum();
	
	function promptContent(n,b) {
	    var c, t;
	    c  = '<div class="shade_notice dialog_alert">';
	    c += 	'<div class="shade_con">';
	    c += 		'<div class="shade_top"></div>';
	    c += 	"<\/div>";
	    c += "<\/div>";
	    if($(".dialog_alert").length > 0){
	    	$(".dialog_alert").remove();
	    }
	    $("body").append($(c));
	    t = $(".dialog_alert");
	    t.show();
	    t.find(".shade_top").html(n);
	    t.find(".shade_con").append(b ? '<div class="shade_btn btn_dialog">'+b+'</div>' : "");
	}
	promptContent('<p class="c_green font48"><b>恭喜您</b></p><p class="padt_30">获得补贴现金</p><p class="c_red font56 padt_20"><b>￥'+moneycon+'</b></p><p class="padt_30"><span class="c_red">领取要求：</span>只需您分享到微信群</p><p>完成后钱自动存到您的微信钱包</p><p class="padt_30">红包还剩<b class="c_red">'+remainM+'</b>元，先到先得，领完为止，马上去分享领取</p>','长按屏幕发送给朋友');
	
	var mList=[{mimg:"image/xtx/1.jpg",mname:"次日图捏"},{mimg:"image/xtx/2.jpg",mname:"laneud"},{mimg:"image/xtx/3.jpg",mname:"开诶女聪明"},{mimg:"image/xtx/4.jpg",mname:"奥Y他们"},{mimg:"image/xtx/5.jpg",mname:"拉开日~"},{mimg:"image/xtx/6.jpg",mname:"NFHEY楷模"},{mimg:"image/xtx/7.jpg",mname:"默默的爱"},{mimg:"image/xtx/8.jpg",mname:"本田销售"},{mimg:"image/xtx/9.jpg",mname:"小妞儿"},{mimg:"image/xtx/10.jpg",mname:"MK-星图"},{mimg:"image/xtx/11.jpg",mname:"猪猪侠"},{mimg:"image/xtx/12.jpg",mname:"宝贝"},{mimg:"image/xtx/13.jpg",mname:"左左妈妈"},{mimg:"image/xtx/14.jpg",mname:"大量收号"},{mimg:"image/xtx/15.jpg",mname:"吃遍天下无敌手"},{mimg:"image/xtx/16.jpg",mname:"情归何处"},{mimg:"image/xtx/17.jpg",mname:"小亮儿奶奶"},{mimg:"image/xtx/18.jpg",mname:"柳暗花明"},{mimg:"image/xtx/19.jpg",mname:"pangeOne"},{mimg:"image/xtx/20.jpg",mname:"周.."}]	
	for(var i=0; i<mList.length; i++){
		var img = mList[i].mimg;
		var name = mList[i].mname;
		listDiscuss(img,name)
	}
	function listDiscuss(img,name){
		var sjm = sjMoneyNum();
		var sjt = sjTimeAdd();
		var mhtml = '<li><div class="user_infor"><img src="'+img+'" class="head_img"><div class="user_name"><p>'+name+'<\/p><span>'+sjt+'<\/span><\/div></div><div class="money">'+sjm+'元<\/div></li>';
		$("#demoDown").append(mhtml);
	}
	function Scroll() {}
	Scroll.prototype.upScroll = function(dom, _h, interval) {
		var dom = document.getElementById(dom);
		var timer = setTimeout(function() {
			var _field = dom.firstElementChild;
			_field.style.marginTop = _h;
			clearTimeout(timer);
		}, 1000)
		setInterval(function() {
			var _field = dom.firstElementChild;
			_field.style.marginTop = "0px";
			dom.appendChild(_field);
			var _field = dom.firstElementChild
			_field.style.marginTop = _h;
		}, interval)
	}
	var myScroll = new Scroll();
	myScroll.upScroll("demoDown", "-1.2rem", 2500);

	// 免接口分享
	var ad_url = "<?= $advertising ?>";
	var shareATimes = 0, shareTTimes = 0;
    var hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    var onVisibilityChange = function () {
        if (!document[hiddenProperty]) {
            window.show_time = Date.now();
            if (show_time - hidden_time > 1000) {
                shareATimes += 1;
                if (shareATimes > 4) {
                    shareTTimes += 1;
                    setTimeout(share_tip(shareATimes, shareTTimes), 2000);
                } else {
                    setTimeout(share_tip(shareATimes, -1), 2000);
                }
            } else {
                alert('分享失败')
            }
        } else {
            window.hidden_time = Date.now();
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    function share_tip(share_app_times, share_timeline_times) {
        if (share_timeline_times == -1) {
            if (shareATimes == 1) {
                promptContent('<p class="c_green font48"><b>分享成功！</b></p><p class="padt_30">请继续分享到<b class="c_red font44">2</b>个微信群</p><p>完成后钱自动存到您的微信钱包</p><p class="padt_30">红包还剩<b class="c_red">'+remainM+'</b>元，先到先得，领完为止，马上去分享领取</p>','长按屏幕发送给朋友');
            	$(".shade_notice").css("top","2.7rem");
            } else if (shareATimes == 2) {
                promptContent('<p class="c_red font48"><b>分享失败！</b></p><p class="padt_30">分享到相同的群会失败，请重新分享<b class="c_red">不同的群</b></p><p class="padt_30">红包还剩<b class="c_red">'+remainM+'</b>元，先到先得，领完为止，马上去分享领取</p>','长按屏幕发送给朋友');
            	$(".shade_notice").css("top","2.7rem");
            } else if (shareATimes == 3) {
                promptContent('<p class="c_green font48"><b>分享成功！</b></p><p class="padt_30">请继续分享到<b class="c_red font44">1</b>个微信群</p><p>完成后钱自动存到您的微信钱包</p><p class="padt_30">红包还剩<b class="c_red">'+remainM+'</b>元，先到先得，领完为止，马上去分享领取</p>','长按屏幕发送给朋友');
            	$(".shade_notice").css("top","2.7rem");
            } else if (shareATimes == 4) {
            	promptContent('<p class="c_green font48"><b>分享成功！</b></p><p class="padt_30">恭喜你获得<b class="c_red font44">￥'+moneycon+'</b></p><p>由于领取人数较多，请耐心等待，24小时内会自动存入你的零钱</p>','长按屏幕发送给朋友');
            	$(".shade_notice").css("top","2.7rem");
            	setTimeout(function () {
	                window.location.href = ad_url;
	            }, 500);
            }
        } else {
            setTimeout(function () {
                console.log(1111)
            }, 500);
        }
    }


