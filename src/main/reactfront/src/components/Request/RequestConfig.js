import axios from 'axios';

const RequestConfig = axios.create({
    baseURL: 'http://13.124.84.124:9999', // 백엔드 서버의 URL로 설정합니다.
});

export default RequestConfig;
