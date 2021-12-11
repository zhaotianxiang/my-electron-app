const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

// 监听渲染进程
ipcMain.on('child-send-event',(event, arg)=>{
    event.reply('main-reply-event',"这是主进程的答复")
});

// 监听渲染进程
ipcMain.on('open-new-window',(event, arg)=>{
    cWindow();
});

const cWindow = () => {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // node support
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL("https://www.taobao.com");
};

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // node support
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    // 主动发送信息给渲染进程
    // 此时，子进程的通信模块还没有建立起来，所以发送失败了，怎么办？
    mainWindow.webContents.send('main-send-event','主动发送消息');
    // delay 2000
    setTimeout(()=>{
        mainWindow.webContents.send('main-send-event','主动发送消息');
    },2000)
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
