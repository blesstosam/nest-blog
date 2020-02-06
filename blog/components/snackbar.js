import Vue from 'vue';
console.log(100)
import toastComponent from './Snackbar.vue';
const ToastConstructor = Vue.extend(toastComponent);

function showToast(snackbarText) {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    created() {
      this.snackbarText = snackbarText;
    },
    data() {
      return {
        snackbar: true,
        snackbarText: ''
      };
    },
  });

  // 把实例化的toast.vue 添加到body中
  document.body.appendChild(toastDom.$el);
  return toastDom;
}

// 注册为全局组件的函数
function registerSnackbar() {
  Vue.prototype.$snackbar = showToast;
}

export default () => {
  Vue.use(registerSnackbar);
};
