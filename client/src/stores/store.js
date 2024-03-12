import { createStore } from 'vuex';

export default createStore({
  state: {
    isNavbarVisible: true,
    // isAuthenticated: false,
  },
  mutations: {
    toggleNavbar(state) {
      state.isNavbarVisible = state.isNavbarVisible;
    },
    // login(state) { 
    //   state.isAuthenticated = true;
    // },
    // logout(state) { 
    //   state.isAuthenticated = false;
    // },
  },
});