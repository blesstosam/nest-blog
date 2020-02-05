<style lang="stylus"></style>
<template>
  <div class="pt-6">
    <h2>文章详情 / 编辑</h2>
    <v-select :items="categoryList" label="文章分类" value="前端"></v-select>
    <h3>{{ detail.title }}</h3>
    <h3>{{ detail.desc }}</h3>
    <p>{{ detail.content }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { contentDetail } from '@/api/user/index';

@Component({
  async asyncData({ params }) {
    const resp = await contentDetail({ id: params.id });
    if (resp.code === 200) {
      return {
        detail: resp.data
      };
    }
    return { detail: {} };
  }
  // middleware: 'logger'
})
export default class AddContent extends Vue {
  categoryList = ['前端', '服务器', '生活'];
}
</script>
