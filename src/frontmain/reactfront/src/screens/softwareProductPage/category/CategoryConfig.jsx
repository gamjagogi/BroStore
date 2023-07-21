import axios from "../../Request/RequestConfig";


const CategoryConfig = (categoryName) => {

    const category = categoryName;
    console.log(category);

    const getAll = async () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/software", {
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


    const webCrawling = async () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/software/crawling", {
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



    const getMacro = async () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/software/macro", {
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

    const getMonitoring = async () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/software/monitoring", {
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
    }else if (category == 'Web Crawling'){
        return webCrawling();
    }else if (category == 'Macro'){
        return getMacro();
    }else if (category == 'Monitoring') {
        return getMonitoring();
    }else{
        return getAll();
    }
}

export default CategoryConfig;