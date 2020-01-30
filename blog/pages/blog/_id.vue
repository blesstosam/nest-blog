<template>
  <div class="container">
    <h3 class="pb-6">文章详情</h3>

    <h4>{{detail.title}}</h4>
    <p v-html="detail.content"></p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {contentDetail} from '../../api/user/index'

@Component({
  /* eslint-disable-next-line */
  async asyncData({ req, params }) {
    console.log(req, 'req')
    const res = await contentDetail({id: params.id})
    return {
      detail: res || {}
    }
  }

  // middleware: 'logger'
})
export default class BlogDetail extends Vue {

}
</script>
