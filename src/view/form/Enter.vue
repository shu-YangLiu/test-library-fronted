
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
            <Select v-model="school_num" prefix="ios-home" @on-change="get_school">
              <Option v-for="item in school" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="modal1 = true">添加学校</Button>
            <Modal v-model="modal1" title="添加学校" @on-ok="ok" @on-cancel="cancel">
              <Input v-model="new_school" style="margin-bottom:10px"></Input>
            </Modal>
          </FormItem>

          <FormItem label="科目/知识点">
            <Cascader :data="data"></Cascader>
          </FormItem>
                    <FormItem >
            <Button type="primary" @click="modal2 = true">添加科目</Button>
            <Modal v-model="modal2" title="添加科目" @on-ok="ok" @on-cancel="cancel">
              <Input v-model="new_subjects" style="margin-bottom:10px"></Input>
            </Modal>
            <Button  @click="modal3 = true" style="margin:0 20px">添加一级知识点</Button>
            <Modal v-model="modal3" title="添加一级知识点" @on-ok="ok" @on-cancel="cancel">
              <Input v-model="new_knowledge2" style="margin-bottom:10px"></Input>
            </Modal>
            <Button type="primary" @click="modal4 = true">添加二级知识点</Button>
            <Modal v-model="modal4" title="添加二级知识点" @on-ok="ok" @on-cancel="cancel">
              <Input v-model="new_knowledge2" style="margin-bottom:10px"></Input>
            </Modal>
          </FormItem>
          <!-- <FormItem label="科目/知识点">
            <Tabs size="small">
              <TabPane label="语文">
                <Button type="primary" @click="modal1 = true">运动学</Button>
                <Modal v-model="modal1" title="二级知识点" @on-ok="ok" @on-cancel="cancel">
                  <CheckboxGroup v-model="fruit">
                    <Checkbox label="1"></Checkbox>
                    <Checkbox label="2"></Checkbox>
                    <Checkbox label="3"></Checkbox>
                    <Checkbox label="4"></Checkbox>
                    <Checkbox label="5"></Checkbox>
                  </CheckboxGroup>
                </Modal>
              </TabPane>
              <TabPane label="英语">标签二的内容</TabPane>
              <TabPane label="数学">标签三的内容</TabPane>
              <TabPane label="物理">标签四的内容</TabPane>
              <TabPane label="历史">标签五的内容</TabPane>
            </Tabs>
          </FormItem>-->
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
      fruit: [],
      grade: "",
      // flag="ture",
      gradelist: ["一年级", "二年级", "三年级"],

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
        textarea: ""
      },
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙"
                }
              ]
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园"
                },
                {
                  value: "shizilin",
                  label: "狮子林"
                }
              ]
            }
          ]
        }
      ],
      model8: ""
    };
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
