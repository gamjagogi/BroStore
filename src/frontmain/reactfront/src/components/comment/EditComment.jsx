import React from 'react';
import axios from "../../screens/Request/RequestConfig";

const EditComment = async (props) => {
    const commentId = props;

    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const id = sessionStorage.getItem('userData2');
        console.log(accessToken);
        console.log(refreshToken);
        const {title, content,boardId} = state;

        const requestData = { title,content,boardId};

        if (thumbnail !== "") {
            requestData.thumbnail = thumbnail;
        }
        console.log(requestData);

        if (accessToken && refreshToken) {
            // 요청 보내기
            const response = await axios.post(`/auth/board/comment/${id}`, JSON.stringify(requestData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'RefreshToken': `Bearer ${refreshToken}`,
                },
            });

            if (response.status == 200) {
                // 응답 성공 시 처리할 작업
                const data = await response.data;
                console.log(data); // 요청에 대한 응답 처리
                alert('수정완료!');
                navigate('/board');

            } else {
                // 응답 실패 시 처리할 작업
                const errorMessages = await response.data;
                console.log(errorMessages.errors);
                const errors = errorMessages.errors;
                for (const error of errors) {
                    console.log(error.defaultMessage);
                    alert(error.defaultMessage);
                }
            }
        } else {
            setLoginError('인증 권한을 가진 유저만 접근 가능합니다.'); // 로그인되지 않은 경우 처리
        }
    } catch (error) {
        console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
        setLoginError('인증된 유저만 접근 가능합니다.');
    }
}

export default EditComment