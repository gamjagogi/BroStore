import React, {useState} from "react"
import styled from "styled-components"
import {Button} from "antd"
import {Link} from "react-router-dom"
import Axios from "axios"
import {MinusCircleFilled, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons"
import DetailList from "./AddTextBox"

const CreateListDiv = styled.div`
  padding: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const CreateList = () => {
    const [countList, setCountList] = useState([0])

    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
        setCountList(countArr)
    }

    const onDeleteDetailDiv = () => {
        let countArr = [...countList]
        countArr.pop()  // 기존 배열에서 가장 뒤에 있는 요소를 제거합니다
        setCountList(countArr)
    }

    return (
        <CreateListDiv>
            <DetailList countList={countList}/>
            <div>
                <Button onClick={onAddDetailDiv}>
                    <PlusCircleOutlined/>추가
                </Button>
                <Button onClick={onDeleteDetailDiv}>
                    <MinusCircleOutlined/>삭제
                </Button>
            </div>
        </CreateListDiv>
    )
}
export default CreateList