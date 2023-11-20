<template>
  <div id="todoList">
    <div id="bar">
      <button>全部标为完成</button>
      <span>今日事今日毕，勿将今事待明日!</span>
    </div>
    <div id="lists">
      <ul>
        <li v-for="(item, key) in lists" :key="key" :style="{backgroundColor: item.isDone? '#8cd3cb':'#f9f3e5'}">
          <div class="btn" @click="item.Done? recoveryTodo(item.id) : finishTodo(item.id)">
            <img v-if="item.isDone" src="../assets/images/yes.png" alt="" />
          </div>
          <div class="content" :style="{textDecoration: item.isDone? 'line-through':'none'}" >{{ item.content }}</div>
          <div class="del" @click="deleteTodo(item.id)">
            <img src="../assets/images/no.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lists"], //传递的值无法修改
  data() {
    return {
      active:false,
    };
  },
  methods: {
    finishTodo(id) {
        this.$emit("finishList", id);
    },
    recoveryTodo(id){
        this.$emit("recoveryList", id);
    },
    deleteTodo(id){
        this.$emit("deleteList", id);
    }
  },
};
</script>

<style scoped>
#todoList {
  margin-top: 15px;
  width: 100%;
  border: 2px solid black;
  border-radius: 15px;
  background-color: #ffffff;
}
#todoList #bar {
  border-bottom: 2px solid black;
}
#todoList #bar button {
  display: inline-block;
  border: none;
  border-top-left-radius: 15px;
  border-right: 2px solid black;
  font-size: 16px;
  padding: 10px 25px;
  background-color: #8cd3cb;
}
#todoList #bar span {
  font-size: 16px;
  font-weight: bold;
  padding-left: 20px;
}
#todoList #lists {
  min-height: 350px;
}
#todoList #lists ul {
  margin-top: 20px;
  display: flex;
  /* 倒着展示列表 */
  flex-direction: column-reverse;
}
ul li {
  margin: 0 20px 20px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: #f9f3e5;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.finishColor {
  background-color: #d0f4f0;
}
#todoList #lists ul li .btn {
  cursor: pointer;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border: 2px solid black;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#todoList #lists ul li .btn:hover {
  background-color: #8dd2cf;
  box-shadow: -3px 5px 3px #a2a1a1;
}

#todoList #lists ul li .content {
  flex-grow: 1;
  font-size: 20px;
  line-height: 30px;
  padding: 0 15px;
}
.finish {
  text-decoration: line-through;
  color: #9db2ad;
}
#todoList #lists ul li .del {
  cursor: pointer;
  width: 26px;
  height: 26px;
  border: 2px solid black;
  background-color: #ffffff;
  border-radius: 13px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
#todoList #lists ul li .del:hover {
  background-color: #f49ec7;
  box-shadow: 3px 5px 3px #a2a1a1;
}
</style>
