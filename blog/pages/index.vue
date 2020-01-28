<template>
  <div class="container">
    <div>
      <div>ip: {{ ip }}</div>
      <div>333</div>
      <div>{{ a.a }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import Logo from '@/components/Test.vue';

@Component({
  components: { Logo },
  /* eslint-disable-next-line */
  async asyncData({ req, params }) {
    const data = await axios.get('http://localhost:3000/api');

    // 这里也用来接收路由传参 通过params来接收
    const resp = await axios.get('http://icanhazip.com');
    return { ip: resp.data || '111', a: data.data };
  }
  // middleware: 'logger'
})
export default class PagesIndex extends Vue {
  created() {
    // this.reqData()
  }
  // a: object = {}
  async reqData() {
    const resp = await axios.get('http://localhost:3000/api');

    return { a: resp.data };
  }
}
</script>
