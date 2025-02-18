import { createRouter, createWebHistory } from "vue-router";
import Todo from "@/components/Todo.vue";
import BlogParent from "@/components/Parent/BlogParent.vue";
import SlotParent from "@/components/Parent/SlotParent.vue";
import Tabs from "@/components/Tabs.vue";
import BlogPropDetail from "@/components/Prop/BlogPropDetail.vue";
import About from "@/components/Parent/About.vue";
import AboutTeam from "@/components/Prop/AboutTeam.vue";
import AboutCompany from "@/components/Prop/AboutCompany.vue";
import StudentRegister from "@/components/Student/StudentRegister.vue";
import StudentLogin from "@/components/Student/StudentLogin.vue";
import StudentList from "@/components/Student/StudentList.vue";
import StudentEdit from "@/components/Student/StudentEdit.vue";
import SoftDelete from "@/components/SoftDelete.vue";

const routes = [
  { path: "/todo", component: Todo },
  { path: "/slot", component: SlotParent },
  { path: "/tabs", component: Tabs },
  { path: "/blogs", component: BlogParent },
  { path: "/blogs/:id", component: BlogPropDetail },
  {
    path: "/about",
    component: About,
    children: [
      {
        path: "team",
        component: AboutTeam,
      },
      {
        path: "Company",
        component: AboutCompany,
      },
    ],
  },
  { path: "/soft", component: SoftDelete },
  { path: "/student-register", component: StudentRegister },
  { path: "/student-login", component: StudentLogin },
  { path: "/student-list", component: StudentList },
  { path: "/student-edit/:id", component: StudentEdit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
