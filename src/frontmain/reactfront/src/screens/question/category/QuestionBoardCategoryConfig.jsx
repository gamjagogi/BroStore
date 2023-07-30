import axios from "../../Request/RequestConfig";
import {useState} from "react";


const QuestionBoardCategoryConfig = (categoryName) => {

    const category = categoryName;
    console.log(category);
    const id = sessionStorage.getItem('userData2');

    const getAll = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const userId = sessionStorage.getItem('userData2');
            console.log(userId);
            const id = userId;

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/question/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    const data = await response.data.data;
                    console.log(data);
                    return data;
                } else {
                    console.error('해당 게시글 목록이 존재하지않습니다.');
                }
            } else {
                console.error('로그인이 필요합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    };

    const getRequestSeller = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const userId = sessionStorage.getItem('userData2');
            console.log(userId);
            const id = userId;

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/question/seller/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    const data = await response.data.data;
                    console.log(data);
                    return data;
                } else {
                    console.error('해당 게시글 목록이 존재하지않습니다.');
                }
            } else {
                console.error('로그인이 필요합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    };



    if(category==''){
        return getAll();
    }else if (category == 'RequestSeller'){
        return getRequestSeller();
    }else{
        return getAll();
    }
}

export default QuestionBoardCategoryConfig;