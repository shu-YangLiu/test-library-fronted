<template>
 <Row style="background:#eee;padding:20px">
    <Col span="11">
      <Card
        v-for="(question,index) in showlist"
        :key=" question.id"
        :label="question.id"
        style="margin:15px"
      >
      <Row :gutter="1">
        <!-- <Col span="12">col-12</Col>
        <Col span="12">col-12</Col> -->
        <Col span="1" >{{index+1+pageSize*(current-1)}}</Col>
        <Col span="12"><span v-html=" question.text"></span></Col>
      </Row>
        <!-- <p>
          {{index+1+pageSize*(current-1)}}
          <span v-html=" question.text"></span>
        </p> -->
        <Row  type="flex" justify="start">
        <Col span="4">
        <Tag type="border"  color="primary" style="margin-left:25px">学科：{{question.subject}}</Tag>
        <!-- <Tag type="border"  color="primary">题型：{{question.types}}</Tag> -->
            <!-- <div>学科：{{question.subject}}</div> -->
        </Col>
        <Col span="3">
            <Tag type="border"  color="primary">难度：{{question.difficult}}</Tag>
        </Col>
        <Col span="3">
            <Tag type="border"  color="primary">年级：{{question.grade}}</Tag>
        </Col>
        <Col span="3">
            <Tag type="border"  color="primary">题型：{{question.types}}</Tag>
        </Col>
        
    </Row>
    <Divider />
    <Row :gutter="1">
        <!-- <Col span="12">col-12</Col>
        <Col span="12">col-12</Col> -->
        <Col span="2" >答案：</Col>
        <Col span="12"><span v-html=" question.answer"></span></Col>
      </Row>
        <!-- <p>
          <Divider />
          答案：
          <span v-html=" question.answer"></span>
        </p> -->
      </Card>
      <div style="text-align:center">
        <Page
          :total="dataCount"
          :page-size="pageSize"
          :current="current"
          show-total
          @on-change="changepage"
          show-elevator
        />
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
      showlist: [],
      dataCount: 0,
      pageSize: 2,
      current: 1,
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
