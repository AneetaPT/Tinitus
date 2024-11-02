
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 300,
        height: 300,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Update the path to load from src directory
    win.loadFile(path.join(__dirname, 'src', 'index.html'));
    
    win.removeMenu();

    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    
    win.setPosition(width - 320, height - 320);
}

// Add auto-launch capability
const AutoLaunch = require('auto-launch');
let autoLauncher = new AutoLaunch({
    name: 'Frog Widget',
    path: app.getPath('exe'),
});

// Enable auto-launch by default
autoLauncher.enable();

let tray = null;

function createTray() {
    tray = new Tray(path.join(__dirname, 'build', 'icon.ico'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show Frog', click: createWindow },
        { label: 'Exit', click: () => app.quit() }
    ]);
    tray.setToolTip('Frog Widget');
    tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
=======
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 300,
        height: 300,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Update the path to load from src directory
    win.loadFile(path.join(__dirname, 'src', 'index.html'));
    
    win.removeMenu();

    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    
    win.setPosition(width - 320, height - 320);
}

// Add auto-launch capability
const AutoLaunch = require('auto-launch');
let autoLauncher = new AutoLaunch({
    name: 'Frog Widget',
    path: app.getPath('exe'),
});

// Enable auto-launch by default
autoLauncher.enable();

let tray = null;

function createTray() {
    tray = new Tray(path.join(__dirname, 'build', 'icon.ico'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show Frog', click: createWindow },
        { label: 'Exit', click: () => app.quit() }
    ]);
    tray.setToolTip('Frog Widget');
    tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
}); 