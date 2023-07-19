import React, {lazy, Component, useState} from "react";
import FrontContent from "../../components/posting/FrontContent";
import ContentForm from "../../components/posting/ContentForm";
import {v4 as uuidv4} from "uuid";
import AWS from "aws-sdk";
import axios from "../Request/RequestConfig";
import SoftwareDescription from "../../components/posting/SoftwareDescription";
import { withRouter } from "react-router-dom";

const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const PriceConfig = lazy(() => import("../../components/posting/PriceConfig"));


class Posting extends Component {
    state = {
        imagePreview: ""
        , isDeleting: false
        , title: ""
        , highlights: ""
        , description: ""
        , loginError: ""
        , deliveryFree: false
        , isNew: false
        , isHot: false
        , star: 5
        , price: ""
        , originPrice: ""
        , discountPrice: ""
        , discountPercentage: ""
    }




    saveProduct = (props) => {
            const {
                title, highlights, description, imagePreview, deliveryFree, isNew
                , isHot, star, price, originPrice, discountPrice, discountPercentage
            } = props;

            console.log(title);
            console.log(highlights);
            console.log(description);
            console.log(imagePreview);
            console.log(deliveryFree);
            console.log(isNew);
            console.log(isHot);
            console.log(star);
            console.log(price);
            console.log(originPrice);
            console.log(discountPrice);
            console.log(discountPercentage);


            const requestData = {
                title, highlights, description, imagePreview, deliveryFree, isNew
                , isHot, star, price, originPrice, discountPrice, discountPercentage
            }

            console.log('리퀘스트데이타');
            console.log(requestData.title);

            if(!requestData.title){
                alert('제목이 없습니다.');
                return;
            }else if(!requestData.description){
                alert('내용이 없습니다.');
                return;
            }

            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(accessToken);
            console.log(refreshToken);


            if (accessToken && refreshToken) {
                axios
                    .post('/manager/software/save',JSON.stringify(requestData), {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                            'RefreshToken': `Bearer ${refreshToken}`,
                        },
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            const products = response.data.msg;
                            console.log(products);
                            alert('글 작성 완료');

                            this.props.history.push("/software");
                        } else {
                            console.log('인증된 유저만 접근 가능합니다.');
                            throw new Error('인증된 유저만 접근 가능합니다.');
                        }
                    })
                    .catch((error) => {
                        console.error('에러 발생', error);
                        console.log('에러 발생');
                        throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
                    });
            } else {
                console.log('로그인이 필요합니다.');
                throw new Error('로그인이 필요합니다.');
            }
    }


    onImageChange = async (obj) => {
        if (obj) {
            const ACCESS_KEY = 'AKIAUM5SAFCTKG4Z2PGC';
            const SECRET_ACCESS_KEY = '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';
            const REGION = "ap-northeast-2";
            const S3_BUCKET = 'image-gamja';
            const uuid = uuidv4();

            const file = obj;

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
                        this.setState({imagePreview: imageUrl});
                    }
                });
        } else {
            this.setState({imagePreview: ""});
        }
    };


    onTitleChange = async (title) => {
        if (title) {
            console.log(title);
            this.setState({title: title})
        }
    }

    onHighlightChange = async (highlights) => {
        if (highlights) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(highlights, 'text/html');
            const plainText = doc.body.textContent;
            console.log(plainText);
            this.setState({ highlights: plainText });
        }
    }

    onDescriptionChange = async (description) => {
        if (description) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(description, 'text/html');
            const plainText = doc.body.textContent;
            console.log(plainText);
            this.setState({ description: plainText });
        }
    }

    onDeliveryToggle = () => {
        this.setState((prevState) => ({
            deliveryFree: !prevState.deliveryFree
        }));
        console.log(this.state.deliveryFree);
    };

    onNewTagToggle = () => {
        this.setState((prevState) => ({
            isNew: !prevState.isNew
        }));
        console.log(this.state.isNew);
    };

    onHotTagToggle = () => {
        this.setState((prevState) => ({
            isHot: !prevState.isHot
        }));
        console.log(this.state.isHot);
    };

    setStar = async (value) => {
        if(value){
            console.log(value);
            this.setState({star:value});
        }
    }

    setPrice = async (price) => {
        if(price){
            console.log(price);
            this.setState({price:price});
        }
    }

    setOriginPrice = async (price) => {
        if(price){
            console.log(price);
            this.setState({originPrice:price});
        }
    }

    setDiscountPrice = async (price) => {
        if(price){
            console.log(price);
            this.setState({discountPrice:price});
        }
    }

    setDiscountPercent = async (percentage) => {
        if(percentage){
            console.log(percentage);
            this.setState({discountPercentage:percentage});
        }
    }


    render() {
        return (

                <div className="container-fluid my-3">
                    <div className="row">
                        <div className="col-md-4">
                            <FrontContent
                                onImageChange={this.onImageChange}
                                imagePreview={this.state.imagePreview}
                            />
                        </div>
                        <div className="col-md-8">
                            <ContentForm
                                onTitleChange={this.onTitleChange}
                                onHighlightChange={this.onHighlightChange}
                                title={this.state.title}
                                highlights={this.state.highlights}
                            />
                            <div style={{marginTop: '-600px'}}>
                                <SettingForm
                                    onDeliveryToggle={this.onDeliveryToggle}
                                    deliveryEnabled={this.state.deliveryFree}
                                    onNewTagToggle={this.onNewTagToggle}
                                    newTagEnabled={this.state.isNew}
                                    onHotTagToggle={this.onHotTagToggle}
                                    hotTagEnabled={this.state.isHot}
                                />
                            </div>
                        </div>
                        <div>
                            <SoftwareDescription
                                onDescriptionChange={this.onDescriptionChange}
                                description={this.state.description}
                            />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginTop: 'auto',
                        marginLeft: '0',
                        position: 'relative',
                        top: '-200px'
                    }}>
                        <div style={{ marginRight: 'auto'}}>
                            <PriceConfig
                                setPrice={this.setPrice}
                                setOriginPrice={this.setOriginPrice}
                                setDiscountPrice={this.setDiscountPrice}
                                setDiscountPercent={this.setDiscountPercent}
                                setStar={this.setStar}
                                star={this.state.star}
                            />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 'auto',
                        marginRight: '10px',
                        position: 'relative',
                        top: '-450px'
                    }}>
                        <button type="submit" onClick={() => this.saveProduct(this.state)}
                                style={{marginRight: '10px'}}>완료
                        </button>
                        <button style={{}}>취소</button>
                    </div>
                </div>

        );
    }
}

export default Posting;
