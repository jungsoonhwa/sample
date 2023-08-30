const validate = (stat) => {
  return stat >= 200 && stat < 300; // default
}

axios.interceptors.request.use(
  function (config) {
    config.baseURL = localStorage.getItem('platformApi');
    config.timeout = 60000;
    const token = sessionStorage.getItem('token');
    if(token !== null || token !== "" || token !== undefined) {
      config.headers.common['Authorization'] = token;
    }

    // config.headers.common['Cache-Control'] = 'no-cache';
    // config.headers.common['Pragma'] = 'no-cache';
    // config.headers.common['Expires'] = '0';
    config.headers.common['Content-Type'] = 'application/json';
    config.headers.common['Access-Control-Allow-Origin'] = '*';
    config.headers.common['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, PATCH, OPTIONS';

    config.withCredentials = false;
    config.responseEncoding = 'utf-8';
    config.validateStatus = validate;
    return config;
  },
  function (error) {
    console.log(error.response);
    return Promise.reject(error);
  });

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errorData = error.response.data;
    const httpStatus = errorData.httpStatus;
    // switch (httpStatus) {
    //   case 401: // 로그인을 안한 경우 보여줄 페이지
    //     location.href = '';
    //     break;
    //   case 403: // 페이지에 권한이 없는 경우 보여줄 페이지
    //     location.href = '';
    //     break;
    // }
    const msg = `Status: ${httpStatus}, Error: ${errorData.errorMessage}, Detail: ${errorData.detailMessage}`;
    console.error('Error>', msg);
    return Promise.reject(error);
  });

const reValue = (val) => {
  return val.value === '' ? null : val.value;
}

const reObjValue = (elements) => {
  const keys = Object.keys(elements);
  keys.forEach(key => {
    console.log(`${key}: ${JSON.stringify(elements[key])}`);
    if(key === 'lastMobileNo' || key === 'lastNumber') {
      elements[key] = elements[key] === '' || elements[key] === null ? null : elements[key].replaceAll("-","");
    } else if(key === 'lastTelNo') {
      elements[key] = elements[key].replaceAll("-","");
    }
    else {
      elements[key] = elements[key] === '' || elements[key] === null ? null : elements[key];
    }
  });
  return elements;
}