// O2getPopup
const fn_getO2Popup = ( typeNum ) => {
	switch (typeNum) {
		// B
		case 1:
			fn_putHtml('#pop-img', '/resources/images/event/B_1_1_Y_image01.png');
		break;
		case 2:
			fn_putHtml('#pop-img', '/resources/images/event/B_1_1_Y_image02.jpg');
		break;
		case 3:
			fn_putHtml('#pop-img', '/resources/images/event/B_2_1_Y_image01.png');
		break;
		case 4:
			fn_putHtml('#pop-img', '/resources/images/event/B_2_1_Y_image02.png');
		break;
		case 5:
			fn_putHtml('#pop-img', '/resources/images/event/B_3_1_Y_image01.png');
		break;
		case 6:
			fn_putHtml('#pop-img', '/resources/images/event/B_3_1_Y_image02.png');
		break;
		
		// C
		case 7:		
			if(document.querySelector('#N').checked === true) {
				fn_putHtml('#pop-img', '/resources/images/event/C_2_1_self_image01.jpg');
			} else {
				fn_putHtml('#pop-img', '/resources/images/event/C_2_1_vod_image01.jpg');
			}		
		break;
		case 8:
			if(document.querySelector('#N').checked === true) {
				fn_putHtml('#pop-img', '/resources/images/event/C_2_1_self_image02.png');
			} else {
				fn_putHtml('#pop-img', '/resources/images/event/C_2_1_VOD_image02.jpg');
			}		
		break;
		case 9:
			fn_putHtml('#pop-img', '/resources/images/event/C_2_1_self_image01.jpg');
		break;
		case 10:
			fn_putHtml('#pop-img', '/resources/images/event/C_2_1_self_image02.png');
		break;
		
		// E
		case 11:
			fn_putHtml('#pop-img', '/resources/images/event/EX_1_1_Y_image01.png');
		break;
		case 12:
			fn_putHtml('#pop-img', '/resources/images/event/EX_1_1_Y_image02.png');
		break;
		case 13:
			fn_putHtml('#pop-img', '/resources/images/event/EX_2_1_Y_image01.png');
		break;
		case 14:
			fn_putHtml('#pop-img', '/resources/images/event/EX_2_1_Y_image02.png');
		break;
		case 15:
			fn_putHtml('#pop-img', '/resources/images/event/EX_2_2_Y_image01.png');
		break;
		case 16:
			fn_putHtml('#pop-img', '/resources/images/event/EX_2_2_Y_image02.png');
		break;
		case 17:
			fn_putHtml('#pop-img', '/resources/images/event/EX_3_1_Y_image01.png');
		break;
		case 18:
			fn_putHtml('#pop-img', '/resources/images/event/EX_3_1_Y_image02.png');
		break;
		case 19:
			fn_putHtml('#pop-img', '/resources/images/event/EX_3_2_Y_image01.png');
		break;
		case 20:
			fn_putHtml('#pop-img', '/resources/images/event/EX_3_2_Y_image02.png');
		break;
		case 21:
			if(document.querySelector('#N').checked === true) {
				fn_putHtml('#pop-img', '/resources/images/event/EX_4_1_3D_image01.png');	
			} else {
				fn_putHtml('#pop-img', '/resources/images/event/EX_4_1_2D_image01.png');
			}			
		break;
		case 22:
			if(document.querySelector('#N').checked === true) {
				fn_putHtml('#pop-img', '/resources/images/event/EX_4_1_3D_image02.png');	
			} else {
				fn_putHtml('#pop-img', '/resources/images/event/EX_4_1_2D_image02.png');
			}	
		break;

		// G
		case 23:
			fn_putHtml('#pop-img', '/resources/images/event/GA_1_1_Y_image01.png');
		break;
		case 24:
			fn_putHtml('#pop-img', '/resources/images/event/GA_1_1_Y_image02.png');
		break;
		
		// M
		case 25:
			fn_putHtml('#pop-img', '/resources/images/event/ME_1_1_Y_image01.png');
		break;
		case 26:
			fn_putHtml('#pop-img', '/resources/images/event/ME_1_1_Y_image02.png');
		break;
		
		// N
		case 27:
			fn_putHtml('#pop-img', '/resources/images/event/NE_1_1_Y_image01.jpg');
		break;
		case 28:
			fn_putHtml('#pop-img', '/resources/images/event/NE_1_1_Y_image02.jpg');
		break;
		case 29:
			fn_putHtml('#pop-img', '/resources/images/event/NE_2_1_Y_image01.jpg');
		break;
		case 30:
			fn_putHtml('#pop-img', '/resources/images/event/NE_2_1_Y_image02.png');
		break;
		
		// ON
		case 31:
			fn_putHtml('#pop-img', '/resources/images/event/ON_1_1_Y_image01.png');
		break;
		case 32:
			fn_putHtml('#pop-img', '/resources/images/event/ON_1_1_Y_image02.png');
		break;
		case 33:
			fn_putHtml('#pop-img', '/resources/images/event/ON_2_1_Y_image01.jpg');
		break;
		case 34:
			fn_putHtml('#pop-img', '/resources/images/event/ON_2_1_Y_image02.jpg');
		break;
		
		// OT
		case 35:
			fn_putHtml('#pop-img', '/resources/images/event/OT_1_1_Y_image01.jpg');
		break;
		case 36:
			fn_putHtml('#pop-img', '/resources/images/event/OT_1_1_Y_image02.jpg');
		break;
		case 37:
			fn_putHtml('#pop-img', '/resources/images/event/OT_2_1_Y_image01.jpg');
		break;
		case 38:
			fn_putHtml('#pop-img', '/resources/images/event/OT_2_1_Y_image02.png');
		break;
		case 39:
			fn_putHtml('#pop-img', '/resources/images/event/OT_2_1_Y_image01.jpg');
		break;
		case 40:
			fn_putHtml('#pop-img', '/resources/images/event/OT_2_1_Y_image02.png');
		break;
		case 41:
			fn_putHtml('#pop-img', '/resources/images/event/OT_4_1_Y_image01.jpg');
		break;
		case 42:
			fn_putHtml('#pop-img', '/resources/images/event/OT_4_1_Y_image02.jpg');
		break;
		case 43:
			fn_putHtml('#pop-img', '/resources/images/event/OT_5_1_Y_image01.png');
		break;
		case 44:
			fn_putHtml('#pop-img', '/resources/images/event/OT_5_1_Y_image02.png');
		break;
		case 45:
			fn_putHtml('#pop-img', '/resources/images/event/OT_6_1_Y_image01.png');
		break;
		case 46:
			fn_putHtml('#pop-img', '/resources/images/event/OT_6_1_Y_image02.png');
		break;
		case 47:
			fn_putHtml('#pop-img', '/resources/images/event/OT_7_1_Y_image01.png');
		break;
		case 48:
			fn_putHtml('#pop-img', '/resources/images/event/OT_7_1_Y_image02.png');
		break;		
		case 53:
			fn_putHtml('#pop-img', '/resources/images/event/OT_3_1_Y_image01.png');
		break;
		case 54:
			fn_putHtml('#pop-img', '/resources/images/event/OT_3_1_Y_image02.png');
		break;
		
		// R
		case 49:
			fn_putHtml('#pop-img', '/resources/images/event/RE_1_1_Y_image01.jpg');
		break;
		case 50:
			fn_putHtml('#pop-img', '/resources/images/event/RE_1_1_Y_image02.png');
		break;
		
		// S
		case 51:
			if(document.querySelector('#N').checked === true) {
				fn_putHtml('#pop-img', '/resources/images/event/SE_2_1_N_image01.png');
			} else {
				fn_putHtml('#pop-img', '/resources/images/event/SE_1_1_Y_image01.png');
			}			
		break;
		
		case 52:
			if(document.querySelector('#N').checked === true) {
				fn_putHtml('#pop-img', '/resources/images/event/SE_2_1_Y_image02.png');	
			} else {
				fn_putHtml('#pop-img', '/resources/images/event/SE_1_1_Y_image02.png');	
			}	
		break;

	}
	callPop('#matching-pop');
};


const fn_putHtml = (tagName, img) => {
	document.querySelector(tagName).innerHTML = 
		`<div id="close-btn"><a class="b-close"><label class="checkbox">X</label></a></div>
		<div style="text-align: center;">
			<img src=${img} class="b-close" id="close-img" width=60% height=80%/>	
		</div>`;

};


const fn_getImg = ( flag, type ) => {
	console.log(flag);
	console.log(type);
	switch(type) {
		case 'search':
			if(flag) {
				document.querySelector("#image-left").innerHTML = 
				`<img src="/resources/images/event/SE_1_1_Y_image01.png" onclick="fn_getO2Popup(51)">`;
				document.querySelector("#image-right").innerHTML = 
				`<img src="/resources/images/event/SE_1_1_Y_image02.png" onclick="fn_getO2Popup(52)">`;
			} else {
				document.querySelector("#image-left").innerHTML = 
				`<img src="/resources/images/event/SE_2_1_N_image01.png" alt="" onclick="fn_getO2Popup(51)">`;
				document.querySelector("#image-right").innerHTML = 
				`<img src="/resources/images/event/SE_2_1_Y_image02.png" alt="" onclick="fn_getO2Popup(52)">`;
			}		
		break;
		case 'meeting':
			if(flag) {
				document.querySelector("#image-left").innerHTML = 
				`<img src="/resources/images/event/C_2_1_vod_image01.jpg" alt="" onclick="fn_getO2Popup(7)">`;
				document.querySelector("#image-right").innerHTML = 
				`<img src="/resources/images/event/C_2_1_VOD_image02.jpg" alt="" onclick="fn_getO2Popup(8)">`;
			} else {
				document.querySelector("#image-left").innerHTML = 
				`<img src="/resources/images/event/C_2_1_self_image01.jpg" alt="" onclick="fn_getO2Popup(7)">`;
				document.querySelector("#image-right").innerHTML = 
				`<img src="/resources/images/event/C_2_1_self_image02.png" alt="" onclick="fn_getO2Popup(8)">`;
			}
		break;
		default :
			if(flag) {
				document.querySelector("#image-left").innerHTML = 
				`<img src="/resources/images/event/EX_4_1_2D_image01.png" alt="" onclick="fn_getO2Popup(21)">`;
				document.querySelector("#image-right").innerHTML = 
				`<img src="/resources/images/event/EX_4_1_2D_image02.png" alt="" onclick="fn_getO2Popup(22)">`;
			} else {
				document.querySelector("#image-left").innerHTML = 
				`<img src="/resources/images/event/EX_4_1_3D_image01.png" alt="" onclick="fn_getO2Popup(21)">`;
				document.querySelector("#image-right").innerHTML = 
				`<img src="/resources/images/event/EX_4_1_3D_image02.png" alt="" onclick="fn_getO2Popup(22)">`;
			}
		break;
	}

};

/** 
*	4. 이미지 추가 함수
*	(1) 매개변수
*	  1) tagName : 이미지 태그명
**/
const fn_getMatchingImg = ( tagName, popNum1, popNum2 ) => {
	let matchImgs = sessionStorage.getItem("matchImgs") !== null ? JSON.parse(sessionStorage.getItem("matchImgs")) : [];
	matchImgs = matchImgs.filter(item => item.index !== popNum1);
	matchImgs = matchImgs.filter(item => item.index !== popNum2);
	if(document.querySelector('#Y').checked) {
		matchImgs.push({
		 	index : popNum1,
			element : document.querySelector(tagName.concat(popNum1)).src
		});
		matchImgs.push({
			index : popNum2,
			element : document.querySelector(tagName.concat(popNum2)).src
		});	
		sessionStorage.setItem("matchImgs", JSON.stringify(matchImgs));	
	}
}	

const fn_getPopupResult = () => {
	let matchImgs = JSON.parse(sessionStorage.getItem("matchImgs"));
	matchImgs.map(item => {
		document.querySelector("#result-img").innerHTML +=
		 `<img src="${item.element}" alt="" onclick="fn_getO2Popup(${item.index})">`;
	});
	
	sessionStorage.removeItem("matchImgs");
};
