<style lang="stylus">
.page-index
  .pager
    position fixed
    bottom 45px
</style>
<template>
  <div class="container page-index">
    <h3 class="pb-6">文章列表</h3>

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
      :length="pager.totalPages"
      @input="handlePageChange"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { contentList } from '../api/user/index';

@Component({
  /* eslint-disable-next-line */
  async asyncData({req, params}) {
    // TODO
    // 这里的pagesize 怎么和pager定义放到一个地方?
    const res = await contentList({ pageSize: 2, pageNum: 1 });
    if (res.code === 200) {
      const { list = [], total = 0 } = res.data;
      return { list, total };
    }
    return { list: [], total: 0 };
  }

  // middleware: 'logger'
})
export default class PagesIndex extends Vue {
  created() {
    this.pager.totalPages = Math.ceil(this.total / this.pager.pageSize);
  }
  list: any[];
  total: number;
  pager = {
    current: 1,
    pageSize: 2,
    total: 0,
    totalPages: 0
  };

  async handlePageChange(page: number) {
    this.pager.current = page;
    const { current, pageSize } = this.pager;
    const res = await contentList({ pageSize, pageNum: current });
    if (res.code === 200) {
      const { list = [], total = 0 } = res.data;
      this.list = [...list];
      this.pager.total = total;
      this.pager.totalPages = Math.ceil(total / this.pager.pageSize);
    } else {
      this.list = [];
      this.pager.total = this.pager.totalPages = 0;
    }
  }
}
</script>
