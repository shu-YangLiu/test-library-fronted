<template>
  <div id="app">
    <Layout>
      <Header v-if="$route.name!='login' && $route.name!='register'">
        <appHeader/>
      </Header>
      <Content>
        <router-view/>
      </Content>
    </Layout>
  </div>
</template>

<script>
import header from "./components/header.vue";
export default {
  name: "App",
  components: {
    appHeader: header
  },
  methods: {
    handle_header() {}
  }
};
</script>


