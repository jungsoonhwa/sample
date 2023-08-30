const platformEnv 	= localStorage.getItem('platformEnv');
const platformApi 	= localStorage.getItem('platformApi');
const platformFront = localStorage.getItem('platformFront');

/*Api Url 주소 */
const apiUrls = {
  fileApi:		platformApi.concat("/v3/common")
  , loginApi: 	platformApi.concat("/v3/auth") 
  , boardApi: 	platformApi.concat("/v3/board")
  , categoryApi:platformApi.concat("/v1/category")
  , surveyApi:	platformApi.concat("/v2/survey")
  , userApi:		platformApi.concat("/v1/user")
  , mailingApi: platformApi.concat("/v1/mailing")
  , sessionApi: platformApi.concat("/v1/session")
  , popupApi: 	platformApi.concat("/v1/popup")
  , consultApi: platformApi.concat("/v1/consulting")
  , loggingApi: platformApi.concat("/v1/logging")
  , projectApi: platformApi.concat("/v1/projectinfo")
  , projectApi2: platformApi.concat("/v2/projectinfo")
  , micecontApi:platformApi.concat("/v1/micecontents")
  , mypageApi:	platformApi.concat("/v1/mypage")
  , bannerApi:	platformApi.concat("/v1/banner")
  , contentApi:	platformApi.concat("/v1/contents")
  , commonApi : platformApi.concat("/v3/common")
  , counseling : platformApi.concat("/v1/counseling")
  , coupon : platformApi.concat("/v1/coupon")
  , goodsApi : platformApi.concat("/v1/goods")
    , orderApi : platformApi.concat("/v1/order")
}

const apiPaths = {
  fileApi: '/v3/common',
  loginApi: '/v3/auth',
  boardApi: '/v3/board',
  categoryApi: '/v1/category',
  surveyApi: '/v2/survey',
  userApi: '/v1/user',
  mailingApi: '/v1/mailing',
  sessionApi: '/v1/session',
  popupApi: '/v1/popup',
  consultApi: '/v1/consulting',
  loggingApi: '/v1/logging',
  projectApi: '/v1/projectinfo',
  projectApi2: '/v2/projectinfo',
  micecontentsApi: '/v1/micecontents',
  mypageApi: '/v1/mypage',
  bannerApi: '/v1/banner',
  contentApi: '/v1/contents',
  subscribeApi: '/v1/subscribe'
};

const apiKeys = {
    miceKey: "UTWZhH6Z7UyXWlEJlfBRfuA6YAwQ0O9b",
    fileKey: "Gckz6U0RZasLPUTh7Sh7apXAzi998MWf",
    cndKey: "eb65ab3e407744c3b87e04c9ede58d39",
    sns_instakey : "IGQVJYY0UzRTJ5T0NTZA2FfVEpqSy1RcFB6R0htTThSa05IeEFpamF5RVVwSUw5Q1ZAaQWhTWndGZAlJqcXAtSmJqeE9qdk9COWJxZAEN3cHg4RHhRbWttZAGpQajNST21NVlFTX2VBR1d5emRKUFNmZAUdOUAZDZD",
    //임시계정 key 나중에 공식계정 key로 변경
    sns_kakaokey : "85b4849dd0daa8bb84d34c398ca6092a",
    sns_meta : "435491038409553"

    };
const snsDev = {
    facebookDevLink : "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse",
};

const contentTypes = {
  youTube: 'CTC001'
  , cdn: 'CTC002'
  , attach: 'CTC003'
};

const uploads = {
    cdn : {
        urlPath: "https://vod01.ezpmp.co.kr/TEST/"
        , appendFileNameCnd: function(t){
            let appendNameHeader = "TEST_";
            let appendNameFooter = "1080";
            t = appendNameHeader + t;
            let fileLength = t.length;
            let lastDot = t.lastIndexOf(".");
            let fileName = t.substring(0, lastDot);
            let fileExtension = t.substring(lastDot + 1, fileLength);
//            return fileName + "." + appendNameFooter + "." + fileExtension;
            return t;
        }
        , appendFileName: function(t){
            let appendNameHeader = "";
            let appendNameFooter = "1080";
            t = appendNameHeader + t;
            let fileLength = t.length;
            let lastDot = t.lastIndexOf(".");
            let fileName = t.substring(0, lastDot);
            let fileExtension = t.substring(lastDot + 1, fileLength);
            return fileName + "." + appendNameFooter + "." + fileExtension;
        }
        , reMakeFileName: function(t){
            const appendName = "1080";
            let fileLength = t.length;
            let lastDot = t.lastIndexOf(".");
            let fileName = t.substring(0, lastDot);
            let fileExtension = t.substring(lastDot + 1, fileLength);
            return fileName + "." + appendName + "." + fileExtension;
        }
        , accessCode: "eb65ab3e407744c3b87e04c9ede58d39"
        , upload: "https://vas-upload.ktcdn.co.kr/v1/upload/content/"
        , list: "https://vas-api.ktcdn.co.kr/v1/contents"
        , view: "https://vas-api.ktcdn.co.kr/v1/contents/{0}"
        , play: "https://vas-api.ktcdn.co.kr/v1/dvr/profile/{0}"
    }

    , attach : {
        upload: apiUrls.fileApi + "/file"
        , update: apiUrls.fileApi + "/file/{0}"
        , download: apiUrls.fileApi + "/file/download/{0}"
        , delete: apiUrls.fileApi + "/file/{0}"
        , list: apiUrls.fileApi + "/file"
    }
    , errorMsg: "파일을 업로드하지 못했습니다. 잠시 후 다시 시도해주세요."
    , headerUrl: platformFront
}


const favTypes = {
	coCtntFaveType			: "company_contents"	//companyCtnt(기업소개) 즐겨찾기유형
	, companyFaveType		: "company"				//company(기업) 즐겨찾기유형
}

const fileRefKeys = {
	// coCtntThumbRefKey 		: "co_ctnt_video_thumb_"//companyCtnt(기업소개) 영상업로드,유튜브 썸네일 파일
	coCtntThumbRefKey 		: "company_introduce_"//companyCtnt(기업소개) 영상업로드,유튜브 썸네일 파일
	// , coCtntImgFileRefKey 	: "co_ctnt_img_"		//companyCtnt(기업소개) 이미지 파일
	, coCtntImgFileRefKey 	: "company_introduce_"		//companyCtnt(기업소개) 이미지 파일
	, exhiLayoutRefKey		: "exhi_layout_"		//전시배치도 파일
	// , companyLogoRefKey		: "logo_image_file"		//회사 로고파일
	, companyLogoRefKey		: "company_logo_"		//회사 로고파일
	// , companyDocumentRefKey	: "company_document_"	//기업자료
	, companyDocumentRefKey	: "company_sub_document_"	//기업자료
	// , companyAllowRefKey	: "company_allow_"		//허가 및 특허증
	, companyAllowRefKey	: "company_permit_license_"		//허가 및 특허증
}

const fileRefTbNms = {
	// coCtntThumbRefTbNm		: "tb_company_ctnt"		//companyCtnt(기업소개) 영상업로드,유튜브 썸네일 파일
	coCtntThumbRefTbNm		: "tbc_session_ctnt"		//companyCtnt(기업소개) 영상업로드,유튜브 썸네일 파일
	// , coCtntImgFileRefTbNm 	: "tb_company_ctnt"		//companyCtnt(기업소개) 이미지 파일
	, coCtntImgFileRefTbNm 	: "tbc_session_ctnt"		//companyCtnt(기업소개) 이미지 파일
	, exhiLayoutRefTbNm		: "tb_site_info"		//전시배치도 파일
	, companyLogoRefTbNm	: "tb_company"			//회사 로고파일
	, companyDocumentRefTbNm: "tb_company"			//기업자료
	, companyAllowRefTbNm	: "tb_company"			//허가 및 특허증
}

/* ########################################################################################## */
/* ########################################################################################## */
/* ################아래는 기존쓰던것입니다 추후에 수정 필요_ 20220403########################## */
/* ########################################################################################## */
/* ########################################################################################## */
const refKeys = {
    companyLogoRefKey: "company_logo_"
    , companyPitchingRefKey: "company_pitching_"
    , companyIntroduceRefKey: "company_introduce_"
    , companyContentRefKey: "_exhibition_content_detail_video_thumbnail"
    , companyContentTitleRefKey: "exhibition_thumbnail"
    , companyContentListRefKey: "company_content_list_"
    , companySubDocumentRefKey: "company_sub_document_"
    , companySubSiteRefKey: "company_sub_site_"
    , companyAllowRefKey: "company_allow_"

}

const refKeysMc = {
    companySubDocumentRefKey: "CSDRK"
    , companySubSiteRefKey: "CSSRK"
    , companyContentRefKey: "MAO"
}

const refTbNms = {
    companyTbNm: "tb_company"
    , companyIntroduceTbNm: "tb_company_ctnt"
    , companySessionTbNm: "tbc_session"
    , companyContentTbNm: "tbc_session_ctnt"
    , companyDetailSub: "tb_company_detail_sub"

}

// 설문 공통코드
const surveyCode = {
	common					: "ZST999"
	, cancellationReason 	: "ZST001"
	, exhibitorSurvey		: "ZST002"
	, buyerSurvey			: "ZST003"
	, visitorSurvey			: "ZST004"
	, bizResult				: "ZST005"
};

const commonCode = {
	code				: "common"
	, id				: 9999
	, survey			: "survey"
	, surveyCode 	: 1
};

const mailTemplateCode = {
    exhibitTemplate         :   "EMC101"
    , buyerTemplate         :   "EMC102"
    , visitorTemplate       :   "EMC103"
    , requestTemplate       :   "EMC351"
    , cancelTemplate        :   "EMC352"
    , modifyTemplate        :   "EMC353"
    , confirmTemplate       :   "EMC354"
    , noteTemplate          :   "EMC401"
    , reportTemplate        :   "EMC402"
    , exhibitTitle          :   "[안내]전시사 등록 완료 안내"
    , buyerTitle            :   "[안내]바이어 등록 완료 안내"
    , visitorTitle          :   "[안내]참관객 등록 완료 안내"
    , requestTitle          :   "[안내]미팅 신청 안내"
    , modifyTitle           :   "[안내]미팅 수정 안내"
    , cancelTitle           :   "[안내]미팅 취소/거절 안내"
    , confirmTitle          :   "[안내]미팅 확정 안내"
    , noteTitle             :   "[안내]노트 발송 안내"
    , reportTitle           :   "[안내]신고사항 안내"
};

const mailTemplateCodeEN = {
    exhibitTemplate         :   "EMC101"
    , buyerTemplate         :   "EMC102"
    , visitorTemplate       :   "EMC103"
    , requestTemplate       :   "EMC351"
    , cancelTemplate        :   "EMC352"
    , modifyTemplate        :   "EMC353"
    , confirmTemplate       :   "EMC354"
    , noteTemplate          :   "EMC402"
    , reportTemplate        :   "EMC403"
    , exhibitTitle          :   "Exhibitor registration is confirmed"
    , buyerTitle            :   "Buyer registration is confirmed"
};
