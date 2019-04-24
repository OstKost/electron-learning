const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false
  });
  mainWindow.loadURL(path.join("file://", __dirname, "index.html"));
  console.log("App is ready!");
  setTimeout(() => {
    mainWindow.show();
  }, 1500);
});
