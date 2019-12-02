

const isEnvDevelopment = webpackEnv === 'development';

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: '/',
        filename: '[name].[contenthash:8].js',
        chunkFilename: isEnvDevelopment 
            ? 'statis/js/[name].[contenthash:8].js' 
            : 'static/js/[name].chunk.js',
        
    },
    resolve: {
        modules: [path.join(__dirname, '../node_modules')],
        extensions: ['.js', '.vue', '.less', '.css', '.scss', '.less'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-router$': 'vue-router/dist/vue-router.common.js',
            'src': path.resolve(__dirname, '../src'),
            'common': path.resolve(__dirname, '../src/common')
        },
        symlinks: false
    },
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],
    module: {
        rules: [
        {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }],
            include: /(src|node_modules\/noahv?)/
        },
        {
            test: /\.css$/,
            use: [
                useCssExtract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: useCssSourceMap
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                useCssExtract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: useCssSourceMap
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: useCssSourceMap,
                        javascriptEnabled: true
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[ext]')
                }
                
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }]
        }]
    },
    plugins: [
        // make sure to include the plugin!
    ]
}