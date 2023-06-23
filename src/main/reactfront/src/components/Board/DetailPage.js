import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export default function Detail() {
    const [loginError, setLoginError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [domain, setDomain] = useState('http://13.124.84.124:9999');
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
                const response = await fetch(`${domain}//auth/shop/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    }
                });

                if (response.ok) {
                    const postData = await response.json();
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
    return (
        <div style={{ height: '100vh', marginTop: '50px' }}>
            <Container fluid>
                <button onClick={handleGoBack} style={{ position: 'absolute', left: '10px', top: '70px' }}>
                    뒤로가기
                </button>
                <Card border="primary">
                    <Card.Header style={{ height: 'calc(8vh - 10px)', fontSize: '30px' }}>{title}</Card.Header>
                    <Card.Body style={{ height: 'calc(100vh - 50px)' }}>
                        <Card.Text dangerouslySetInnerHTML={{ __html: content }} />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
