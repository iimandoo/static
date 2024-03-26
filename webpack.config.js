// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const dev = process.env.NODE_ENV === "development";
module.exports = {
  // 개발시라면 개발 모드로 한다.
  mode: dev ? "development" : "production",
  optimization: {
    splitChunks: {
      // 청크를 가능한만큼 다 분리한다.
      // 파일 각각의 용량을 줄여들어서 웹페이지 로드속도 감소에 도움이 된다.
      chunks: "all",
    },
    // 개발중이 아니라면 압축한다.
    minimize: !dev,
  },
  // 진입 파일이다.
  // ./src/index.tsx 파일에 필요한 모듈들을 번들링한다고 이해하면 된다.
  //
  // 즉, 다시 말해 출력파일을 실행하면 ./src/index.tsx을 실행하는 것과 동일한 효과를 가진다,
  // 다만 필요한 모듈들이 같이 번들링되어 있어 웹 환경 등에서도 실행이 용이할 뿐이다.
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    // index.js로 하면 splitChunks 속성때문에 오류가 난다.
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  module: {
    rules: [
      // 참고: use 속성은 마지막 아이템에서 첫 아이템으로의 순서, 즉 다시 말해 오른쪽에서 왼쪽으로의 순서로 해석된다.
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          // Babel은 현대 자바스크립트를 브라우저 지원여부을 고려할 필요없이 쓸 수 있도록 해준다.
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"],
            },
          },
          // Typescript를 Javascript로 컴파일해준다.
          "ts-loader",
        ],
      },
      {
        test: /\.css$/,
        // postcss-loader는 TailwindCSS 적용에 이용된다.
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    // 빌드전에 dist 디렉토리내 파일들을 먼저 지우고
    new CleanWebpackPlugin(),
    // 빌드후 출력파일들이 script태그로 포함된 html파일을 생성한다.
    new HtmlWebpackPlugin({
      title: "Yeonjin Shin",
      filename: "index.html",
    }),
  ],
  // 디버깅할 때 쓰는 웹서버에 관한 설정이다.
  // webpack serve로 열 수 있다.
  devServer: {
    static: { directory: path.join(__dirname, "dist") },
    open: true,
    port: "auto",
  },
  // 이거 안하면 node_modules내 수 많은 파일의 변경여부도 같이 확인하기 때문에
  // 디버깅용 웹서버가 정상적으로 작동하지 않는다.
  watchOptions: {
    ignored: /node_modules/,
  },
};
