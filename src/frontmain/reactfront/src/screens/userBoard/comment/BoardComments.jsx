import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import "./BoardComment.css"

const BoardComments = (props) => {
    const comments = [props];
    const [contentBuf,setContentsBuf] = useState('');


    const content = (props) => {
        const value = props.target.value;
        console.log(value);
        setContentsBuf(value);
    }

    const createComment = () => {
        createCommentRequest(contentBuf);
    }


    return (
        <>
            <Form className="mb-4" >
                <Form.Group controlId="commentText">
                    <Form.Label>댓글</Form.Label>
                    <Form.Control required as="textarea" rows={4} onChange={content}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    등록
                </Button>
            </Form>
            {comments.map((comment) => (
                <Row className="comment" key={comment.commentId}>
                    <Col xs={12}>작성자: {comment.username}</Col>
                    <Col xs={12} className="date">작성 일자: {comment.createdAt}</Col>
                    <Col xs={12}>내용: {comment.content}</Col>
                </Row>
            ))}
        </>
    );
};

export default BoardComments;
