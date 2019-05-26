
<template>
  <div class="all">
    <Row style="background:#eee;padding:20px">
      <Col span="11">
        <Card style="line-height: 12px;">
          <!-- margin-bottom: 14px; -->
          <Form :label-width="80" ref="formDynamic" :model="formDynamic">
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
                    type="dashed"
                    icon="md-checkmark"
                    style="float:right;width:100px"
                    @click="uploadpaperinfo"
                  >确定</Button>
                  <!-- <Button type="dashed" v-if="flag1===true">确定a </Button> -->
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Card>
      </Col>
      <Col span="6" class="padding-left-10"/>
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
      flag1: false //是否点击确定
    };
  },
  created: function() {
    console.log(this.userInfo);
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
            console.log(this.paperid, this.paper_name);
            this.$Message.success("Success!");
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
