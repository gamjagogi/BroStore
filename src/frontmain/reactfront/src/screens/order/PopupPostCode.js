import React, {useEffect, useState} from 'react';
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = (props) => {
    // const [fAddress,setFaddress ] = useState('');
    // const [zCode, setZcode] = useState('');
    //
    // const { setFullAddress , setZoneCode } = props;
    //
    // useEffect(() => {
    //     setFullAddress(fAddress);
    //     setZoneCode(zCode);
    // }, [fAddress,zCode]);



    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        // setFaddress(fullAddress);
        // setZcode(data.zonecode);
        props.setAddress(fullAddress + data.zonecode);

        props.onClose()
    }

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "18%",
        width: "300px",
        height: "300px",
        padding: "7px",
    };

    return(
        <div>
            <DaumPostcode onComplete={handlePostCode} />
            <button type='button' onClick={() => {props.onClose()}} className='postCode_btn'>닫기</button>
        </div>
    )
}

export default PopupPostCode;