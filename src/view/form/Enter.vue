
<template>
  <Row style="background:#eee;padding:20px">
    <Col span="11">
      <Card>
        <Form :label-width="80">
          <FormItem label="选择年级">
            <RadioGroup v-model="grade" @on-change="aaa">
              <Radio v-for="i in gradelist" :key="i" :label="i"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="请选择学校">
            <Select
              v-model="school_num"
              prefix="ios-home"
              @on-change="get_school"
              style="width:90%"
            >
              <Option v-for="item in this.schoollist" :value="item" :key="item">{{ item}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="modal1 = true" >添加学校</Button>
            <Modal v-model="modal1" title="添加学校" @on-ok="ok" @on-cancel="cancel">
              <Input v-model="new_school" style="margin-bottom:10px"></Input>
            </Modal>
          </FormItem>

          <FormItem label="科目/知识点">
            <div>
              <Cascader :data="subjectall" style="width:93%;float:left;" v-model="value2" filterable></Cascader>
              <Button
                :size="buttonSize"
                icon="md-add"
                @click="modal2 = true"
                style="float:right;margin:5px 1% "
                shape="circle"
              ></Button>
              <Modal v-model="modal2" title="添加科目/知识点" @on-ok="ok" @on-cancel="cancel">
                <RadioGroup v-model="add_subject_type" @on-change="get_addsubject">
                  <Cascader v-model="value3" :data="data" filterable></Cascader>
                  <Radio label="添加一级知识点"></Radio>
                  <Radio label="添加二级知识点"></Radio>
                </RadioGroup>

                <!-- <Input v-model="new_subjects" style="margin-bottom:10px"></Input> -->
              </Modal>
            </div>
          </FormItem>


          <FormItem label="请选择题型">
            <Select v-model="formItem.select" @on-change="test">
              <Option value="option">选择题</Option>
              <Option value="blank">填空题</Option>
              <Option value="answer">简答题</Option>
            </Select>
          </FormItem>

          <FormItem label="题目">
            <Input
              v-model="formItem.textarea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            ></Input>
          </FormItem>
          <FormItem v-if="formItem.select==='option'">
            <!-- <FormItem> -->
            <Input v-model="option1" style="margin-bottom:10px">
              <span slot="prepend">A</span>
            </Input>
            <Input v-model="option2" style="margin-bottom:10px">
              <span slot="prepend">B</span>
            </Input>
            <Input v-model="option3" style="margin-bottom:10px">
              <span slot="prepend">C</span>
            </Input>
            <Input v-model="option4">
              <span slot="prepend">D</span>
            </Input>
          </FormItem>
          <FormItem label="选择难度">
            <Rate @on-change="get_difcut" v-model="value_difct"/>
          </FormItem>

          <FormItem label="答案" v-if="formItem.select!=='option'">
            <Input
              v-model="formItem.textarea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            ></Input>
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
    <Col span="6" class="padding-left-10"></Col>
  </Row>
</template>
                
            
        
<script>
export default {
  data() {
    return {
      add_subject_type: "",
      buttonSize: "small",
      value_difct: 3,
      school: [
        {
          value: "1",
          label: "学校1"
        },
        {
          value: "2",
          label: "学校2"
        },
        {
          value: "3",
          label: "学校3"
        }
      ],
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
      schoollist:[],
      subjectall:"",
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
        value3: [],
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
        console.log(res.data)
        this.gradelist=res.data.grade
        this.schoollist=res.data.school
        this.subjectall=res.data.subjectall
        
      })
      .catch(res=>{
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
    get_option() {
      console.log(this.option1);
    },
    get_school() {
      console.log(this.school_num);
    },
    get_addsubject() {
      console.log(this.add_subject_type);
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
