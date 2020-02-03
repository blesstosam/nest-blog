
let user;
try {
  // in client side
  // 在客户端执行了之后但是user还是原来的 不起作用
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      user = JSON.parse(userInfo);
    }
    // in server side
  } else {
    user = { username: '', isAdmin: false };
  }
} catch (e) {
  user = { username: '', isAdmin: false };
  throw new Error(`parse user_info error in store: ${e}`);
}

// console.log(user, 'user')
export const state = () => {
  return { user };
}

export const mutations = {
  UPDATE_USER(state, user) {
    state.user = user;
  }
};