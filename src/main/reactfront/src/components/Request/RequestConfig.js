import axios from 'axios';

const RequestConfig = axios.create({
    baseURL: 'http://3.37.156.51:9999', // 백엔드 서버의 URL로 설정합니다.
});

export default RequestConfig;