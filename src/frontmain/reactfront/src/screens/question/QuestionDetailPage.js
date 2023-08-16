import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Card, Col, Button, Row, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from '../Request/RequestConfig.js';
import Paging from "../../components/Paging";

import CommentStyle from "./comment/Comment.style";

export default function QuestionDetailPage() {
    const [loginError, setLoginError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [boardUserId, setBoardUserId] = useState('');
    const [category, setCategory] = useState('');
    const [frontCategory, setFrontCategory] = useState('');
    const [comments, setComments] = useState([]);

    // 댓글 편집
    const [editCommentId, setEditCommentId] = useState(null);
    const [contentBuf,setContentsBuf] = useState(''); //실시간 댓글 input값
    const [updateBuf, setUpdateBuf] = useState('');

    // 페이징
    const [totalComments, setTotalComments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [currentComments, setCurrentComments] = useState([]);


    const navigate = useNavigate();
    const {id} = useParams();
    const boardId = id;
    const userId = sessionStorage.getItem('userData2');

    const commentRowStyle = {
        wordWrap: 'break-word', // 긴 텍스트를 자동으로 줄바꿈
        whiteSpace: 'pre-wrap', // 줄바꿈과 공백을 유지하도록 설정
    };

    useEffect(() => {
        fetchPost().then((comments) => {
            const offset = (currentPage - 1) * 9;
            const currentProducts = comments.slice(offset, offset + 9);
            setCurrentComments(currentProducts);
            setTotalComments(comments.length);

        }).catch((error) => {
            console.error("Error occurred while fetching products:", error);
        });

        return () => {
            console.log("Clean up");
        };
    }, []);


    //댓글 페이징
    const onPageChanged = (page) => {
        fetchPost().then((comments) => {
            const {currentPage, totalPages, pageLimit} = page;
            const offset = (currentPage - 1) * pageLimit;
            const currentProducts = comments.slice(offset, offset + pageLimit);

            setCurrentPage(currentPage);
            setCurrentComments(currentProducts);
            setTotalPages(totalPages);
        })
            .catch((error) => {
                console.error("Error occurred while fetching products:", error);
            });
    };


    const handleGoBack = () => {
        navigate('/question'); // 뒤로가기 버튼을 누를 때 이전 페이지로 이동
    };

    const handleUpdate = () => {

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

                    // 댓글 출력
                    const comments = postData.data.comments;
                    return comments;
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

            if (accessToken && refreshToken) {
                const response = await axios.post(`/auth/question/delete/${id}/${userId}`, JSON.stringify(""), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    }
                });

                if (response.status == 200) {
                    // 응답 성공 시 처리할 작업
                    alert('삭제 성공');
                    navigate('/question');

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
            console.error("에러발생", error);
        }
    }




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
                    alert('댓글 작성 완료');
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



    const handleEditComment = (commentId,commentUserId) => {
        if(commentUserId!=userId){
            alert('권한이 없습니다.');
            return;
        }
        setEditCommentId(commentId);
    }

    const handleUpdateComment = async (commentId,content) => {
        try {
            // 수정된 댓글 내용 업데이트 요청을 보냅니다.
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const requestData = { 'content': updateBuf?updateBuf:content };

            if (accessToken && refreshToken) {
                const response = await axios.post(`/auth/question/comment/update/${userId}/${boardId}/${commentId}`, JSON.stringify(requestData), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status === 200) {
                    console.log('댓글 수정 성공');
                    window.location.reload(); // 페이지 리로드
                } else {
                    const errorMessages = await response.data;
                    console.log(errorMessages.errors);
                    const errors = errorMessages.errors;
                    for (const error of errors) {
                        console.log(error.defaultMessage);
                        alert(error.defaultMessage);
                    }
                }
            } else {
                setLoginError('인증 권한을 가진 유저만 접근 가능합니다.');
            }
        } catch (error) {
            console.error('에러발생 : ', error);
        }
    }


    const handleCancelEdit = () => {
        setEditCommentId(null);
    }

    const handleDeleteComment = async (commentId,commentUserId) => {
        if(commentUserId!=userId){
            alert('권한이 없습니다.');
            return;
        }
        // 확인 문구
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (!shouldDelete) {
            return; // 사용자가 "취소"를 선택한 경우 아무 작업도 하지 않고 종료
        }


        try{
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            if(accessToken && refreshToken) {
                const response = await axios.get(`/auth/question/comment/delete/${commentUserId}/${commentId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });
                if(response.status === 200){
                    alert('삭제 성공');
                    return window.location.reload();
                } else {
                    console.error( response.status+'삭제 실패');
                    const errorMessages = await response.data;
                    console.log(errorMessages.errors);
                    const errors = errorMessages.errors;
                    for (const error of errors) {
                        console.log(error.defaultMessage);
                        alert(error.defaultMessage);
                    }
                }
            }else {
                setLoginError('인증 권한을 가진 유저만 접근 가능합니다.');
            }

        }catch (error){
            console.error(error);
        }
    }







    return (
        <div style={{height: '200vh', marginTop: '30px'}}>
            <Container fluid>
                <div className="col-3" style={{marginBottom: '10px'}}>
                    <label style={{fontWeight: 'bold', fontSize:'20px'}}>Category : {frontCategory}</label>
                </div>
                <Card border="primary">
                    <Card.Header style={{ fontSize: '30px'}}>
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

            <div>
                <Form className="mb-4" onSubmit={createComment}>
                    <Form.Group controlId="commentText">
                        <Form.Label>댓글</Form.Label>
                        <Form.Control required as="textarea" rows={4} onChange={inputContent} value={contentBuf} />
                    </Form.Group>
                    <Button className="col-md offset-md-11" variant="primary" type="submit">
                        등록
                    </Button>
                </Form>
                {currentComments.map((comment) => (
                    <div className="comment border" key={comment.commentId}>
                        {editCommentId === comment.commentId ? (
                            <Row className="comment">
                                <Col xs={10} className="date" style={{ paddingRight: '10px' }}>
                                    <Form.Control as="textarea" rows={2} defaultValue={comment.content} onChange={(e) => setUpdateBuf(e.target.value)} />
                                </Col>
                                <Col xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="outline-primary" size="sm" style={CommentStyle.buttonStyle} onClick={() => handleUpdateComment(comment.commentId,comment.content)}>저장</Button>
                                    <Button variant="outline-secondary" size="sm" style={CommentStyle.buttonStyle} onClick={handleCancelEdit}>취소</Button>
                                </Col>
                            </Row>
                        ) : (
                            <Row className="comment">
                                <Col xs={2} className="date">작성 일자: {comment.createdAt}</Col>
                                <Col xs={2} className="date">작성자: {comment.username}</Col>
                                <Col xs={6} style={commentRowStyle}>{comment.content}</Col>
                                <Col xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="outline-primary" size="sm" style={CommentStyle.buttonStyle} onClick={() => handleEditComment(comment.commentId,comment.userId)}>수정</Button>
                                    <Button variant="outline-danger" size="sm" style={CommentStyle.buttonStyle} onClick={() => handleDeleteComment(comment.commentId,comment.userId)}>삭제</Button>
                                </Col>
                            </Row>
                        )}
                    </div>
                ))}
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Paging
                    totalRecords={totalComments}
                    pageLimit={9}
                    pageNeighbours={3}
                    onPageChanged={onPageChanged}
                    sizing=""
                    alignment="justify-content-center"
                />
            </div>

        </div>
    );
}
