import axios from "../../Request/RequestConfig";


const DeliveryCategoryConfig = (categoryName) => {

    const category = categoryName;
    console.log(category);

    const getAll = async () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/delivery", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                            RefreshToken: `Bearer ${refreshToken}`,
                        },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            const products = response.data.data;
                            console.log(products);
                            resolve(products);
                            return products;
                        } else {
                            console.log("게시글을 가져올 수 없습니다..");
                            reject(new Error("게시글을 가져올 수 없습니다.."));
                        }
                    })
                    .catch((error) => {
                        console.error("게시글을 가져올 수 없습니다..", error);
                        reject(new Error("게시글을 가져올 수 없습니다.."));
                    });
            } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
            }
        });
    };


    const getElectronics = async () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/delivery/electronics", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                            RefreshToken: `Bearer ${refreshToken}`,
                        },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            const products = response.data.data;
                            console.log(products);
                            resolve(products);
                            return products;
                        } else {
                            console.log("게시글을 가져올 수 없습니다..");
                            reject(new Error("게시글을 가져올 수 없습니다.."));
                        }
                    })
                    .catch((error) => {
                        console.error("게시글을 가져올 수 없습니다..", error);
                        reject(new Error("게시글을 가져올 수 없습니다.."));
                    });
            } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
            }
        });
    };



    const getClothes = async () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/delivery/clothes", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                            RefreshToken: `Bearer ${refreshToken}`,
                        },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            const products = response.data.data;
                            console.log(products);
                            resolve(products);
                            return products;
                        } else {
                            console.log("게시글을 가져올 수 없습니다..");
                            reject(new Error("게시글을 가져올 수 없습니다.."));
                        }
                    })
                    .catch((error) => {
                        console.error("게시글을 가져올 수 없습니다..", error);
                        reject(new Error("게시글을 가져올 수 없습니다.."));
                    });
            } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
            }
        });
    };

    const getToy = async () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/delivery/toy", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                            RefreshToken: `Bearer ${refreshToken}`,
                        },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            const products = response.data.data;
                            console.log(products);
                            resolve(products);
                            return products;
                        } else {
                            console.log("게시글을 가져올 수 없습니다..");
                            reject(new Error("게시글을 가져올 수 없습니다.."));
                        }
                    })
                    .catch((error) => {
                        console.error("게시글을 가져올 수 없습니다..", error);
                        reject(new Error("게시글을 가져올 수 없습니다.."));
                    });
            } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
            }
        });
    };


    if(category==''){
        return getAll();
    }else if (category == 'Electronics'){
        return getElectronics();
    }else if (category == 'Clothes'){
        return getClothes();
    }else if (category == 'Toy') {
        return getToy();
    }else{
        return getAll();
    }
}

export default DeliveryCategoryConfig;