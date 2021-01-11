// TO DO
// prettier,treeshaking, thunk
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const globule = require('globule');
const path = require('path');

/**
 * 定数宣言
 */
const outputPath = path.resolve(__dirname, './front/dist');

/**
 * Webpack設定
 *
 * ---- tips ----
 * rules：上に書いている処理から実行される
 * loader や presets：下に書いている処理から実行される
 * 実行順を間違えないように注意すること
 *
 * 複数のloaderを持たせるたい時はuseを配列にするといい
 *
 * ---- Reactで記述したファイルを変換する流れ ----
 * １　@emotion/babel-preset-css-prop　Emotion関連を解釈
 * ２　@babel/preset-react　JSXを解釈
 * ３　@babel/preset-typescript　型情報を除去
 * ４　@babel/preset-env　ES5相当のコードに変換
 *
 * 型チェックをtscで行いつつ、変換はBabelに任せる。
 * Emotionとの共存の都合上、ts-loaderは使わない。
 */
const config = {
    // entry の プロパティをファイル名として出力する
    entry: {
        index: './front/dev/index.tsx',
    },
    output: {
        filename: 'js/[name].js',
        path: `${outputPath}`,
    },

    // 各ファイルに行う処理
    //-------------------------------
    module: {
        rules: [
            // 対象ファイル：ts | tsx
            //--------------------------------
            {
                //ts or tsxを指定
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    // Babel を利用する
                    loader: 'babel-loader',
                    // Babel のオプションを指定する
                    options: {
                        presets: [
                            // プリセットを指定することで、ES2020 を ES5 に変換
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        ie: '11',
                                    },
                                    //必要なpollyfillのみ読み込む
                                    useBuiltIns: 'usage',
                                    // proposalsを指定 → Stage 4 未満のプロポーザルの polyfill も import される
                                    corejs: { version: 3, proposals: true },
                                    debug: true,
                                },
                            ],
                            // 型情報を除去 ※型チェックは tsc で行う
                            '@babel/preset-typescript',
                            // React の JSX を解釈
                            '@babel/preset-react',
                            // Emotion で JSX Pragma を省略するために利用
                            '@emotion/babel-preset-css-prop',
                        ],
                        plugins: [
                            // Emotion で JSX Pragma を省略するために利用
                            '@babel/proposal-class-properties',
                            // オブジェクト内でスプレッド構文を用いるために利用
                            '@babel/proposal-object-rest-spread',
                            // optional chaining
                            '@babel/plugin-proposal-optional-chaining',
                        ],
                    },
                },
            },
            // 対象ファイル：js | jsx
            //--------------------------------
            {
                //js or jsxを指定
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    // Babel を利用する
                    loader: 'babel-loader',
                    // Babel のオプションを指定する
                    options: {
                        presets: [
                            // プリセットを指定することで、ES2020 を ES5 に変換
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        ie: '11',
                                    },
                                    //必要なpollyfillのみ読み込む
                                    useBuiltIns: 'usage',
                                    // proposalsを指定 → Stage 4 未満のプロポーザルの polyfill も import される
                                    corejs: { version: 3, proposals: true },
                                    debug: true,
                                },
                            ],
                            // React の JSX を解釈（TypeScript無しで書いているときに利用）
                            '@babel/preset-react',
                        ],
                    },
                },
            },
            // 対象ファイル：画像（import時）
            //--------------------------------
            {
                test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
                loader: 'file-loader',
                options: {
                    name: './src/assets/img/[name].[ext]',
                },
            },
        ],
    },
    // ES5（IE11等）向けの指定
    // アロー関数などの構文を変換できるが、pollyfillは読みこめない
    //----------------------------------------------------------
    target: ['web', 'es5'],

    // import文で拡張子を省略するため、resolve.extentionsに拡張子を登録
    //----------------------------------------------------------
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '~': path.resolve(__dirname, 'front/dev'),
        },
    },

    plugins: [
        // ビルド時にフォルダー内のファイルを削除する
        new CleanWebpackPlugin(),
        // ディレクトリ構造を保ったまま画像を出力する
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'front/dev/assets/img',
                    to: `${outputPath}/assets/img`,
                },
            ],
        }),
        // 画像を圧縮
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            // png
            pngquant: {
                quality: '65-80',
            },
            // jpg
            plugins: [
                ImageminMozjpeg({
                    quality: 70,
                    progressive: true,
                }),
            ],
        }),
        // HTMLファイルを出力
        new HtmlWebpackPlugin({ template: './front/__dev-server-templates__/common.html' }),
    ],
};

/**
 * develop用の設定　＋　module.export
 */
module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        // devで扱いたい処理はここに書く
        //-------------------------------------------
        config.devtool = 'inline-source-map';
        config.devServer = {
            inline: true,
            stats: { colors: true },
            contentBase: outputPath,
            open: true,
            hot: true,
            // URLを叩いてSPAにアクセスできるようにする
            historyApiFallback: true,
        };
    }

    return config;
};
