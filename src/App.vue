<template>
  <n-config-provider :theme="theme">
    <br><br>
    <n-card style="width: 500px;" class="center">
    <h3 class="center-text">Start with a new window</h3> 
    <n-input size="large" v-model:value="newWindowData.url" placeholder="Search or enter a web address"> </n-input>
    <br><br>
    <n-button @click="newWindow()" size="large" class="center" type="primary">New Window</n-button> </n-card>
  </n-config-provider>
</template>

<script>
// General Font
import "vfonts/Inter.css";
// Monospace Font
import "vfonts/FiraCode.css";
import { useOsTheme, darkTheme } from "naive-ui";
import Window from "./scripts/window.js"
export default {
  data: () => {
    const osThemeRef = useOsTheme();
    return {
      theme: osThemeRef.value === "dark" ? darkTheme : null,
      osTheme: osThemeRef,
      newWindowData:{
        url:"https://google.com"
      },
      pages:[]
    };
  },
  methods:{
    newWindow(){
      const page = new Window(this.newWindowData.url);
      this.pages.push(page);
    }
  }
};
</script>
<style>
@media (prefers-color-scheme: dark) {
  html,
  body {
    background-color: rgb(16, 16, 20);
    color: rgba(255, 255, 255, 0.82);
    width: 100%;
    height: 100%;
  }
}
.center{
  margin: auto;
  display: block;
}
.center-text{
  text-align: center;
}
.wb-icon * {
  opacity: 0.65;
  transition: all .2s;
}
.wb-icon *:hover {
  opacity: 1;
}
.wb-icon *:active{
  transform: scale(.9);
  opacity: 1;
}
.winbox{
  background-color: rgb(27 27 28 / 85%);
  border-radius: 2px;
  backdrop-filter: blur(25px);
}
.wb-title{
  display: flex;
  align-content: center;
  font-family: unset;
  font-size: 16px;
  user-select: none;
}
.wb-title img{
  height: max-content;
  margin-block: auto;
  margin-right: 10px;
  width: max-content;
  max-height: 24px;
}
.wb-full {
  display: none;
}
.winbox .webview_parent{
  width: 100%;
  height: 100%;
}
.winbox.resizing webview{
  pointer-events: none
}
</style>
