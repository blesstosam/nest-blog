<style lang="stylus">
.page-index
  .pager
    position fixed
    bottom 85px
    left 0
    right 0
</style>
<template>
  <div class="container page-index">
    <h3 class="pb-6">文章列表</h3>
    <v-btn-toggle v-model="activeCategoryIndex" class="mb-6" @change="changeCategory">
      <v-btn v-for="item in categoryList" :key="item._id">
        {{ item.categoryDesc }}
      </v-btn>
    </v-btn-toggle>

    <v-card class="mx-auto" tile>
      <v-list-item v-for="item in list" :key="item._id" two-line>
        <v-list-item-content>
          <v-list-item-title>
            <a :href="`/blog/${item._id}`">{{ item.title }}</a>
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-pagination
      v-model="pager.current"
      class="pager"
      :length="totalPages"
      @input="handlePageChange"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { contentList, categoryList } from '../api/user/index';
import { Pager } from '../types';

@Component({
  async asyncData() {
    const pager: Pager = {
      current: 1,
      pageSize: 10,
      total: 0
    };
    const [res, categorys] = await Promise.all([
      await contentList({ pageSize: pager.pageSize, pageNum: pager.current }),
      await categoryList()
    ]);
    if (res.code === 200 && categorys.code === 200) {
      const { list = [], total = 0 } = res.data;
      pager.total = total;
      return {
        list,
        pager,
        categoryList: [{ _id: 'all', categoryDesc: '全部' }, ...categorys.data.list]
      };
    }
    return { list: [], pager, categoryList: [] };
  }

  // middleware: 'logger'
})
export default class PagesIndex extends Vue {
  // 定义数据的类型 这些数据都是通过 asyncData 从服务器传递过来的
  // asyncData 可以理解为 data 函数， 只不过数据是在服务器定义获取的 然后混合到客户端的data函数里
  list: any[];
  total: number;
  pager: Pager;
  categoryList: any[];
  activeCategoryIndex = 0;

  get totalPages(): number {
    return Math.ceil(this.pager.total / this.pager.pageSize);
  }

  /* eslint-disable-next-line */
  changeCategory(index: number) {
    // console.log(index, '999')
    // TODO 分类查询
  }

  async handlePageChange(page: number) {
    this.pager.current = page;
    const { current, pageSize } = this.pager;
    const res = await contentList({ pageSize, pageNum: current });
    if (res.code === 200) {
      const { list = [], total = 0 } = res.data;
      this.list = [...list];
      this.pager.total = total;
    } else {
      this.list = [];
      this.pager.total = 0;
    }
  }
}
</script>
