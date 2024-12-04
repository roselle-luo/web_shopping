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
    },
    getters: {
        isLoggedIn(state) {
            return state.user !== null;
        },
    },
});
