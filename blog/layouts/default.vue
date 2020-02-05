<style lang="stylus">
.right-footer
  a
    margin-right 8px
</style>
<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        text
        style="margin-right: 12px;"
        @click="$router.push(item.to)"
        >{{ item.title }}</v-btn
      >
      <v-spacer />
      <div v-show="userInfo.username">
        <span>{{ userInfo.username }}, 您好！</span>
        <v-btn text class="red--text" @click="confirm = true">退出</v-btn>
      </div>
      <v-btn v-show="!userInfo.username" text @click.stop="loginDialogShow = true">登录</v-btn>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer :fixed="fixed" app class="d-flex justify-space-between" height="60">
      <span>Copyright &copy; {{ new Date().getFullYear() }}</span>
      <div class="right-footer">
        <span
          ><a href="https://segmentfault.com/u/weilei_58f084f7de891" target="blank"
            >Segmentfault</a
          ></span
        >
        <span><a href="http://github.com/blesstosam" target="blank">Github</a></span>
        <span><a href="http://blesstosam.github.io/" target="blank">Cantact me</a></span>
      </div>
    </v-footer>

    <LoginCard :show.sync="loginDialogShow" />

    <v-dialog v-model="confirm" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">提示</v-card-title>
        <v-card-text>确定登出吗？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirm = false">取消</v-btn>
          <v-btn color="green darken-1" text @click="doLogout">登出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import LoginCard from '@/components/LoginCard.vue';
import { logout } from '../api/user/index';

const defaultRoutes = [
  {
    title: '首页',
    to: '/'
  }
];
const adminRoutes = [
  {
    title: '博客管理',
    to: '/admin/content-manage/list'
  },
  {
    title: '分类管理',
    to: '/admin/category-manage/list'
  }
];

@Component({
  components: { LoginCard }
})
export default class Default extends Vue {
  mounted() {
    // if logined
    const { userInfo } = this;
    if (userInfo.username && userInfo.isAdmin) {
      this.items = [...this.items, ...adminRoutes];
    }
  }

  get userInfo() {
    return this.$store.state.user;
  }

  @Watch('userInfo')
  handleLogin(val) {
    if (val.username && val.isAdmin) {
      this.items = [...this.items, ...adminRoutes];
    }
  }

  loginDialogShow: boolean = false;

  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;
  miniVariant: boolean = false;

  confirm = false;
  items = defaultRoutes;

  async doLogout() {
    await logout({ username: this.userInfo.username });
    this.confirm = false;
    localStorage.setItem('user_info', JSON.stringify({}));
    this.$store.commit('UPDATE_USER', {});
    this.items = defaultRoutes;
  }
}
</script>
