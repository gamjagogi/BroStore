import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../Request/RequestConfig.js';
import Resizer from 'react-image-file-resizer'

export default function Detail() {
    const [loginError, setLoginError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();


    const handleGoBack = () => {
        navigate(-1); // 뒤로가기 버튼을 누를 때 이전 페이지로 이동
    };


    // 게시글 ID를 URL 파라미터로부터 추출합니다.
    const { id } = useParams();

    const fetchPost = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(accessToken);
            console.log(refreshToken);

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/shop/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    const postData = await response.data;
                    console.log(postData.data);
                    setTitle(postData.data.title);
                    setContent(postData.data.content);
                } else {
                    console.error('게시글을 가져오는데 실패했습니다.');
                }
            } else {
                setLoginError('인증되지않은 유저는 접근할 수 없습니다.'); // 로그인되지 않은 경우 처리
            }
        } catch (error) {
            console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
            setLoginError('인증된 유저만 접근 가능합니다.');
        }
    };


    useEffect(() => {
        fetchPost(); // 컴포넌트가 마운트될 때(fetchPost()의 의존성 배열이 빈 배열) fetchPost 함수를 호출합니다.
    }, []);


    const handleImageResize = (src) => {
        // 이미지 리사이징 작업을 수행하고 리사이즈된 이미지의 주소를 반환합니다.
        // 예를 들어, 이미지를 50% 크기로 리사이징하려면 다음과 같이 처리할 수 있습니다.
        const resizedImageSrc = Resizer.resizeAndRotateImage(
            src,
            50, // width
            50, // height
            'JPEG', // format
            50, // quality
            0, // rotation
            (uri) => {
                // 리사이징된 이미지 주소를 처리하는 콜백 함수
                console.log(uri); // 리사이징된 이미지의 주소를 콘솔에 출력합니다.
            },
            'base64', // outputType
            50, // maxWidth
            50 // maxHeight
        );

        // 리사이징된 이미지 주소를 반환합니다.
        return resizedImageSrc;
    };

    return (
        <div style={{ height: '100vh', marginTop: '50px' }}>
            <Container fluid>
                <button onClick={handleGoBack} style={{ position: 'absolute', left: '10px', top: '70px' }}>
                    뒤로가기
                </button>
                <Card border="primary">
                    <Card.Header style={{ height: 'calc(8vh - 10px)', fontSize: '30px' }}>{title}</Card.Header>
                    <Card.Body style={{ height: 'calc(100vh - 50px)' }}>
                        <Card.Text
                            dangerouslySetInnerHTML={{ __html: handleImageResize(content) }}
                        />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
