import Vue from 'vue';
import Snackbar from './Snackbar.vue';
const SnackbarConstructor = Vue.extend(Snackbar);

function init(snackbarText) {
  const _dom = new SnackbarConstructor({
    el: document.createElement('div'),
    created() {
      this.snackbarText = snackbarText;
    },
    data() {
      return {
        snackbar: true,
        snackbarText: ''
      };
    }
  });

  document.body.appendChild(_dom.$el);
  return _dom;
}

// 注册为全局组件的函数
function registerSnackbar() {
  Vue.prototype.$snackbar = init;
}

export default () => {
  Vue.use(registerSnackbar);
};
