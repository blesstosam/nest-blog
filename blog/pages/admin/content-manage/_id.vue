<style lang="stylus"></style>
<template>
  <div class="pt-6">
    <h2>文章详情 / 编辑</h2>
    <v-select
      disabled
      item-value="_id"
      :value="detail.category && detail.category._id"
      item-text="categoryTitle"
      :items="categoryList"
      label="文章分类"
    >
    </v-select>
    <h3>标题： {{ detail.title }}</h3>
    <h3>作者：{{ detail.user && detail.user.username }}</h3>
    <h3>描述：{{ detail.desc }}</h3>
    <p>内容：{{ detail.content }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { contentDetail, categoryList } from '@/api/user/index';

@Component({
  async asyncData({ params }) {
    await categoryList();
    const [detail, categorys] = await Promise.all([
      await contentDetail({ id: params.id }),
      await categoryList()
    ]);
    if (detail.code === 200 && categorys.code === 200) {
      return { detail: detail.data, categoryList: categorys.data.list };
    }
  }
  // middleware: 'logger'
})
export default class AddContent extends Vue {}
</script>
