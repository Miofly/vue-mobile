window.onload = function(){
	showMoneyContent();
	remainingNumber();
	setInterval(function(){
		var num = document.getElementById("syNum").innerText;
		num = num-1;
		document.getElementById("syNum").innerHTML = num;
	},1000);
}	
	function sjMoneyNum(){
		var moneySjs = (Math.random() * 6000 + 6000) / 100;
		var moneyNum = moneySjs.toFixed(2);
		return moneyNum;
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
	function remainingNumber(){
		var rmSjs = Math.floor(Math.random() * 300000 + 200000);
		document.getElementById("syNum").innerHTML = rmSjs;
	}

	var moneycon = sjMoneyNum();
	function showMoneyContent(){
		var mHtml = '<div class="s_img"><img src="image/2.jpg" alt=""></div><div class="s_word">全民发补助</div><div class="s_money c_brown"><span>'+moneycon+'</span>元</div><div class="s_word c_brown">全民派发，人人有份</div><div class="s_button btnTwinkle" onclick="djGetMoney()">立即领取</div>';
		document.querySelector(".showcont_center").innerHTML = mHtml;
	}
	function djGetMoney(){
		// 调用这个方法，每次分享完成弹出的内容写在promptContent("","")里
		// 调用这个方法，每次分享完成弹出的内容写在promptContent("","")里
		// 调用这个方法，每次分享完成弹出的内容写在promptContent("","")里
		// 下面这个就是第一次提示
		promptContent('<p class="c_green font48"><b>恭喜你</b></p><p class="c_green font44">你获得一份補助金</p><p><span class="c_red font56">'+moneycon+'</span>元</p><p><span class="c_red">领取要求：</span>只需您分享到<span class="c_red font44">微信群</span></p><p>完成后自动存入您的微信钱包</p>','马上分享去领取');
	}
	
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
	    t.find(".shade_con").append(b ? '<div class="shade_btn c_green btn_dialog">'+b+'</div>' : "");
	    t.find(".btn_dialog").off("click").on("click", function() { t.hide();});
	}

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
	myScroll.upScroll("demoDown", "-1.2rem", 2000);



