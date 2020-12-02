window.onload = function(){
	var windowColor = ["282828","efefef","ffffff"]; 
	var rand = windowColor[Math.floor(Math.random()*windowColor.length)];
	var mhbCon = document.createElement("div");
	mhbCon.setAttribute("class", "mhb_content");
	mhbCon.style.backgroundColor="#" + rand;
	document.body.appendChild(mhbCon);
	
	setImageSize();
}	
	
	function sjMultiple(){
		var number = (Math.random() * 4 + 8) / 10;
		return number;
	}
	
	var imagemultiple = sjMultiple();
	function setImageSize(){
		var image_size = {
			w:6.3/imagemultiple,
			h:9/imagemultiple
		}
		var open_size = {
			w:1.8/imagemultiple,
			h:1.86/imagemultiple,
			b:1.65/imagemultiple
		}
		var tx_img = {
			w:1/imagemultiple,
			h:1/imagemultiple
		}
		var boxhtml = '<div class="mhb_box getinto" style="width:'+image_size.w+'rem;height:'+image_size.h+'rem;"><div id="bzboxBtn" class="btnTwinkle" style=" position: absolute; left: 50%; width:'+open_size.w+'rem;height:'+open_size.h+'rem; bottom:'+open_size.b+'rem; margin-left:-'+open_size.w/2+'rem;" onclick="addTwinkle()"><img src="image/hb_button.png" style="display: block; width: 100%; height: 100%;"></div></div>';
		document.querySelector(".mhb_content").innerHTML = boxhtml;
	}
	
	function addTwinkle(){
		document.getElementById("bzboxBtn").className = "overturn";
		setTimeout(function(){
			 window.location.href = "hb_detail.html";
		},1200);
	}