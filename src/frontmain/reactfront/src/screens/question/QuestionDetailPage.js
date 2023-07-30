import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Card} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from '../Request/RequestConfig.js';
import Comments from "./comment/Comments";

export default function QuestionDetailPage() {
    const [loginError, setLoginError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [boardUserId, setBoardUserId] = useState('');
    const [category, setCategory] = useState('');
    const [frontCategory, setFrontCategory] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fetchPost(); // 컴포넌트가 마운트될 때(fetchPost()의 의존성 배열이 빈 배열) fetchPost 함수를 호출합니다.
    }, []);


    const handleGoBack = () => {
        navigate(-1); // 뒤로가기 버튼을 누를 때 이전 페이지로 이동
    };

    const handleUpdate = () => {
        const userId = sessionStorage.getItem('userData2');
        if (boardUserId != userId) {
            alert('권한이 없습니다.');
            return window.location.reload();
        }
        navigate(`/question/editor/${userId}?title=${title}&content=${content}&category=${category}&boardId=${id}`);
    }

    // 게시글 ID를 URL 파라미터로부터 추출합니다.


    const fetchPost = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(accessToken);
            console.log(refreshToken);

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/question/detail/${id}`, {
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
                    setBoardUserId(postData.data.userId);
                    setCategory(postData.data.category);
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
                if (category == "RequestSeller") {
                    setFrontCategory("판매자 신청");
                }
            } catch (error) {
                console.error('이미지 리사이징 중 오류 발생:', error);
            }
        };

        resizeContent();
    }, [content]);


    return (
        <div style={{height: '200vh', marginTop: '30px'}}>
            <Container fluid>
                <div className="col-3" style={{marginBottom:'10px'}}>
                    <label style={{fontWeight: 'bold'}}>카테고리: {frontCategory}</label>
                </div>
                <Card border="primary">
                    <Card.Header style={{height: 'calc(8vh - 10px)', fontSize: '30px'}}>{title}</Card.Header>
                    <Card.Body style={{height: 'calc(100vh - 50px)'}}>
                        <Card.Text
                            dangerouslySetInnerHTML={{__html: resizedContent}}
                        />
                    </Card.Body>
                </Card>
                <div className="offset-md-9" style={{marginTop: '10px', display: 'flex'}}>
                    <button onClick={handleUpdate} style={{marginRight: '10px'}}>
                        수정하기
                    </button>
                    <button onClick={handleGoBack}>
                        뒤로가기
                    </button>
                </div>
                <Comments/>
            </Container>
        </div>
    );
}
