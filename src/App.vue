<template>
  <div>

    <router-view class="container"></router-view>



  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.container {
  margin: 45px auto;
  padding: 40px;
  max-width: calc(800px - 80px);
  min-height: calc(100vh - 170px);
  border-radius: 35px;
  background-color: #d0d0d0;
}
</style>
