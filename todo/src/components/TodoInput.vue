<template>
  <div id="todoInput">
    <input
      type="text"
      class="input"
      placeholder="新增待办事项..."
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <button type="button" class="sub" @click="addTodo">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo != "") {
        this.$emit("addList", this.newTodo); //触发父组件的addList事件并传递参数给父组件
        this.newTodo = "";
      } else {
        return ;
      }
    },
  },
};
</script>

<style scoped>
#todoInput {
  margin-top: 25px;
  width: 100%;
  height: 70px;
  display: flex;
}
#todoInput .input {
  flex-grow: 1;
  font-size: 20px;
  text-indent: 10px;
  cursor: text;
  border: 2px solid black;
  border-right: none;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.input {
  outline: none;
}
#todoInput .sub {
  font-size: 20px;
  padding: 20px 30px;
  border: 2px solid black;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #ffd5e9;
}
#todoInput .sub:active {
  background-color: #ffafd6;
}
</style>
