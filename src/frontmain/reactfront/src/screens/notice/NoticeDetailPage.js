import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Card} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from '../Request/RequestConfig.js';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Paging from "../../components/Paging";

export default function NoticeDetailPage() {
    // 게시글 ID를 URL 파라미터로부터 추출합니다.
    const {id} = useParams();

    const [loginError, setLoginError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [boardUserId, setBoardUserId] = useState('');


    const navigate = useNavigate();

    const userId = sessionStorage.getItem('userData2');
    const boardId = id;

    useEffect(() => {
        fetchPost();
        return;
    },[])



    const handleGoBack = () => {
        navigate('/notice'); // 뒤로가기 버튼을 누를 때 이전 페이지로 이동
    };

    // 본문 업데이트
    const handleUpdate = () => {
        const userId = sessionStorage.getItem('userData2');
        if (boardUserId != userId) {
            alert('권한이 없습니다.');
            return window.location.reload();
        }
        navigate(`/notice/editor/${userId}?boardId=${id}&content=${content}&title=${title}`);
    }

    // 본문, 댓글 가져오기.
    const fetchPost = async () => {
        try {
            const response = await axios.get(`/notice/detail/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                const postData = await response.data;
                console.log(postData.data);
                setTitle(postData.data.title);
                setContent(postData.data.content);
                setBoardUserId(postData.data.userId);
                return;
            } else {
                console.error('게시글을 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    };


// 이미지 리사이즈 함수
    const resizeImagesInContent = async (htmlContent) => {
        console.log(htmlContent);
        // HTML 문자열을 파싱하여 DOM 객체로 만듭니다.
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(htmlContent, 'text/html');
        console.log(doc);

        // 모든 <img> 태그를 선택합니다.
        const imgTags = doc.querySelectorAll('img');

        console.log(imgTags);

        // 각 이미지에 대해 리사이징을 수행합니다.
        imgTags.forEach((imgTag) => {
            const originalWidth = imgTag.width; // 원본 이미지 너비
            const originalHeight = imgTag.height; // 원본 이미지 높이

            // 이미지 크기를 조정하는 로직을 여기에 추가합니다.
            // 예를 들어, 이미지를 50% 크기로 리사이즈하려면 다음과 같이 처리할 수 있습니다.
            const resizedWidth = originalWidth + 800;
            const resizedHeight = originalHeight + 700;

            // 이미지의 너비와 높이를 새로운 크기로 설정합니다.
            imgTag.width = resizedWidth;
            imgTag.height = resizedHeight;
        });

        // 리사이징이 적용된 DOM 객체를 다시 HTML 문자열로 변환하여 반환합니다.
        const resizedContent = new XMLSerializer().serializeToString(doc);
        console.log(resizedContent);
        return resizedContent;
    };


    // 컴포넌트에서 사용할 때
    const [resizedContent, setResizedContent] = useState('');

    useEffect(() => {
        const resizeContent = async () => {
            try {
                const resizedContent = await resizeImagesInContent(content);
                setResizedContent(resizedContent);
            } catch (error) {
                console.error('이미지 리사이징 중 오류 발생:', error);
            }
        };

        resizeContent();
        return;
    }, [content]);


    const handleDelete = async () => {
        const userId = sessionStorage.getItem('userData2');
        if (boardUserId != userId) {
            alert('권한이 없습니다.');
            return window.location.reload();
        }

        // 확인 문구
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (!shouldDelete) {
            return; // 사용자가 "취소"를 선택한 경우 아무 작업도 하지 않고 종료
        }


        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(accessToken);
            console.log(refreshToken);

            if(accessToken && refreshToken){
                const response = await axios.post(`/admin/notice/delete/${id}/${userId}`,JSON.stringify(""),{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    }
                });

                if (response.status == 200) {
                    // 응답 성공 시 처리할 작업
                    alert('삭제 성공');
                    navigate('/notice');

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
            }else {
                setLoginError('인증 권한을 가진 유저만 접근 가능합니다.'); // 로그인되지 않은 경우 처리
            }
        } catch (error) {
            console.error("에러발생", error);
        }
    }



    return (
        <div style={{minHeight: '120vh', marginTop: '50px',marginBottom:'30px'}}>
            <Container fluid>
                <Card border="primary">
                    <Card.Header style={{fontSize: '30px'}}>
                        <Card.Text>
                        {title}
                        </Card.Text>
                    </Card.Header>
                    <Card.Body style={{minHeight: 'calc(100vh - 50px)'}}>
                        <Card.Text
                            dangerouslySetInnerHTML={{__html: resizedContent}}
                        />
                    </Card.Body>
                </Card>
                <div className="offset-md-8" style={{marginTop: '10px', display: 'flex'}}>
                    <button onClick={handleDelete} style={{marginRight: '10px', color: 'red'}}>
                        삭제하기
                    </button>
                    <button onClick={handleUpdate} style={{marginRight: '10px'}}>
                        수정하기
                    </button>
                    <button onClick={handleGoBack}>
                        뒤로가기
                    </button>
                </div>
            </Container>
        </div>
    );
}
