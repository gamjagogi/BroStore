import axios from 'axios';

const RequestConfig = axios.create({
    baseURL: 'http://localhost:3005', // 백엔드 서버의 URL로 설정합니다.
});
// https://api.hjstore.shop
// http://localhost:3005

export default RequestConfig;
