import axios from "../Request/RequestConfig";
import {useEffect, useState} from "react";

const DataRequest = async (url) => {

        try {
            console.log('fetch시작');

            // Fetch post using `id`
            const response = await axios.get(`${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const postData = response.data;
                console.log(postData.data);

                return postData;
            } else {
                console.error('게시글을 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('에러 발생.', error);
        }
}

export default DataRequest;