import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';
import Show from './views/Show.vue';
import Test from './views/Test.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import User from './components/User.vue';
import Dashboard from './components/Dashboard.vue';
// import { component } from 'vue/types/umd';
// import { component } from 'vue/types/umd';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/dashboard',
            component: Dashboard
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/login',
            component: LoginForm
        },
        {
            path: '/register',
            component: RegisterForm
        },
        {
            path: '/',
            redirect: '/words'
        },
        {
            path: '/words',
            name: 'words',
            component: Words
        },
        {
            path: '/words/new',
            name: 'new-word',
            component: New
        },
        {
            path: '/words/:id',
            name: 'show',
            component: Show
        },
        {
            path: '/words/:id/edit',
            name: 'edit',
            component: Edit
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        }
    ]
});