
<template>
  <div class="all">
    <Row style="background:#eee;padding:20px">
      <Col span="11">
        <Card style="line-height: 12px;">
          <!-- margin-bottom: 14px; -->
          <!-- <Form :label-width="80" ref="formDynamic" :model="formDynamic"> -->
          <Form :label-width="80">
            <FormItem label="试卷信息">
              <Input
                :disabled="flag1"
                v-model="paper_name"
                placeholder="请输入试卷名称"
                style="width: 100%"
              />
            </FormItem>
            <FormItem>
              <Row type="flex" justify="space-between" class="code-row-bg">
                <Col span="5">
                  <p>学校名称：</p>
                  <Select
                    v-model="school"
                    prefix="ios-home"
                    @on-change="get_school"
                    style="width:80%"
                    :disabled="flag1"
                  >
                    <Option
                      v-for="school in this.schoollist"
                      :value="school"
                      :key="school"
                    >{{school}}</Option>
                  </Select>
                </Col>
                <Col span="4">
                  <p>年级：</p>
                  <Select
                    :disabled="flag1"
                    v-model="grade"
                    @on-change="get_grade"
                    style="width:90%"
                  >
                    <Option v-for="grade in this.gradelist" :value="grade" :key="grade">{{grade}}</Option>
                  </Select>
                </Col>
                <Col span="4">
                  <p>科目：</p>
                  <Select
                    :disabled="flag1"
                    v-model="subject"
                    style="width:90%"
                    @on-change="get_subject"
                  >
                    <Option
                      v-for="subject in this.subjectlist"
                      :value="subject"
                      :key="subject"
                    >{{subject}}</Option>
                  </Select>
                </Col>
                <Col span="4">
                  <p>总分：</p>
                  <Input
                    v-model="total_score"
                    placeholder="请输入总分"
                    style="width:90%"
                    @on-change="get_total_score"
                    :disabled="flag1"
                  />
                </Col>
                <Col span="4">
                  <br>
                  <Button
                    type="info"
                    icon="md-checkmark"
                    style="float:right;width:100px"
                    @click="uploadpaperinfo"
                  >确定</Button>
                  <!-- <Button type="dashed" v-if="flag1===true">确定a </Button> -->
                </Col>
              </Row>
            </FormItem>
            <Divider/>

            <FormItem label="筛选条件">
              <Row type="flex" justify="start">
                <Col span="8">
                  选择题型：
                  <Select
                    v-model="question_type"
                    clearable
                    style="width:150px"
                    @on-change="get_type"
                  >
                    <Option v-for="item in types" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </Col>
                <Col span="5">
                  <div class="top1">
                    难度：
                    <Rate @on-change="get_difcut" v-model="value_difct" :count="test11"/>
                  </div>
                </Col>
                <Col span="3">
                  <p  class="top1">一级知识点：</p></Col>
                  <Col span="4">
                  <Cascader
                    :data="knowledge1_list"
                    filterable
                    style="width: 125px"
                    @on-change="printsubject_know"
                  ></Cascader>
                </Col>
                <Col span="4">
                  <!-- 那什么按钮没写完 -->
                  <Button
                    type="info"
                    icon="md-checkmark"
                    style="float:right;width:100px"
                    @click="getquestion"
                  >确定</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Card>
      </Col>
      <Col span="6" class="padding-left-10"/>
    </Row>
    <Row v-if="this.questionlist.length!=0" style="background:#eee;padding:20px">
      <Col span="11">
        <Card
          v-for="(question,index) in showlist"
          :key=" question.id"
          :label="question.id"
          style="margin:0px 0px 15px 0px"
        >
          <!-- 缺一个style使button放到合适的位置，float：right不可以用 -->

          <Row type="flex" justify="start">
            <!-- <Col span="12">col-12</Col>
            <Col span="12">col-12</Col>-->
            <Col span="1">{{index+1+pageSize*(current-1)}}</Col>
            <Col span="21">
              <span v-html=" question.text"></span>
            </Col>
            <Col span="2">
              <Button
                type="info"
                :size="buttonSize"
                icon="md-add"
                @click="modalbutton1(question.id)"
                shape="circle"
                style="float：right"
              ></Button>
              <Modal v-model="modal1" title="添加分数" @on-ok="addquestion" @on-cancel="cancel">
                <Form :label-width="80">
                  <FormItem label="分数">
                    <Input v-model="point" style="margin-bottom:10px"/>
                  </FormItem>
                </Form>
              </Modal>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="4">
              <Tag type="border" color="primary" style="margin-left:25px">学科：{{question.subject}}</Tag>
              <!-- <Tag type="border"  color="primary">题型：{{question.types}}</Tag> -->
              <!-- <div>学科：{{question.subject}}</div> -->
            </Col>
            <Col span="3">
              <Tag type="border" color="primary">难度：{{question.difficult}}</Tag>
            </Col>
            <Col span="3">
              <Tag type="border" color="primary">id：{{question.id}}</Tag>
            </Col>
            <Col span="3">
              <Tag type="border" color="primary">年级：{{question.grade}}</Tag>
            </Col>
            <Col span="3">
              <Tag type="border" color="primary">题型：{{question.types}}</Tag>
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
    </Row>
  </div>
</template>
                
            
        
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      gradelist: [], //年级列表
      grade: "", //选择的年级
      paper_name: "", //试卷名
      school: "",
      schoollist: [], //学校列表
      subject: "",
      subjectlist: [],
      total_score: "", //总分
      flag1: false, //是否点击确定
      types: ["选择题", "判断题", "解答题", "填空题"],
      value_difct: 3,
      number: "",
      test11: 3,
      knowledge1_list: [],
      sub_kno_data: [],
      question_type: "",
      questionlist: [],
      showlist: [],
      dataCount: 0,
      pageSize: 5,
      current: 1,
      buttonSize: "large",
      modal1: false,
      point: "",
      qid: "",
      //以上

      value1: "",
      ratio_easy: 1,
      ratio_normal: 1,
      ratio_difficult: 1,
      disabled: true
    };
  },
  created: function() {
    console.log(this.userInfo);
    console.log(this.modal1);
    // count = 5;
    this.axios
      .post("http://localhost:8000/test_library/get_enterquestionpage/")
      .then(res => {
        console.log(res.data);
        this.gradelist = res.data.grade;
        this.schoollist = res.data.school;
        this.subjectall = res.data.subjectall;
        this.sub_kno = res.data.subject_know1;
        this.subjectlist = res.data.subject;
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
    get_grade() {
      console.log(this.grade);
    },
    get_total_score() {
      console.log(this.total_score);
    },
    get_subject() {
      console.log(this.subject);
    },
    //get_subject
    get_school() {
      console.log(this.school);
    },
    get_difcut() {
      console.log(this.value_difct);
    },
    get_type() {
      console.log(this.question_type);
    },
    test() {
      console.log("questionid");
    },
    modalbutton1(questionid) {
      this.modal1 = true;
      console.log(questionid);
      this.qid = questionid;
    },

    uploadpaperinfo() {
      this.flag1 = true;
      console.log(
        this.paper_name,
        this.school,
        this.grade,
        this.subject,
        this.total_score
      );

      let formData = new FormData();
      formData.append("name", this.paper_name);
      formData.append("points", this.total_score);
      formData.append("user", this.userInfo);
      formData.append("school", this.school);
      formData.append("grade", this.grade);
      formData.append("subject", this.subject);
      this.axios
        .post("http://localhost:8000/test_library/postpaperinfo/", formData)
        .then(res => {
          console.log(res.data);
          if (res.data.isOK == true) {
            this.paperid = res.data.paper_id;
            this.knowledge1_list = res.data.knowledge1;
            console.log(this.paperid, this.paper_name);
            this.$Message.success("Success!");
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    printsubject_know(value, selectedData) {
      this.sub_kno_data = value;
      console.log(this.sub_kno_data);
    },

    getquestion() {
      console.log(
        this.grade,
        this.subject,
        this.sub_kno_data[0],
        this.sub_kno_data[1],
        this.value_difct,
        this.question_type
      );
      let formData = new FormData();
      formData.append("grade", this.grade);
      formData.append("subject", this.subject);
      formData.append("knowledge2", this.sub_kno_data[1]);
      formData.append("difficult", this.value_difct);
      formData.append("types", this.question_type);
      this.axios
        .post(
          "http://localhost:8000/test_library/getmanualpaperquestion/",
          formData
        )
        .then(res => {
          console.log(res.data);
          if (res.data.isOK == true) {
            this.questionlist = res.data.questionlist;
            this.dataCount = this.questionlist.length;
            console.log(
              this.dataCount,
              this.questionlist.length,
              this.pageSize
            );
            if (this.dataCount < this.pageSize) {
              this.showlist = this.questionlist;
            } else {
              this.showlist = this.questionlist.slice(0, this.pageSize);
            }
            this.$Message.success("Success!");
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    changepage(index) {
      var start = (index - 1) * this.pageSize;
      var end = index * this.pageSize;
      this.current = index;
      this.showlist = this.questionlist.slice(start, end);
    },
    addquestion() {
      console.log(this.qid, this.paperid, this.point);
      var questionid = this.qid;
      let formData = new FormData();
      formData.append("paperid", this.paperid);
      formData.append("point", this.point);
      var a = "http://localhost:8000/test_library/add_question/";
      var id_string = String(questionid);
      var url = a + id_string;
      this.axios
        .post(url, formData)
        .then(res => {
          console.log(res.data);
          if (res.data.isOK == true) {
            this.$Message.success("Success!");
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // ok() {
    //   this.$Message.info("Clicked ok");
    // },

    cancel() {
      this.$Message.info("Clicked cancel");
    }
  }
};
</script>
<style>
.ivu-row {
  position: relative;
  margin-left: 200px;
  margin-right: 200px;
  height: auto;
  zoom: 1;
  display: block;
}
.ivu-col-span-11 {
  display: block;
  width: 100%;
}
.ivu-form-item-content {
  position: relative;
  line-height: 22px;
  font-size: 12px;
}
/* 下面这个更改了表单行间距 */
.ivu-form-item {
  margin-bottom: 14px;
  vertical-align: top;
  zoom: 1;
}
.top1 {
  margin-top: 4px;
}
.all {
  height: 100%;
}
html,
body,
#app,
.ivu-layout {
  min-height: 100%;
}
</style>
