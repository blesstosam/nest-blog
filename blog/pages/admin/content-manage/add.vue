<style lang="stylus"></style>
<template>
  <div class="pt-6">
    <h3>添加文章</h3>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="categoryId"
        item-value="_id"
        item-text="categoryTitle"
        :items="categoryList"
        label="文章分类"
      >
      </v-select>
      <v-text-field v-model="title" :rules="titleRules" label="内容标题" required></v-text-field>

      <v-text-field v-model="desc" label="内容描述"></v-text-field>

      <v-textarea v-model="content" outlined label="内容正文" required></v-textarea>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">创建</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">重置</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createContent, categoryList } from '../../../api/user/index';

@Component({
  // middleware: 'logger'
  async asyncData() {
    const resp = await categoryList();
    if (resp.code === 200) {
      return {
        categoryList: resp.data.list
      };
    }
    return { categoryList: [] };
  }
})
export default class AddContent extends Vue {

  // 分类id
  categoryId: string = '';

  valid = true;
  title = '';
  titleRules = [(v) => !!v || '内容标题不能为空'];
  desc = '';
  content = '';

  get userInfo() {
    return this.$store.state.user;
  }

  async validate() {
    if ((this.$refs.form as any).validate()) {
      const { title, desc, content, categoryId, userInfo } = this;
      const res = await createContent({
        title,
        desc,
        content,
        user: userInfo.id,
        category: categoryId
      });
      if (res.code === 200) {
        // @ts-ignore
        this.$snackbar(res.msg);
        (this.$refs.form as any).reset();
      } else {
        // @ts-ignore
        this.$snackbar(res.msg);
      }
    }
  }

  reset() {
    (this.$refs.form as any).reset();
  }
}
</script>
