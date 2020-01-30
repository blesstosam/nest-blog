<template>
  <div class="container">
    <h3>添加文章</h3>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="title" :rules="titleRules" label="内容标题" required></v-text-field>

      <v-text-field v-model="desc" label="内容描述"></v-text-field>

      <v-textarea v-model="content" outlined label="内容正文" required></v-textarea>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">创建</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">重置</v-btn>
    </v-form>

    <v-snackbar v-model="snackbar">
        {{ snackbarText }}
        <v-btn color="pink" text @click="snackbar = false">关闭</v-btn>
      </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createContent } from '../../api/user/index';

@Component({
  /* eslint-disable-next-line */
  async asyncData({ req, params }) {}
  // middleware: 'logger'
})
export default class AddContent extends Vue {
  snackbar = false;
  snackbarText = ''

  valid = true;
  title = '';
  titleRules = [(v) => !!v || '内容标题不能为空'];
  desc = '';
  content = '';

  async validate() {
    if ((this.$refs.form as any).validate()) {
      const { title, desc, content } = this;
      const _userInfo = localStorage.getItem('user_info');
      if (_userInfo) {
        const userInfo = JSON.parse(_userInfo);
        const res = await createContent({ title, desc, content, user: userInfo.id });
        if (res.code === 200) {
          this.snackbarText = res.msg
          this.snackbar = true;
          (this.$refs.form as any).reset();
        } else {
          this.snackbarText = res.msg
          this.snackbar = true
        }
      }
    }
  }
  reset() {
    (this.$refs.form as any).reset();
  }
}
</script>
