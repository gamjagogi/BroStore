import React, { useState, useEffect, lazy } from "react";
import FrontContent from "../../components/posting/FrontContent";
import ContentForm from "../../components/posting/ContentForm";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import axios from "../Request/RequestConfig";
import SoftwareDescription from "../../components/posting/SoftwareDescription";
import { useNavigate } from "react-router-dom";
import SoftwareSoldByAndCategoryConfig from "../../components/posting/SoftwareSoldByAndCategoryConfig";

const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const PriceConfig = lazy(() => import("../../components/posting/PriceConfig"));

const Posting = () => {

    // manager또는 admin인지 확인 후 아니면 뒤로 가게 만듬
    useEffect(() => {
        const userRole = sessionStorage.getItem('userRole');
        console.log(userRole);
        if(userRole==null){
            alert('판매자 기능입니다.');
            return navigate('/software');
        }
        if(!(userRole.match("ROLE_ADMIN")||userRole.match("ROLE_MANAGER"))){
            alert('판매자 기능입니다.');
            return navigate('/software');
        }
    },[])

    const [state, setState] = useState({
        imagePreview: "",
        isDeleting: false,
        title: "",
        highlights: "",
        description: "",
        loginError: "",
        deliveryFree: false,
        isNew: false,
        isHot: false,
        star: 5,
        price: "",
        originPrice: "",
        discountPrice: "",
        discountPercentage: "",
        soldBy: "",
        category: ""
    });

    const navigate = useNavigate();

    const saveProduct = () => {
        const {
            title,
            highlights,
            description,
            imagePreview,
            deliveryFree,
            isNew,
            isHot,
            star,
            price,
            originPrice,
            discountPrice,
            discountPercentage,
            soldBy,
            category
        } = state;

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
        console.log(soldBy);
        console.log(category);

        const requestData = {
            title,
            highlights,
            description,
            imagePreview,
            deliveryFree,
            isNew,
            isHot,
            star,
            price,
            originPrice,
            discountPrice,
            discountPercentage,
            soldBy,
            category
        };

        console.log("리퀘스트데이타");
        console.log(requestData.title);

        if (!requestData.title) {
            alert("제목이 없습니다.");
            return;
        } else if (!requestData.description) {
            alert("내용이 없습니다.");
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(accessToken);
        console.log(refreshToken);

        if (accessToken && refreshToken) {
            axios
                .post("/manager/software/save", JSON.stringify(requestData), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                        RefreshToken: `Bearer ${refreshToken}`,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const products = response.data.msg;
                        console.log(products);
                        alert("글 작성 완료");

                        navigate("/software"); // 작성 완료 시 /software 경로로 이동
                    } else {
                        console.log("인증된 유저만 접근 가능합니다.");
                        throw new Error("인증된 유저만 접근 가능합니다.");
                    }
                })
                .catch((error) => {
                    console.error("에러 발생", error);
                    throw new Error("에러 발생.");
                });
        } else {
            console.log("로그인이 필요합니다.");
            throw new Error("로그인이 필요합니다.");
        }
    };

    const onImageChange = async (obj) => {
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
                        setState((prevState) => ({ ...prevState, imagePreview: imageUrl }));
                    }
                });
        } else {
            this.setState({imagePreview: ""});
        }
    };

    const onTitleChange = async (title) => {
        if (title) {
            console.log(title);
            setState((prevState) => ({ ...prevState, title }));
        }
    };

    const onHighlightChange = async (highlights) => {
        if (highlights) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(highlights, "text/html");
            const plainText = doc.body.textContent;
            console.log(plainText);
            setState((prevState) => ({ ...prevState, highlights: plainText }));
        }
    };

    const onDescriptionChange = async (description) => {
        if (description) {
            console.log(description);
            setState((prevState) => ({ ...prevState, description: description }));
        }
    };

    const onDeliveryToggle = () => {
        setState((prevState) => ({
            ...prevState,
            deliveryFree: !prevState.deliveryFree,
        }));
        console.log(state.deliveryFree);
    };

    const onNewTagToggle = () => {
        setState((prevState) => ({ ...prevState, isNew: !prevState.isNew }));
        console.log(state.isNew);
    };

    const onHotTagToggle = () => {
        setState((prevState) => ({ ...prevState, isHot: !prevState.isHot }));
        console.log(state.isHot);
    };

    const setStar = async (value) => {
        if (value) {
            console.log(value);
            setState((prevState) => ({ ...prevState, star: value }));
        }
    };

    const setPrice = async (price) => {
        if (price) {
            console.log(price);
            setState((prevState) => ({ ...prevState, price }));
        }
    };

    const setOriginPrice = async (price) => {
        if (price) {
            console.log(price);
            setState((prevState) => ({ ...prevState, originPrice: price }));
        }
    };

    const setDiscountPrice = async (price) => {
        if (price) {
            console.log(price);
            setState((prevState) => ({ ...prevState, discountPrice: price }));
        }
    };

    const setDiscountPercent = async (percentage) => {
        if (percentage) {
            console.log(percentage);
            setState((prevState) => ({ ...prevState, discountPercentage: percentage }));
        }
    };

    const setSoldBy = async (soldBy) => {
        if (soldBy) {
            console.log(soldBy);
            setState((prevState) => ({ ...prevState, soldBy: soldBy }));
        }
    };

    const setCategory = async (category) => {
        if (category) {
            console.log(category);
            setState((prevState) => ({ ...prevState, category: category }));
        }
    };

    return (
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-md-4">
                    <FrontContent
                        onImageChange={onImageChange}
                        imagePreview={state.imagePreview}
                    />
                </div>
                <div className="col-md-8">
                    <ContentForm
                        onTitleChange={onTitleChange}
                        onHighlightChange={onHighlightChange}
                        title={state.title}
                        highlights={state.highlights}
                    />
                    <div style={{ marginTop: "-600px" }}>
                        <SettingForm
                            onDeliveryToggle={onDeliveryToggle}
                            deliveryEnabled={state.deliveryFree}
                            onNewTagToggle={onNewTagToggle}
                            newTagEnabled={state.isNew}
                            onHotTagToggle={onHotTagToggle}
                            hotTagEnabled={state.isHot}
                        />
                    </div>
                </div>
                <div>
                    <SoftwareDescription
                        onDescriptionChange={onDescriptionChange}
                        description={state.description}
                    />
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "auto",
                    marginLeft: "0",
                    position: "relative",
                    top: "-200px",
                }}
            >
                <div style={{ marginRight: "auto" }}>
                    <PriceConfig
                        setPrice={setPrice}
                        setOriginPrice={setOriginPrice}
                        setDiscountPrice={setDiscountPrice}
                        setDiscountPercent={setDiscountPercent}
                        setStar={setStar}
                        star={state.star}
                    />
                </div>
                <div style={{ marginTop : '50px', marginRight: "120px"}}>
                    <SoftwareSoldByAndCategoryConfig
                        setSoldBy={setSoldBy}
                        setCategory={setCategory}
                    />
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "auto",
                    marginRight: "10px",
                    position: "relative",
                    top: "-450px",
                }}
            >
                <button
                    type="submit"
                    onClick={() => saveProduct()}
                    style={{ marginRight: "10px" }}
                >
                    완료
                </button>
                <button style={{}}>취소</button>
            </div>
        </div>
    );
};

export default Posting;
