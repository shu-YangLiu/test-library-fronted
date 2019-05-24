
<template>
  <Row style="background:#eee;padding:20px">
    <Col span="11">
      <Card>
        <Form :label-width="80">
          <FormItem label="选择年级">
            <RadioGroup v-model="grade" @on-change="get_grade">
              <Radio v-for="i in gradelist" :key="i" :label="i"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="请选择学校">
            <Select v-model="school" prefix="ios-home" @on-change="get_school" style="width:93%">
              <Option v-for="item in this.schoollist" :value="item" :key="item">{{ item}}</Option>
            </Select>
            <Button
              :size="buttonSize"
              icon="md-add"
              @click="modal1 = true"
              style="float:right;margin:5px 1% "
              shape="circle"
            ></Button>
            <Modal v-model="modal1" title="添加学校" @on-ok="add_school" @on-cancel="cancel">
              <Form :model="formItem" :label-width="80">
                <FormItem label="选择属性">
                  <RadioGroup v-model="new_school_info" @on-change="get_new_school_info">
                    <Radio v-for="i in school_info_list" :key="i" :label="i"></Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="学校名称">
                  <Input v-model="new_school" style="margin-bottom:10px"/>
                </FormItem>
              </Form>
            </Modal>
          </FormItem>

          <FormItem label="科目/知识点">
            <div>
              <Cascader
                :data="subjectall"
                style="width:93%;float:left;"
                @on-change="printsubjectall"
              ></Cascader>

              <Button
                :size="buttonSize"
                icon="md-add"
                @click="modal2 = true"
                style="float:right;margin:5px 1% "
                shape="circle"
              ></Button>
              <Modal
                v-model="modal2"
                title="添加科目/知识点"
                @on-ok="add_subject_knowledge"
                @on-cancel="cancel"
              >
                <Form :model="formItem" :label-width="80">
                  <FormItem label="请选择科目">
                    <RadioGroup v-model="add_subject_type" @on-change="get_add_subject_type">
                      <Radio label="添加一级知识点" value="n1"></Radio>
                      <Radio label="添加二级知识点"></Radio>
                    </RadioGroup>
                  </FormItem>

                  <FormItem label="选择科目" v-if="add_subject_type==='添加一级知识点'">
                    <Select v-model="add_subject" style="width:200px">
                      <Option v-for="item in subjectlist" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                  </FormItem>
                  <!-- <FormItem label="请选择科目">
                   
                  </FormItem>-->
                  <FormItem label="一级知识点" v-if="add_subject_type==='添加一级知识点'">
                    <Input
                      v-model="add_knowledge1"
                      placeholder="请输入一级知识点"
                      clearable
                      style="width: 200px"
                    />
                  </FormItem>
                  <FormItem label="二级知识点" v-if="add_subject_type==='添加一级知识点'">
                    <Input
                      v-model="add_knowledge12"
                      placeholder="请输入二级知识点"
                      clearable
                      style="width: 200px"
                    />
                  </FormItem>

                  <FormItem label="科目/一级知识点" v-if="add_subject_type==='添加二级知识点'">
                    <Cascader
                      :data="sub_kno"
                      filterable
                      style="width: 49%"
                      @on-change="printsubject_know"
                    ></Cascader>
                  </FormItem>
                  <FormItem label="二级知识点" v-if="add_subject_type==='添加二级知识点'">
                    <Input
                      v-model="add_knowledge2"
                      placeholder="请输入二级知识点"
                      clearable
                      style="width: 200px"
                    />
                  </FormItem>
                </Form>

                <!-- <Input v-model="new_subjects" style="margin-bottom:10px"></Input> -->
              </Modal>
            </div>
          </FormItem>

          <FormItem label="选择题型">
            <Select v-model="type" @on-change="get_type" style="width:93%">
              <Option value="选择题">选择题</Option>
              <Option value="填空题">填空题</Option>
              <Option value="判断题">判断题</Option>
              <Option value="解答题">解答题</Option>
            </Select>
          </FormItem>

          <FormItem label="题目">
            <Input
              v-model="textarea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入题目"
              style="width:93%"
            />
          </FormItem>
          <FormItem v-if="type==='option'">
            <!-- <FormItem> -->
            <Input v-model="option1" style="margin-bottom:10px;width:93%">
              <span slot="prepend">A</span>
            </Input>
            <Input v-model="option2" style="margin-bottom:10px;width:93%">
              <span slot="prepend">B</span>
            </Input>
            <Input v-model="option3" style="margin-bottom:10px;width:93%">
              <span slot="prepend">C</span>
            </Input>
            <Input v-model="option4" style="width:93%">
              <span slot="prepend">D</span>
            </Input>
          </FormItem>
          <FormItem label="选择难度">
            <Rate @on-change="get_difcut" v-model="value_difct"/>
          </FormItem>

          <FormItem label="答案" v-if="type!=='option'">
            <Input
              v-model="answer"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
              style="width:93%"
            />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submitquestion">提交</Button>
            <Button style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
        <!-- <div class="margin-top-20">这大概是那个啥markdown
          <textarea id="articleEditor"></textarea>
        </div>-->
      </Card>
    </Col>
    <Col span="6" class="padding-left-10"/>
  </Row>
</template>
                
            
        
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      gradelist: [], //年级列表
      grade: "", //选择的年级
      schoollist: [], //学校列表
      school: "",
      school_info_list: ["小学", "初中", "高中"],
      new_school_info: "",
      new_school: "",
      subjectall: [], //学科-一级知识点-二级知识点级联选择器
      subjectall_data: [],
      subjectlist: [],
      add_subject_type: "",

      add_subject: "", //输入一级知识点时的选择的学科
      add_knowledge1: "", //增添的一级知识点
      add_knowledge12: "", //输入一级知识点时的二级知识点
      sub_kno: [], //二级知识点的级联选择器
      sub_kno_data: [],
      add_knowledge2: "", //输入二级知识点时的二级知识点

      type: "", //所选题型
      textarea: "", //题目
      answer: "", //答案

      buttonSize: "small",
      value_difct: 3,

      form: "0",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,

      // flag="ture",

      option1: "",
      option2: "",
      option3: "",
      option4: "",
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: "",
        value2: [],
        value3: []
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
    add_school() {
      let formData = new FormData();
      formData.append("school", this.new_school);
      formData.append("school_info", this.new_school_info);

      this.axios
        .post("http://localhost:8000/test_library/add_school/", formData)
        .then(res => {
          console.log(res.data);
          if (res.data.isOK == true) {
            this.schoollist = res.data.school;
            this.$Message.success("Success!");
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    add_subject_knowledge() {
      var new_subject;
      var new_k1;
      var new_k2;
      if(this.add_subject_type==='添加一级知识点'){
        console.log(this.add_subject,this.add_knowledge1,this.add_knowledge12);
        new_subject=this.add_subject;
        new_k1=this.add_knowledge1;
        new_k2=this.add_knowledge12;
        console.log(new_subject,new_k1,new_k2)
      }else{
        console.log(this.sub_kno_data[0],this.sub_kno_data[1],this.add_knowledge2);
        new_subject=this.sub_kno_data[0];
        new_k1=this.sub_kno_data[1];
        new_k2=this.add_knowledge2;
      }
      let formData=new FormData();
      formData.append("subject", new_subject);
      formData.append("knowledge1",new_k1);
      formData.append("knowledge2",new_k2);

      this.axios
        .post("http://localhost:8000/test_library/add_subject/", formData)
        .then(res => {
          console.log(res.data);
          if (res.data.isOK == true) {
            this.subjectall = res.data.subjectall;
            this.$Message.success("Success!");
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(res => {
          console.log(res);
        });

    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    // handleSelect(index) {
    //   this.form = index;
    //   console.log(this.form)
    // },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    get_type() {
      console.log(this.type);
    },
    get_difcut() {
      console.log(this.value_difct);
    },
    get_grade() {
      console.log(this.grade);
    },
    get_new_school_info() {
      console.log(this.new_school_info);
    },
    get_option() {
      console.log(this.option1);
    },
    get_school() {
      console.log(this.school);
    },
    get_add_subject_type() {
      console.log(this.add_subject_type);
    },
    printsubject_know(value, selectedData) {
      this.sub_kno_data = value;
      console.log(this.sub_kno_data);
    },
    printsubjectall(value, selectedData) {
      this.subjectall_data = value;
      console.log(this.subjectall_data);
    },
    submitquestion(){
      var text,types,option1,option2,option3,option4,difficult,answer,user,grade,subject,knowledge1,knowledge2,school;
      console.log(this.grade,this.userInfo,this.school,this.subjectall_data[0],this.subjectall_data[1],this.subjectall_data[2],this.type,this.textarea,this.value_difct,this.answer)
      // text=this.textarea;
      // types=this.type;
      // option1=this.option1;
      // option2=this.option2;
      // option3=this.option3;
      // option4=this.option4;
      // difficult=this.value_difct;
      // answer=this.answer;
      // user=this.userInfo;
      // grade=this.grade;
      // subject=this.subjectall_data[0];
      // knowledge1=this.subjectall_data[1];
      // knowledge2=this.subjectall_data[2];
      // school=this.school;
      let formData=new FormData();
      formData.append("text", this.textarea);
      formData.append("types",this.type);
      formData.append("option1",this.option1);
      formData.append("option2",this.option2);
      formData.append("option3",this.option3);
      formData.append("option4",this.option4);
      formData.append("difficult",this.value_difct);
      formData.append("answer",this.answer);
      formData.append("user",this.userInfo);
      formData.append("grade",this.grade);
      formData.append("subject",this.subjectall_data[0]);
      formData.append("knowledge1",this.subjectall_data[1]);
      formData.append("knowledge2",this.subjectall_data[2]);
      formData.append("school",this.school);

      this.axios
        .post("http://localhost:8000/test_library/enter_question/", formData)
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
