import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';
import Show from './views/Show.vue';
import Test from './views/Test.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import Dashboard from './components/Dashboard.vue';
import TranslateForm from './components/TranslateForm.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/translate',
            component: TranslateForm
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
            redirect: '/login'
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