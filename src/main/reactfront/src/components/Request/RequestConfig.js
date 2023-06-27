import axios from 'axios';

const RequestConfig = axios.create({
    baseURL: 'https://api.hjstore.shop', // 백엔드 서버의 URL로 설정합니다.
});

export default RequestConfig;
