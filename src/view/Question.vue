<template>
  <Row style="background:#eee;padding:20px">
    <Col span="11">
      <Card v-for="(paper,index) in paperlist" :key="paper.id" :label="paper.id" style="margin:15px">
        <p>{{index+1}}<span v-html="paper.text"></span></p>
        <p>答案：<span v-html="paper.answer"></span></p>
      </Card>
      <div>
        <Page :total="100" show-elevator/>
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
      paperlist: ""
    };
  },
  created: function() {
    console.log(this.userInfo);
    this.axios
      .post("http://localhost:8000/test_library/question/")
      .then(res => {
        console.log(res.data);
        this.paperlist = res.data;
      })
      .catch(res => {
        console.log(res);
      });
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