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
        return;
    }, [props]);



// 이미지 리사이즈 함수
    const resizeImagesInContent = async (htmlContent) => {
        console.log(htmlContent);

        // 브라우저 화면 크기에 맞게 사용 가능한 너비와 높이 계산
        const availableWidth = window.innerWidth - 140; // 여유 마진을 뺌
        const availableHeight = window.innerHeight - 100; // 여유 마진을 뺌
        console.log(availableHeight,availableWidth);

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
            let resizedWidth = originalWidth + 300;
            let resizedHeight = originalHeight + 270;

            if (originalWidth > availableWidth) {
                resizedWidth = availableWidth;
            }

            if (resizedHeight > availableHeight) {
                resizedHeight = availableHeight;
            }

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
        return;
    }, [content]);



    return (
        <div style={{ minHeight: '120vh', marginTop: '10px', marginRight:'-30px',marginLeft:'-30px'}}>
            <Container fluid>
                <Card>
                    <Card.Body style={{ minHeight: 'calc(100vh - 60px)' }}>
                        <Card.Text
                            dangerouslySetInnerHTML={{ __html: resizedContent }}
                        />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Description;
