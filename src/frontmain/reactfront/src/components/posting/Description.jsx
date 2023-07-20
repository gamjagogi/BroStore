import React, {useEffect, useState} from "react";
import {Card, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Description = (props) => {
    const [content, setContent] =  useState('');
    // 컴포넌트에서 사용할 때
    const [resizedContent, setResizedContent] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        console.log(props.desc);
        console.log(props);
        setContent(props.desc); // 컴포넌트가 마운트될 때(fetchPost()의 의존성 배열이 빈 배열) fetchPost 함수를 호출합니다.
    }, [props]);

    const handleGoBack = () => {
        navigate(-1); // 뒤로가기 버튼을 누를 때 이전 페이지로 이동
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
            const resizedWidth = originalWidth + 300;
            const resizedHeight = originalHeight + 300;

            // 이미지의 너비와 높이를 새로운 크기로 설정합니다.
            imgTag.width = resizedWidth;
            imgTag.height = resizedHeight;
        });

        // 리사이징이 적용된 DOM 객체를 다시 HTML 문자열로 변환하여 반환합니다.
        const resizedContent = new XMLSerializer().serializeToString(doc);
        console.log(resizedContent);
        return resizedContent;
    };


    useEffect(() => {
        const resizeContent = async () => {
            try {
                const resizedContent = await resizeImagesInContent(content);
                setResizedContent(resizedContent);
                console.log(resizedContent);
            } catch (error) {
                console.error('이미지 리사이징 중 오류 발생:', error);
            }
        };
        resizeContent();
    }, [content]);



    return (
        <div style={{ height: '120vh', marginTop: '50px' }}>
            <Container fluid>
                <Card>
                    <Card.Body style={{ height: 'calc(100vh - 50px)' }}>
                        <Card.Text
                            dangerouslySetInnerHTML={{ __html: resizedContent }}
                        />
                    </Card.Body>
                </Card>
                <button onClick={handleGoBack} style={{ position: 'absolute', right: '10px', bottom: '-240px' }}>
                    뒤로가기
                </button>
            </Container>
        </div>
    );
};

export default Description;
