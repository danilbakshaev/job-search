import Vue from 'vue';
import App from './App.vue';
import './index.css';
import { createProvider } from './vue-apollo';
import VueTailwind from 'vue-tailwind';

Vue.use(VueTailwind);
Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
