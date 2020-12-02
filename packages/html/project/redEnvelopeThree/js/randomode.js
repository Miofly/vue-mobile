window.onload = function(){
	var windowColor = ["282828","f1f1f1","fff4e7","ece1df"]; 
	var rand = windowColor[Math.floor(Math.random()*windowColor.length)];
	if (!defineQuerySelector(".bz_content")) return false;
	defineQuerySelector(".bz_content").style.backgroundColor="#" + rand;

	setImageSize();
}
	function defineQuerySelector(e) {
	    return document.querySelector(e)
	}	
	
	function sjMultiple(){
		var number = (Math.random() * 4 + 8) / 10;
		return number;
	}
	
	var imagemultiple = sjMultiple();
	function setImageSize(){
		var image_size = {
			w:5.78/imagemultiple,
			h:9.58/imagemultiple
		}
		var open_size = {
			w:1.92/imagemultiple,
			h:1.92/imagemultiple,
			b:0.95/imagemultiple
		}
		var tx_img = {
			w:1/imagemultiple,
			h:1/imagemultiple
		}
		var boxhtml = '<div class="bz_box getinto" style="width:'+image_size.w+'rem;height:'+image_size.h+'rem;"><div class="bzbox_con"><div class="bzbox_img" style="width:'+tx_img.w+'rem;height:'+tx_img.h+'rem;"><img src="image/2.jpg" alt=""></div><p style="padding-top:0.2rem;">全民发补助</p><p style="font-size: 0.48rem; padding-top:0.6rem;">全民派发，人人有份</p></div><div id="bzboxBtn" class="btnTwinkle" style=" position: absolute; left: 50%; width:'+open_size.w+'rem;height:'+open_size.h+'rem; bottom:'+open_size.b+'rem; margin-left:-'+open_size.w/2+'rem;" onclick="addTwinkle()"><img src="image/open_hb.png" style="display: block; width: 100%; height: 100%;"></div></div>';
		defineQuerySelector(".bz_content").innerHTML = boxhtml;
	}
	
	function addTwinkle(){
		document.getElementById("bzboxBtn").className = "overturn";
		// 点击开之后，跳到落地2页面，此处进行跳转
		// 点击开之后，跳到落地2页面，此处进行跳转
		// 点击开之后，跳到落地2页面，此处进行跳转
	}