import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Editor } from '../Styles/Editorform/Editor.style';

const ImageLibrary = ({ imageSrc }) => {
    const [urls, setUrls] = useState([]);
    const [updatedDomArray, setUpdatedDomArray] = useState([]);

    useEffect(() => {
        if (Array.isArray(imageSrc)) {
            setUrls(prevUrls => [...prevUrls, ...imageSrc]);
        } else if (typeof imageSrc === 'string') {
            setUrls(prevUrls => [...prevUrls, imageSrc]);
        }
    }, [imageSrc]);

    useEffect(() => {
        const domArray = urls.map((url, index) => {
            const itemIndex = index + 1;
            return (
                <ListGroup.Item
                    as="li"
                    draggable="true"
                    data-log="lib.diplomat"
                    data-index={itemIndex}
                    key={itemIndex}
                >
                    <Card style={{ width: '5rem' }}>
                        <Card.Img variant="top" src={url} />
                        <Card.Body>
                            <Button variant="primary" style={{ width: '3rem', fontSize: '11px' }}>
                                삭제
                            </Button>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            );
        });

        setUpdatedDomArray(domArray);
    }, [urls]);

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
