<template>
  <div class="container pa-6">
    <v-tabs>
      <v-tab exact to="/admin/category-manage/list">分类列表</v-tab>
      <v-tab exact to="/admin/category-manage/add">添加分类</v-tab>
    </v-tabs>
    <nuxt-child />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CategoryManage extends Vue {}
</script>
