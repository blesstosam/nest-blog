<style lang="stylus"></style>
<template>
  <div class="pt-6">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="title" :rules="titleRules" label="分类名称"></v-text-field>

      <v-text-field v-model="desc" label="分类描述"></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">创建</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">重置</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createCategory } from '../../../api/user/index';

@Component({
  // middleware: 'logger'
})
export default class AddContent extends Vue {
  valid = true;
  title = '';
  titleRules = [(v) => !!v || '不能为空'];
  desc = '';
  async validate() {
    if ((this.$refs.form as any).validate()) {
      const { title, desc } = this;
      const res = await createCategory({ categoryTitle: title, categoryDesc: desc });
      if (res.code === 200) {
        // @ts-ignore
        this.$snackbar(res.msg);
        (this.$refs.form as any).reset();
      } else {
        // @ts-ignore
        this.$snackbar(res.msg);
      }
    }
  }

  reset() {
    (this.$refs.form as any).reset();
  }
}
</script>
