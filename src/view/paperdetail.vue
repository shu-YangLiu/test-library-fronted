<template>
  <div class="all">
    <Row>
      <Row type="flex" justify="end">
        <Col span="2">
          <div>
            <Button @click="backhome()" type="text" ghost>
              <Icon type="md-arrow-back" size="30" color="#515a6e"/>
            </Button>
          </div>
        </Col>
        <Col span="18">
          <div class="projecttitle">
            <h1 align="center" class="juli">{{paperinfo.name}}</h1>
          </div>
        </Col>
        <Col span="2">
          <div align="right">
            <Button @click="modify" type="text" ghost>
              <Icon type="md-add-circle" size="30" color="#515a6e"/>
            </Button>
          </div>
        </Col>
        <Col span="2">
          <div align="left">
            <Button @click="download" type="text" ghost>
              <Icon type="ios-cloud-download" size="30" color="#515a6e"/>
            </Button>
          </div>
        </Col>
      </Row>
    </Row>
    <Row>
      <Row type="flex" justify="end" class="font" style="margin-top:10px">
        <Col span="6">
          <div>学校: {{paperinfo.school}}</div>
        </Col>
        <Col span="6">
          <div>科目：{{paperinfo.subject}}</div>
        </Col>
        <Col span="6">
          <div>年级：{{paperinfo.grade}}</div>
        </Col>
        <Col span="4">
          <div>总分： {{paperinfo.points}}</div>
        </Col>
        <Divider/>
      </Row>
    </Row>
    <Row v-if="this.question_list.length!=0">
      <Card
        v-for="(question,index) in question_list"
        :key=" question.id"
        :label="question.id"
        style="margin:15px"
      >
        <Row :gutter="1">
          <Col span="1">{{index+1}}</Col>
          <Col span="21">
            <span v-html=" question.text"></span>
          </Col>
          <Col span="2">
            <Button
              icon="ios-trash"
              shape="circle"
              style="float:right;margin:0px 1% "
              @click="deleteq(question.id)"
            ></Button>
          </Col>
        </Row>

        <Row type="flex" justify="start">
          <Col span="4">
            <Tag type="border" color="primary" style="margin-left:25px">学科：{{question.subject}}</Tag>
          </Col>
          <Col span="3">
            <Tag type="border" color="primary">难度：{{question.difficult}}</Tag>
          </Col>
          <Col span="3">
            <Tag type="border" color="primary">年级：{{question.grade}}</Tag>
          </Col>
          <Col span="3">
            <Tag type="border" color="primary">题型：{{question.types}}</Tag>
          </Col>
          <Col span="3">
            <Tag type="border" color="primary">分值：{{question.point}}分</Tag>
          </Col>
          <Col span="5">
              <Tag type="border" color="primary">题目来源：{{question.school}}</Tag>
            </Col>
        </Row>
        <Divider/>
        <Row :gutter="1">
          <Col span="2">答案：</Col>
          <Col span="12">
            <span v-html=" question.answer"></span>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      showlist: [],
      dataCount: 0,
      pageSize: 2,
      current: 1,
      paperid: "",
      question_list: [],
      paperinfo: {
        grade: "",
        id: "",
        name: "",
        points: "",
        school: "",
        subject: ""
      }
    };
  },
  created: function() {
    console.log(this.userInfo);
    
    this.paperid = this.$route.query.paperid;
    console.log(this.paperid);
    var a = "http://localhost:8000/test_library/paper_detail/";
    var id_string = String(this.paperid);
    var url = a + id_string;
    this.axios
      .post(url)
      .then(res => {
        console.log(res.data);
        if (res.data.isOK == true) {
          this.question_list = res.data.question_list;
          this.paperinfo = res.data.paperinfo;
          console.log(this.paperinfo.name,this.question_list.length);
          this.$Message.success("Success!");
        } else {
          this.$Message.error(res.data.errmsg);
        }
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
    backhome() {
      this.$router.back(-1);
    },
    modify() {
      this.$router.push({
        path: "/addquestion",
        query: { paperid: this.paperid }
      });
    },
    deleteq(questionid) {
      console.log(questionid);
      this.$Modal.confirm({
        title: "确认删除该题目？",
        content: "<p>确认删除改试卷吗，不可撤销？</p>",
        onOk: () => {
          let formData = new FormData();
          formData.append("paper_id", this.paperid);
          var a = "http://localhost:8000/test_library/delete_paperdetail/";
          var id_string = String(questionid);
          var url = a + id_string;
          this.axios
            .post(url, formData)
            .then(res => {
              console.log(res.data);
              if (res.data.isOK == true) {
                this.$Message.success("删除成功");
                this.reload()
              } else {
                this.$Message.error(res.data.errmsg);
              }
            })
            .catch(res => {
              console.log(res);
            });
          this.$Message.info(questionid);
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        }
      });
    }
  }
};
</script>

<style>
.all {
  height: 100%;
  margin-top: 30px;
  margin-left: 200px;
  margin-right: 200px;
}
.juli {
  margin-top: 7px;
}
.font {
  font-size: 13px;
}
</style>

