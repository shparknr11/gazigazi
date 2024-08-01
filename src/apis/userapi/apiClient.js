import axios from "axios";
import store from "../../store"; // 스토어를 가져옵니다

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.token; // token을 가져옵니다
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiClient;
