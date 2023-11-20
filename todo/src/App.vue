<template>
  <div id="app">
    <div id="appMain">
      <img src="./assets/images/todo.png" alt="" />
      <todo-input @addList="addList"></todo-input>
      <!-- 子组件向父组件传值 -->
      <todo-list
        :lists="lists"
        @finishList="finishList"
        @recoveryList="recoveryList"
        @deleteList="deleteList"
      ></todo-list>
      <!-- 父组件向子组件传值 -->
    </div>
  </div>
</template>

<script>
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    "todo-input": TodoInput,
    "todo-list": TodoList,
  },
  data() {
    return {
      lists: [],
    };
  },
  created() {
    this.getLists(); //默认展示已有的lists
  },
  methods: {
    handleError(error) {
      if (error.response) {
        this.$message.error("请求错误：" + error.response.status);
      } else if (error.request) {
        // 请求已发送，但没有接收到响应
        this.$message.error("请求超时，请重试");
      } else {
        // 其他错误
        this.$message.error("请求失败，请检查网络连接");
      }
    },
    getLists() {
      this.$axios
        .get("http://localhost:3002/api/list/getList")
        .then((response) => {
          const data = response.data.data;
          this.lists = []; //每次状态发生改变就先把数组清空,lists是对象数组
          for (let key in data) 
            if (data[key].status == 1) this.lists.push(data[key]); //只插入status等于1的，等于0的已经被删除，无需展示
        })
        .catch((error) => {
          this.handleError(error);
        });
    },
    addList(newTodo) {
      //自定义事件被触发,添加新的list,接收子组件传递过来的数据
      this.$axios
        .post("http://localhost:3002/api/list/add", { content: newTodo })
        .then(() => {
          this.getLists(); //添加数据后需要更新lists
        })
        .catch(() => {
          this.$message.error("发布待办事项失败");
        });
    },
    finishList(id) {
      //此项的isDone:true
      this.$axios
        .post("http://localhost:3002/api/list/done", { id: id })
        .then(() => {
          this.getLists();
        })
        .catch(() => {
          this.$message.error("发布待办事项标记完成失败");
        });
    },
    recoveryList(id) {
      //此项的isDone:false
      this.$axios
        .post("http://localhost:3002/api/list/cancel", { id: id })
        .then(() => {
          this.getLists();
        })
        .catch(() => {
          this.$message.error("待办事项未完成标记失败");
        });
    },
    deleteList(id) {
      //此项的status:0
      this.$axios
        .post("http://localhost:3002/api/list/delete", { id: id })
        .then(() => {
          this.getLists();
        })
        .catch(() => {
          this.$message.error("删除待办事项失败");
        });
    },
  },
};
</script>

<style scoped>
#app {
  width: 50%;
  margin: 0 auto;
  margin-top: 40px;
  position: relative;
}
#appMain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
