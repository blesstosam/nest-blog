<template>
  <div class="container">
    <h3 class="pb-3">文章列表</h3>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="list"
      item-key="name"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { contentList } from '../../api/user/index';

@Component({
  components: {},
  /* eslint-disable-next-line */
  async asyncData({ req, params }) {
    const res = await contentList({ pageSize: 10, pageNum: 1 });
    return {
      list: res || []
    };
  }
})
export default class ContentList extends Vue {
  created() {}

  pager = {
    pageNum: 1,
    pageSize: 10,
    total: 0
  };

  reqList() {}

  selected = [];
  headers = [
    { text: '标题', value: 'title' },
    { text: '简介', value: 'desc' },
    { text: '正文', value: 'content' },
    { text: '创建时间', value: 'createdAt' },
    { text: '修改时间', value: 'updatedAt' }
  ];
}
</script>
