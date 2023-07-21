import React from "react"
import { Input } from "antd"
import styled from "styled-components"

const DetailDiv = styled.div`
  div {
    margin-bottom: 1rem;
    width: 500px;
  }
`

const { TextArea } = Input

const AddTextBox = (props) => {

    return (
        <DetailDiv>
            {props.countList && props.countList.map((item, i) => (
                <div key={i}>
                    <label>Highlights</label>
                    <div>
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 1 }}
                        />
                    </div>
                </div>
            ))}
        </DetailDiv>
    )
}

export default AddTextBox