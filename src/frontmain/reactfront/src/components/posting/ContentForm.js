import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useRef, useMemo} from 'react';



const ContentForm = (props) => {


    const {
        title,
        highlights,
        onTitleChange,
        onHighlightChange
    } = props;



    const quillRef = useRef(null);

    // 모듈 및, aws s3 연결 로직 *******************************v
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{'list': 'ordered'}, {'list': 'bullet'}]
                ]
            },
            clipboard: {
                matchVisual: false,
            },
        }),
        [],
    );

    const formats = [
        'list',
        'bullet',
        'ordered'
    ];

    const handleTitleChange = (event) => {
        const updatedTitle = event.target.value;
        onTitleChange(updatedTitle);
    };



    const handleHighlightsChange = (event) => {
        const updatedHighlights = event;
        console.log(updatedHighlights);
        onHighlightChange(updatedHighlights);
    };


    // useEffect(() => {
    //     console.log(quillRef.current.props.value);
    // },[quillRef.current.props.value])


    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <input
                type="text"
                onChange={handleTitleChange}
                value={title}
                placeholder="title"
                style={{ flex: 'none', padding: '10px', fontSize: '18px' }}
            />

            <div style={{flex: '1', minHeight: '0', padding: '10px', fontSize: '14px', marginBottom: 'auto'}}>
                <ReactQuill
                    ref={quillRef}
                    formats={formats}
                    modules={modules}
                    theme="snow"
                    onChange={handleHighlightsChange}
                    placeholder="Fix Highlight"
                    defaultValue={highlights}
                    style={{
                        flex: '1',
                        minHeight: '0',
                        padding: '10px',
                        fontSize: '14px',
                        width: '100%',
                        height: '20%'
                    }}
                />
                <div dangerouslySetInnerHTML={{__html: highlights}} style={{display: 'none'}}/>
            </div>
            <br/>
        </div>

    );
}

export default ContentForm
