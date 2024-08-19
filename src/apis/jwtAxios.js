import axios from "axios";

// 기본 axios 인스턴스 생성
const jwtAxios = axios.create();

// interceptors.request
jwtAxios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("token");

    // 기본 Authorization 헤더 추가
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// interceptors.response
jwtAxios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getAccessToken();
        // 새로 받은 토큰을 sessionStorage에 저장
        sessionStorage.setItem("token", newAccessToken);
        // Authorization 헤더를 새로 받은 토큰으로 업데이트
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return jwtAxios(originalRequest);
      } catch (error) {
        console.error("토큰 갱신 및 재요청 실패:", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const getAccessToken = async () => {
  try {
    const response = await axios.get("/api/user/access-token");
    console.log("getAccessToken : ", response.data);
    return response.data.resultData.accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const makeRequest = async (url, method, data = {}, headers = {}) => {
  try {
    const response = await jwtAxios({
      url,
      method,
      data,
      headers: {
        ...headers,
      },
    });
    return response;
  } catch (error) {
    console.error("요청 실패:", error);
    throw error;
  }
};

export default jwtAxios;
