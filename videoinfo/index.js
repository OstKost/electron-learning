const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(path.join("file://", __dirname, "index.html"));
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    if (err) throw err;
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
  });
});
