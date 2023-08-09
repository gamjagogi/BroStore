import React, {useEffect, useRef, useState} from 'react';
import "./Comment.css"
import {Button, Col, Form, Row} from "react-bootstrap";
import Paging from "../Paging";
import axios from "../../screens/Request/RequestConfig";
import {useNavigate, useOutlet} from "react-router-dom";

export default function Comment({
                                    comment,
                                    getValueByKey,
                                    editValue,
                                    setValueByKey,
                                    isEditComment

                                }) {
    const inputRef = useRef(null);
    const [contentBuf, setContentsBuf] = useState(''); //실시간 댓글 input값
    //const [isEditComment, setIsEditComment] = useState(false);


    const handleEditComment = (commentId,state) => {
        return setValueByKey(commentId,state);
    }

    function clickModifyBtn() {
        if (inputRef.current !== null) {
            inputRef.current.disabled = false; //input 비활성화 해제
            inputRef.current.focus(); //input에 focus
        }
    }



    const handleDeleteComment = () => {

    }

    const handleSaveClick = () => {

    }


    const inputContent = (props) => {
        const value = props.target.value;
        console.log(value);
        if (value.length <= 300) {
            setContentsBuf(value);
        } else {
            alert('길이 초과');
        }
    }


    return (
        <div className="comment" key={comment.commentId}>

            {isEditComment!= true ? (
                <Row key={comment.userId}>
                    <Col xs={2} className="date">작성 일자: {comment.createdAt}</Col>
                    <Col xs={2} className="date">작성자: {comment.username}</Col>
                    <Col xs={6} ref={inputRef} style={{wordWrap: 'break-word'}}>내용: {comment.content}</Col>
                    <Col xs={2} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="outline-primary" size="sm"
                                onClick={clickModifyBtn}>수정</Button>
                        <Button variant="outline-danger" size="sm"
                                onClick={() => handleDeleteComment(comment.commentId)}>삭제</Button>
                    </Col>
                </Row>
            ) : (
                <div>
                    <input type="text" defaultValue={comment.content} onChange={inputContent}/>
                    <button onClick={() => handleSaveClick(comment.commentId)}>저장</button>
                </div>
            )
            }
        </div>
    )
}
