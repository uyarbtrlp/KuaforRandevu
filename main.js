const { app, BrowserWindow,screen,remote,Menu,Tray  } = require('electron')
const Store = require('electron-store');
const store = new Store();

let win;
number=store.get('token')
height=0;
windth=0;
function createWindowIndex () {
 
    // Create the browser window.
    win = new BrowserWindow(
      {
        height:height,
        width:width,
        minHeight:800,
        minWidth:1000,
        skipTaskbar:true,
        backgroundColor:'#222222',
        webPreferences:{

      nodeIntegration:true
    }}
    )
    Menu.setApplicationMenu(null)
  
   
    win.on('close', (event) => {
      if (app.quitting) {
        win = null
      } else {
        event.preventDefault()
        win.hide()
      }
    })
    // and load the index.html of the app.
    win.loadFile('dist/KuaforRandevu/index.html')
  
    // Open the DevTools.
    win.webContents.openDevTools()
  }
  function loggedWindow(){
    win = new BrowserWindow(
      {
        height:height,
        width:width,
        minHeight:600,
        minWidth:1000,
        skipTaskbar:true,
        show:false,
        webPreferences:{

      nodeIntegration:true
    }}
    )
    console.log(number)
    Menu.setApplicationMenu(null)
    win.maximize()
    win.show()
   
    win.on('close', (event) => {
      if (app.quitting) {
        win = null
      } else {
        event.preventDefault()
        win.hide()
      }
    })
    // and load the index.html of the app.
    win.loadFile('dist/KuaforRandevu/index.html')
  
    // Open the DevTools.
    win.webContents.openDevTools()
  }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

    app.whenReady().then(()=>{
      
      if(number==null){
        height=600;
        width=1000;
        createWindowIndex()
    
      }
      else{
        width=screen.getPrimaryDisplay().bounds.width+50;
        height=screen.getPrimaryDisplay().bounds.height+50;
        loggedWindow()
      }
      
      tray = new Tray('hata.png')
      const contextMenu = Menu.buildFromTemplate([
        { label: 'Çıkış Yap', type: 'normal',click:()=>{
          app.quit()


        } },
      ])
      tray.on("click",()=>{
        win.maximize()
      win.show()


      })
      tray.setToolTip('Kuafor Randevu Sistemi')
      tray.setContextMenu(contextMenu)
     
    
    
    })



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
   
    
        win.show()
    
  }
  
})
app.on('before-quit', () => app.quitting = true)

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
