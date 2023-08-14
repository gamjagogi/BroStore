import React, { lazy, useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import {Button, Card, CardGroup, Container, Form} from "react-bootstrap";

import renderFormFileInput from "../../helpers/renderFormFileInput";
import {
    required,
} from "../../helpers/validation";
import axios from "../Request/RequestConfig";
import {data} from "../../data";
import {useNavigate} from "react-router-dom";

const TestBanner = lazy(() => import('./TestBanner'));

const UpdateSlideAd = () => {
    const [loginError, setLoginError] = useState('');

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [url, setUrl] = useState('');

    const [slides,setSlides] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        return;
    },[])


    const fetchData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = sessionStorage.getItem('userData2');
        try {
            const response = await axios.get(`/admin/slide/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'RefreshToken': `Bearer ${refreshToken}`,
                },
            });

            if (response.status == 200) {
                const data = await response.data.data;
                console.log(data);
                setSlides(data);
            } else {
                console.error('게시글을 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    }



    const onImageChange = async (obj) => {
        if (obj) {
            const ACCESS_KEY = 'AKIAUM5SAFCTKG4Z2PGC';
            const SECRET_ACCESS_KEY = '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';
            const REGION = "ap-northeast-2";
            const S3_BUCKET = 'image-gamja';
            const uuid = uuidv4();

            const file = obj;

            // AWS ACCESS KEY를 세팅합니다.
            AWS.config.update({
                accessKeyId: ACCESS_KEY,
                secretAccessKey: SECRET_ACCESS_KEY
            });

            // 버킷에 맞는 이름과 리전을 설정합니다.
            const ReactS3Client = new AWS.S3({
                params: {Bucket: S3_BUCKET},
                region: REGION,
            });

            // 파일과 파일이름을 넘겨주면 됩니다.
            const params = {
                ACL: 'public-read',
                Body: file,
                Bucket: S3_BUCKET,
                Key: file.name
            };

            ReactS3Client.putObject(params)
                .on('httpUploadProgress', (evt) => {
                    alert("SUCCESS")
                })
                .send((err, data) => {
                    if (err) {
                        console.error('업로드 오류:', err);
                        alert('error');
                    } else {
                        const {Bucket, Key} = params; // params 객체에서 Bucket과 Key를 추출합니다.
                        const imageUrl = `https://${Bucket}.s3.amazonaws.com/${Key}`; // 이미지의 위치(URL)을 구성합니다.
                        console.log('업로드 완료. 이미지 위치:', imageUrl);
                        setImage(imageUrl);
                        return;
                    }
                });
        } else {
            setImage('');
        }
    };



    const handleSubmit = async () => {
        const requestData = {
            image,title,description,url
        };
        console.log(requestData);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const userId = sessionStorage.getItem('userData2');
            console.log(accessToken);
            console.log(refreshToken);

            if (accessToken && refreshToken) {
                // 요청 보내기
                const response = await axios.post(`/admin/slide/save/${userId}`, JSON.stringify(requestData), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    // 응답 성공 시 처리할 작업
                    alert('등록 완료');
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

    const changeTitle = (props) => {
        const title = props.target.value;
        console.log(title);
        setTitle(title);
    }
    const changeDescription = (props) => {
        const desc = props.target.value;
        console.log(desc);
        setDescription(desc);
    }

    const changeUrl = (props) => {
        const url = props.target.value;
        console.log(url);
        setUrl(url);
    }

    const onDeleteAd = async (adId) => {
        console.log('adId : ', adId);
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = sessionStorage.getItem('userData2');
        try {
            const response = await axios.post(`/admin/slide/delete/${userId}`,adId ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'RefreshToken': `Bearer ${refreshToken}`,
                },
            });

            if (response.status == 200) {
                alert('삭제 성공');
                window.location.reload();
            } else {
                console.error('삭제 실패.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    }

    const toSetCardAdPage = () => {
        navigate('/admin/cardAdConfig');
    }


    return (
        <React.Fragment>
            <div className="row" style={{margin:'10px'}}>
            <Button onClick={toSetCardAdPage}>Card Config</Button>
            </div>
            <label style={{fontSize:'50px'}}>Slide</label>
            <TestBanner className="mb-3" id="carouselHomeBanner" data={slides} />
            <div className="row" style={{marginBottom:'30px'}}>
                {slides.map((item,idx) => {
                    return (
                        <Card key={idx} style={{ width: '12rem' }}>
                            <Card.Img variant="top" src={item.img} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text style={{ maxHeight: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {item.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => onDeleteAd(item.adId)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>

            <div
                className="p-5 bg-primary bs-cover"
                style={{
                    backgroundImage: "url(../../images/banner/50-Banner.webp)",
                }}
            >
                <div className="container text-center">
                    <span className="display-5 px-3 bg-white rounded shadow">AD Slide Config</span>
                </div>
            </div>
            <br />
            <Container style={{marginTop:'30px',marginBottom:'30px'}}>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                <CardGroup>
                    <Card>
                        <Card.Img
                            src={image ? image : "../../images/NO_IMG.png"}
                            alt=""
                            className="card-img-top rounded-0 img-fluid bg-secondary"/>
                        <Card.Body>
                            <Field
                                name="formFile"
                                component={renderFormFileInput}
                                onImageChange={onImageChange}
                                validate={[required]}
                                tips="You don't allow uploading a photo more than 5MB"
                            />

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Product title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" maxLength={60} onChange={(e) => changeTitle(e)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Product description</Form.Label>
                                <Form.Control type="text" placeholder="Enter description" maxLength={60} onChange={(e) => changeDescription(e)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicUrl">
                                <Form.Label>Product url</Form.Label>
                                <Form.Control type="text" placeholder="Enter Product url" maxLength={60} onChange={(e) => changeUrl(e)}/>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </CardGroup>
                <button
                    type="submit"
                    className="btn btn-primary  d-flex offset-11"
                    style={{marginTop:'10px'}}
                >
                    Submit
                </button>
                </Form>
            </Container>

        </React.Fragment>
    );
};

export default compose(
    reduxForm({
        form: "profile",
    })
)(UpdateSlideAd);
