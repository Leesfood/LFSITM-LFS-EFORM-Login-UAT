import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from '../views/Admin/Auth/Loginform.vue';
import EarlyFormUser from '@/views/User/EarlyForm.vue';
import LateFormUser from '@/views/User/LateFormUser.vue';
import MissionFormUser from '@/views/User/MissionFormUser.vue';
import MissedScanUser from '@/views/User/MissedScanUser.vue';
import LeaveRequestUser from '@/Trash/LeaveRequest.vue';
import CompanyActivityUser from '@/views/User/CompanyActivity.vue';
import AnnualLeave from '@/views/User/AnnualLeave.vue';
import SickLeave from '@/views/User/SickLeave.vue';
import MaternityLeave from '@/views/User/MaternityLeave.vue';
import SpecialLeave from '@/views/User/SpecialLeave.vue';
import Home from '@/views/Admin/Dashboard/Home.vue';


const routes = [
  {
    path: "/",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/home",
    name: "/home",
    component: Home,
  },
  {
    path: "/leave-request-user",
    name: "/leave-request-user",
    component: LeaveRequestUser,
  },
  {
    path: "/early-user",
    name: "/early-user",
    component:  EarlyFormUser,
  },
  {
    path: "/late-request-user",
    name: "/late-request-user",
    component: LateFormUser,
  },
  {
    path: "/mission-request-user",
    name: "/mission-request-user",
    component: MissionFormUser,
  },
  {
    path: "/missedScan-request-user",
    name: "/missedScan-request-user",
    component: MissedScanUser,
  },
  {
    path: "/companyActivity-request-user",
    name: "/companyActivity-request-user",
    component: CompanyActivityUser,
  },
  {
    path: "/annual-request-user",
    name: "/annual-request-user",
    component: AnnualLeave,
  },
  {
    path: "/sick-request-user",
    name: "/sick-request-user",
    component: SickLeave,
  },
  {
    path: "/maternity-request-user",
    name: "/maternity-request-user",
    component: MaternityLeave,
  },
  {
    path: "/Special-request-user",
    name: "/Special-request-user",
    component: SpecialLeave,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});



export default router;
