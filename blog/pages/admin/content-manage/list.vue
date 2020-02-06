<style lang="stylus">
.admin-content-list
  .pager
    position fixed
    bottom 75px
    left 0
    right 0
</style>
<template>
  <div class="admin-content-list pt-6">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="list"
      item-key="name"
      class="elevation-1"
      :hide-default-footer="true"
    >
      <template #item.showDetail="{item}">
        <v-btn :to="`/admin/content-manage/${item._id}`">详情</v-btn>
      </template>
      <template #item.createdAt="{item}">
        {{ item.createdAt | formatTime }}
      </template>
      <template #item.updatedAt="{item}">
        {{ item.updatedAt | formatTime }}
      </template>
    </v-data-table>

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
import dayjs from 'dayjs';
import { contentList } from '../../../api/user/index';
import { Pager } from '../../../types';

@Component({
  filters: {
    formatTime(str) {
      return dayjs(str).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  async asyncData() {
    const pager: Pager = {
      current: 1,
      pageSize: 10,
      total: 0
    };
    const res = await contentList({ pageSize: pager.pageSize, pageNum: pager.current });
    if (res.code === 200) {
      const { list = [], total = 0 } = res.data;
      pager.total = total;
      return { list, pager };
    }
    return { list: [], pager };
  }
})
export default class ContentList extends Vue {
  list: any[];
  total: number;
  pager: Pager;
  get totalPages(): number {
    return Math.ceil(this.pager.total / this.pager.pageSize);
  }

  selected = [];
  headers = [
    { text: '标题', value: 'title' },
    { text: '简介', value: 'desc' },
    { text: '正文', value: 'content' },
    { text: '详情', value: 'showDetail' },
    { text: '创建时间', value: 'createdAt' },
    { text: '修改时间', value: 'updatedAt' }
  ];

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
