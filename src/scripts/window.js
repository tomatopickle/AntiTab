
import "winbox/dist/css/winbox.min.css";

import WinBox from 'winbox/src/js/winbox.js';
export default class Window {

  constructor(url) {
    this.url = url;
    this.window = new WinBox(`Opening Window`, {
        root: document.body,
        html: `<div class="webview_parent"><webview src="${this.url}" style="width:100%; height:100%"></webview></div>`,
        x: "center",
        y: "center",
        width: "75%",
        height: "75%",
        // This makes sure the window doesn't overlap the titlebar
        top: 30,
        onresize:function (){
          // This is to avoid the webview from capturing the mouse events when the window is getting resized
          this.dom.classList.add("resizing");
          setTimeout(()=>{
            this.dom.classList.remove("resizing");
          },100);
        }
      });
    const webview = this.window.dom.querySelector("webview");
    this.webviewEl = webview;
    this.window.dom.querySelector(".wb-title").innerHTML = `<span>${this.url}</span>`;
    this.window.dom.querySelector(".wb-title").prependHTML(`<img class='favicon' src='./assets/loading.gif'/>`);
    webview.addEventListener('page-title-updated', (e)=>{
      this.window.dom.querySelector(".wb-title span").innerHTML = e.title;
    });
    webview.addEventListener('did-change-theme-color', (e)=>{
      this.window.setBackground(e.themeColor);
    });
    webview.addEventListener('page-favicon-updated', (e)=>{
      this.window.dom.querySelector(".wb-title img").src = e.favicons[0];
    });
    console.log(this.window.dom.querySelector("webview"));
  }
  createWindow() {
    alert(this.url);
  }

}
HTMLElement.prototype.prependHTML = function (element) {
    this.innerHTML = element + this.innerHTML;
};