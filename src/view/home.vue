<template>
  <div>
    <Row :gutter="16">
      <Col span="6" v-for="paper in papers" :key="paper.name">
        <Card style="width:250px;margin:30px" @click.native="toDetail(paper.id)">
          <p slot="title">{{paper.name}}</p>
          <p>科目：{{paper.subject}}</p>
          <p>学校：{{paper.school}}</p>
          <p>年级：{{paper.grade}}</p>
          <p>总分：{{paper.points}}</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cards: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      papers: "",
      randomMovieList: []
    };
  },

  created: function() {
    console.log(this.userInfo);
    // count = 5;
    this.axios
      .post("http://localhost:8000/test_library/paper/")
      .then(res => {
        this.papers = res.data;
        console.log(this.papers);
        console.log(this.papers[0].name);
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
    toDetail(paperid) {
      this.$router.push({
        path: "/paperdetail",
        query: { paperid: paperid }
      });
    }
  }
};
</script>

<style>
.ivu-row {
  position: relative;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
  margin-top: 20px;
  height: auto;
  zoom: 1;
  display: block;
}

.ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-horizontal .ivu-menu-submenu {
  float: right;
  padding: 0 20px;
  position: relative;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease-in-out;
}
</style>


