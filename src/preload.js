const {
	ipcRenderer
} = require('electron');
const Titlebar = require('@6c65726f79/custom-titlebar');

let titlebar;

window.addEventListener('DOMContentLoaded', () => {
	titlebar = new Titlebar({
		backgroundColor: '#101014',
		onMinimize: () => ipcRenderer.send('window-event', 'minimize'),
		onMaximize: () => ipcRenderer.send('window-event', 'maximize'),
		onClose: () => ipcRenderer.send('window-event', 'close'),
		isMaximized: () => ipcRenderer.sendSync('window-state'),
		menuItemClickHandler: (commandId) => ipcRenderer.send('menu-event', commandId)
	});

	ipcRenderer.send('request-application-menu');
});


ipcRenderer.on('application-menu', (event, appMenu) => {
	titlebar.updateOptions({
		menu: appMenu
	});
});
