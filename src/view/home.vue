<template>
  <div>
    <Row>
      <i-col span="6" v-for="paper in papers" :key="paper.name" >
        <Card style="width:250px;margin:30px" >
          <p slot="title">{{paper.name}}</p>
          <p>科目：{{paper.subject}}</p>
          <p>学校：{{paper.school}}</p>
          <p>年级：{{paper.grade}}</p>
          <p>总分：{{paper.points}}</p>
        </Card>
      </i-col>
      
    </Row>

  </div>
</template>
<script>
export default {
  data() {
    return {
      cards: [1, 2, 3, 4, 5,6,7,8,9],
      userInfo: JSON.parse(localStorage.getItem("userInfo")),      
      papers:"",
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
        console.log(this.papers)
        console.log(this.papers[0].name)
      })
      .catch(res=>{
        console.log(res);
      });
  },
  methods: {
    changeLimit() {
      function getArrayItems(arr, num) {
        const temp_array = [];
        for (let index in arr) {
          temp_array.push(arr[index]);
        }
        const return_array = [];
        for (let i = 0; i < num; i++) {
          if (temp_array.length > 0) {
            const arrIndex = Math.floor(Math.random() * temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
          } else {
            break;
          }
        }
        return return_array;
      }
      this.randomMovieList = getArrayItems(this.movieList, 5);
    },
  },
  mounted() {
    this.changeLimit();
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

.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu {
    float: right;
    padding: 0 20px;
    position: relative;
    cursor: pointer;
    z-index: 3;
    transition: all .2s ease-in-out;
}
</style>


