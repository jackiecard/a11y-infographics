import Vue from 'vue'
import store from "./flowStore";
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = true;
Vue.config.devtools = true;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
