import React, {lazy, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import { ReactComponent as IconLaptop } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import Support from "../components/Support";
import Banner from "../components/carousel/Banner";
import Carousel from "../components/carousel/Carousel";
import CardIcon from "../components/card/CardIcon";
import CardLogin from "../components/card/CardLogin";
import CardImage from "../components/card/CardImage";
import CardDealsOfTheDay from "../components/card/CardDealsOfTheDay";
import axios from "./Request/RequestConfig";
import HomeCardIcon from "../components/card/HomeCardIcon";

const Home = () => {
    const [slide, setSlide] = useState([]);
    const [card, setCard] = useState([]);
    // const [hour, setHour] = useState(14);
    // const [endDate, setEndDate] = useState(Date.now() + 1000 * 60 * 60 * 14);


    useEffect(() => {
        fetchSlide();
        fetchCard();
        return;
    }, []);



    const components = {
        IconLaptop: IconLaptop,
        IconHeadset: IconHeadset,
        IconPhone: IconPhone,
        IconTruck: IconTruck,
        IconTv: IconTv,
        IconDisplay: IconDisplay,
        IconHdd: IconHdd,
        IconUpcScan: IconUpcScan,
        IconTools: IconTools,
    };


    const fetchSlide = async () => {
        try {
            const response = await axios.get(`/home/slide`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                const data = await response.data.data;
                console.log(data);
                setSlide(data);

                return;
            } else {
                console.error('게시글을 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    }

    const fetchCard = async () => {
        try {
            const response = await axios.get(`/home/card`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                const data = await response.data.data;
                console.log(data);
                setCard(data);
                return;
            } else {
                console.error('게시글을 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    }

    // const fetchCount = async () => {
    //     try {
    //         const response = await axios.get(`/home/count`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //
    //         if (response.status == 200) {
    //             const data = await response.data.data;
    //             console.log(data);
    //             setHour(data);
    //             return;
    //         } else {
    //             console.error('게시글을 가져오지 못했습니다.');
    //         }
    //     } catch (error) {
    //         console.error('에러발생..', error);
    //     }
    // }


    const adProducts = card;

    const categoryProduct = data.iconProducts;
    const rows = [...Array(Math.ceil(categoryProduct.length / 4))];
    const adRows = [...Array(Math.ceil(adProducts.length / 4))];

    const productRow = rows.map((row, idx) =>
        categoryProduct.slice(idx * 4, idx * 4 + 4)
    );

    const adProductRow = adRows.map((row, idx) =>
        adProducts.slice(idx * 4, idx * 4 + 4)
    );


    const generateCarouselContent = (productRows) => {
        return productRows.map((row, idx) => (
            <div
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                key={idx}
            >
                <div className="row g-3">
                    {row.map((product, idx) => {
                        const ProductImage = components[product.img];
                        return (
                            <div key={idx} className="col-md-3">
                                <CardIcon
                                    title={product.title}
                                    text={product.description}
                                    tips={product.tips}
                                    to={product.to}
                                >
                                    <ProductImage
                                        className={product.cssClass}
                                        width="80"
                                        height="80"
                                    />
                                </CardIcon>
                            </div>
                        );
                    })}
                </div>
            </div>
        ));
    };



    const generateAdCarouselContent = (productRows) => {
        return productRows.map((row, idx) => (
            <div
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                key={idx}
            >
                <div className="row g-3">
                    {row.map((product, idx) => {
                        return (
                            <div key={idx} className="col-md-3">

                                <HomeCardIcon
                                    img={product.img}
                                    title={product.title}
                                    text={product.description}
                                    to={product.to}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        ));
    };

    const carouselContent = generateCarouselContent(productRow);

    const carouselAdContent = generateAdCarouselContent(adProductRow);

    return (
        <React.Fragment>
            <Banner className="mb-3" id="carouselHomeBanner" data={slide} />
            <div className="container-fluid bg-light mb-3">
                <div className="row g-3">
                    <div className="col-md-9">
                        <Carousel id="product-category" className="mb-3">
                            {carouselContent}
                        </Carousel>
                        <Support />
                    </div>
                    <div className="col-md-3">
                        <CardLogin className="mb-3" />
                        <CardImage src="../../images/banner/Watches.webp" to="promo" />
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-light mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <CardDealsOfTheDay
                            title="Hot Sale Item!"
                            to="/"
                        >
                            <Carousel id="product-category1">
                                {carouselAdContent}
                            </Carousel>
                        </CardDealsOfTheDay>
                    </div>
                </div>
            </div>
            <div className="bg-info bg-gradient p-3 text-center mb-3">
                <h4 className="m-0" style={{ fontWeight: "bold" }}>
                    BRO Store
                </h4>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Link to="/" className="text-decoration-none">
                            <img
                                src="../../images/category/male.webp"
                                className="img-fluid rounded-circle"
                                alt="..."
                            />
                            <div className="text-center h6">AD</div>
                        </Link>
                    </div>
                    {/* Add similar blocks for other categories */}
                </div>
            </div>
        </React.Fragment>
    );
};


export default Home;
