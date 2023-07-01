import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useMemo } from 'react';
import axios from '../Request/RequestConfig.js';
import AWS from 'aws-sdk';
import QuillEditor from "./QuillEditor";



export default function Editor() {
    const quillRef = useRef(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    // 이미지 삭제
    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();

            editor.on('text-change', () => {
                // 에디터 내용이 변경될 때마다 호출되는 콜백 함수
                setContent(editor.root.innerHTML);
            });

            editor.on('editor-change', (eventName, ...args) => {
                // 에디터 내부 상태가 변경될 때 호출되는 콜백 함수
                if (eventName === 'text-change') {
                    const range = args[2];
                    if (range && range.index) {
                        // 커서가 있는 위치의 블록을 가져옴
                        const [block] = editor.getLeaf(range.index);

                        if (block && block.domNode) {
                            const deleteButton = block.domNode.querySelector('.delete-button');
                            if (deleteButton) {
                                deleteButton.addEventListener('click', () => {
                                    const imageIdentifier = block.domNode.getAttribute('data-image-identifier');
                                    deleteImage(imageIdentifier);
                                });
                            }
                        }
                    }
                }
            });
        }
    }, []);


    // 이미지 추가
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {

            const ACCESS_KEY = 'AKIAUM5SAFCTKG4Z2PGC';
            const SECRET_ACCESS_KEY = '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';
            const REGION = "ap-northeast-2";
            const S3_BUCKET = 'image-gamja';

            const file = input.files[0];
            const fileName = file.name;

            // AWS ACCESS KEY를 세팅합니다.
            AWS.config.update({
                accessKeyId: ACCESS_KEY,
                secretAccessKey: SECRET_ACCESS_KEY
            });

            // 버킷에 맞는 이름과 리전을 설정합니다.
            const ReactS3Client = new AWS.S3({
                params: { Bucket: S3_BUCKET},
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

                        const { Bucket, Key } = params; // params 객체에서 Bucket과 Key를 추출합니다.
                        const imageUrl = `https://${Bucket}.s3.amazonaws.com/${Key}`; // 이미지의 위치(URL)을 구성합니다.
                        console.log('업로드 완료. 이미지 위치:', imageUrl);

                        const imageIdentifier = `${imageUrl}`;


                        // 여기서 Quill 편집기 폼에 이미지를 출력하는 로직을 실행할 수 있습니다.
                        const editor = quillRef.current.getEditor();
                        //커서 위치 받아오기 위함.
                        const range = editor.getSelection(true);
                        editor.insertEmbed(
                            range.index,
                            'image',
                            `${imageUrl}`,
                        );

                        const imageBlock = editor.getLeaf(range.index)[0].domNode.parentNode;

                        // 삭제 버튼 엘리먼트 생성
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.addEventListener('click', () => {
                            deleteImage(imageUrl);
                        });

                        // 삭제 버튼을 이미지 블록에 추가
                        imageBlock.appendChild(deleteButton);


                        // 이미지 업로드 후 커서 이미지 한칸 옆으로 이동.
                        editor.setSelection(range.index + 1);
                    }
                });
        });
    };

    // 이미지 삭제 로직
    const deleteImage = (imageIdentifier) => {
        const editor = quillRef.current.getEditor();
        const contents = editor.getContents();

        // Quill 컨텐츠의 각 블록을 순회하면서 이미지를 찾고, 식별자와 일치하는 이미지를 삭제
        contents.ops.forEach((block) => {
            if (block.insert && block.insert.image) {
                const imageUrl = block.insert.image;
                if (imageUrl === imageIdentifier) {
                    // 이미지 삭제
                    editor.deleteText(contents.ops.indexOf(block), 1);
                }
            }
        });
    };

    const modules = useMemo(
        () => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
                ['image', 'video'],
                ['clean'],
            ],
            handlers: { image: imageHandler },
            },
            clipboard: {
             matchVisual: false,
            },
        }),
        [],
    );

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'align',
        'image',
        'div'
    ];

    const onChangeTitle = (event) => {
        const newTitle = event.target.value;
        if (newTitle.length <= 60) {
            setTitle(newTitle);
        } else {
            // 팝업을 띄우는 로직을 추가하거나 원하는 작업을 수행합니다.
            // 예시: alert을 사용하여 팝업을 띄움
            alert('제목은 60자 이하여야 합니다.');
        }
    };

    const onChangeContent = (content) => {
        setContent(content);
    };

    const handleSubmit = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(accessToken);
            console.log(refreshToken);

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    RefreshToken: `Bearer ${refreshToken}`,
                    'Content-Type': 'application/json',
                },
            };
            const requestData = { title, content };

            if (thumbnails !== "") {
                requestData.thumbnail = thumbnail;
            }

            if (accessToken && refreshToken) {
                // 요청 보내기
                console.log(requestData);
                const response = await axios.post('/manager/shop/save', JSON.stringify(requestData), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    // 응답 성공 시 처리할 작업
                    const data = await response.data;
                    console.log(data); // 요청에 대한 응답 처리
                    navigate('/shop');

                } else {
                    // 응답 실패 시 처리할 작업
                    const errorMessages = await response.data;
                    console.log(errorMessages.errors);
                    const errors = errorMessages.errors;
                    for(const error of errors){
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <input
                type="text"
                value={title}
                onChange={onChangeTitle}
                placeholder="제목"
                style={{ flex: 'none', padding: '10px', fontSize: '18px' }}
            />


            <div style={{ flex: '1', minHeight: '0', padding: '10px', fontSize: '14px', marginBottom: 'auto' }}>
                {/* <ReactQuill/> 컴포넌트를 감싸는 div */}
                <ReactQuill
                    ref={quillRef}
                    formats={formats}
                    modules={modules}
                    theme="snow"
                    onChange={onChangeContent}
                    style={{ flex: '1', minHeight: '0', padding: '10px', fontSize: '14px', width: '100%', height: '70%' }}
                />
                <div dangerouslySetInnerHTML={{ __html: content }} style={{ display: 'none' }} />
            </div>


            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', marginRight: '10px', position: 'relative', top : '-200px' }}>
                <button onClick={handleSubmit} style={{ marginRight: '10px' }}>완료</button>
                <button style={{}}>취소</button>
            </div>

        </div>

    );
}
