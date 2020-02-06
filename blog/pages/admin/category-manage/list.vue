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
import { categoryList } from '../../../api/user/index';
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
    const res = await categoryList({ pageSize: pager.pageSize, pageNum: pager.current });
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
    { text: '分类标题', value: 'categoryTitle' },
    { text: '分类简介', value: 'categoryDesc' },
    { text: '创建时间', value: 'createdAt' },
    { text: '修改时间', value: 'updatedAt' }
  ];

  async handlePageChange(page: number) {
    this.pager.current = page;
    const { current, pageSize } = this.pager;
    const res = await categoryList({ pageSize, pageNum: current });
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
