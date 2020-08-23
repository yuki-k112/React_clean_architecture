const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const globule = require('globule');
const path = require('path');
const outputPath = path.resolve(__dirname, './front/dist');

const config = {
    entry: {
      main:'./front/dev/pages/index.tsx',
    },

    output: {
        filename: '[name].js',
        path:`${outputPath}/js`
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [ "@babel/preset-env",  {
                                    targets: {
                                        ie: '11'
                                    },
                                    useBuiltIns: 'usage',
                                    corejs: { version: 3, proposals: true },
                                    debug: true
                                }],
                                "@babel/preset-typescript" ,
                                "@babel/preset-react" ,
                                "@emotion/babel-preset-css-prop"
                            ],
                            plugins: [
                                "@babel/proposal-class-properties",
                                "@babel/proposal-object-rest-spread"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [ "@babel/preset-env",  {
                                    targets: {
                                        ie: '11'
                                    },
                                    useBuiltIns: 'usage',
                                    corejs: { version: 3, proposals: true },
                                    debug: true
                                }],
                                "@babel/preset-react"
                            ],
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
                loader: 'file-loader',
                options: {
                    name: './front/dev/assets/img/[name].[ext]'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    plugins:[
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin([{
            from: 'front/dev/assets/img',
            to:`${outputPath}/assets/img`
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '65-80'
            },
            plugins: [
                ImageminMozjpeg({
                    quality: 70,
                    progressive: true
                })
            ]
        }),
    ]
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {

        config.devtool = 'inline-source-map'

        config.devServer = {
            inline: true,
            stats: { colors: true },
            contentBase:outputPath,
            open: true
        }

        config.plugins = [
          new HtmlWebpackPlugin({
            filename: '',
            script: '',
            template: 'front/__dev-server-templates__/common.html',
            inject:false,
            minify: false,
            filename:`${distDir(entry)}.html`,
            script:`/js/${distDir(entry)}.js`,
          })
        ]
    }

    return config
}
