import axios from 'axios';

const RequestConfig = axios.create({
    baseURL: 'http://43.202.90.1:9999', // 백엔드 서버의 URL로 설정합니다.
});
// https://api.hjstore.shop

export default RequestConfig;
