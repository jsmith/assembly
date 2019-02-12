import VueRouter from 'vue-router';
import Main from '@/Main.vue';

const routes = [
  { path: '/', component: Main },
];

export const router = new VueRouter({
  routes, // short for `routes: routes`
});
