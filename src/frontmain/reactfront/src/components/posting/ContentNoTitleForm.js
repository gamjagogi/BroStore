import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useRef, useMemo} from 'react';
import {v4 as uuidv4} from "uuid";
import AWS from "aws-sdk";


const ContentNoTitleForm = (props) => {
    const [imageSrc, setImageSrc] = useState('');

    const [index, setIndex] = useState('')

    const {
        content,
        onContentChange
    } = props;

    const quillRef = useRef(null)


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
                })
        })
    }


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


    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>

            <div style={{flex: '1', minHeight: '0', padding: '10px', fontSize: '14px', marginBottom: 'auto'}}>
                {/* <ReactQuill/> 컴포넌트를 감싸는 div */}
                <ReactQuill
                    ref={quillRef}
                    formats={formats}
                    modules={modules}
                    theme="snow"
                    onChange={onContentChange}
                    style={{
                        flex: '1',
                        minHeight: '0',
                        padding: '10px',
                        fontSize: '14px',
                        width: '100%',
                        height: '20%'
                    }}
                />
                <div dangerouslySetInnerHTML={{__html: content}} style={{display: 'none'}}/>
            </div>
            <br/>
        </div>

    );
}

export default ContentNoTitleForm
