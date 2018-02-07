const path = require('path');
const webpack = require('webpack')
const webpackHotMiddleWare = require('webpack-hot-middleware');
const webpackDevMiddleWare = require('webpack-dev-middleware')

const config = require('./cfg/dev');
const { dfPath } = require('./cfg/default');

let app = new (require('express'))();
let port = 9001;

config.entry.unshift('webpack-hot-middleware/client?reload=true');

let compiler = webpack(config);

app.use(webpackDevMiddleWare(compiler, { publicPath: '/assets' }));
app.use(webpackHotMiddleWare(compiler));

app.get('/*', (req, res) => res.sendFile(dfPath.src + '/index.html'));

app.listen(port, (error)=>{
    if(!error){
        console.log(error);
    }
})