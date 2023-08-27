import { createRouter, createWebHistory } from 'vue-router'
import libraryDoc from "@/views/libraryDoc";
import widgetPage from "@/views/widgetPage";
import chatPage from "@/views/chatPage";
import devPage from "@/views/devPage";

const routes = [
  {
    path: '/',
    name: 'library_doc',
    component: libraryDoc
  },
  {
    path: '/widgets',
    name: 'widgetPage',
    component: widgetPage
  },
  {
    path: '/chat',
    name: 'chatPage',
    component: chatPage
  },
  {
    path: '/dev_page',
    name: 'devPage',
    component: devPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
