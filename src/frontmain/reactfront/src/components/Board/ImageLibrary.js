import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Editor } from '../Styles/Editorform/Editor.style';
import Editor from "./Editor"

const ImageLibrary = ({ imageSrc,index }) => {
    const [loginError, setLoginError] = useState('');
    const [urls, setUrls] = useState([]);
    const [updatedDomArray, setUpdatedDomArray] = useState([]);
    const [deleted, setDeleted] = useState('');

    // 이미지 소스를 urls 배열에 추가.(기존 요소 유지하며 추가)
    useEffect(() => {
        if (typeof imageSrc === 'string') {
            setUrls(prevUrls => prevUrls.filter(url => url !== ''));
            setUrls(prevUrls => [...prevUrls, imageSrc]);
        }
    }, [imageSrc,index]);

    // urls배열의 요소를 하나씩 dom형태로 만들어, updatedDomArray배열에 넣는다. (기존 요소 초기화됨)
    useEffect(() => {
        const domArray = urls.map((url, index) => {
            const itemIndex = index + 1;
            const uniqueKey = `image_${itemIndex}`;
            return (
                <ListGroup.Item
                    as="li"
                    draggable="true"
                    data-log="lib.diplomat"
                    data-index={itemIndex}
                    key={uniqueKey}
                >
                    <Card style={{ width: '5rem' }}>
                        <Card.Img variant="top" src={url} />
                        <Card.Body>
                            <Button onClick={() => handleDelete(itemIndex)} variant="primary" style={{ width: '3rem', fontSize: '11px' }}>
                                삭제
                            </Button>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            );
        });
        setUpdatedDomArray(domArray);
    }, [urls]);

    // 특정 이미지 삭제
    const handleDelete = async (itemIndex) => {
        try {
            setDeleted(urls.filter((_,index) => index + 1 == itemIndex));
            setUrls(prevUrls => prevUrls.filter((_, index) => index + 1 !== itemIndex));
            Editor( {deleted});

        } catch (error) {
            console.error('삭제 중 오류 발생.', error);
            setLoginError('삭제 중 오류가 발생했습니다.');
        }
    };

    // 라이브러리 열림,닫힘 초기화
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                사진 라이브러리
            </Dropdown.Toggle>

            <Dropdown.Menu show={true} align="right">
                <Editor>
                    <ListGroup as="ul" className="se-sidebar-list">
                        {updatedDomArray}
                    </ListGroup>
                </Editor>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ImageLibrary;
