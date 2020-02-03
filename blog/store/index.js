let user;
try {
  // in client side
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      const _user = JSON.parse(userInfo);
      // 改写__NUXT__.state
      window.__NUXT__.state.user = {username: _user.username, isAdmin: _user.isAdmin}
    }
    // in server side
  } else {
    user = { username: '', isAdmin: false };
  }
} catch (e) {
  user = { username: '', isAdmin: false };
  throw new Error(`parse user_info error in store: ${e}`);
}

export const state = () => {
  return { user };
};

export const mutations = {
  UPDATE_USER(state, user) {
    state.user = user;
  }
};

// 将服务器的数据传递给客户端
// export const actions = {
//   nuxtServerInit ({ commit }, { req }) {
//     // if (req.session.user) {
//       commit('UPDATE_USER', {username: '999', isAdmin: true})
//     // }
//   }
// }
