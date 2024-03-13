import { createStore } from 'vuex';

export default createStore({
    state: {
        isNavbarVisible: true,
    },
    mutations: {
      toggleNavbar(state) {
        state.isNavbarVisible = !state.isNavbarVisible;
      }
    }
});