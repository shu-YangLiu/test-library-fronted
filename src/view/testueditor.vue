<template>
  <div>
    <Ueditor :writeMsg="defaultMsg1" :id="ueditor1" :config="config1" ref="ue1"></Ueditor>
    <div>
      <Button @click="print" >Default</Button>
  </div>
  </div>
  
  
</template>

<script>
import Ueditor from "@/components/ueditor/Ueditor.vue";
export default {
  components: {
    Ueditor
  },
  data() {
    return {
      defaultMsg1: "",
      ueditor1: "ueditor1",
      config1: {
        autoHeightEnabled: false,
        autoFloatEnabled: false, //不允许滚动时固定在顶部
        initialContent: "请输入题干内容...(如果是填空题请用{***}来表示横线)", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: null,
        initialFrameHeight: 250,
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/ueditor/"
      },
      
    };
  },
  methods:{
      print(){
          console.log(this.$refs.ue1.getUEContent())
      }
  }
};
</script>

