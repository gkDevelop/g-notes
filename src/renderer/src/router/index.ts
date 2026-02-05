import { createRouter, createWebHashHistory } from 'vue-router';
import { useAppStore } from '../store';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/',
      name: 'Main',
      component: () => import('../layout/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue'),
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: () => import('../views/CalendarView.vue'),
        }
      ]
    }
  ]
});

router.beforeEach((to, _from, next) => {
  const store = useAppStore();
  if (to.name !== 'Login' && !store.user?.isLoggedIn) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && store.user?.isLoggedIn) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
