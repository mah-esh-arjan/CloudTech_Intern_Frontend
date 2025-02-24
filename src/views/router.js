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
import BookList from "@/components/Book/BookList.vue";
import BookEdit from "@/components/Book/BookEdit.vue";
import BookCreate from "@/components/Book/BookCreate.vue";
import AdminLogin from "@/components/Admin/AdminLogin.vue";
import StudentDetails from "@/components/Student/StudentDetails.vue";
import StudentBooks from "@/components/Student/StudentBooks.vue";
import StudentBookList from "@/components/Student/StudentBookList.vue";

const routes = [
  { path: "/tab", name: "root", component: Todo },
  { path: "/slot", component: SlotParent },
  { path: "/tabs", component: Tabs },
  { path: "/blogs", component: BlogParent },
  { path: "/blogs/:id", component: BlogPropDetail },
  {
    path: "/about",
    component: About,
    children: [
      { path: "team", component: AboutTeam },
      { path: "Company", component: AboutCompany },
    ],
  },
  { path: "/soft", component: SoftDelete },
  // Path for Student:
  {
    path: "/student",
    children: [
      { path: "student-register", component: StudentRegister },
      { path: "student-login", component: StudentLogin },
      { path: "student-details/:id", component: StudentDetails },
      { path: "student-edit/:id", component: StudentEdit },
      { path: "student-books/:id", component: StudentBooks },
      { path: "student-books-list/", component: StudentBookList },
    ],
  },
  {
    path: "/admin",
    children: [
      { path: "books-list", component: BookList },
      { path: "student-list", component: StudentList },
      { path: "books-edit/:id", component: BookEdit },
      { path: "create-book", component: BookCreate },
      { path: "admin-login", component: AdminLogin },

    ]
  },
  // Below is for books:

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
