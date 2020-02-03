export interface User {
  username: string;
  isAdmin: boolean;
}
let user: User | undefined;
try {
  // in client side
  if (window) {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      user = JSON.parse(userInfo);
    }
  } else {
    user = { username: '', isAdmin: false };
  }
} catch (e) {
  user = { username: '', isAdmin: false };
  throw new Error(`parse user_info error in store: ${e}`);
}

export const state = (): { user: User | undefined } => ({
  user
});

export const mutations = {
  UPDATE_USER(user: User) {
    (state as any).user = user;
  }
};
