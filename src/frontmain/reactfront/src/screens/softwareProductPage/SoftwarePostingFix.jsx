import React, { useState, useEffect, lazy } from "react";
import FrontContent from "../../components/posting/FrontContent";
import ContentForm from "../../components/posting/ContentForm";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import axios from "../Request/RequestConfig";
import SoftwareDescription from "../../components/posting/SoftwareDescription";
import {useNavigate, useSearchParams} from "react-router-dom";
import SoftwareSoldByAndCategoryConfig from "../../components/posting/SoftwareSoldByAndCategoryConfig";
import {Button} from "react-bootstrap";

const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const PriceConfig = lazy(() => import("../../components/posting/PriceConfig"));

const SoftwarePostingFix = () => {
    const [searchParams] = useSearchParams();
    const name = sessionStorage.getItem('userData');


    // manager또는 admin인지 확인 후 아니면 뒤로 가게 만듬
    useEffect(() => {
        const userRole = sessionStorage.getItem('userRole');
        console.log(searchParams.get('category'));

        console.log(userRole);
        if(userRole==null){
            alert('판매자 기능입니다.');
            return navigate('/software');
        }
        if(!(userRole.match("ROLE_ADMIN")||userRole.match("ROLE_MANAGER"))){
            alert('판매자 기능입니다.');
            return navigate('/software');
        }
        window.scrollTo(0, 0);
        return ;
    },[])

    const [state, setState] = useState({
        softwareId: searchParams.get("softwareId"),
        imagePreview: searchParams.get("imgSrc"),
        title: searchParams.get("title"),
        highlights: searchParams.get("highlights"),
        description: searchParams.get("description"),
        isNew: searchParams.get("isNew"),
        isHot: searchParams.get("isHot"),
        star: searchParams.get("star"),
        price: searchParams.get("price"),
        originPrice: searchParams.get("originPrice"),
        discountPrice: searchParams.get("discountPrice"),
        soldBy: searchParams.get("soldBy"),
        category: searchParams.get("category")?searchParams.get("category"):"Category",
        discountPercent: searchParams.get("discountPercent"),
        uploadFile: searchParams.get("uploadFile")
    });


    const navigate = useNavigate();

    const saveProduct = () => {
        const {
            softwareId,
            imagePreview,
            title,
            highlights,
            description,
            isNew,
            isHot,
            star,
            price,
            originPrice,
            discountPrice,
            soldBy,
            category,
            discountPercent,
            uploadFile
        } = state;

        console.log(softwareId);
        console.log(title);
        console.log(highlights);
        console.log(description);
        console.log(imagePreview);

        console.log(isNew);
        console.log(isHot);
        console.log(star);
        console.log(price);
        console.log(originPrice);
        console.log(discountPrice);
        console.log(soldBy);
        console.log(category);
        console.log(uploadFile);

        const requestData = {
            softwareId,
            title,
            highlights,
            description,
            imagePreview,
            isNew,
            isHot,
            star,
            price,
            originPrice,
            discountPrice,
            soldBy,
            category,
            discountPercent,
            uploadFile
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
        const id = sessionStorage.getItem('userData2');
        console.log(accessToken);
        console.log(refreshToken);

        if (accessToken && refreshToken) {
            axios
                .post(`/manager/software/update/${id}`, JSON.stringify(requestData), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                        RefreshToken: `Bearer ${refreshToken}`,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        alert("글 수정 완료");
                        navigate("/software"); // 작성 완료 시 /software 경로로 이동
                    } else {
                        console.error("글 수정을 하지못하였습니다.");
                    }
                })
                .catch((error) => {
                    console.error("에러 발생", error);
                });
        } else {
            console.log("로그인이 필요합니다.");
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
                    console.log('Success');
                })
                .send((err, data) => {
                    if (err) {
                        console.error('업로드 오류:', err);
                        alert('error');
                        return;
                    } else {
                        const {Bucket, Key} = params; // params 객체에서 Bucket과 Key를 추출합니다.
                        const imageUrl = `https://${Bucket}.s3.amazonaws.com/${Key}`; // 이미지의 위치(URL)을 구성합니다.
                        console.log('업로드 완료. 이미지 위치:', imageUrl);
                        setState((prevState) => ({ ...prevState, imagePreview: imageUrl }));
                        return;
                    }
                });
        } else {
            this.setState({imagePreview: ""});
            return;
        }
    };

    const onTitleChange = async (title) => {
        if (title.length<=50) {
            console.log(title);
            setState((prevState) => ({ ...prevState, title }));
        }else {
            alert('제목 길이 초과');
        }
    };

    const onHighlightChange = async (highlights) => {
        if (highlights.length<=200) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(highlights, "text/html");
            const plainText = doc.body.textContent;
            console.log(plainText);
            setState((prevState) => ({ ...prevState, highlights: plainText }));
        }else {
            alert('길이 초과');
        }
    };

    const onDescriptionChange = async (description) => {
        if (description) {
            console.log(description);
            setState((prevState) => ({ ...prevState, description: description }));
        }else {
            alert('내용을 입력해주세요.');
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

    const setStar = async (index) => {

            console.log(index);
            setState((prevState) => ({ ...prevState, star: index }));

    };

    const setPrice = async (price) => {

            console.log(price);
            setState((prevState) => ({ ...prevState, price }));

    };

    const setOriginPrice = async (price) => {

            console.log(price);
            setState((prevState) => ({ ...prevState, originPrice: price }));

    };

    const setDiscountPrice = async (price) => {

            console.log(price);
            setState((prevState) => ({ ...prevState, discountPrice: price }));

    };

    const setDiscountPercent = async (percentage) => {

            console.log(percentage);
            setState((prevState) => ({ ...prevState, discountPercent: percentage }));

    };


    const setCategory = async (category) => {

            console.log(category);
            setState((prevState) => ({ ...prevState, category: category }));

    };

    const handleBack = () => {
        navigate(-1);
    }

    const handleUploadFile = (props) => {
        console.log(props);
        setState((prevState) => ({...prevState, uploadFile: props}));
    }


    return (
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-md-4" style={{marginBottom:'10px'}}>
                    <FrontContent
                        onImageChange={onImageChange}
                        imagePreview={state.imagePreview}
                    />
                </div>
                <div className="col-md-8">
                    <div style={{marginTop:'10px'}}>
                    <ContentForm
                        onTitleChange={onTitleChange}
                        onHighlightChange={onHighlightChange}
                        title={state.title}
                        highlights={state.highlights}
                    />
                    </div>
                    <div>
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
                <div className="col-12" style={{marginBottom:'30px'}}>
                    <SoftwareDescription
                        onDescriptionChange={onDescriptionChange}
                        description={state.description}
                        handleUploadFile={handleUploadFile}
                        uploadFile={state.uploadFile}
                    />
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "50px",
                    marginLeft: "0",
                    position: "relative",
                }}
            >
                <div style={{ marginRight: "auto" }}>
                    <PriceConfig
                        setPrice={setPrice}
                        price={state.price}
                        setOriginPrice={setOriginPrice}
                        originPrice={state.originPrice}
                        setDiscountPrice={setDiscountPrice}
                        discountPrice={state.discountPrice}
                        setDiscountPercent={setDiscountPercent}
                        discountPercent={state.discountPercent}
                        setStar={setStar}
                        star={state.star}
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
                }}
            >
                <div style={{ marginTop : 'auto'}}>
                    <SoftwareSoldByAndCategoryConfig
                        soldBy={state.soldBy}
                        setCategory={setCategory}
                        category={state.category}
                    />
                </div>
                <div>
                <Button
                    type="submit"
                    onClick={() => saveProduct()}
                    style={{ marginRight: "10px" }}
                >
                    완료
                </Button>
                <Button onClick={handleBack}>취소</Button>
                </div>
            </div>
        </div>
    );
};

export default SoftwarePostingFix;
