import React, {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useRef, useMemo} from 'react';
import axios from '../Request/RequestConfig.js';
import AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';
import {Button, Dropdown, ListGroup} from "react-bootstrap";


export default function PostEditorFix() {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get("content"));

    useEffect(() => {
        window.scrollTo(0, 0);
        return;
    }, []);


    const [state,setState] = useState({
        title: searchParams.get("title"),
        content: searchParams.get("content"),
        boardId: searchParams.get("boardId")
    });

    const quillRef = useRef(null);

    const [thumbnail, setThumbnail] = useState('');
    const [loginError, setLoginError] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const [index, setIndex] = useState('')

    const [urls, setUrls] = useState([]);
    const [updatedDomArray, setUpdatedDomArray] = useState([]);
    const [deleted, setDeleted] = useState('');

    const navigate = useNavigate();


    // 이미지 편집기에 추가 로직 *************************************v
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
            const uuid = uuidv4();

            const file = input.files[0];
            const fileName = file.name;

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
                    console.log('SUCCESS');
                })
                .send((err, data) => {
                    if (err) {
                        console.error('업로드 오류:', err);
                        alert('error');
                    } else {

                        const {Bucket, Key} = params; // params 객체에서 Bucket과 Key를 추출합니다.
                        const imageUrl = `https://${Bucket}.s3.amazonaws.com/${Key}`; // 이미지의 위치(URL)을 구성합니다.
                        console.log('업로드 완료. 이미지 위치:', imageUrl);


                        // 여기서 Quill 편집기 폼에 이미지를 출력하는 로직을 실행할 수 있습니다.
                        const editor = quillRef.current.getEditor();
                        //커서 위치 받아오기 위함.
                        const range = editor.getSelection(true);
                        editor.insertEmbed(
                            range.index,
                            'image',
                            `${imageUrl}`,
                        );

                        console.log(range.index);

                        setIndex(range.index);
                        // 이미지소스 변수에 저장
                        setImageSrc(imageUrl);

                        // 이미지 업로드 후 커서 이미지 한칸 옆으로 이동.
                        editor.setSelection(range.index + 1);
                    }
                });
        });
    };
    // ***********************************************************^


    // 모듈 및, aws s3 연결 로직 *******************************v
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    [{'font': []}],
                    [{'align': []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, 'link'],
                    [{'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color']}, {'background': []}],
                    ['image', 'video'],
                    ['clean'],
                    [{'custom-button': '<i class="fas fa-bold"></i>'}]
                ],
                handlers: {image: imageHandler},
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
        if (newTitle.length <= 50) {
            setState((prevState) => ({...prevState,title:newTitle}));
        } else {
            // 팝업을 띄우는 로직을 추가하거나 원하는 작업을 수행합니다.
            // 예시: alert을 사용하여 팝업을 띄움
            alert('제목은 60자 이하여야 합니다.');
        }
    };

    const onChangeContent = (content) => {
        setState((prevState) => ({...prevState,content:content}));
    };

    const handleSubmit = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = sessionStorage.getItem('userData2');
            console.log(accessToken);
            console.log(refreshToken);
            const {title, content,boardId} = state;

            const requestData = { title,content,boardId};

            if (thumbnail !== "") {
                requestData.thumbnail = thumbnail;
            }
            console.log(requestData);

            if (accessToken && refreshToken) {
                // 요청 보내기
                const response = await axios.post(`/auth/board/update/${id}`, JSON.stringify(requestData), {
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
                    alert('수정완료!');
                    navigate('/board');

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
    // **************************************************************

    //
    // //
    // const crolling = () => {
    //     const editor = quillRef.current.getEditor();
    //     const range = editor.getSelection(true);
    //     const contents = editor.getContents();
    //     const psUrls = [];
    //     // Quill 컨텐츠의 각 블록을 순회하면서 이미지를 찾고, 식별자와 일치하는 이미지를 삭제
    //     contents.ops.forEach((block) => {
    //             if (block.insert && block.insert.image) {
    //                 const imageIndex = contents.ops.indexOf(block);
    //                 const libElement = {url: block.insert.image, index: imageIndex};
    //                 psUrls.push(libElement);
    //             }else {
    //                 setUrls([]);
    //             }
    //         }
    //     );
    //     console.log(psUrls);
    //     return psUrls;
    // };
    //
    //
    // // 이미지 라이브러리 로직 **********************************v
    // useEffect(() => {
    //     setUrls(crolling());
    // }, [imageSrc, index]);
    //
    //
    //
    //
    //
    //
    // // urls배열의 요소를 하나씩 dom형태로 만들어, updatedDomArray배열에 넣는다. (기존 요소 초기화됨)
    // useEffect(() => {
    //     const domArray = [urls.map((element) => {
    //         const itemIndex = element.index;
    //         const uniqueKey = uuidv4();
    //         return (
    //             <ListGroup.Item
    //                 as="li"
    //                 draggable="true"
    //                 data-log="lib.diplomat"
    //                 data-index={itemIndex}
    //                 key={uniqueKey}
    //             >
    //                 <Card style={{width: '5rem'}}>
    //                     <Card.Img variant="top" src={element.url}/>
    //                     <Card.Body>
    //                         <Button onClick={() => handleDelete(itemIndex)} variant="primary"
    //                                 style={{width: '3rem', fontSize: '11px'}}>
    //                             삭제
    //                         </Button>
    //                     </Card.Body>
    //                 </Card>
    //             </ListGroup.Item>
    //         );
    //     })];
    //     console.log(domArray);
    //     setUpdatedDomArray(domArray);
    // }, [urls]);
    //
    //
    // // 라이브로 특정 이미지 삭제
    // const handleDelete = async (itemIndex) => {
    //     try {
    //         console.log(urls);
    //         console.log(itemIndex);
    //         // 편집기에서 삭제할 요소 전달
    //         deleteImage(itemIndex);
    //     } catch (error) {
    //         console.error('삭제 중 오류 발생.', error);
    //         setLoginError('삭제 중 오류가 발생했습니다.');
    //     }
    // };
    //
    // // 이미지 편집기 삭제 로직 **********************************v
    // // useEffect(() => {
    // //     deleteImage(deleted);
    // // }, [deleted]);
    //
    // const deleteImage = (itemIndex) => {
    //     const editor = quillRef.current.getEditor();
    //     const range = editor.getSelection(true);
    //     const contents = editor.getContents();
    //     console.log('에디터');
    //     console.log(contents);
    //     console.log(itemIndex);
    //
    //     // Quill 컨텐츠의 각 블록을 순회하면서 이미지를 찾고, 식별자와 일치하는 이미지를 삭제
    //     contents.ops.forEach((block) => {
    //         if (block.insert && block.insert.image ) {
    //             const imageIndex = contents.ops.indexOf(block);
    //             console.log('quill내부');
    //
    //             if (imageIndex == itemIndex) {
    //                 // 이미지 삭제
    //                 editor.deleteText(contents.ops.indexOf(block), 1);
    //                 console.log('삭제 성공!')
    //             }
    //         }
    //     });
    //     setUrls(crolling());
    // };
    // //*********************************************************^
    //
    //
    // // 라이브러리 열림,닫힘 초기화
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    //
    // const toggleDropdown = () => {
    //     setDropdownOpen(!dropdownOpen);
    // };
    // // ******************************************************************^



    const onClickBack = () => {
        navigate('/board');
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '110vh'}}>
            <input
                type="text"
                defaultValue={state.title}
                onChange={onChangeTitle}
                placeholder="제목"
                style={{flex: 'none', padding: '10px', fontSize: '18px'}}
            />


            <div style={{flex: '1', minHeight: '40vh', padding: '10px', fontSize: '14px', marginBottom: '10px'}}>
                {/* <ReactQuill/> 컴포넌트를 감싸는 div */}
                <ReactQuill
                    ref={quillRef}
                    formats={formats}
                    modules={modules}
                    theme="snow"
                    onChange={onChangeContent}
                    defaultValue={state.content}
                    style={{
                        flex: '1',
                        minHeight: '40vh',
                        padding: '10px',
                        fontSize: '14px',
                        width: '100%',
                        height: '100%'
                    }}
                />
                <div dangerouslySetInnerHTML={{__html: state.content}} style={{display: 'none'}}/>
            </div>
            <br/>
            <div className="footer" style={{marginTop: '30px', padding: '10px', position: 'relative'}}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '10px',
                    marginRight: '10px',
                    position: 'relative',
                }}>
                    <Button onClick={handleSubmit} style={{marginRight: '10px'}}>완료</Button>
                    <Button onClick={onClickBack}>취소</Button>
                </div>
            </div>
        </div>

    );
}
