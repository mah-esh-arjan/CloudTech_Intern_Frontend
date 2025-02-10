import { createRouter, createWebHistory } from "vue-router";
import Todo from "@/components/Todo.vue";
import BlogParent from "@/components/Parent/BlogParent.vue";
import SlotParent from "@/components/Parent/SlotParent.vue";
import Tabs from "@/components/Tabs.vue";
import BlogPropDetail from "@/components/Prop/BlogPropDetail.vue";
import About from "@/components/Parent/About.vue";
import AboutTeam from "@/components/Prop/AboutTeam.vue";
import AboutCompany from "@/components/Prop/AboutCompany.vue";

const routes = [
  { path: "/todo", component: Todo },
  { path: "/slot", component: SlotParent },
  { path: "/tabs", component: Tabs },
  { path: "/blogs", component: BlogParent },
  { path: "/blogs/:id", component: BlogPropDetail },
  { path: "/about", component: About,
    children: [
      {
        path: 'team',
        component: AboutTeam,
      },
      {
        path: 'Company',
        component: AboutCompany
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
