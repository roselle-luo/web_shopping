// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            items: [],
            user: null,
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        fetchUser({ commit }) {
            // 假设这是一个异步请求
            setTimeout(() => {
                commit('setUser', { name: 'John Doe' });
            }, 1000);
        },
    },
    getters: {
        isLoggedIn(state) {
            return state.user !== null;
        },
    },
});
