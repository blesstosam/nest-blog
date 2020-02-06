<template>
  <v-snackbar v-model="snackbar" top>
    {{ snackbarText }}
    <v-btn color="pink" text @click="snackbar = false">关闭</v-btn>
  </v-snackbar>
</template>