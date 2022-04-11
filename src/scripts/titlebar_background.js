import {ipcMain, Menu, BrowserWindow} from 'electron'

ipcMain.on('request-application-menu', (event) => sendApplicationMenu(event.sender));

ipcMain.on('menu-event', (event, commandId) => {
  if(!getMenuItemByCommandId(commandId)) return
  getMenuItemByCommandId(commandId).click(undefined, BrowserWindow.fromWebContents(event.sender), event.sender);
});

ipcMain.on('window-event', (event, arg) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  switch (arg) {
    case 'minimize':
      window.minimize();
      break;
    case 'maximize':
      window.isMaximized() ? window.unmaximize() : window.maximize();
      break;
    case 'close':
      window.close();
      break;
  }
});

ipcMain.on('window-state', (event) => {
  event.returnValue = BrowserWindow.fromWebContents(event.sender).isMaximized();
});

const sendApplicationMenu = (webContents) => {
  const appMenu = Menu.getApplicationMenu();

  setDefaultRoleAccelerators(appMenu);

  // Strip functions, maps and circular references (for IPC)
  const menu = JSON.parse(JSON.stringify(appMenu, getCircularReplacer()));

  // Send menu structure to renderer
  webContents.send('application-menu', menu);
};

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (key === 'commandsMap') return;
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const getMenuItemByCommandId = (commandId, menu = Menu.getApplicationMenu()) => {
  for (let i = 0; i < menu.items.length; i++) {
    const item = menu.items[i];
    if (item.commandId === commandId) {
      return item;
    } else if (item.submenu) {
      const result = getMenuItemByCommandId(commandId, item.submenu);
      if (result) {
        return result;
      }
    }
  }
};

const setDefaultRoleAccelerators = (menu) => {
  for (let i = 0; i < menu.items.length; i++) {
    const item = menu.items[i];
    if (item.role && item.getDefaultRoleAccelerator) {
      item.defaultRoleAccelerator = item.getDefaultRoleAccelerator();
    }
    if (item.submenu) {
      setDefaultRoleAccelerators(item.submenu);
    }
  }
};