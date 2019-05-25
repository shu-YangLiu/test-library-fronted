
<template>
  <Row style="background:#eee;padding:20px">
    <Col span="11">
      <Card>
        <Form :label-width="80">
         

          <FormItem label="答案" v-if="formItem.select!=='option'" >
            <Input
              v-model="formItem.answer"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
              style="width:93%"
            />
          </FormItem>
          <FormItem>
            <Button type="primary">提交</Button>
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
      attributelist:["小学","初中","高中"],
      attribute:"",
      add_knowledge1: "",
      add_knowledge2: "",
      add_subject_type: "",
      add_subject:"",
      subjectlist:"",
      subjectall_data:[1,3],
      subject_know1:[],
      buttonSize: "small",
      value_difct: 3,
      sub_kno:[],
      sub_kno1:[],
      school_num: "",
      new_school: "",
      form: "0",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,

      grade: "",
      // flag="ture",
      gradelist: [],
      schoollist: [],
      subjectall: [],
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      formItem: {
        answer:"",
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
        this.sub_kno=res.data.subject_know1
        this.subjectlist = res.data.subject
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
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
    test() {
      console.log(this.formItem.select);
      // if(this.formItem.select=="option")
      // {this.form=1;
      // console(this.form);}
    },
    get_difcut() {
      console.log(this.value_difct);
    },
    aaa() {
      console.log(this.grade);
    },
    get_attribute() {
      console.log(this.attributelist);
    },
    get_option() {
      console.log(this.option1);
    },
    get_school() {
      console.log(this.school_num);
    },
    get_addsubject() {
      console.log(this.add_subject_type);
    },
    printsubject_know(value, selectedData) {
      console.log("123")
      console.log(value, selectedData)
    },
    printsubjectall(value, selectedData){
    console.log("123")
      console.log(value, selectedData)
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
