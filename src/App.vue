<template>
  <div>
    <top-bar></top-bar>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TopBar from './components/TopBar'
export default {
  name: 'App',
  components: {
    TopBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}

.none {
  display: none;
}

.ivu-modal-content {
  border-radius: 2px;
}

.ivu-row-flex {
  margin: 0.15rem 0;
}
</style>
