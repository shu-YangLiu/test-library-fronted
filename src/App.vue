<template>
  <div id="app">
    <Layout>
      <Header v-if="$route.name!='login' && $route.name!='register'">
        <appHeader/>
      </Header>
      <Content>
        <router-view v-if="isRouterAlive"></router-view>
      </Content>
    </Layout>
  </div>
</template>

<script>
import Ueditor from '@/components/ueditor/Ueditor.vue';
import header from "./components/header.vue";
export default {
  name: "App",
  components: {
    appHeader: header,
    Ueditor
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods: {
    handle_header() {},
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
          this.isRouterAlive=true
      })
    }
  }
};
</script>

<style>
.app {
  height: 100%;
}
html{
  background:#f5f7f9
}
</style>



