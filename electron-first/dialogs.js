const { dialog, app, nativeImage } = require("electron");
const fs = require("fs");
const path = require("path");

module.exports = { showMessage, showSaveDialog, showOpenDialog };

function showMessage(browserWindow) {
  dialog.showMessageBox(
    browserWindow,
    {
      type: "info",
      icon: nativeImage.createFromPath("./photo.jpg"),
      detail: "Soldier",
      buttons: ["Shoot", "Close"],
      defaultId: 0
    },
    clickedIndex => {
      console.log(clickedIndex);
    }
  );
}

function showSaveDialog(browserWindow) {
  dialog.showSaveDialog(
    browserWindow,
    {
      defaultPath: path.join(__dirname, "memUsage.txt")
    },
    async filename => {
      if (filename) {
        const processInfo = await process.getProcessMemoryInfo();
        console.log(processInfo);
        const memInfo = JSON.stringify(processInfo, null, 2);
        fs.writeFile(filename, memInfo, "utf8", err => {
          if (err) dialog.showErrorBox("Save Failed.", err.massage);
        });
      }
    }
  );
}

function showOpenDialog(browserWindow) {
  dialog.showOpenDialog(
    browserWindow,
    {
      defaultPath: app.getPath('home'),
      filters: [{ name: "Text Files", extensions: ["txt"] }]
    },
    filepaths => {
      if (filepaths) {
        console.log(filepaths, fs.readFileSync(filepaths[0], "utf8"));
      }
    }
  );
}
