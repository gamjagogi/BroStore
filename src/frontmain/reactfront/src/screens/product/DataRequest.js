import axios from "../Request/RequestConfig";
import {useEffect, useState} from "react";

const DataRequest = async (url) => {

    console.log("진입");
    console.log(url)

    //const [requestData,setRequestData] = useState([]);

    // useEffect(() => {
    //     console.log("useEffect시작");
    //     fetchPost().then((postData) => {
    //         console.log(postData.data);
    //         setRequestData(postData);
    //     })
    // }, []);

        try {
            console.log('fetch시작');
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            // Fetch post using `id`
            const response = await axios.get(`${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'RefreshToken': `Bearer ${refreshToken}`,
                },
            });

            if (response.status === 200) {
                const postData = response.data;
                console.log(postData.data);

                return postData;
            } else {
                console.error('게시글을 가져오는데 실패했습니다.');
                throw new Error('게시글을 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('인증되지 않은 사용자가 접근하려 합니다.', error);
            throw error;
        }
}

export default DataRequest;