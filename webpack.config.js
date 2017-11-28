const webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: __dirname+"/src/index.tsx",
  output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
  },
  watch: true,
  // Enable sourcemaps for debugging webpack's output.
  devtool: "eval-source-map",

  resolve: {
    alias: {
        Components: path.join(__dirname, '..', 'src', 'scripts', 'components')
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },


          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
          {
              test: /\.css$/,
              use: [
                  {
                      loader: "style-loader"
                  }, {
                      loader: "css-loader"
                  }
              ]
          }
      ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },
  devServer: {
    contentBase: "./",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    port:"9527",
    hot: true
  } ,
  plugins: [
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
};