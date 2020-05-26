//Importanto a aplicação, criação de janelas e criação de atalhos do Electron
const { app, BrowserWindow, globalShortcut } = require('electron');

// Importanto a config.js para usar a URL
const config = require('./config');

// Função responsável pela janela a ser criada
// Criando a variável de maneira global
let win;

function createWindow () {
  // Cria uma janela de navegação
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden", // Desabilita o titleBar no Mac
    alwaysOnTop: true, // Deixa a janela sempre por cima das outras (Não minimiza)
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Vai ler um arquivo quando carregar a janela
  // Como eu importei a 'config.js' eu posso carregar a URL declarada nela
  win.loadURL(config.url);

}

// Função para abrir o DevTools
function toggleDevTools() {
    win.webContents.toggleDevTools();
}

// Função responsável pelos atalhos
function createShortcuts() {
    // Registando um atalho para abrir o DevTools
    // Eu primeiro passo o atalho depois a função que ele vai executar
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools);
}

// Quando o aplicativo estiver pronto ele vai chamar a função createWindow()
// Depois de criar a janela ele vai chamar a função createShortcuts()
app.whenReady()
    .then(createWindow)
    .then(createShortcuts);

// Simula a ideia de você fechar a janela e ela ficar rodando em segundo plano (Mac)
app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Quando você chamar a aplicação novamente ela vai ser recriada (Mac)
app.on('activate', () => {
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});