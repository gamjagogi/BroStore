import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useMemo } from 'react';

//import { imageApi } from '../../../apis/posts';
// import styles from '../contents/QuillEditor.module.css';

export default function Editor() {
    const quillRef = useRef(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
            const file = input.files[0];

            try {
                // const res = await imageApi({ img: file });
                // const imgUrl = res.data.imgUrl;
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                //editor.insertEmbed(range.index, 'image', imgUrl);
                editor.setSelection(range.index + 1);
            } catch (error) {
                console.log(error);
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

            if (accessToken && refreshToken) {
                // 요청 보내기
                const response = await fetch('http://localhost:3001/manager/shop/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                    body: JSON.stringify({
                        title: title,
                        content: content
                    })
                });

                if (response.ok) {
                    // 응답 성공 시 처리할 작업
                    const data = await response.json();
                    console.log(data); // 요청에 대한 응답 처리
                    navigate('/shop');

                } else {
                    // 응답 실패 시 처리할 작업
                    const errorMessages = await response.clone().json();
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
