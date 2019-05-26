<template>
  <Row style="background:#eee;padding:20px">
    <Col span="11">
      <Card v-for="(question,index) in  showlist" :key=" question.id" :label="question.id" style="margin:15px">
        <p>{{index+1+pageSize*(current-1)}}<span v-html=" question.text"></span></p>
        <p>答案：<span v-html=" question.answer"></span></p>
      </Card>
      <div style="text-align:center">
        <Page :total="dataCount" :page-size="pageSize" :current="current" show-total @on-change="changepage" show-elevator/>
      </div>
    </Col>
    <Col span="6" class="padding-left-10"></Col>
  </Row>
</template>
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      questionlist: [],
      showlist:[],
      dataCount:0,
      pageSize:2,
      current:1,
    };
  },
  created: function() {
    console.log(this.userInfo);
    this.axios
      .post("http://localhost:8000/test_library/question/")
      .then(res => {
        console.log(res.data);
        this.questionlist = res.data;
        this.dataCount=this.questionlist.length;
        console.log(this.dataCount,this.questionlist.length,this.pageSize)
        if(this.dataCount<this.pageSize){
          this.showlist=this.questionlist
        }else{
          this.showlist=this.questionlist.slice(0,this.pageSize)
        }

      })
      .catch(res => {
        console.log(res);
      });
  },
  methods:{
    changepage(index){
      var start =(index-1)*this.pageSize;
      var end=index*this.pageSize;
      this.current=index
      this.showlist=this.questionlist.slice(start,end);
    }
  }
};
</script>

<style>
.ivu-row {
  position: relative;
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 30px;
  margin-top: 20px;
  height: auto;
  zoom: 1;
  display: block;
}
.ivu-col-span-11 {
  display: block;
  width: 100%;
}
</style>