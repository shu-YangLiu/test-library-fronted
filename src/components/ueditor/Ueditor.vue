<template>
  <div>
    <script :id="id" :defaultMsg="writeMsg" type="text/plain"></script>
  </div>
</template>

<script>
//引入编辑器。我都是在子组件里面加的，我看有的说是在main.js里面添加，这样的话所有页面都引入了这个插件就很必要了。
import "../../../static/ueditor/ueditor.config.js";
import "../../../static/ueditor/ueditor.all.js";
import "../../../static/ueditor/lang/zh-cn/zh-cn.js";

//引入公式插件。我们也是通过import的方式加进来的。
import "../../../static/ueditor/kityformula-plugin/addKityFormulaDialog.js";
import "../../../static/ueditor/kityformula-plugin/getKfContent.js";
import "../../../static/ueditor/kityformula-plugin/defaultFilterFix.js";

export default {
  name: "UEditor",
  props: {
    id: {
      type: String
    },
    config: {
      type: Object
    },
    writeMsg: {
      type: String
    }
  },
  //  components:{util},
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    //初始化UE
    this.$nextTick(() => {
      //避免在切换到填空题再切回来找不到dom而报offsetWidth undefined
      const _this = this;
      this.editor = UE.delEditor(this.id);
      this.editor = UE.getEditor(this.id, this.config);
      this.editor.addListener("ready", function() {
        _this.isinit = true;
      });
    });
  },
  destoryed() {
    this.editor.destory();
  },
  methods: {
    getUEContent: function() {
      return this.editor.getContent();
    },
    getContentTxt: function() {
      return this.editor.getContentTxt();
    },

    setUEContent: function(val) {
      if (this.editor && this.editor.isReady) {
        const _this = this;
        setTimeout(function() {
          //过段时间在加载
          _this.editor.setContent(val);
        }, 500);
        return;
      } else {
        const _this = this;
        setTimeout(function() {
          //过段时间在加载
          _this.setUEContent(val);
        }, 500);
      }
    }
  }
};
</script>