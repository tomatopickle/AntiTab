<template>
  <n-config-provider :theme="theme">
    <n-card> <n-btn color="primary">New Window</n-btn> </n-card>
  </n-config-provider>
</template>

<script>
// General Font
import "vfonts/Inter.css";
// Monospace Font
import "vfonts/FiraCode.css";
import { useOsTheme, darkTheme } from "naive-ui";

export default {
  data: () => {
    const osThemeRef = useOsTheme();
    return {
      theme: osThemeRef.value === "dark" ? darkTheme : null,
      osTheme: osThemeRef,
    };
  },
};
</script>
<style>
@media (prefers-color-scheme: dark) {
  html,
  body {
    background-color: rgb(16, 16, 20);
    color: rgba(255, 255, 255, 0.82);
  }
}
</style>
