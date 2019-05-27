<template></template>

<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      paperid: "",
      question_list:[],
      paperinfo:{
        grade:"",
        id:"",
        name:"",
        points:"",
        school:"",
        subject:""
      },
    };
  },
  created:function(){
    console.log(this.userInfo);
    this.paperid=this.$route.query.paperid;
    console.log(this.paperid)
    var a="http://localhost:8000/test_library/paper_detail/"
    var id_string=String(this.paperid)
    var url=a+id_string
    this.axios
      .post(url)
       .then(res => {
          console.log(res.data);
          if (res.data.isOK ==true ) {
            this.question_list=res.data.question_list
            this.paperinfo=res.data.paperinfo
            console.log(this.paperinfo.name)
            this.$Message.success("Success!");
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(res => {
          console.log(res);
        });
  }
};
</script>
