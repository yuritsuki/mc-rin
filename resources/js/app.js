/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import VueRouter from 'vue-router';
import router from './router';
import Vue from 'vue';
import Auth from './packages/auth/auth';
import User from './packages/user'
import Common from './common/Common.vue';

window.Vue = require('vue');

Vue.use(VueRouter);
Vue.use(Auth);
Vue.use(User);
const common = Vue.prototype.$common = new Vue(Common).$mount();
document.body.appendChild(common.$el);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import { get } from './helpers/api';

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + ' - MantiCore';
    if (to.meta.forAuth){
        if(Vue.auth.isAuthenticated()) {
            next();
        }else{
            next({
                path: '/login'
            });
        }
    }else if (to.meta.forVisitors) {
        if(Vue.auth.isAuthenticated()) {
            next({
                path: '/'
            })
        }else{
            next();
        }
    }
    next();
});

/* eslint-disable-next-line no-unused-vars */
const app = new Vue({
    router,
    data() {
        return {
            accounts: '',
            user: '',
            userReady: false
        }
    },
    methods: {
        userInit(afterLogin = false) {
            let _this = this;
            if (_this.$auth.isAuthenticated()){
                get(_this, '/api/profile/info', {}, function (response) {
                    _this.setAccount(response.data.user, afterLogin);
                }, function () {});
            }
        },
        setAccount(account, afterLogin) {
            this.$user.data = account;
            this.user = this.$user;
            this.userReady = this.ready = true;

            if(afterLogin){
                this.afterLogin(this.user);
            }
        },
        afterLogin() {
            this.$router.push('/');
        }
    },
    mounted() {
        this.userInit();
    },
    components : {
        'headbar': require('./common/Headbar.vue').default
    },
}).$mount('#app');
