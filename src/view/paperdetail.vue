<template>
  <div class="all">
    <Row>
      <Col span="8">
        <div>
          <Button @click="backhome()" type="text" ghost>
            <Icon type="md-arrow-back" size="30" color="black"/>
          </Button>
        </div>
      </Col>
      <Col span="8">
        <div class="projecttitle">
          <h2 align="center">{{paperinfo.name}}</h2>
        </div>
      </Col>
      <Col span="4">
        <div align="right">
          <Button @click="modify" type="text" ghost>
            <Icon type="md-settings" size="30" color="black"/>
          </Button>
        </div>
      </Col>
      <Col span="4">
        <div align="left">
          <Button @click="download" type="text" ghost>
            <Icon type="ios-cloud-download" size="30" color="black"/>
          </Button>
        </div>
      </Col>
    </Row>
    <Row style="background:#eee;padding:20px">
      <Col span="11">
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
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
          console.log(this.paperinfo.name);
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
    }
  }
};
</script>

<style>
.all {
  height: 100%;
}
</style>

