<template>
  <router-view />
  <a
    href="https://github.com/menepet/camp-pie-cutting"
    target="_blank"
    class="text-xsx absolute bottom-0 left-2"
    style="opacity: 0.4"
  >by Menepet</a>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap');

:root {
  --bg-color: #d9d9d9;
}

body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: var(--bg-color);
}
html {
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: transparent;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*, ::after, ::before {
  box-sizing: inherit;
}
</style>
