<template>
  <div class="all">
    <Row type="flex" justify="start">
      <Col span="8" v-for="paper in showlist" :key="paper.name">
        <Card style="width:300px;margin:20px;cursor:pointer;" @click.native="toDetail(paper.id)">
          <Button
            icon="ios-trash"
            shape="circle"
            style="float:right;margin:0px 1% "
            @click="deletepaper(paper.id)"
          ></Button>
          <!-- <div>
            <image src="C:\Users\27540\Desktop\test-library-fronted\src\image\card1"></image>
          </div>-->
          <p slot="title">
            <Icon type="ios-book"/>
            {{paper.name}}
          </p>
          <p>科目：{{paper.subject}}</p>
          <p>学校：{{paper.school}}</p>
          <p>年级：{{paper.grade}}</p>
          <p>总分：{{paper.points}}</p>
        </Card>
      </Col>
    </Row>
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
  </div>
</template>
<script>
export default {
  inject:['reload'],
  data() {
    return {
      cards: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      papers: "",
      randomMovieList: [],
      showlist: [],
      dataCount: 0,
      pageSize: 9,
      current: 1,
      pressprint: false
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
        this.dataCount = this.papers.length;
        console.log(this.dataCount, this.papers.length, this.pageSize);
        if (this.dataCount < this.pageSize) {
          this.showlist = this.papers;
        } else {
          this.showlist = this.papers.slice(0, this.pageSize);
        }
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
    toDetail(paperid) {
      if (this.pressprint == false) {
        this.$router.push({
          path: "/paperdetail",
          query: { paperid: paperid }
        });
      }
    },
    changepage(index) {
      console.log(index);
      var start = (index - 1) * this.pageSize;
      var end = index * this.pageSize;
      this.current = index;
      this.showlist = this.papers.slice(start, end);
    },
    deletepaper(paperid) {
      this.pressprint = true;
      this.$Modal.confirm({
        title: "确认删除该试卷？",
        content:
          "<p>确定下载该试卷？该操作不可撤销，试卷内所有记录也将消失</p>",
        onOk: () => {
          var a = "http://localhost:8000/test_library/delete_paper/";
          var id_string = String(paperid);
          var url = a + id_string;
          this.axios
            .post(url)
            .then(res => {
              console.log(res.data);
              if (res.data.isOK == true) {
                this.$Message.success("删除成功！");
                this.reload()
              } else {
                this.$Message.error(res.data.errmsg);
              }
            })
            .catch(res => {
              console.log(res);
            });

          this.pressprint = false;
        },
        onCancel: () => {
          this.pressprint = false;
        }
      });
    }
  }
};
</script>

<style>
/* .ivu-row {
  position: relative;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
  margin-top: 20px;
  height: auto;
  zoom: 1;
  display: block;
} */
.all {
  height: 100%;
  margin-top: 30px;
  margin-left: 200px;
  margin-right: 200px;
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


