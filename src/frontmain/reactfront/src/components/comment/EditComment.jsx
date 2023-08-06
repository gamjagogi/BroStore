import React, {useState} from 'react';
import axios from "../../screens/Request/RequestConfig";
import {Button, Form} from "react-bootstrap";

const EditComment = (props) => {

    const [isEditComment, setIsEditComment] = useState(false);

    const { userId,boardId} = props;
    const [loginError, setLoginError] = useState('');
    const [contentBuf,setContentsBuf] = useState(''); //실시간 댓글 input값

    const inputContent = (props) => {
        const value = props.target.value;
        console.log(value);
        if(value.length<=300){
            setContentsBuf(value);
        }else{
            alert('길이 초과');
        }
    }

    const createComment = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            console.log(accessToken);
            console.log(refreshToken);

            const requestData = {'content':contentBuf};

            if (accessToken && refreshToken) {
                // 요청 보내기
                console.log("댓글데이터!!!!!"+requestData);
                const response = await axios.post(`/auth/question/comment/save/${userId}/${boardId}`, JSON.stringify(requestData), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    // 응답 성공 시 처리할 작업
                    console.log('댓글쓰기 성공'); // 요청에 대한 응답 처리
                    window.location.reload();

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

    return(
        <div>
        <Form className="mb-4" onSubmit={createComment}>
            <Form.Group controlId="commentText">
                <Form.Label>댓글</Form.Label>
                <Form.Control required as="textarea" rows={4} onChange={inputContent}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                등록
            </Button>
        </Form>
        </div>
    )
}

export default EditComment