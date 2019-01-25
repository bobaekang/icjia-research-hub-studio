import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        role: '',
        tasks: [
            {
                title: 'manage submissions',
                path:'manage',
                permission: 'ICJIA R&A Manager'
            },
            {
                title: 'post new',
                path:'post',
            },
            {
                title: 'submit new',
                permission: 'ICJIA R&A User',
                path:'submit-new',
            },
            {
                title: 'submit update',
                permission: 'ICJIA R&A User',
                path:'submit-update',
            },
            {
                title: 'update',
                path:'update',
            },
        ]
    },
    mutations: {
        login (state) {
            state.isLoggedIn = true;
        },
        logout (state) {
            state.isLoggedIn = false;
            state.role = '';
        },
        setRole (state, payload) {
            state.role = payload;
        }
    },
    actions: {
        login ({ commit }) {
            commit('login')
        },
        logout ({ commit }) {
            commit('logout')
        },
        setRole ({ commit }, role) {
            commit('setRole', role)
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        role: state => state.role,
        tasks: state => state.tasks,
    },
})
