const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  entry: {
    main: './src/js/main.js',
    // db: './src/js/db.js',
    // helpers: './src/js/helpers.js',
    // idb: './src/js/idb.min.js',
   
  },
    // you should know that the HtmlWebpackPlugin by default will generate its own index.html file, even though we already have one in the dist/folder.This means that it will replace our index.html file with a newly generated one;
    output:{
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
  },
    mode: "development",
    devtool: 'inline-source-map',
    //This tells webpack-dev-server to serve the files from the dist directory on localhost:6060.
    devServer: {
      static: './dist',
      port:6060
    },
    ///The Asset Modules will take any file you load through them and output it to your build directory.
    module: {
        rules: [
          {
            ///از یک عبارت منظم برای تعیین اینکه کدام فایل ها را باید جستجو کرده و به یک لودر خاص ارائه کند، استفاده می کند
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(csv|tsv)$/i,
            use: ['csv-loader'],
          },
          {
            test: /\.xml$/i,
            use: ['xml-loader'],
          },
        ],
      },
      optimization: {
        runtimeChunk: 'single',
      },
}

//This enables you to import './style.css' into the file that depends on that styling. Now, when that module is run, a <style> tag with the stringified css will be inserted into the <head> of your html file.
///Another useful asset that can be loaded is data, like JSON files, CSVs, TSVs, and XML. Support for JSON is actually built-in, similar to NodeJS, meaning import Data from './data.json' will work by default. To import CSVs, TSVs, and XML you could use the csv-loader and xml-loader. Let's handle loading all three:npm install --save-dev csv-loader xml-loader
///////But what would happen if we changed the name of one of our entry points, or even added a new one? The generated bundles would be renamed on a build, but our index.html file would still reference the old names. Let's fix that with the HtmlWebpackPlugin.
///As you might have noticed over the past guides and code example, our /dist folder has become quite cluttered. Webpack will generate the files and put them in the /dist folder for you, but it doesn't keep track of which files are actually in use by your project.

// In general it's good practice to clean the /dist folder before each build, so that only used files will be generated. Let's take care of that with output.clean option.

///It quickly becomes a hassle to manually run npm run build every time you want to compile your code.There are a couple of different options available in webpack that help you automatically compile your code whenever it changes:
// webpack's Watch Mode
// webpack-dev-server
// webpack-dev-middleware
//The webpack-dev-server provides you with a rudimentary web server and the ability to use live reloading.