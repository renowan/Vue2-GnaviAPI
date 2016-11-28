var packager = require('electron-packager');
var config = require('../package.json');

packager({
    dir: './',
    out: './app_dist',
    name: config.name,
    platform: 'darwin',
    arch: 'x64',
    icon: './app_icon/icon.icns',
    'app-bundle-id': 'jp.gnavi.electron-app',
    'app-version': config.version,
    overwrite: true,
    asar: true,
    prune: true,
    // 無視ファイル
    ignore: "node_modules|src|build|config|test|server|Makefile|README.md",
}, function done (err, appPath) {
    if(err) {
        throw new Error(err);
    }
    console.log('Mac package Done!!');
});
