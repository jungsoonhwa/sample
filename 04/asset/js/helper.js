/////#####===== 알림 창 =====#####/////
function showAlert(msg, title, options) {
  //##### 변수 설정 #####//
  options     = options || {};
  var msg     = msg ? decodeURIComponent(msg) : "";
  var title   = title || "";
  var btnText = options.btnTxt ? options.btnTxt : combValidMsg("msg_확인");

  //##### 컨텐츠 설정 #####//
  $("#alert_modal").find(".modal-title").html(title);
  $("#alert_modal").find(".modal-body").html(msg);

  $("#alert_modal").modal("show");
  $("#alert_modal .ok_btn").focus();

  $("#alert_modal .ok_btn").text(btnText);

  //##### 콜백 #####//
  $(document).on("hidden.bs.modal", "#alert_modal", function(){
    if (typeof(options.onClose) == "function") {
      setTimeout(function(){
        options.onClose();
      },400);
    }
  });

  $("#alert_modal").off("click", ".ok_btn");
  $("#alert_modal").on("click", ".ok_btn", function() {
    if (typeof(options.onClickOk) == "function") {
      options.onClickOk();
    }
  });
}
/*=================================================
  combValidMsg
   - validation 문구를 언어별로 맞게 합쳐줌
=================================================*/
function combValidMsg(validType, msgInfo) {
  msgInfo = _.merge({
    max_size: "",
    label: "",
    action: "",
    exts: "",
    pp: "",
    regexp: "",
    min_len: "",
    max_len: "",
    length_min_txt: UTILS.langObj["length_min_txt"],
    length_max_txt: UTILS.langObj["length_max_txt"],
  }, msgInfo);

  if (msgInfo.pp) {
    msgInfo.pp = getPostposition(msgInfo.label, msgInfo.pp)
  }

  if (msgInfo.regexp) {
    msgInfo.regexp = testRegExp(msgInfo.regexp, msgInfo.value)
  }

  var compiled = _.template(UTILS.langObj[validType]);

  var compiledMsg = compiled(msgInfo);

  return compiledMsg;
}


/*=================================================
    조사 출력
=================================================*/
function getPostposition(str, pp){
  var final_str    = str.charAt(str.length-1);
  var is_final_consonant  = checkConsonant(final_str).length==3?true:false;

  if (pp=='을' || pp=='를') return (is_final_consonant?'을':'를');
  if (pp=='이' || pp=='가') return (is_final_consonant?'이':'가');
  if (pp=='은' || pp=='는') return (is_final_consonant?'은':'는');
  if (pp=='와' || pp=='과') return (is_final_consonant?'와':'과');
}


/*=================================================
    초 / 중 / 종성 체크
=================================================*/
function checkConsonant(str){
  var cCho  = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
    cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ],
    cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
    cho, jung, jong;

  var str = str,
    cnt = str.length,
    chars = [],
    cCode;

  for (var i = 0; i < cnt; i++) {
    cCode = str.charCodeAt(i);

    if (cCode == 32) { continue; }

    // 한글이 아닌 경우
    if (cCode < 0xAC00 || cCode > 0xD7A3) {
      chars.push(str.charAt(i));
      continue;
    }

    cCode  = str.charCodeAt(i) - 0xAC00;

    jong = cCode % 28; // 종성
    jung = ((cCode - jong) / 28 ) % 21; // 중성
    cho  = (((cCode - jong) / 28 ) - jung ) / 21; // 초성

    chars.push(cCho[cho], cJung[jung]);
    if (cJong[jong] !== '') { chars.push(cJong[jong]); }
  }

  return chars;
}

/*=================================================
    Submit Btn
=================================================*/
$(document).on("click", ".submit_btn", function(evt) {
  evt.preventDefault();
  remove_space($(this));
  checkFormValid($(this));
});

/*=================================================
    onValidInputChange
    validation 이벤트 리스너 분리
=================================================*/
function onValidInputChange(evt) {
  evt.preventDefault();

  var $this = $(evt.target);

  //TODO: valid_input_notempty 변수명 이대로 괜찮은가?
  //valid_input_allowempty
  //valid_input_emptypossible
  //valid_input_canempty.change()
  //valid_input_notrequired

  //skip 가능한 valid_input 예외 처리
  if ($this.hasClass(".valid_skip")) {
    return true;
  }

  var $parentForm = $this.closest("form") || $this.closest(".valid_form");

  isElValid($this, $parentForm, evt.type);
}

/*=================================================
    valid input(keyup, change, focusout)
=================================================*/
var validSeletors = [
  "form[data-evt-type='change'] .valid_input:not([type=file])",
  ".valid_form[data-evt-type='change'] .valid_input:not([type=file])",
  "form[data-evt-type='change'] .valid_input_notempty:not([type=file])",
  ".valid_form[data-evt-type='change'] .valid_input_notempty:not([type=file])"
].join(",");


$(document).on("keyup", validSeletors, _.debounce(onValidInputChange, 250));
$(document).on("change", validSeletors, onValidInputChange);
$(document).on("focusout", validSeletors, onValidInputChange);


/*=================================================
  setValidWrap
   - validWrap셋팅 (validation 요소 부모역할 엘리먼트)
=================================================*/
function setValidWrap($el) {
  // 유효성검사 처리 할 요소 부모엘리먼트 배열
  var validWrapArr = [
    ".validWrap", // 유효성 검사를 위한 기본 클래스
    ".form-group" // 현재 사용자쪽에서 많이 사용하고 있는 클래스(추후 .validWrap 통합예정)
  ];
  var $validWrap = null;
  
  validWrapArr.some(function(elTxt) {
    if ($el.closest(elTxt).length) {
      $validWrap = $el.closest(elTxt);
    }

    return $el.closest(elTxt).length;
  });

  return $validWrap;
}

/*=================================================
  setValidMsgWrap
   - validMsgWrap셋팅 (validation 메시지를 처리할 엘리먼트)
=================================================*/
function setValidMsgWrap($el) {
  //유효성검사 메시지 추가할 엘리먼트 배열
  var validMsgWrapArr = [
    ".validMsgWrap", // 유효성 검사 메시지를 표기하기 위한 기본 클래스
    ".form-content", // 현재 사용자쪽에서 많이 사용하고 있는 클래스(추후 .validMsgWrap 통합예정)
    "div[class^='col-']" // 현재 관리자쪽에서 많이 사용하고 있는 클래스(추후 .validMsgWrap 통합예정)
  ];
  var $formMsgWrap = null;
  
  validMsgWrapArr.some(function(elTxt) {
    if ($el.closest(elTxt).length) {
      $formMsgWrap = $el.closest(elTxt);
    }

    return $el.closest(elTxt).length;
  });

  return $formMsgWrap;
}


/*=================================================
    valid input 비활성화 시 처리
=================================================*/
$(document).on("click", ".unselectDisabled", function() {
  var $this = $(this);
  var $validWrap = setValidWrap($this);

  if ($this.prop("checked")) {
    $validWrap.removeClass("invalid");
    $validWrap.addClass("valid");
    $validWrap.find(".form-postscript").hide();
  }
});

/*=================================================
    valid input 인 경우 타이틀옆에 * 표시 처리
=================================================*/
if (document.querySelector(".valid_input")) {
  $(".valid_input").parents(".form-group").find(".form-title label").addClass("icon-neces") // 사용자화면
  $(".valid_input").parents(".form-group").find(".col-form-label").addClass("icon-neces") // 관리자화면
}

/*=================================================
    비동기로 처리되는 유효성 검사용 변수
=================================================*/
var pwXhr = null;
var tableExeptXhr = null;

/*=================================================
 유효성 검사만 분리
 =================================================*/
function _checkValid($el, $form, callEvtType) {
  /*
   * elidation 항목
   *
   * -빈값
   * -file확장자  : data-ext
   * -최소길이 : data-minlen
   * -최대길이 : data-maxlen
   * -정규식 : data-exp
   * -비밀번호 유효성 검사 : data-checkmempw
   *    - 1.  비밀번호 정규식 체크 8~12자, 영문 숫자 조합 (/login/exec_passwordChk 에서 셋팅 가능)
   *    - 2. (회원가입시) 아이디, 이메일주소와 동일한지 체크
   *    - 3. (비번 변경, 비번 찾기 시) 이전비밀번호, 아이디, 이메일주소와 동일한지 체크
   * -비밀번호 확인(앞서 입력한 비번과 같은지 여부 체크) : data-repw
   * -db table데이터 중복체크 : data-table
   * -db에 값이 있다면 중복체크스킵(수정시 사용) : data-table-exept
   */
  var result  = true;
  var output = "";
  var notiType = null;

  if (!($el[0].tagName.toUpperCase()=="INPUT" || $el[0].tagName.toUpperCase()=="TEXTAREA" || $el[0].tagName.toUpperCase()=="SELECT")) {
    console.log("[skip] "+$el[0].tagName);
    return true;
  }


  /////#####===== 라벨 정보 설정 =====#####/////
  var label  = $el.data("label")?$el.data("label"):"";
  if (label==undefined || label==""){
    if (label==""){
      label  = $el.parents(".form-group").find("label").text();
    }
    if (label==""){
      label  = $el.parents("tr").find("th").text();
    }
    if (label==""){
      label = combValidMsg("require");
    }
  }

  label  = $.trim(label);

  /////#####===== 빈값 체크 =====#####/////
  if (($el.hasClass("valid_input_notempty") && $el.val().trim() == "")) {
    return true;
  }

  var action = combValidMsg("empty");
  var value = $el.val() || "";
  var name = ($el.data("name") != "" && $el.data("name") != undefined) ? $el.data("name") : $el.attr("name");
  var err_msg = $el.data("errmsg");

  //##### SELECT #####//
  if ($el[0].tagName.toUpperCase()=="SELECT"){
    value = $el.val();

    action = combValidMsg("select");
  }

  //##### RADIO #####//
  else if ($el.attr("type")=="radio"){
    var radio_name  = $el.attr("name");
    value = $form.find("[name="+radio_name+"]").is(":checked");
    
    action = combValidMsg("radio");
  }

  //##### CHECKBOX #####//
  else if ($el.attr("type")=="checkbox"){
    var check_name  = $el.attr("name");

    if (check_name) {
      // name 값이 있다면 묶음중 체크된 것이 있는지 확인
      check_name = check_name.replace("[]", "");
      value = $form.find("[name^="+check_name+"]").is(":checked");
    } else {
      value = $el.is(":checked");
    }

    action = combValidMsg("check");
  }
  else if ($el.data("filetype")=="single" || $el.data("filetype")=="multiple"){
    //##### asyncfile single #####//
    var $parentRow = $el.parents(".blockRow");
    value = $parentRow.find(".imgPreview .preview-row").length;

    if (value == 0) {
      value = false;
      err_msg = combValidMsg("validmsg_empty_select");
    }
  }
  else {
    //##### multitable #####//
    if ($el.hasClass("multitable")) {
      value = JSON.parse($el.val());
      var table_val = true;
      for (var i = 0; i < value.length; i++) {
        for (var j = 0; j < value[i].length; j++) {
          if (!value[i][j]) {
            table_val = false;
          }
        }
        if (!table_val) break;
      }
      value = table_val;
    }
  }

  if (value==="" || (value !== "0" && value==false)){
    output = err_msg ? err_msg : combValidMsg("empty_comb", { label: label, pp: getPostposition(label, "을"), action: action });

    //##### 경고 알림 #####//
    return output;
  }

  //##### FILE #####//
  if ( $el.attr("type")=="file" ){
    var ext = $el.data("ext") || "";
    if ( ext ) {
      //var FileFilter = "/\.("+ext+")$/i";
      var FileFilter = new RegExp("\.("+ext+")$", "i");

      if ( !$el[0].value.match(FileFilter)) {
        result = false;
        var exts = ext.split("|").join(", ");
        output = combValidMsg("file_comb", { exts: exts });
      }
    }
  }

  /////#####===== 유효성 체크 =====#####/////
  var min_len  = $el.data("minlen")||0;
  var max_len  = $el.data("maxlen")||0;
  var exp  = $el.data("exp")||"";
  var chcek_mempw = $el.data("checkmempw")||"";
  var re_pw  = $el.data("repw")||"";
  var table  = $el.data("table")||"";


  //##### 최소,최대 글자 확인 #####//
  if ((min_len != "" && value.length < min_len) || (max_len != "" && value.length > max_len)) {

    if (err_msg) {
      output = err_msg;
    } else {
      if(max_len == 0){
        output = combValidMsg("length_min_comb", { label: label, pp: getPostposition(label, "을"), min_len: min_len, max_len: max_len });
      }else if(min_len == 0){
        output = combValidMsg("length_max_comb", { label: label, pp: getPostposition(label, "을"), min_len: min_len, max_len: max_len });
      }else{
        output = combValidMsg("length_all_comb", { label: label, pp: getPostposition(label, "을"), min_len: min_len, max_len: max_len });
      }
    }
    result = false;
  }

  //##### 회원 비밀번호 유효성 검사 #####//
  else if (chcek_mempw != "" && $form.find("[name='mem_pw']").length) {
    var mem_curpw = $form.find("[name=mem_curpw]").val();
    var mem_pw = $form.find("[name=mem_pw]").val();
    var $ctn = $("[name=ctn]");
    var mem_key = $form.find("[name=mem_key]").val() || "";
    var id = $form.find("[name=mem_id]").val() || "";
    var email = $form.find("[name=mem_email]").val() || "";

    var memData = {
      ctn: $ctn.val(),
      mem_pw: mem_pw,
    }

    mem_curpw ?  memData.mem_curpw = mem_curpw : "";
    mem_key ? memData.mem_key = mem_key : "";
    id ? memData.id = id : "";
    email ? memData.email = email : "";

    if (pwXhr && callEvtType !== "submit") {
      pwXhr.abort();
    }  

    pwXhr = $.ajax({
      type: "POST",
      async: callEvtType !== "submit",
      data: memData,
      url: "/login/exec_passwordChk/",
      success: function(data, textStatus, jqXH) {
        var obj = $.parseJSON(data);
        $ctn.val(obj.csrf.hash);

        if (obj.success) {
          output = true;
          result = true;
        } else {
          output = obj.msg;
          result = false;
        }
        if (callEvtType !== "submit") {
          notiType = $form.data("noti-type");
          validNotification($el, output, notiType);
        }
      }
    });
    if (callEvtType !== "submit") {
      return false;
    }
  }

  //##### 비밀번호 확인 #####//
  else if (re_pw!="" && $form.find("[name="+re_pw+"]").val()!=value){
    output = err_msg ? err_msg : combValidMsg("pwsame_confirm");

    result = false;
  }
  //##### 정규식 확인 #####//
  else if (value != "" && exp != "" && testRegExp(exp, value) != true) {
    output = err_msg ? err_msg : combValidMsg("regxp_comb", { label: label, pp: "은", regexp: exp, value: value });

    result = false;
  }
  //##### 중복 확인 #####//
  else if (name!="" && table!=""){
    var table_exept  = $el.data("table-exept")||"";
    var snd  = {
      table  : table,
      where  : "`"+name+"`='"+value+"'"
    }


    if ( $el.data("table_where") ) {
      snd.where += " AND "+$el.data("table_where");
    }

    if (tableExeptXhr && callEvtType !== "submit") {
      tableExeptXhr.abort();
    }

    if (table_exept==value) {
      // 중복 체크 제외
    } else {
      tableExeptXhr =  $.ajax({
        type: "POST",
        async: callEvtType !== "submit",
        url: "/_crud/select",
        data: $.param(snd),
        success: function(rcv) {
          var obj  = $.parseJSON(rcv);
          
          if (obj.view) {
            output = err_msg ? err_msg : combValidMsg("db_exist_comb", { label: label });
            result = false;
          } else {
            output = true;
          }

          if (callEvtType !== "submit") {
            notiType = $form.data("noti-type");
            validNotification($el, output, notiType);
          }
        }
      });

      if (callEvtType !== "submit") {
        return false;
      }
    }
  }

  //##### 경고 알림 #####//
  if (!result) {
    return output;
  }
  return true;
}

/*=================================================
  validNotification
   - 유효성 검사 통과 실패시 알림
=================================================*/
function validNotification($el, notiMsg, notiType) {
  //validWrap 셋팅
  var $validWrap = setValidWrap($el);

  if (notiType !== "submit") {
    //validMsgWrap 셋팅
    var $formMsgWrap = setValidMsgWrap($el);
  }

  /*
   * msg값에 따른 분기문 처리
   * 유효성 검사 미통과시 
   *   - msg : [string] '오류메시지'
   * 유효성 검사 통과시 
   *   - msg : [boolean] true
   */
  if (notiMsg !== true) {
    //notiType alert일 경우 invalid 처리 제외
    if ($validWrap && (notiType === "msg" || notiType === "tooltip")) {
      //invalid처리 
      $validWrap.removeClass("valid");
      $validWrap.addClass("invalid");
    }

    //notiType에 따른 메시지 전달방법 셋팅
    switch (notiType) {
      case "alert" :
        showAlert(notiMsg, "", {
          onClose: function() {
            $el.focus();
          }
        });
        break;
  
      case "msg" :
        //메시지 셋팅
        if ($formMsgWrap === null) {
          console.error("invalid value '.validMsgWrap' "+ notiMsg);
        } else {
          if ($formMsgWrap.find(".form-postscript").length) {
            $formMsgWrap.find(".form-postscript").text(notiMsg);
            $formMsgWrap.find(".form-postscript").show();
          } else {
            var msgEl = "<span class='form-postscript'>" + notiMsg + "</span>";
            $formMsgWrap.append(msgEl);
          }
        }
        break;

      case "tooltip" :
        //메시지 셋팅
        if ($formMsgWrap === null) {
          console.error("invalid value '.validMsgWrap' "+ notiMsg);
        } else {
          if ($formMsgWrap.find(".form-tolltip").length) {
            $formMsgWrap.find(".form-tolltip .text").text(notiMsg);
            $formMsgWrap.find(".form-tolltip").show();
          } else {
            var msgEl = "<span class='form-tolltip f-r'><img class='tolltip-icon' src='/views/res/imgs/common/form_tooltip_icon.svg'></img><small class='text'>" + notiMsg + "</small></span>";
            $formMsgWrap.append(msgEl);
          }
        }
        break;
  
      default :
        showAlert(notiMsg, "", {
          onClose: function() {
            $el.focus();
          }
        });
        break;
    }
    return false;
  } else {
    //valid처리
    if ($validWrap) {
      $validWrap.removeClass("invalid");
      $validWrap.addClass("valid");
    }

    if ($formMsgWrap) {
      if (notiType === "msg") {
        $formMsgWrap.find(".form-postscript").hide();
      }
  
      if (notiType === "tooltip") {
        $formMsgWrap.find(".form-tolltip").hide();
      }
    }
    
    return true;
  }
}

/*=================================================
    폼 엘리먼트 유효성 검사
=================================================*/
function isElValid($el, $form, callEvtType) {
  //validWrap 셋팅
  var $validWrap = setValidWrap($el);

  if (!$validWrap) {
    console.error("valid input 상위 요소에 .validWrap를 추가해주세요");
  }

  var isValidGroup = $validWrap && $validWrap.find(".valid_input").not(".disabled").length > 1 ? true : false;
  var notiType = $form.data("noti-type");
  var validResult = null;

  //휴대폰 번호, 생일 등 복수의 valid_input을 체크해야하는 경우 처리
  if (isValidGroup === true) {
    Array.prototype.slice.call($validWrap[0].querySelectorAll(".valid_input")).every(function(el) {
      if (!el.disabled) {
        validResult = _checkValid($(el), $form, callEvtType);
      }
      
      return validResult === true;
    });

  } else {
    validResult = _checkValid($el, $form, callEvtType);
  }

  //ajax를 비동기로 체크하는 경우 validNotification() 실행하지 않음
  if (validResult !== false) {
    validNotification($el, validResult, notiType);
  }
    
  if (validResult !== true) {
    return false;
  }
}

/*=================================================
  isFormValid 
    - _checkValid함수를 호출
    - checkFormValid 에서 분리된 함수
    - 다른방식으로 유효성 검사를 체크할때 필요하여 함수가 분리됨
=================================================*/
function isFormValid($form, $submitBtn) {
  var result  = true;
  var notiType = $form.data("noti-type");
  var evtType = $form.data("evt-type");
  var $focusEl = null;

  /////#####===== CKEDITOR =====#####/////
  if (typeof CKEDITOR !== 'undefined') {
    for(instance in CKEDITOR.instances){
      // ckeditor에 입력한 컨텐츠 textarea에 반영
      CKEDITOR.instances[instance].updateElement();
    }
  }

  // /////#####===== multitable updateData =====#####/////
  // $(".multitable").each(function(idx, elem) {
  //   elem.multitable.updateData();
  // });

  /////#####===== 필수값 인풋  =====#####/////
  // .valid_input_notempty : 빈값은 허용되지만 값이 있을 경우에는 유효성 체크는 필요
  // .valid_input : 값이 있어야하고, 유효성 체크
  // .valid_skip : 동적으로 유효성 체크 skip 위한 클래스
  $form.find(".valid_input, .valid_input_notempty").not(".valid_skip").each(function(idx, el) {
    var $el = $(el);

    //disabled요소 체크 스킵
    if ($el.prop("disabled")) {
      return true;
    }

    //validation 결과에 따른 분기 처리
    if (isElValid($el, $form, "submit") === false) {
      result = false;

      if (!$focusEl) $focusEl = $el;

      //noti type이 alert일 경우 알림 이후 for문 바로 종료
      if (notiType === "alert" || !notiType) {
        return false;
      }
    }
  });

  if (!result) {
    // 중복클릭 방지 해제
    if ($submitBtn) {
      $submitBtn.attr("disabled", false);
    }

    /* 
     * notiType === "msg" && evtType === "submit"인 경우 유효성 검사 1회 이후에는 
     * 사용자가 올바른 값을 입력하면 즉각 피드백을 주기 위해
     * 이벤트를 change로 변경
     */
    if ((notiType === "msg" || notiType === "tooltip") && (evtType === "submit" || !evtType)) {
      $form[0].setAttribute("data-evt-type", "change");
    }

    $focusEl && $focusEl.focus();

    return false;
  }

  /////#####===== 리캡차가 있다면 =====#####/////
  if ($(".g-recaptcha").length > 0) {
    if ($form.find("[name='g-recaptcha-response']").val() === "") {
      showAlert(combValidMsg("msg_자동등록방지"));
      $(".submit_btn").attr("disabled", false);
      return false;
    }
  }

  return true;
}


/*=================================================
    폼 유효성 검사
=================================================*/
function checkFormValid($el, options) {
  /*
   * $el : 
   *  $form: 전송될 form엘리먼트 
   *  $button: submit버튼 엘리먼트
   * options : 
   *  callback() : validation이후 실행되는 함수
   *  ajaxCallback() : input[name=ajax] true 일때 ajax처리 이후 실행되는 함수
   */
  options  = options || {};
  var result  = true;
  var $form = null;
  var $submitBtn = null;

  if ($el[0].tagName === "FORM" || $el.hasClass("valid_form")) {
    $form = $el;
  } else {
    $form = $("#"+($($el).data("form") || $($el).parents("form").attr("id")));
    $submitBtn = $el;
  }

  //중복클릭 방지
  if ($submitBtn) {
    $submitBtn.attr("disabled", true);
  }
  
  /////#####===== 폼 유효성 체크 =====#####/////
  result = isFormValid($form, $submitBtn);

  /////#####===== 결과 =====#####/////
  if (result){

     // callback 함수가 인자로 넘어오면 form submit은 callback 함수에서 처리
    if (typeof(options.callback) == "function") {
      options.callback($form);
    } else if (typeof(window[options.callback]) == "function") {
      window[options.callback]($form);
    } else {
      //##### Ajax send #####//
      if ($form.find("input[name=ajax]").val()=="true") {
        var action  = $form.attr("action");
        var alert_msg  = $form.find("input[name=alert_msg]").val();
        var ajax_empty  = $form.find("input[name=ajax_empty]").val();
        var close_modal  = $form.find("input[name=close_modal]").val();
        var form_data  = $form.serialize();

        $.ajax({
          type: "POST",
          async: false,
          url: action,
          dataType: "text",
          data: form_data,
          success: function(data, textStatus, jqXH){
            // ajax 요청 완료 후 버튼 disabled 해제
            if ($submitBtn) {
              $submitBtn.attr("disabled", false);
            }
            
            if (data && data.trim()!="ok"){
              var obj = $.parseJSON(data);
            }

            //== 폼 비우기 ==//
            if (ajax_empty!="false"){
              $form.find(".form-control").not(".not_empty").val("");
            }

            //== Modal 닫기 ==//
            if (close_modal) {
              $(close_modal).modal('hide');
            }

            //== 알림창 ==//
            if (alert_msg) {
              showAlert(alert_msg);
            }
            if (obj.csrf) {
              $("[name=" + obj.csrf.name + "]").val(obj.csrf.hash);
            }

            //== 콜백 ==//
            if (typeof(options.ajaxCallback) == "function"){
              options.ajaxCallback(data);
            } else if (typeof(window[options.ajaxCallback]) == "function"){
              window[options.ajaxCallback](data);
            }
          }, error: function(xhr, status, msg) {
            console.error(msg);

            //== 콜백 ==//
            if (typeof(options.ajaxErrorCallback) == "function"){
              options.ajaxErrorCallback.apply(null, arguments);
            }

          }
        });
      } else {
        //##### form Send #####//
        $form.submit();
      }
    }
  }
}

/*=================================================
    정규식 체크
=================================================*/
function testRegExp(type, str){
  var regExp;

  switch(type){
  case "num":
    regExp  = /^[0-9]*$/;
    break;
  case "dashnum":
    regExp  = /^[0-9-]*$/;
    break;
  case "low_eng":
    regExp  = /^[a-z]*$/;
    break;
  case "up_eng":
    regExp  = /^[A-Z]*$/;
    break;
  case "eng":
    regExp  = /^[A-Za-z]*$/;
    break;
  case "kor":
    regExp  = /^[가-힇]*$/;
    break;
  case "low_eng_num":
    regExp  = /^[a-z0-9_]*$/;
    break;
  case "up_eng_num":
    regExp  = /^[A-Z0-9_]*$/;
    break;
  case "eng_num":
    regExp  = /^[A-Za-z0-9_]*$/;
    break;
  case "eng_num_dash":
    regExp  = /^[A-Za-z0-9_-]*$/;
    break;
  case "email":
    regExp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    break;
  case "mobile":
    regExp  = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    break;
  case "phone":
    regExp  = /^\d{2,3}-\d{3,4}-\d{4}$/;
    break;
  case "url":
    regExp  = /^http/;
    break;
  case "password":
    //영어 숫자조합
    regExp  = /^.*(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    break;
  case "password2":
    //영어 대문자, 소문자, 숫자, 특수문자
    regExp  = /^.*(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+|<>?:{}]).*$/;
    break;
  case "link":
    regExp  = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
    break;
    case "http":
      regExp  = /^http[s]?\:\/\//i;
      break;
  }

  var result = regExp.test(str) ? true : combValidMsg(type);

  return result;
}


/*=================================================
    화면 설정
=================================================*/
/////#####===== 부트스트랩 그리드  =====#####/////
function getGrid() {
  var envs = ['xs', 'sm', 'md', 'lg', 'xl'];

  $el = $('<div>');
  $el.appendTo($('body'));

  for (var i = envs.length - 1; i >= 0; i--) {
    var env = envs[i];

    $el.addClass('hidden-'+env+"-up");

    if ($el.is(':hidden')) {
      $el.remove();
      return env
    }
  };
}

/////#####===== 뷰포트 사이즈 =====#####/////
function getViewport(){
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

/*=================================================
    지도 설정
=================================================*/
var all_maps  = [];

/////#####===== Map Canvas 설정 =====#####/////
if ($(".mapCanvas").length > 0) {
  $(".mapCanvas").each(function (key, val) {
    var map_type = $(val).data('type');
    var lat = Number($(val).data("lat"));
    var lng = Number($(val).data("lng"));
    var icon = $(val).data("icon");
    if (lat && lng) {
      init_map($(val), lat, lng, map_type, icon);
    }
  });
}

/////#####===== 지도 초기화 =====#####/////
function init_map($wrap, lat, lng, map_type, icon){
  window["set_"+map_type+"_map"]($wrap, lat, lng, icon);
}

function set_daum_map($wrap, lat, lng, icon){
  function setting() {
    //스크립트가 모두 로드 된 후 작동 되도록
    kakao.maps.load(function () {
      var coords = new kakao.maps.LatLng(lat, lng);

      var mapContainer = $wrap[0];
      var mapOption = {
        center: coords,
        level: 3
      };

      var map = new kakao.maps.Map(mapContainer, mapOption);

      var marker = new kakao.maps.Marker({
        position: coords,
        map: map
      });
    });
  }
  
  if (typeof (kakao) === 'undefined') {
      get_helper("get_settings", ["api_kakao"], function (rcv) {
      api_key = rcv;
    });
    asyncLoader.load("//dapi.kakao.com/v2/maps/sdk.js?appkey=" + api_key + "&autoload=false&libraries=services", setting);
  } else {
    setting();
  }
}

function set_google_map($wrap, lat, lng, icon){
  function setting() {
    var coords = new google.maps.LatLng(lat, lng);
    var iconBase = '/views/res/imgs/common/'; // 커스텀 아이콘 베이스 경로
    var darkMode = [{ // 다크 모드 스타일 
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{
        "saturation": 36
      }, {
        "color": "#000000"
      }, {
        "lightness": 40
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }, {
        "weight": 1.2
      }]
    }, {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "administrative.province",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.locality",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "saturation": "-100"
      }, {
        "lightness": "30"
      }]
    }, {
      "featureType": "administrative.neighborhood",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "gamma": "0.00"
      }, {
        "lightness": "74"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [{
        "lightness": "3"
      }]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 21
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 18
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 19
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }]

    var mapContainer = $wrap[0];
    var mapOption = {
      center: coords,
      zoom: 18,
      disableDefaultUI: true, // 모든 컨트롤러 비활성화
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: darkMode
    };

    var map = new google.maps.Map(mapContainer, mapOption);

    var marker = new google.maps.Marker({
      position: coords,
      map: map,
      icon: iconBase + icon // 커스텀 아이콘 추가
    });

    
    // 2번째 지도 (위도, 경도 스크립트 상에서 설정)
    var coords2 = new google.maps.LatLng(37.507562, 126.752062);

    var mapOption2 = {
      center: coords2,
      zoom: 18,
      disableDefaultUI: true, // 모든 컨트롤러 비활성화
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: darkMode

    };
    var map2 = new google.maps.Map(document.getElementById('mapCanvas2'), mapOption2);

    var marker2 = new google.maps.Marker({
      position: coords2,
      map: map2,
      icon: iconBase + icon
    });
  }
  if (typeof (google) === 'undefined') {
    get_helper("get_settings", ["api_google"], function (rcv) {
      api_key = rcv;
    });
    asyncLoader.load("//maps.googleapis.com/maps/api/js?key=" + api_key + '&language=' + langCheck, setting); // 구글 지도 langCheck 추가하지 않을 경우 오류 이슈
  } else {
    setting();
  }
}

function set_naver_map($wrap, lat, lng, icon) {
  function setting() {
    var coords = new naver.maps.LatLng(lat, lng);

    var mapContainer = $wrap[0];
    var mapOptions = {
      center: coords,
      zoom: 15,
    };
    var map = new naver.maps.Map(mapContainer, mapOptions);

    var marker = new naver.maps.Marker({
      position: coords,
      map: map
    });
  }
  if (typeof (naver) === 'undefined') {
    get_helper("get_settings", ["api_naver_map"], function (rcv) {
      api_key = rcv;
    });
    asyncLoader.load("//openapi.map.naver.com/openapi/v3/maps.js?ncpClientId="+api_key, setting);
  } else {
    setting();
  }
}

/////#####===== 주소검색(우편번호 찾기) =====#####/////
$(document).on("click", ".postcode_btn", function () {
  var $wrap = $(this).parents(".addrParent");
  getPostcode($wrap);
});

function getPostcode($wrap){
  if ($(".modal-postcode").length == 0) {
    var modalHtml = '<div class="alert-modal modal fade" id="modal-postcode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"> \
        <div class="modal-dialog modal-lg"> \
        <div class="modal-content"> \
          <div class="modal-header"> \
          <h4 class="modal-title">우편번호 찾기</h4> \
          <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">\
          </button> \
          </div> \
          <div class="modal-body" style="padding: 3px"></div> \
        </div> \
        </div> \
      </div>';

    $("body").append(modalHtml);
  }

  var postContainer = $("#modal-postcode .modal-body")[0];

  new daum.Postcode({
    oncomplete: function (data) {
      var fullRoadAddr = data.roadAddress;
      var extraRoadAddr = '';

      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }

      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
      }

      if (extraRoadAddr !== '') {
        extraRoadAddr = ' (' + extraRoadAddr + ')';
      }

      if (fullRoadAddr !== '') {
        fullRoadAddr += extraRoadAddr;
      }

      $wrap.find(".postcode").val(data.zonecode);
      $wrap.find(".addr_1").val(fullRoadAddr);
      // addr_1에 변경된 값이 val()로 수정되면 on change 함수가 걸리지 않기 때문에
      // trigger를 사용해서 변경되었다고 알려준다
      $wrap.find(".addr_1").trigger("change");

      $("#modal-postcode").modal("hide");
    },
    width: '100%',
    height: '500px'
  }).embed(postContainer);
  $("#modal-postcode").modal("show");
}
/*=================================================
    Input 관련 설정
=================================================*/
/////#####===== 입력 변경 설정 =====#####/////
$(document).on("keyup", ".replace_input", function(){
  var value  = $(this).val();
  var target  = $(this).data("target");
  var content  = $(this).data("content").replace("{value}", value);

  $(this).parents("form").find(target).val(content);
});

$(document).on("change", ".replace_select", function(){
  var value  = $(this).find("option:selected").text();
  var target  = $(this).data("target");
  var content  = $(this).data("content").replace("{value}", value);

  $(this).parents("form").find(target).val(content);
});

/////#####===== 비밀번호 변경 =====#####/////
$(document).on("click", ".readonly_pw", function(){
  var $input  = $(this);

  if ($input.prop("readonly")){
    showConfirm("비밀번호를 수정하시겠습니까?", "", {
      onClickOk: function() {
        $input.attr("readonly", false);
        $(".repw-group").removeClass("none");
        $input.addClass("valid_input");
        $input.focus();
      }
    });
  }
});

/////#####===== 엔터 클릭 =====#####/////
$(document).on("keyup", ".enter_submit", function(event){
  var target  = $(this).data("target")?$($(this).data("target")):$(this).parents("form").find(".submit_btn");

  if (event.which==13){
    event.preventDefault();
    target.trigger("click");
  }
});

/////#####===== 엔터 클릭 (폼) =====#####/////
$(document).on("keyup", ".enter_form input", function(event){
  var target  = $(this).data("target")?$($(this).data("target")):$(this).parents("form").find(".submit_btn");

  if (event.which==13){
    event.preventDefault();
    target.trigger("click");
  }
});

/////#####===== 단일 인풋 =====#####/////
$(document).on("keypress", ".only_input", function(e){
  var target  = $(this).data("target")?$($(this).data("target")):$(this).parents("form").find(".submit_btn");

  if (e.which==13){
    e.preventDefault();
    target.trigger("click");
  }
});

/////#####===== 인풋 합치기 =====#####/////
$(document).on("change", ".join-form", function(){
  var $this = $(this);
  if ($(this).attr("type")=="checkbox"){
    checkboxValChange($this);
  }
  setJoinForm($this);
});

$(document).on("keyup", ".join-form", function(){
  setJoinForm($(this));
});

function checkboxValChange($this){
  if($this.attr("name")=="mem_market_agree"){ //마케팅수신동의 예외처리
    if ($this.is(":checked")){
      $this.val("2");
      $this.attr("checked",true);
    }else{
      $this.val("1");
      $this.attr("checked",false);
    }
  }else{
    if ($this.is(":checked")){
      $this.val("1");
      $this.attr("checked",true);
    }else{
      $this.val("0");
      $this.attr("checked",false);
    }
  }
}

function setJoinForm($elem) {
  var target = $elem.data("target");
  var parent = $elem.data("parent") ? $elem.data("parent") : "form";
  var output = "", glue = "";

  $elem.parents(parent).find("[data-target='" + target + "']").each(function (key, val) {
    if (glue != "") output += glue;
    if ($(val).attr("type") == "radio" || $(val).attr("type") == "checkbox") {
      $(val).is(":checked") && (output += $(val).val());
    } else if ($(val).data('exp') == "link") {
      var expp = testRegExp('http', $(val).val());
      if (expp == true) {
        output += $(val).val();
      } else {
        output += 'http://'+$(val).val();
      }
    } else {
      output += $(val).val();
    }

    //값이 없으면 glue가 사라지게, data-keep="true" 를 설정하면 지우지 않고 유지됨
    if (output == "" && $(val).data("keep") !== true) {
      glue = "";
    } else {
      glue = $(val).data("glue") ? $(val).data("glue") : "";
    }
  });

  $elem.parents(parent).find(target).val(output);

  var len = $elem.parents(parent).find(target).data("len");
  if (len) {
  // validlen 길이 만큼 문자열이 됐다면 change 호출
    if (len == output.length)
      $elem.parents(parent).find(target).trigger('change');
  } else {
    $elem.parents(parent).find(target).trigger('change');
  }

}

/////#####===== 버튼 그룹 라디오 버튼화 =====#####/////
$(document).on("click", ".btn-group[data-target] [data-val]", function() {

  var $btnGroup = $(this).parents(".btn-group");
  var target = $btnGroup.data("target");
  var val = $(this).data("val");  // || $(this).text();
  $btnGroup.find(target).val(val);

  $(this).siblings().removeClass("active");
  $(this).addClass("active");
});



/*=================================================
    SNS 공유
=================================================*/
$(document).on("click", ".shareBtn", function(e){
  e.preventDefault();

  var sns_url  = "";
  var sns    = $(this).data("sns");
  var url    = $(this).data("url")||location.href;
  var text = $(this).data("text") || $("meta[name*=description]").attr("content"); // Description
  var title = $(this).data("title") || $("meta[name*=title]").attr("content"); // 상품명 or meta title
  var image  = $(this).data("img")||$("meta[property*=image]").attr("content"); // 상품이미지 or og
  var price  = " / " + $(this).data("price") + "원" || "" ; // 상품가격
  
  var _url   = encodeURIComponent(url);
  var _text  = encodeURIComponent(text);

  switch(sns){
    case "facebook":
      sns_url = "https://www.facebook.com/sharer/sharer.php?";
      sns_url += "u=" + _url;
      break;
    case "twitter":
      sns_url  = "https://twitter.com/intent/tweet?";
      sns_url += "text="+_text;
      sns_url += "&url="+_url;
      break;
    case "pinterest":
      sns_url = "https://pinterest.com/pin/create/button/?";
      sns_url += "url=" + url;
      sns_url += "&media=" + window.gReconers.BASEURL + image;
      sns_url += "&description=" + title;
      console.log(sns_url)
      break;
    case "band":
      sns_url  = "http://band.us/plugin/share?";
      sns_url += "body="+_text;
      sns_url += "&route="+url;
      break;
    case "kakaostory":
      api_init("kakao", function () {
        if (isMobile.any()) {
          Kakao.Story.open({
            url: url,
            text: title + price,
            urlInfo: {
              title: title,
              desc: text,
              name: '스토리텐',
              images: [image]
            }
          });
        } else {
          Kakao.Story.share({
            url: url,
            text: title + price
          });
        }
      });
      break;
    case "kakaotalk":
      api_init("kakao", function () {
        Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title: title + price,
            description: text,
            imageUrl: window.gReconers.BASEURL + image,
            link: {
              mobileWebUrl: url,
              webUrl: url
            }
          },
          buttons: [{
            title: '웹으로 보기',
            link: {
              mobileWebUrl: url,
              webUrl: url
            }
          }]
        });
      });
      break;
    case "link":
      var IE = (document.all) ? true : false;
      if (IE) {
        window.clipboardData.setData('Text', url);
        alert('주소가 복사되었습니다. Ctrl+V로 붙여 넣기 하세요.');
      } else {
        temp = prompt("아래 주소를 복사하세요", url);
      }
      break;
  }

  if (sns_url != ""){
    window.open(sns_url, "sns_popup", "width=410, height=540, resizable=no");
  }
});

/*=================================================
  SNS 로그인
 =================================================*/
/////#####===== API 초기회 =====#####/////
function api_init(sns_type, callback){
  var api_key = "";

  get_helper("get_settings", ["api_" + sns_type], function (rcv) {
    api_key = rcv;
  });

  if ( sns_type=="facebook" ){
    asyncLoader.load("facebookapi", function () {
      if (!FB.inited) {
        FB.init({
          appId: api_key,
          cookie: true,
          xfbml: true,
          version: 'v2.8'
        });
        FB.inited = true;
      }
      if (sessionStorage.getItem("capacitor") == '1') {
        // app facebook login plugin
        asyncLoader.load("iamport", function () {
          window.registerWebPlugin(window.FacebookLogin);
          typeof callback == "function" && callback(api_key);
        });
      } else {
        typeof callback == "function" && callback(api_key);
      }
    });
  }
  else if (sns_type == "kakao") {
    asyncLoader.load("kakaoapi", function () {
      if (!Kakao.inited) {
        Kakao.init(api_key);
        Kakao.inited = true;
      }

      typeof callback == "function" && callback(api_key);
    });
  }
  else {
    typeof callback == "function" && callback(api_key);
  }
}
/////#####===== 로그인 버튼 =====#####/////
$(document).on("click", ".snsLoginBtn", function (e) {
  e.preventDefault();

  //##### 변수 설정 #####//
  var $btn  = $(this);
  var sns_type  = $btn.data("type");
  var capacitor = sessionStorage.getItem("capacitor");
  var deviceOs = sessionStorage.getItem("deviceOs");
  if (capacitor == '1' && deviceOs == "android" && sns_type == "kakao") {
	  sns_type += "_rest";
  }
  
  var obj  = {mem_type:sns_type};

  //##### API 초기화 #####//
  api_init(sns_type, function (api_key) {
    //##### 페이스북 #####//
    if (sns_type == "facebook") {
      var permissions = "public_profile,email";
      var fields = "id,cover,name,age_range,link,gender,picture,friends,email";
      if (sessionStorage.getItem("capacitor") == '1') {
        window.Capacitor.Plugins.FacebookLogin.login({
          permissions: permissions.split(",")
        }).then(function (res) {
          if (res.accessToken) {
            window.Capacitor.Plugins.FacebookLogin.getProfile({
              fields:fields.split(",")
            }).then(function (response) {
              facebook_login (obj, response);
            });
          }
        });
      } else {
        FB.login(function (res) {
          if (res.status === 'connected') {
            FB.api('/me', {
              fields: fields
            }, function (me_res) {
              facebook_login(obj, me_res);
            });
          }
        }, {
          scope: permissions
        });
      }
    }
    //##### 카카오톡 #####//
    else if (sns_type == "kakao" || sns_type == "kakao_rest") {
      if (capacitor == '1') {
        if (deviceOs == "ios") {
          Kakao.Auth.authorize({
            redirectUri: window.gReconers.BASEURL + "login/exec_kakao_callback"
          });
        } else {
          var redirect = window.gReconers.BASEURL + "login/exec_kakao_callback";;
          var url = "https://kauth.kakao.com/oauth/authorize?client_id="+api_key+"&redirect_uri="+redirect+"&response_type=code&scope=profile,account_email";
          window.location.href = url;
        }
      } else {
        Kakao.Auth.login({
          success: function (res) {
            Kakao.API.request({
              url: '/v2/user/me',
              success: function (me_res) {
                Kakao.API.request({
                  url: '/v1/api/story/profile',
                  success: function (profile_res) {
                    obj.mem_id = me_res.id,
                    obj.mem_email = me_res.kakao_account.email,
                    obj.mem_name = profile_res.nickname,
                    obj.sns_image = profile_res.profileImageUrl,
                    obj.sns_link = profile_res.permalink
                    obj.sns_birthday = profile_res.birthday
  
                    var json = JSON.stringify(obj);
  
                    set_sns_login(json);
                  },
                  fail: function () {
                    // 카카오스토리 미가입자 [error 601]
                    obj.mem_id = me_res.id,
                    obj.mem_email = me_res.kakao_account.email,
                    obj.mem_name = me_res.properties && me_res.properties.nickname,
                    obj.sns_image = me_res.properties && me_res.properties.profile_image;
  
                    var json = JSON.stringify(obj);
  
                    set_sns_login(json);
                  }
                });
              },
              fail: function () {
                console.log(arguments);
              }
            });
          },
          fail: function (error) {
            showAlert(error.error_description);
          }
        });
      }
    }
    //##### 네이버 #####//
    else if (sns_type == "naver") {
      var redirect_uri = window.gReconers.BASEURL + "/login/exec_naver_callback";
      if (sessionStorage.getItem("capacitor") == '1') {
        redirect_uri += "/app";
      }
      var state = "INU_SOLUTION";

      var url = "https://nid.naver.com/oauth2.0/authorize?";
      url += "client_id=" + api_key;
      url += "&response_type=code";
      url += "&redirect_uri=" + redirect_uri;
      url += "&state=" + state;

      if (sessionStorage.getItem("capacitor") == '1') {
        window.location.href = url;
      } else {
        var login_popup = window.open(url, "NaverLogin", "top=0,left=0,width=550,height=550,toolbar=no,location=no");
      }
    }
  });
});

function facebook_login (obj, me_res) {
  obj.mem_id = me_res.id;
  obj.mem_email = me_res.email;
  obj.mem_name = me_res.name;
  obj.sns_image = me_res.picture && me_res.picture.data && me_res.picture.data.url;
  obj.sns_gender = me_res.gender == "male" ? 1 : 2;
  obj.sns_age = me_res.age_range && ((me_res.age_range.min * 1) + ((me_res.age_range.max || me_res.age_range.min) * 1)) / 2;
  obj.sns_link = me_res.link;

  var json = JSON.stringify(obj);

  set_sns_login(json);
}

function set_sns_login(json, ajaxCallback){
  var obj  = $.parseJSON(json);

  var $form  = $("<form>", {action:"/login/exec_sns_login",method:"post"});

  $.each(obj, function(key, val){
    $form.append($("<input>", {type:"hidden", name:key, value:val}));
  })

  if (ajaxCallback) {
    $.post($form.attr("action"), $form.serialize(), function (rv) {
      rv = JSON.parse(rv);
      if (typeof window[ajaxCallback] == 'function') {
        window[ajaxCallback](rv);
      }
    });

  } else {
    $("body").append($form);
    $form.submit();
  }
}

/*=================================================
    검색 버튼
=================================================*/
/////#####===== 출력수/정렬순 선택시 =====#####/////
$(document).on("change", ".srch_control", function(){
  var base_url  = $(this).data("base");
  var is_ajax  = $(this).data("ajax")||false;

  search_lists(base_url, is_ajax);
});

$(".srch_text, .srch_key").keyup(function (e) {
  if (e.keyCode == 13) {
    $('.srch_btn').trigger('click');
  }
});

$(document).on("click", ".srch_btn", function(){
  var base_url  = $(this).data("base");
  var is_ajax  = $(this).data("ajax");
  var target  = $(this).data("target")||".bd_wrap";
  search_lists(base_url, is_ajax, target);
});

/////#####===== 리스트 검색 =====#####/////
function search_lists(base_url, is_ajax, target){
  if (is_ajax){
    var bd_idx  = $(target).data("bd");
    var bcat_idx  = $(target).data("bcat");
    var type  = $(target).data("type");
    var layout  = $(target).data("layout")+(getGrid()=="xs"?"_m":"");
    var base_url  = $(target).data("url")?$(target).data("url"):"/_board/"+type+"/"+layout+"/"+bd_idx+"/"+bcat_idx;

    base_url  = base_url+"/lists_query";
  } else {
    var base_url  = base_url+"/lists_query";
  }

  var get = {};
  
  //##### 검색 키워드 #####//
  $(".srch_key").each(function (key, val) {
    var tmp = "";
    var key = "";
    var value = "";

    // 검색 키워드를 get 또는 uri 선택
    var urltype = $(val).data("urltype") || "uri";
    

    //== 검색 키워드(column명)와 텍스트(검색어)가 같은곳에 위치 ==//
    if ($(val).data("key")) {
      if ($(val).attr("type") == "checkbox") {
        // 검색 type 체크 박스
        if ($(val).is(":checked") && $(val) != "") {
          key = $(val).data("key");
          value = $(val).val();
        }
      } else {
        key = $(val).data("key");
        value = $(val).val();
      }
    }
    //== 검색 키워드(column명)와 텍스트(검색어)가 다른곳에 위치  ==//
    else {
      key = $(val).val();
      value = $($(val).data("target")).val();
    }

    if (key && value) {
      if (urltype=="uri") {
        base_url += "/" + key + "/" + encodeURIComponent(value);
      } else if (urltype == "get") {
        get[key] = encodeURIComponent(value);
      }
      
    }
  });
  if ($('[name=show_re]:checked').length > 0 ) {
    //상품 문의, 후기 답변 여부 확인
    var show_re = $('[name=show_re]:checked').val();
    get['show_re'] = show_re;
  }

  var limit  = $(".srch_limit").val()||"";
  var order  = $(".srch_order").val()||"";

  if (limit){
    base_url  += "/limit/"+limit;
  }

  if (order){
    var orders  = order.split("|");
    base_url  += "/order/"+orders[0]+"/sort/"+orders[1];
  }

  if (get) {
    base_url += "?";
    for (var key in get) {
      base_url += key+"="+get[key]+"&";
    }
  }

  if (is_ajax){
    set_hash_url(base_url, target);
  } else {
    window.location.href  = base_url;
  }
}

/*=================================================
    페이지 검색
=================================================*/
$(document).on("click", ".page_search_btn", function(){
  var keyword  = $(".page_search_input").val();

  window.location.href  = "/page/search/"+encodeURIComponent(keyword);
});

$(document).on("keyup", ".page_search_input", function(e){
  if (e.which==13){
    var keyword  = $(".page_search_input").val();

    window.location.href  = "/page/search/"+encodeURIComponent(keyword);
  }
});

/*=================================================
    팝업창
=================================================*/
$.get("/_crud/get_session", $.param({key:"alert_msg"}), function(rcv) {
  if (rcv) {
    rcv = JSON.parse(rcv);
    if (typeof rcv === "string") {
      showAlert(rcv);
    } else {
      var icon = null;
      var msg = null;

      switch (rcv.type) {
        case "attendence" :
          icon = "<img src='/views/res/imgs/common/icon_modal_cart.svg' class='mb-15'>";
          msg = icon
                + "<br>" + rcv.atd_success_duration + "일 연속 출석하고 적립금 " + rcv.atd_point + "원을 받아보세요!" 
                + "<br> 현재 연속 출석 횟수는 총 <span class='point-color'>" + rcv.atd_cnt + "회</span>입니다.";

          showAlert(msg, "", {
            btnTxtRight: "출석체크 확인",
            onClickBtn: function() {
              window.location.href = "/mypage/benefit"
            }
          });
          break;
      }
    }
  }
});

/////#####===== 중복으로 알림창 열린뒤 닫을 때 =====#####/////
$(document).on("hidden.bs.modal", ".modal", function(){
  if ($(".modal.in").length > 0){
    $("body").addClass("modal-open");
  }
});



/////#####===== 컨펌 창 =====#####/////
function showConfirm(msg, title, options) {
  //##### 변수 설정 #####//
  var msg    = msg ? decodeURIComponent(msg) : "";
  var title  = title || "";
  var btnTextRight = options.btnTxtRight ? options.btnTxtRight : combValidMsg("msg_확인");
  var btnTextLeft = options.btnTxtLeft ? options.btnTxtLeft : combValidMsg("msg_취소");

  //##### 컨텐츠 설정 #####//
  $("#confirm_modal").find(".modal-title").html(title);
  $("#confirm_modal").find(".modal-body").html(msg);

  $("#confirm_modal").modal("show");

  $("#confirm_modal .ok_btn").text(btnTextRight);
  $("#confirm_modal .cancel_btn").text(btnTextLeft);

  //##### 콜백 #####//
  $(document).on("hidden.bs.modal", "#confirm_modal", function(){
    if (typeof(options.onClose) == "function") {
      setTimeout(function(){
        options.onClose();
      },400);
    }
  });

  $("#confirm_modal").off("click", ".ok_btn");
  $("#confirm_modal").on("click", ".ok_btn", function() {
    $("#confirm_modal").modal("hide");

    if (typeof(options.onClickOk) == "function"){
      options.onClickOk();
    }
  });

  $("#confirm_modal").off("click", ".cancel_btn");
  $("#confirm_modal").on("click", ".cancel_btn", function() {
    $("#confirm_modal").modal("hide");

    if (typeof(options.onClickCancel) == "function"){
      options.onClickCancel();
    }
  });
}



/////#####===== 프롬프트 창 =====#####/////
function showPrompt(msg, title, input){
  //##### 변수 설정 #####//
  var msg    = msg?decodeURIComponent(msg):"";
  var title  = title||"프롬프트를 입력해주세요.";
  var input  = input;
  var callback  = arguments[3]?arguments[3]:"";

  //##### 컨텐츠 설정 #####//
  $("#prompt_modal").find(".modal-title").html(title);
  $("#prompt_modal").find(".modal-body .prompt_text").html(msg);
  $("#prompt_modal").find(".modal-body .prompt_input").val(input);

  $("#prompt_modal").modal("show");

  //##### 콜백 #####//
  $(document).on("hidden.bs.modal", "#prompt_modal", function(){
    if (typeof(options.onClose) == "function") {
      setTimeout(function(){
        options.onClose();
      },400);
    }
  });

  $("#prompt_modal").off("click", ".ok_btn");
  $("#prompt_modal").on("click", ".ok_btn", function() {
    $("#prompt_modal").modal("hide");

    if (typeof(options.onClickOk) == "function"){
      options.onClickOk();
    }
  });
}

/////#####===== 멀티폼 창 =====#####/////
function showMultiModal(input, self){
  //##### 변수 설정 #####//
  var input  = input;
  var title  = input.title||"입력해주세요.";
  var action  = input.action||"";

  //##### 컨텐츠 설정 #####//
  $("#multi_modal").find(".modal-title").html(title);

  $("#multi_modal #multi_from").attr("action", action );
  $("#multi_modal #multi_from").empty();
  $.each( input.object, function(key, val) {
    var obj = "";
    if ( val.type == "file" ) {
      obj = val.title;
      val.valid = val.valid || "";
      obj += "<input type='file' name='" +val.column+ "' class='" +val.class+ "' " +val.additional+ "  >";
    } else if ( val.type == "msg" ) {
      obj = val.title;
      obj += "<p>" +val.value+ "</p>";
    } else if ( val.type == "text" ) {
      obj = val.title;
      val.valid = val.valid || "";
      obj += "<input type='text' name='" +val.column+ "' class='" +val.class+ "'  " +val.additional+ " >";
    } else if ( val.type == "hidden" ) {
      obj = val.title;
      val.valid = val.valid || "";
      obj += "<input type='hidden' name='" +val.column+ "' class='" +val.class+ "' " +val.additional+ " >";
    }

    $("#multi_modal #multi_from").append( obj );
  });

  $("#multi_modal").modal("show");

  // modal-btn
  $("#multi_modal").off("click", ".modal-btn");
  $("#multi_modal").on("click",  ".modal-btn", function() {
    $form = $("#multi_modal #multi_from");

    checkFormValid($form, {
      callback: function() {
        if (typeof(input.callback) == "function") {
          input.callback( $form, self );
        } else if (typeof(window[input.callback]) == "function") {
          window[input.callback]( $form, self );
        } else {
          $form.submit();
        }
      }
    });
  });
}

$(document).on("click", ".multi_modal_btn", function(){
  var input = $($(this).data("input")).text();
  input = JSON.parse(input);
  input.callback = $(this).data("callback");

  showMultiModal(input, this);
});


function ajaxModal($elem) {
  var $target = $($elem.data("target"));
  var refresh = $elem.data("refresh");
  var url = $elem.data("url");
  var slide = $elem.data("slide");
  
  if ($target.length == 0 || refresh) {
    // ajax로 모달 가져오기
    $.get(url, "", function (rcv) {
      is_plaster = false;

      var obj = $.parseJSON(rcv);
      if (obj.success) {
        if ($target.length == 0) {
          $("body").append(obj.output);

        } else {
          $(".modal").modal("hide");
          $target.replaceWith(obj.output);
        }
        
        $target = $($elem.data("target"));

        if ($elem[0].ajaxModalCallback) {
          $elem[0].ajaxModalCallback.apply($elem[0], [$target[0]]);
        }
        setPlugin();
        
        $target.modal("show");

        // 댓글, 후기 수정 시 maxlength 데이터 가져오기
        if ($(".maxTextLength").length > 0) $(".maxTextLength").text($(".applyCount").data("maxlength"));

        if (slide) {
          $(slide).css("visibility", "hidden");
          asyncLoader.load("slick", function () {
            $(slide).css("visibility", "visible");
            $(slide).slick();
          });
        }
      } else {
        if (obj.msg) {
          alert(obj.msg);
        }
      }
    });

  } else {
    $target.modal("show");
  }
}
/*=================================================
 ajax 모달
 =================================================*/
$(document).on("click", ".ajaxModal[data-target][data-url]", function(e) {
  e.preventDefault();
  var $self = $(this);
  
  ajaxModal($self);
});

/*=================================================
    Delete 서브밋 (기존거)
=================================================*/
$(document).on("click", ".delete_board_btn", function(){
  var pkval  = $(this).data("pkval");
  var redirect  = $(this).data("redirect")||$("#delete_bc_form").find("[name='redirect']").val();
  var contentText = (langCheck !== 'ko') ? "Are you sure you want to delete it?" : "삭제 하시겠습니까?";
  var contentTitle = (langCheck !== 'ko') ? "To delete" : "삭제하기";

  $("#delete_bc_form").find("[name='pkval']").val(pkval);
  $("#delete_bc_form").find("[name='redirect']").val(redirect);

  showConfirm(contentText, contentTitle, {
    onClickOk: function() {
      $("#delete_bc_form").submit();
    }
  });
});

/*=================================================
  Delete 서브밋(new)
 =================================================*/
$(document).on("click", ".del_btn", function(){
  var pkval  = $(this).data("pkval");
  var redirect  = $(this).data("redirect")||$("#delete_bc_form").find("[name='redirect']").val();

  $("#delete_bc_form").find("[name='pkval']").val(pkval);
  $("#delete_bc_form").find("[name='redirect']").val(redirect);

  $("#delete_bc_form").submit();
});

/*=================================================
   엑셀 다운로드
 =================================================*/
$(document).on("click", ".down_excel_btn", function(){
  var key   = $(this).data("key");
  var data  = $(this).data("data");
  var column  = $(this).data("column");

  if (typeof column != "string"){
    column  = JSON.stringify(column);
  }

  $("#excel_form").find("input[name=key]").val(key);
  $("#excel_form").find("input[name=data]").val(data);
  $("#excel_form").find("input[name=column]").val(column);

  $("#excel_form").submit();
});

/*=================================================
    다운로드 링크
=================================================*/
$(document).on("click", ".downloadLink", function(){
  var idx  = $(this).data("idx");

  // $("#download_form").find("input[name=name]").val(name);
  // $("#download_form").find("input[name=path]").val(path);
  $("#download_form").find("input[name=idx]").val(idx);

  $("#download_form").submit();
});


$(document).on("click", ".null-link", function(e){
  e.preventDefault();
  return false;
});

/*=================================================
    CheckBox
=================================================*/
/////#####===== 전체 체크 =====#####/////
$(document).on("change", ".checkAll", function(){
  var is_check  = $(this).prop("checked");

  $(".each_check").not(":disabled").prop("checked", is_check);

  // checkbox change 이벤트는 트리거로 불르수 없기에
  // 이벤트를 만들어 준다.
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    $(".each_check").each(function(idx, elem) {
      elem.dispatchEvent(evt);
    });
  } else {
    $(".each_check").each(function(idx, elem) {
      elem.fireEvent("onchange");
    });
  }
});

$(document).on("change", ".each_check", function(){
  var checked_num = $(".each_check:checked").length;
  if ( $(".each_check").length == checked_num ) {
    $(".checkAll").prop("checked", true);
  } else {
    $(".checkAll").prop("checked", false);
  }
});

/*=================================================
    숫자 설정
=================================================*/
function setComma(num){
  if (window.gReconers.currency == "$") {
    num = parseFloat(num).toFixed(2);
  } else if (window.gReconers.currency == "원") {
    num = parseInt(num);
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeComma(text){
  return text.toString().replace(/\,/g, "");
}

/*=================================================
 object 속성 갯수
 =================================================*/
function objCount(obj) {
  var count = 0;
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop))
      count = count + 1;
  }
  return count;
}
/*=================================================
 현재 언어와 비교해서 default 언어면 /en 나오지 않도록
 =================================================*/
function url(url, lang) {
  lang = lang ? lang : $('html').data('lang');
  return lang != window.gReconers.default_lang ? "/"+lang+url : url;
}

/*=================================================
    추가데이터 가져오기
=================================================*/
if ($(".add_data_wrap").length > 0){
  $(".add_data_wrap").each(function(key, val){
    var snd  = {
      prefix : $(val).data("prefix"),
      category : $(val).data("category"),
      idx : $(val).data("idx"),
      template: $(val).data("template") || "root",
      lang: $(val).data('lang'),
      admin: $(val).data('isadmin'),
    }

    getAddData(snd);
  });

  function getAddData(snd_data) {
    var lang = (snd_data.lang) ? snd_data.lang : 'ko';
    var action = "/"+lang+"/_ajax/add_data";
    var callback = arguments[1]?arguments[1]:"";

    var snd = snd_data;

    $.ajax({
      type: "POST",
      async: false,
      url: action,
      data: snd,
      success: function(data, textStatus, jqXH){
        if (data){
          var output  = $.parseJSON(data);

          if (output.skeleton) {
            asyncLoader.load("blockFactory", function() {
              BlockFactory.create({
                skeleton: output.skeleton,
                data: output.data,
                files: output.files,
                appendWrap: ".add_data_wrap",
                commonData: {fileInfo: output.fileInfo, foreign_idx: snd.idx},
                columnPrefix: snd.prefix+"_data_",
                columnAttr: "name",
                autoInit: true,
                template: snd.template,
              });
            });
          }

          if (typeof(callback) == "function"){
            callback();
          } else if (typeof(window[callback]) == "function"){
            window[callback](data);
          }
        }
      }
    });
  }
}


/*=================================================
    좋아요
=================================================*/
$(document).on("click", ".btnLike", function() {
  var $btn = $(this);
  var idx  = $(this).data("idx");
  var cate  = $(this).data("cate");
  var type  = $(this).data("type");
  var target  = $(this).data("target");

  get_session({key:"mem_idx"}, function(data) {
    var mem_idx  = data;
    
    if (mem_idx) {
      $.post("/_crud/set_like", $.param({type:type, idx:idx, cate:cate}), function(rcv) {

      if (rcv) {
        var obj  = $.parseJSON(rcv);
        if (obj.result == "error") {
          showAlert(obj.msg);
        } else {
          if (target) {
            $(target).text(obj.total);
          }

          if (obj.result == "like") {
            $btn.addClass("is-active");
          } else {
            $btn.removeClass("is-active");
          }
        }
      }
      });
    } else {
      showAlert(combValidMsg("msg_로그인_필요"), "", {
        onClickBtn: function() {
          window.location.href = "/login";
        }
      });
    }
  });
});

/*=================================================
    세션 불러오기
=================================================*/
function get_session(snd, callback){
  $.ajax({
    type  : "GET",
    async  : false,
    url  : "/_crud/get_session",
    data  : snd,
    success: function(data, textStatus, jqXH){
      if (typeof(callback) == "function"){
      callback(data);
      } else if (typeof(window[callback]) == "function"){
      window[callback](data);
      }
    }
  });
}

function call_user_callback(callback, obj) {
  if (typeof (callback) == "function") {
    callback(obj);
  } else if (typeof (window[callback]) == "function") {
    window[callback](obj);
  }
}

function get_helper(method, params, callback){
  window._helpers = window._helpers || {};
  if (window._helpers[method + "_" + params]) {
    call_user_callback(callback, window._helpers[method + "_" + params]);
  }

  var snd  = {
    method  : method,
    params  : params
  }

  $.ajax({
    type  : "POST",
    async  : false,
    url  : "/_crud/get_helper",
    data  : snd,
    success  : function(data, textStatus, jqXH){
      if (data){
        var obj  = $.parseJSON(data);
        window._helpers[method + "_" + params] = obj;
        call_user_callback(callback, obj);
      }
    }
  })
}

/*=================================================
    코드 생성
=================================================*/
function createCode(num_len, str_len){
  var code  = "";

  var number  = "0123456789";
  var string  = "abcdefghijklmnopqrstuvwxyz";

  if (num_len){
    for(var i=0; i<num_len; i++){
      var random_idx = Math.floor(Math.random()*number.length);
      code += number.substring(random_idx, random_idx+1);
    }
  }

  if (str_len){
    for(var i=0; i<str_len; i++){
      var random_idx = Math.floor(Math.random()*string.length);
      code += string.substring(random_idx, random_idx+1);
    }
  }

  return code;
}

function getRandomNumber(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCode(len){
  var len  = len?len:5;

  return Math.random().toString(36).substr(2, len);
}

/*=================================================
    data 속성 설정
=================================================*/
$.fn.setData  = function(key, value){
  $(this).data(key, value);
  $(this).attr("data-"+key, value);
}

/*=================================================
    add & remove 클래스
=================================================*/
$.fn.addRemoveClass  = function(className, removeClass){
  var $this  = $(this);

  $(removeClass).removeClass(className);
  $this.addClass(className);
}

/*=================================================
    Cookie 설정
=================================================*/
function set_cookie(name, value, expire, domain, path, prefix, secure, httponly){
  var snd  = {
    name  : name,
    value  : value,
    expire  : expire,
    domain  : domain,
    path  : path,
    prefix  : prefix,
    secure  : secure,
    httponly  : httponly
  }

  $.post("/_crud/setting_cookie", $.param(snd));
}

function get_cookie(index, xss_clean){
  var snd  = {
    index  : index,
    xss_clear  : xss_clean
  }

  var result = "";
  $.ajax({
    type  : "GET",
    async  : false,
    url  : "/_crud/getting_cookie",
    data  : snd,
    success  : function(data, textStatus, jqXH){
      result = data;
    }
  });
  return result;
}


/*=================================================
 Popup
 =================================================*/
if ($(".popup").length) {
  $(window).resize(function(){
    $(".popup").each(function(){
      if (window.innerWidth < 768) {
        var header_height = $("header").height();
        $(this).css({
          top : header_height + 10,
          zIndex : $(this).data('index') + 699
        })
        
      } else {
        $(".popup.draggable").draggable({ 'cancel': '.popup-bottom-wrap' });
        $(this).css({
          top : $(this).data('top'),
          left : $(this).data('left'),
          zIndex: $(this).data('index') + 1000
        })
      }
    })
  }).resize();
}

/*=================================================
    AJAX 게시판
=================================================*/
var loaded_scripts  = [];
var loaded_styles  = [];

/////#####===== 게시판 전체 설정 =====#####/////
function set_all_board(){
  if ($(".bd_wrap").length > 0){
  //##### 개별 게시판 설정 #####//
  $(".bd_wrap").each(function(key, val){
    var $wrap  = $(this);

    set_board($wrap);
  });
  }
}

/////#####===== 게시판 설정 =====#####/////
function set_board($wrap){
  var callback  = $wrap.data("callback");

  //##### Send 데이터 설정 #####//
  var snd  = {
    bd_idx  : $wrap.data("bd"),
    bcat_id  : $wrap.data("bcat"),
    page  : $wrap.data("page"),
    add_where  : $wrap.data("where"),
    is_mobile  : (getGrid()=="xs")?true:false
  };

  //##### AJAX 설정 #####//
  $.ajax({
  type: "POST",
  async: false,
  url: "/_board/lists",
  data: snd,
  success: function(data, textStatus, jqXH){
    if (data){
    var obj  = $.parseJSON(data);

    //== CSS 불러오기 ==//
    $.ajax({
      async: false,
      // url: "/application/views/layout/board/"+obj.data.bd.bd_layout+"/style.css",
      url: "/layout/board/"+obj.data.bd.bd_layout+"/style.css",
      success: function(rcv){
      var style_name  = obj.data.bd.bd_layout;

        if ($.inArray(style_name, loaded_styles) == -1){
          loaded_styles.push(style_name);

          // var css_link = $("<link rel='stylesheet' href='/application/views/layout/board/"+obj.data.bd.bd_layout+"/style.css'>");
          var css_link = $("<link rel='stylesheet' href='/layout/board/"+obj.data.bd.bd_layout+"/style.css'>");

          $("head").append(css_link);
        }
      }
    });

    //== 아웃풋 설정 ==//
    $wrap.html(obj.output);

    //var js_link = "/application/views/layout/board/"+obj.data.bd.bd_layout+"/script.js";
    var js_link = "/layout/board/"+obj.data.bd.bd_layout+"/script.js";

    //== 스크립트 불러오기 ==//
    $.ajax({
      async: false,
      url: js_link,
      dataType: "script",
      success: function(rcv){
      var script_name  = obj.data.bd.bd_layout+"_script";

      if ($.inArray(script_name, loaded_scripts) == -1){
        loaded_scripts.push(script_name);
      }

      window[script_name]["lists"]($wrap);
      }
    });

    //== 콜백 ==//
    if (typeof(callback) == "function"){
      callback();
    } else if (typeof(window[callback]) == "function"){
      window[callback]();
    }
    }
  }
  });
}

/////#####===== 카테고리 선택 =====#####/////
$(document).on("click", ".bcatBtn", function(e){
  var $wrap  = $(this).data("target")?$($(this).data("target")):($(this).parents(".bd_wrap").length>0?$(this).parents(".bd_wrap"):false);

  if ($wrap!=false){
  e.preventDefault();

  //##### 변수 설정 #####//
  var $wrap  = $(this).parents(".bd_wrap");
  var bcat_id  = $(this).data("bcat");

  //##### 게시판 데이터 설정 #####//
  $wrap.data("bcat", bcat_id);
  $wrap.data("page", 1);

  //##### 게시판 설정 #####//
  set_board($wrap);
  }
});

/////#####===== 페이지 이동 =====#####/////
$(document).on("click", ".bd_wrap .page-link", function(e){
  e.preventDefault();

  //##### 변수 설정 #####//
  var $wrap  = $(this).parents(".bd_wrap");
  var page  = $(this).data("ci-pagination-page");

  //##### 게시판 데이터 설정 #####//
  $wrap.data("page", page);

  //##### 게시판 설정 #####//
  set_board($wrap);
});

/////#####===== 게시물 쓰기/보기 =====#####/////
$(document).on("click", ".board_btn", function(e){
  e.preventDefault();

  //##### 변수 설정 #####//
  var show_type  = $(this).data("type")||(($(this).parents(".bd_wrap").length>0)?"fsp":"link");
  var type  = $(this).hasClass("board_write_btn")?"write":"view";
  var $wrap  = $(this).parents(".bd_wrap")||$(this).parents(".page_bd_wrap");
  var wrap_id  = $wrap.attr("id")||$wrap.parents("section").attr("id");
  var bc_idx  = $(this).data("idx");

  if (show_type=="link"){
    window.location.href  = $(this).attr("href");
  }
  else {
    var hash  = "#"+wrap_id+"_"+type;
    hash  += bc_idx?("_"+bc_idx):"";

    document.location.hash = hash;
  }
});


//=================================================
//  Plugin 설정
//=================================================
function setPlugin() {
  /////#####===== scrollTrigger 애니메이션 설정 =====#####/////
  $("[data-scrollani]").length && asyncLoader.load("scrollTrigger", function() {
    scrollAni.getInstance().init();
  });
  
  /////#####===== ckeditor 설정 =====#####/////
  $(".ckeditor").length && asyncLoader.load("ckeditor", function () {
    $(".ckeditor").each(function (key, val) {
      var $this = $(this);
      var ck_id = $(val).prop("id");

      if (ck_id && CKEDITOR.instances[ck_id]) {
        // 이미 ckeditor 셋팅되었다면 넘기기
        return true;
      }

      CKEDITOR.replaceClass = null;

      ck_id = "text_" + createCode(5);

      $(val).attr("id", ck_id);
      var option = {};
      if ($(val).data('height')) {
        option.height = $(val).data('height');
      }
      
      CKEDITOR.replace(ck_id, option);

      //form validation을 위한 코드 
      var $parentForm = $this.closest("form") || $this.closest(".valid_form");

      //valid_input이면서 이벤트 타입이 change라면 키업으로 validation하는 코드 추가
      if ($this.hasClass("valid_input") && $parentForm.data("evt-type") === "change") {
        CKEDITOR.instances[ck_id].on("change", function(e) {
          this.updateElement();
          isElValid($this, $parentForm, "change");
        });
      }
    });
  });

  // 편집기 컨테츠가 보여질때, ckeditor/contents.css 로드
  // 편집기 내용과, 메인 컨테츠가 보여질때 같은 스타일을 사용하기 위함
  $(".ckeditor_content").length && asyncLoader.load("/views/res/lib/default/ckeditor/contents.css", {id:"ckeditorContent", tag: "link", position: { selector: "head", type: "appendChild" }});

  /////#####===== colorpicker 설정 =====#####/////
  $(".colorpicker").length && asyncLoader.load("colorpicker", function () {
    $(".colorpicker").colorPicker();
  });

  /////#####===== Selectize 설정 =====#####/////
  ($("input.selectize").length || $("input.selectize_select").length) && asyncLoader.load("selectize", function () {
    $("input.selectize").each(function (key, elem) {
      // 중복 셋팅 방지
      if (!elem.selectize) {
        var stz = $(elem).selectize({
          plugins: ['remove_button', 'drag_drop'],
          delimiter: '|',
          persist: false,
          create: function (input) {
            return {
              value: input,
              text: input
            }
          }
        });
        
        if (stz.hasClass("selectizeUppercase")) {
          stz[0].selectize.$control_input.keydown(function(e) {
            if ( e.keyCode >= 65 && e.keyCode <= 90) {
              $(this).val(function(i, val) {
                  return val + String.fromCharCode(e.keyCode).toUpperCase();
              });
              return false;
            }
          })
        }
      }
    });
    
    $("input.selectize_select").each(function (key, elem) {
      // 중복 셋팅 방지
      if (!elem.selectize) {
        $(elem).selectize();
      }
    });
  });

  /////#####===== select2 설정 =====#####/////
  $(".select2js").length && asyncLoader.load("select2", function () {
    $(".select2js").each(function () {
      var $select = $(this);
      $select.not(".select2-hidden-accessible").css("width", "100%");
      $select.not(".select2-hidden-accessible").select2({
        theme: $select.data("theme") ? $select.data("theme") : "style1", // 테마셋팅 (기본테마:style1)
        minimumResultsForSearch: $select.data("select2-search") ? 0 : "Infinity", // 'Infinity': 검색기능 숨김
        width: 'resolve',
      });
    });

    var $select = $(".select2js");

    $select.not(".select2-hidden-accessible").css("width", "100%");

    $select.not(".select2-hidden-accessible").select2({
      theme: $select.data("theme") ? $select.data("theme") : "style1", // 테마셋팅 (기본테마:style1)
      minimumResultsForSearch: $select.data("select2-search") ? 0 : "Infinity", // 'Infinity': 검색기능 숨김
      width: 'resolve'
    });
  });

  /////#####===== slick 설정 =====#####/////
  $("[data-slick='true']").length && asyncLoader.load("slick", function () {
    $("[data-slick='true']").css("visibility", "visible");
  });

  /////#####===== swiper 설정 =====#####/////
  $(".swiper").length && asyncLoader.load("swiper", function () {
    $(".swiper").css("visibility", "visible");
  });

  /////#####===== 말줌임기능 설정 =====#####/////
  $(".dotdotdot").length && asyncLoader.load("dotdotdot", function () {
    $('.dotdotdot').dotdotdot({ watch: window });
  });

  /////#####===== 팬시박스 설정 =====#####/////
  $(".fancybox").length && asyncLoader.load("fancybox", function () {

    $(".fancybox").fancybox({
      padding: 0,
      helpers: {
        overlay: {
          locked: false
        }
      }
    });

    $(document).on("click", ".fancybox", function (e) {
      e.preventDefault();

      var href = $(this).attr("href");
      $.fancybox({
        href: href,
        padding: 0,
        helpers: { overlay: { locked: false } }
      });
    });

  });

  /*****#####===== 데이트타임 피커 설정 =====#####*****/
  if ($(".datetimepicker").length && jQuery().datetimepicker){
    $(".datetimepicker").datetimepicker({
      monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      dayNamesMin: ['일','월','화','수','목','금','토'],
      weekHeader: 'Wk',
      dateFormat: 'yy-mm-dd',
      timeFormat: "HH:mm:ss",
      autoSize: false,
      changeMonth: true,
      changeYear: true,
      showMonthAfterYear: true,
      currentText: "현재",
      closeText: "확인",
      timeText: "시간",
      hourText: "시",
      minuteText: "분",
      secondText: "초"
      });
  }

  /////#####===== 데이트 피커 설정 =====#####/////
  if ($(".datepicker").length && jQuery().datepicker) {
    var default_option = {
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      weekHeader: 'Wk',
      dateFormat: 'yy-mm-dd',
      autoSize: false,
      changeMonth: true,
      changeYear: true,
      showMonthAfterYear: true
    }

    $(".datepicker").each(function () {
      var $this = $(this);
      var option = default_option;

      option.minDate = ($this.data("min") != undefined) ? $this.data("min") : null;
      option.maxDate = ($this.data("max") != undefined) ? $this.data("max") : null;

      $this.datepicker(option);
    });
  }

  /////#####===== 파일 첨부 utils =====#####/////
  $(".fileInputTrigger").length && asyncLoader.load("fileattach", function () {});

  /////#####===== photo swipe =====#####/////
  if (typeof initPhotoSwipeFromDOM == "function") {
    initPhotoSwipeFromDOM('.photo-swipe');
  }

  /////#####===== 멀티테이블 설정 =====#####/////
  $(".multitable").length && asyncLoader.load("multitable", function () {
    $(".multitable").multiTable();
  });
};
setPlugin();

  /*================숫자만 입력===================*/
  window.removeChar = function (event,type){
    event = event || window.event;
    var str = event.target.value.replace(/[^0-9]/g, "");
    event.target.value = str != "" ? (type=="strnumber"? str : parseInt(str)) : "";
  };

  /*=================================================
    input 숫자만 입력
    =================================================*/
  $(document).on("keyup", "input.only_number, input.only_strnumber", function(event) {
    var type = $(this).hasClass("only_strnumber")?"strnumber":"number";
    removeChar(event,type);
  });

  /*================숫자,문자만 입력===================*/
  window.removeSChar = function (event) {
    event = event || window.event;
    var str = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
    event.target.value = str != "" ? str : "";
  };

  /*=================================================
    input 숫자,문자만 입력
    =================================================*/
  $(document).on("keyup", "input.onlyStrNumber", function (event) {
    removeSChar(event);
  });

  /*=================================================
  체크박스 모두동의
  =================================================*/
  $("#allCheck").on("change click", function () {  //전체선택 체크박스 클릭;
    if ($("#allCheck").prop("checked")) {     // 만약 전체 선택 체크박스가 체크된상태일경우
      $(".info-check[type=checkbox]").prop("checked", true).change();// 해당화면에 전체 checkbox들을 체크해준다
    } else {    // 전체선택 체크박스가 해제된 경우
      $(".info-check[type=checkbox]").prop("checked", false).change();// 해당화면에 모든 checkbox들의 체크를해제시킨다.
    }
  });

  /*=================================================
  체크박스 모두동의
  =================================================*/
  $(".info-check").on("change", function () {
    var checkBoxCnt = $(".info-check[type=checkbox]").length;
    var checkedCnt = $(".info-check[type=checkbox]:checked").length;

    if (checkedCnt < checkBoxCnt) {
      $("#allCheck").prop("checked", false);
    } else if (checkedCnt == checkBoxCnt) {
      $("#allCheck").prop("checked", true);
    }
  });

  /*=================================================
    약관모달 승인버튼 클릭
  =================================================*/
  $(document).on("click", ".btnTermAgree", function() {
    var $this = $(this);
    var target = $this.data("target");
    var targetId = target.split("-")[2];
    var $targetCheckBox = $("[data-term-type=" + targetId + "]");

    if (!$targetCheckBox.is(":checked")) {
      $targetCheckBox.trigger("click");
    }

    $("#" + target).modal("hide");
  });


  /*=================================================
    ck-editor 유튜브 아이프레임 높이값 정해주기
    =================================================*/
  function iframeHeihgt(){
    var iframe = $(".board-ckeditor_content [src*='https://www.youtube.com']"),
    iframeWidth = iframe.outerWidth()/1.7;
    iframe.css({
      height:iframeWidth,
    });
  }

  $(window).resize(function(){
    iframeHeihgt();
  });

  /*=================================================
    전체화면 로딩
    =================================================*/
  var Utils = {
    blockUI: function (options) {
      asyncLoader.load("blockui", function() {
        Utils._blockUI(options);
      });
    },
    _blockUI: function (options) {
      options = $.extend(true, {}, options);
      var html = '';
      if (options.animate) {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
      } else if (options.iconOnly) {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="/views/res/imgs/common/loading-spinner-grey.gif" align=""></div>';
      } else if (options.textOnly) {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
      } else {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="/views/res/imgs/common/loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
      }

      if (options.target) { // element blocking
        var el = $(options.target);
        if (el.height() <= ($(window).height())) {
          options.cenrerY = true;
        }

        el.block({
          message: html,
          baseZ: options.zIndex ? options.zIndex : 1000,
          centerY: options.cenrerY !== undefined ? options.cenrerY : false,
          css: {
          top: '10%',
          border: '0',
          padding: '0',
          backgroundColor: 'none'
          },
          overlayCSS: {
          backgroundColor: options.overlayColor ? options.overlayColor : '#555',
          opacity: options.boxed ? 0.05 : 0.1,
          cursor: 'wait'
          }
        });

      } else { // page blocking
        $.blockUI({
          message: html,
          baseZ: options.zIndex ? options.zIndex : 1000,
          css: {
          border: '0',
          padding: '0',
          backgroundColor: 'none'
          },
          overlayCSS: {
          backgroundColor: options.overlayColor ? options.overlayColor : '#555',
          opacity: options.boxed ? 0.05 : 0.1,
          cursor: 'wait'
          }
        });
      }
    },
    unblockUI: function (target) {
      asyncLoader.load("blockui", function () {
        Utils._unblockUI(target);
      });
    },
    // wrApper function to  un-block element(finish loading)
    _unblockUI: function (target) {
      if (target) {
        $(target).unblock({
          onUnblock: function () {
            $(target).css('position', '');
            $(target).css('zoom', '');
          }
        });
      } else {
        $.unblockUI();
      }
    }
  };

  /*=================================================
  svg Class controll
  =================================================*/
  SVGElement.prototype.hasClass = function (className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this.getAttribute('class'));
  };

  SVGElement.prototype.addClass = function (className) {
  if (!this.hasClass(className)) {
    this.setAttribute('class', this.getAttribute('class') + ' ' + className);
  }
  };

  SVGElement.prototype.removeClass = function (className) {
  var removedClass = this.getAttribute('class').replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
  if (this.hasClass(className)) {
    this.setAttribute('class', removedClass);
  }
  };

  /* ==========================================================================
      관리자>목록>조건검색>등록일(오늘, 일주일, 1,3,6개월) 기간 세팅 

      시작, 종료일을 검색하면 다음과 같이 URL에 날짜 정보를 넣어 이동한다
      (예) /lists_query/min_cpn_regdate/2022-04-19/max_cpn_regdate/2022-05-19
  ========================================================================== */
  if ($(".search_date").length > 0) {
    var $search_date = $(".search_date");

    // 등록일 기간별 버튼 클릭 시
    $(document).on("click", ".search_date .btn", function () {
      var $this = $(this);
      var registDate = get_reg_date_names();
      var dateVal = $this.data("dateVal");
      $this.addRemoveClass("active", ".search_date .btn");

      $(registDate.min_date).val(add_today(-dateVal, "days"));
      $(registDate.max_date).val(get_today()); // 오늘
    });

    $(document).on("change", ".datepicker", function () {
      $(".search_date .btn").removeClass("active");
    });

    function get_reg_date_names() {
      var target = $search_date.data("target");
      return {
        min_date : "[data-key=min_" + target + "]",
        max_date : "[data-key=max_" + target + "]"
      };
    }
    // XXXX-XX-XX 형식의 오늘 날짜 리턴
    function get_today() {
      return moment(new Date()).format("Y-MM-DD");
    }
    // 오늘로부터 val 이전 또는 이후 날짜 리턴
    function add_today(val, type) {
      return moment(new Date()).add(val, type).format("Y-MM-DD");
    }
    // 오늘과 reg_date의 기간 차이 리턴
    function diff_today(reg_date) {
      return moment(new Date()).diff(moment(reg_date), "days");
    }

    // 페이지 로딩 시
    // - .search_date 중 일치하는 날짜가 있을경우, 해당 버튼을 활성화하기 위한 기능
    function set_search_date() {
      var registDate = get_reg_date_names();
      var max_regdate = $(registDate.max_date).val();

      if (max_regdate == get_today()) {
        var dateVal = diff_today($(registDate.min_date).val());
        $("[data-date-val=" + dateVal + "]").addClass("active");
      }
    }
    set_search_date();
  }

/* ==========================================================================
  remove_space
    - 데이터 양 옆의 스페이스값을 지워주는 함수
    - 데이터 사이 스페이스값 제거 X
  ========================================================================== */
  function remove_space($el) {
    var $form = null;

    if ($el[0].tagName === "FORM" || $el.hasClass("valid_form")) {
      $form = $el;
    } else {
      $form = $("#" + ($($el).data("form") || $($el).parents("form").attr("id")));
    }
    $form.find(".input_trim").each(function (key, val) {
      $(val).val($.trim($(val).val()));
    });
  }

