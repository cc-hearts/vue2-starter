import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './language/index'

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	// @ts-ignore
	router,
	store,
	i18n,
	render: (h) => h(App),
}).$mount('#app');
