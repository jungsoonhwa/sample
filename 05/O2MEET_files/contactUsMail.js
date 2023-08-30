function sendMail(){

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const content = document.getElementById("content").value;


    let map = {
        name : name,
        email : email,
        phone : phone,
        content : content
    }


    const hostname = String(window.location.hostname);
    let miceMail = '';
    let o2meetMail = '';
    let ccName = '';
    switch(hostname){
        case 'localhost':
            miceMail = "heeje_shin@ezpmp.co.kr"
            o2meetMail = "heeje_shin@ezpmp.co.kr"
            ccName = "test"
            break;
        default :
            miceMail = "pbiz@ezpmp.co.kr,micep@ezpmp.co.kr"
            o2meetMail = "info@o2meet.io"
            ccName = "플랫폼비즈니스팀,MICE플랫폼팀"
    }

    let data = {
        projectCd: "common"
        , siteId: 9999
        , langCd: "KR"
        , emailTypeCdForTemplate: "EMC903"
        , emailTypeCdForSender: "EMC999"
        , senderNm: "[O2Meet] CONTACT US"
        , emailTitle: "[O2Meet] CONTACT US"
        , ccEmail : "pbiz@ezpmp.co.kr,micep@ezpmp.co.kr"
        , ccNm : "플랫폼비즈니스팀,MICE플랫폼팀"
        , recipientNm: "[O2Meet]"
        , recipientEmail: "info@o2meet.io"
        , sendTypeCd: "MDC001"
        , keyValue: map
    }
    axios
        .post(`${apiUrls.mailingApi}/mailsend/single`,data)
        .then(res => {
            alert("접수가 완료되었습니다.");
            location.href = "./main.do";
        })
        .catch(err => {
            console.error(err);
        });

}