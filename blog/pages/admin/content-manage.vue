
<template>
  <div class="container pa-6">
    <v-tabs>
      <v-tab exact to="/admin/content-manage/list">博客列表</v-tab>
      <v-tab exact to="/admin/content-manage/add">添加博客</v-tab>
    </v-tabs>
    <nuxt-child />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ContentManage extends Vue {



}
</script>
