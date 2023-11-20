import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';                      // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css';           // element-ui的css样式要单独引入
import App from './App.vue'

Vue.config.productionTip = false


Vue.use(ElementUI);   // 这种方式引入了ElementUI中所有的组件

Vue.prototype.$axios = axios;


new Vue({
  render: h => h(App),
}).$mount('#app')
