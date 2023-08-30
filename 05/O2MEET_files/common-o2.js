function getValue(num){
  const item = sessionStorage.getItem('item');
  const YN = $("input[name=type]:checked").attr('id');
  let url = $("input[name=type]:checked").val();
  const data = JSON.parse(sessionStorage.getItem(item));
  let obj = { ...data };
  obj[num] = YN;
  sessionStorage.setItem(item, JSON.stringify(obj));


  let temp = "";
  const check = document.querySelectorAll("input[name=type]:checked");
  console.log("check",check)

  check.forEach(function(res){
    temp += res;
  })
    console.log("체크박스",temp)

  if (!temp) {
    alert("기능을 선택해 주세요");
    return "#";
  }else{
    return "/o2meet/matching-list/" + url + ".do"
  }
}


/**
*
*	행사만들기 상담 
*	2022.08.10 최진욱
*
**/

function fn_setItem(key, value) {
	const data = JSON.parse(sessionStorage.getItem('item'));
	let obj = { ...data };
	obj[key] = value	
	sessionStorage.setItem('item', JSON.stringify(obj));
    

}



/**
*
*	axios 호출 
*	2022.10.06 최진욱
*
**/

function CALL_loadInfo(callbackFunction, reqUrl) {
	axios
		.get(`${reqUrl}`)
		.then(res => {
			callbackFunction(res);
		});	
}

function CALL_delInfo(reqUrl) {
	axios
		.delete(`${reqUrl}`)
		.then(res => {
			window.location.reload();
		})	
		.catch(err => {
			console.log(err);
		});
	
}
