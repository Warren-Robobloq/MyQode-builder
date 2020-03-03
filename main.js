const electron = require('electron');
const {app, ipcMain, BrowserWindow} = require('electron');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

// 主窗口
let mainWindow = null;

// Loading 窗口
let splashWindow = null;

let filepath = null;
let ready = false;

if (process.platform === 'win32' && process.argv.length > 1) {
    filepath = process.argv[1];
}

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) {
        if (commandLine.length > 1){
			mainWindow.webContents.send('open-file', commandLine[1]);
        }
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.focus();
    }
});

if (shouldQuit) {
    app.quit();
} else {

    app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true');
    // app.commandLine.appendSwitch('enable-zero-copy', 'true');
    // app.commandLine.appendSwitch('disable-software-rasterizer', 'false');
    // app.commandLine.appendSwitch('enable-native-gpu-memory-buffers', 'true');

    app.on('ready', () => {
        /* 主窗口设置 */
        const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
        mainWindow = new BrowserWindow({
          width: width,
          height: height,
          show: false
        });
        mainWindow.loadURL(url.format({
          pathname: path.join(__dirname, 'www/build/index.html'),
          protocol: 'file:',
          slashes: true
        }));
        mainWindow.webContents.once('dom-ready', () => {
            // 开发环境开启调试工具
            if (isDev) {
                mainWindow.webContents.openDevTools();
            }
            splashWindow.destroy();
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.hide();
                splashWindow.close();
            }
        });
        mainWindow.webContents.on('will-navigate', (event) => {
            event.preventDefault()
        });
        mainWindow.webContents.on('crashed', () => mainWindow.reload());
        
        mainWindow.on('close', e => {
            ipcMain.once('close-mainwindow', (event, arg) => {
                if (arg === 'close') {
                    mainWindow.destroy();
                }
            });
            ipcMain.once('close-atonce', (event, arg) => {
                if (arg === 'close') {
                    mainWindow.destroy();
                }
            });
            e.sender.send('close-mainwindow-reply', 'close');
            e.preventDefault();
        });
        
        mainWindow.webContents.on('did-finish-load', function() {
            if (filepath) {
                mainWindow.webContents.send('open-file', filepath);
                filepath = null;
            }
        });
        /* 启动画面 */
        splashWindow = new BrowserWindow({
          width: 640,
          height: 480,
          backgroundColor: '#fff',
          frame: false
        });
        splashWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'www/loading.html'),
            protocol: 'file:',
            slashes: true
        }));
        splashWindow.once('closed', () => {
            splashWindow = null;
        });
        /* 主窗口加载完 */
        mainWindow.once('ready-to-show', () => {
            mainWindow.show();
        });

        ready = true;
    });
    app.on('window-all-closed', () => {
        app.quit();
    });

    // 打开文件
    app.on("open-file", function(event, path) {
        event.preventDefault();
        filepath = path;
        if (process.platform === 'win32' && process.argv.length > 1) {
            filePath = process.argv[1];
        }
        if (ready) {
            mainWindow.webContents.send('open-file', filepath);
            filepath = null;
            return;
        }
    });
    // 检测版本
    function sendStatusToWindow(text) {
        log.info(text);
        mainWindow.webContents.send('check-update-reply', text);
    }

    autoUpdater.on('checking-for-update', () => {
        const data = {
            key: 'checkingForUpdate'
        };
        sendStatusToWindow(data);
    });
    autoUpdater.on('update-available', (info) => {
        const data = {
            key: 'updateAvailable',
            info: info
        };
        sendStatusToWindow(data);
    });
    autoUpdater.on('update-not-available', (info) => {
        const data = {
            key: 'updateNotAvailable',
            info: info
        };
        sendStatusToWindow(data);
    });
    autoUpdater.on('error', (err) => {
        const data = {
            key: 'error',
            info: err
        };
        sendStatusToWindow(data);
    });
    ipcMain.on('check-update', (event, arg) => {
        if (isDev === false) {
            autoUpdater.checkForUpdates();
        }
    });
}
