<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="userInfo.username">
        <span>{{ userInfo.username }}, 您好！</span>
        <v-btn text class="red--text" @click="confirm = true">退出</v-btn>
      </div>
      <v-btn v-else text @click.stop="loginDialogShow = true">登录</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app class="text-center">
      <span>Copyright &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <LoginCard :show.sync="loginDialogShow" @logined="handleLogin" />

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
import { Component, Vue } from 'vue-property-decorator';
import { logout } from '../api/user/index';
import LoginCard from '@/components/LoginCard.vue';

@Component({
  components: { LoginCard }
})
export default class Default extends Vue {
  mounted() {
    const _userInfo = window.localStorage.getItem('user_info');
    if (_userInfo) {
      const userInfo = (this.userInfo = JSON.parse(_userInfo));
      if (userInfo && userInfo.isAdmin) {
        const arr = [
          {
            icon: 'mdi-lyft',
            title: '博客列表',
            to: '/admin/content-list'
          },
          {
            icon: 'mdi-apps',
            title: '添加博客',
            to: '/admin/add-content'
          }
        ];
        this.items = [...this.items, ...arr];
      }
    }
  }

  userInfo: any = {};

  loginDialogShow: boolean = false;

  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;

  confirm = false;
  items = [
    {
      icon: 'mdi-apps',
      title: '博客',
      to: '/'
    }
  ];

  miniVariant: boolean = false;

  title: string = 'Blesstosam的技术博客';

  async doLogout() {
    await logout({ username: this.userInfo.username });
    this.confirm = false;
    this.userInfo = {};
    localStorage.setItem('user_info', '');
  }

  handleLogin(userInfo) {
    this.userInfo = userInfo;
  }
}
</script>
