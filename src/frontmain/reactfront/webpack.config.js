const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"), // path 모듈 사용하여 경로 조작
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // .js와 .jsx 확장자에 대해서
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // babel-loader 사용
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"], // Babel 프리셋 설정
                    },
                },
            },
            {
                test: /\.svg$/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
