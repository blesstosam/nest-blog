<template>
  <div class="container">
    <h3 class="pb-6">文章列表</h3>

    <v-card class="mx-auto" tile>
      <v-list-item two-line v-for="item in list" :key="item._id">
        <v-list-item-content>
          <v-list-item-title>
            <a :href="`/blog/${item._id}`">{{item.title}}</a>
          </v-list-item-title>
          <v-list-item-subtitle>{{item.content}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {contentList} from '../api/user/index'


@Component({
  /* eslint-disable-next-line */
  async asyncData({ req, params }) {
    const res = await contentList({pageSize: 10, pageNum: 1})
    return {
      list: res || []
    }
  }

  // middleware: 'logger'
})
export default class PagesIndex extends Vue {

}
</script>
