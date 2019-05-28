
<template>
  <div class="all">
    <Row style="background:#eee;padding:15px">
      <Col span="24">
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
            <FormItem label="难度比" v-if="formItem.select!=='option'">
              <Row type="flex" justify="start" class="code-row-bg">
                <Col>
                  <InputNumber
                    :max="10"
                    :min="1"
                    v-model="simple"
                    placeholder="简单"
                    style="width: 130px"
                  ></InputNumber>
                </Col>
                <Col style="text-align: center">
                  <div style="text-align:center; width: 70px;font-weight: bold;">:</div>
                </Col>
                <Col>
                  <InputNumber
                    :max="10"
                    :min="1"
                    v-model="normal"
                    placeholder="正常"
                    style="width: 130px"
                  ></InputNumber>
                </Col>
                <Col style="text-align: center">
                  <div style="text-align:center; width: 70px;font-weight: bold;">:</div>
                </Col>

                <Col span="6">
                  <InputNumber
                    :max="10"
                    :min="1"
                    v-model="difficult"
                    placeholder="困难"
                    style="width: 130px"
                  ></InputNumber>
                </Col>

                <!-- <Col span="3">
                <Button shape="circle" type="primary">确定</Button>
                </Col>-->
              </Row>
            </FormItem>
            <!-- <FormItem
            v-for="(item, index) in formDynamic.questions"
            v-if="item.status"
            :key="index"
            :label="'题型 ' + item.index"
            :prop="'questions.' + index + '.result'"
            :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}"
          >
            <Row type="flex" justify="start">
              <Col span="7">
                选择题型：
                <Select v-model="item.result" clearable style="width:150px" @on-change="get_result">
                  <Option
                    v-for="item in types"
                    :result="item"
                    :key="item"
                  >{{ item }}</Option>
                </Select>
                
              </Col>
              <Col span="8">
                题目数：
                <Input v-model="number" placeholder="请输入题目数量" style="width: 130px"/>
              </Col>

              <Col span="8" offset="1">
              
                <Button  type="dashed" style="float:right" @click="handleRemove(index)" icon="md-close">删除题型</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              style="float:right;margin-left:20px"
              type="dashed"
              @click="handleAdd"
              icon="md-add"
            >添加题目</Button>
            <Button type="dashed" @click="handleSubmit('formDynamic')" icon="md-checkmark" style="float:right;width:100px">确定</Button>
            <Button type="dashed" @click="handleReset('formDynamic')" icon="md-close" style="float:right;width:100px;margin-right: 20px" >取消</Button>
            </FormItem>-->
            <FormItem label="题型一">
              <Row type="flex" justify="start">
                <Col span="7">
                  选择题型：
                  <Select v-model="question1_type" clearable style="width:150px">
                    <Option v-for="item in types" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </Col>
                <Col span="7">
                  该题型总数：
                  <Input v-model="question1_number" placeholder="请输入题目数量" style="width: 130px"/>
                </Col>
                <Col span="7">
                  每题分数：
                  <Input v-model="question1_grade" placeholder="请输入每题分数" style="width: 130px"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="题型二">
              <Row type="flex" justify="start">
                <Col span="7">
                  选择题型：
                  <Select v-model="question2_type" clearable style="width:150px">
                    <Option v-for="item in types" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </Col>
                <Col span="7">
                  该题型总数：
                  <Input v-model="question2_number" placeholder="请输入题目数量" style="width: 130px"/>
                </Col>
                <Col span="7">
                  每题分数：
                  <Input v-model="question2_grade" placeholder="请输入每题分数" style="width: 130px"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="题型三">
              <Row type="flex" justify="start">
                <Col span="7">
                  选择题型：
                  <Select v-model="question3_type" clearable style="width:150px">
                    <Option v-for="item in types" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </Col>
                <Col span="7">
                  该题型总数：
                  <Input v-model="question3_number" placeholder="请输入题目数量" style="width: 130px"/>
                </Col>
                <Col span="7">
                  每题分数：
                  <Input v-model="question3_grade" placeholder="请输入每题分数" style="width: 130px"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="题型四">
              <Row type="flex" justify="start">
                <Col span="7">
                  选择题型：
                  <Select v-model="question4_type" clearable style="width:150px">
                    <Option v-for="item in types" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </Col>
                <Col span="7">
                  该题型总数：
                  <Input v-model="question4_number" placeholder="请输入题目数量" style="width: 130px"/>
                </Col>
                <Col span="7">
                  每题分数：
                  <Input v-model="question4_grade" placeholder="请输入每题分数" style="width: 130px"/>
                </Col>
                <Col span="3">
                  <Button
                    type="info"
                    icon="md-checkmark"
                    style="float:right;width:100px"
                    @click="uploadquestioninfo"
                  >确定</Button>
                </Col>
              </Row>
            </FormItem>
            <Divider/>
            <!-- <FormItem>
            <Button type="primary">提交</Button>
            <Button style="margin-left: 8px">取消</Button>
            </FormItem>-->
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
          <Row :gutter="1">
            <!-- <Col span="12">col-12</Col>
            <Col span="12">col-12</Col>-->
            <Col span="1">{{index+1+pageSize*(current-1)}}</Col>
            <Col span="22">
              <span v-html=" question.text"></span>
            </Col>
          </Row>
          <!-- <p>
          {{index+1+pageSize*(current-1)}}
          <span v-html=" question.text"></span>
          </p>-->
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
      <!-- <Col span="6" class="padding-left-10"></Col> -->

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
      difficult: 1,
      simple: 1,
      normal: 1,
      types: ["选择题", "判断题", "解答题", "填空题"],
      question1_type: "",
      question2_type: "",
      question3_type: "",
      question4_type: "",
      question1_number: "",
      question2_number: "",
      question3_number: "",
      question4_number: "",
      question1_grade: "",
      question2_grade: "",
      question3_grade: "",
      question4_grade: "",
      number: "",
      //以上
      //以下是question页面来的
      userInfo: JSON.parse(localStorage.getItem("userInfo")),

      questionlist: [],
      showlist: [],
      dataCount: 0,
      pageSize: 1,
      current: 1,
      //以上
      value1: "",
      ratio_easy: 1,
      ratio_normal: 1,
      ratio_difficult: 1,
      disabled: true,
      // index: 1,
      // formDynamic: {
      //   questions: [
      //     {
      //      result: "",
      //       index: 1,
      //       status: 1
      //     }
      //   ]
      // },

      formItem: {
        answer: "",
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
        //value2: [],
        //value3: []
      },
      model8: ""
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
    changepage(index) {
      var start = (index - 1) * this.pageSize;
      var end = index * this.pageSize;
      this.current = index;
      this.showlist = this.questionlist.slice(start, end);
    },
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
    //get_result
    // get_result() {
    //   console.log( this.formDynamic.questions.result);
    // },
    //

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
    },
    uploadquestioninfo() {
      //this.flag1 = true;
      console.log(
        this.normal,
        this.simple,
        this.difficult,
        this.question1_type,
        this.question1_number,
        this.question1_grade,
        this.question2_type,
        this.question2_number,
        this.question2_grade,
        this.question3_type,
        this.question3_number,
        this.question3_grade,
        this.question4_type,
        this.question4_grade,
        this.question4_number
      );
      var choice_qusetion_num,
        tf_qusetion_num,
        filling_qusetion_num,
        solve_qusetion_num;
      if (this.question1_type == "选择题") {
        choice_qusetion_num = this.question1_number;
      }
      if (this.question2_type == "选择题") {
        choice_qusetion_num = this.question2_number;
      }
      if (this.question3_type == "选择题") {
        choice_qusetion_num = this.question3_number;
      }
      if (this.question4_type == "选择题") {
        choice_qusetion_num = this.question4_number;
      }

      if (this.question1_type == "判断题") {
        tf_qusetion_num = this.question1_number;
      }
      if (this.question2_type == "判断题") {
        tf_qusetion_num = this.question2_number;
      }
      if (this.question3_type == "判断题") {
        tf_qusetion_num = this.question3_number;
      }
      if (this.question4_type == "判断题") {
        tf_qusetion_num = this.question4_number;
      }
      if (this.question1_type == "填空题") {
        filling_qusetion_num = this.question1_number;
      }
      if (this.question2_type == "填空题") {
        filling_qusetion_num = this.question2_number;
      }
      if (this.question3_type == "填空题") {
        filling_qusetion_num = this.question3_number;
      }
      if (this.question4_type == "填空题") {
        filling_qusetion_num = this.question4_number;
      }
      if (this.question1_type == "解答题") {
        solve_qusetion_num = this.question1_number;
      }
      if (this.question2_type == "解答题") {
        solve_qusetion_num = this.question2_number;
      }
      if (this.question3_type == "解答题") {
        solve_qusetion_num = this.question3_number;
      }
      if (this.question4_type == "解答题") {
        solve_qusetion_num = this.question4_number;
      }
      console.log(
        choice_qusetion_num,
        tf_qusetion_num,
        filling_qusetion_num,
        solve_qusetion_num
      );
      let formData = new FormData();
      formData.append("grade", this.grade);
      formData.append("subject", this.subject);
      formData.append("easy", this.simple);
      formData.append("normal", this.normal);
      formData.append("difficult", this.difficult);
      formData.append("choice_qusetion_num", choice_qusetion_num);
      formData.append("tf_qusetion_num", tf_qusetion_num);
      formData.append("filling_qusetion_num", filling_qusetion_num);
      formData.append("solve_qusetion_num", solve_qusetion_num);

      this.axios
        .post("http://localhost:8000/test_library/getautopaper/", formData)
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
    // 以上
    ok() {
      this.$Message.info("Clicked ok");
    },

    cancel() {
      this.$Message.info("Clicked cancel");
    }
    // handleSubmit(name) {
    //   this.$refs[name].validate(valid => {
    //     if (valid) {
    //       this.$Message.success("Success!");
    //     } else {
    //       this.$Message.error("Fail!");
    //     }
    //   });
    // },
    // handleReset(name) {
    //   this.$refs[name].resetFields();
    // },
    // handleAdd() {
    //   this.index++;
    //   this.formDynamic.questions.push({
    //     result: "",
    //     index: this.index,
    //     status: 1
    //   });
    // },
    // handleRemove(index) {
    //   this.formDynamic.questions[index].status = 0;
    // }
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

/* .all {
  height: 100%;
} */
html,
body,
#app,
.ivu-layout {
  min-height: 100%;
}

.top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
