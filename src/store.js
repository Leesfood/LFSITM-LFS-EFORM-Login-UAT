import { createStore } from 'vuex';

const store = createStore({
  state: {
    authToken: localStorage.getItem('authToken') || null,
    userDepartmentId: localStorage.getItem('userDepartmentId') || null,
    userId: localStorage.getItem('userId') || null,
    username: localStorage.getItem('username') || null,
    userRole: JSON.parse(localStorage.getItem('userRole')) || null,
    userManager: JSON.parse(localStorage.getItem('userManager')) || null,
    employeeDetails: JSON.parse(localStorage.getItem('employeeDetails')) || null, // Store employee details
    department: JSON.parse(localStorage.getItem('department')) || null,
    subDepartment: JSON.parse(localStorage.getItem('subDepartment')) || null
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
      localStorage.setItem('authToken', token);
      console.log('Auth token set:', token);
    },
    setUserDepartmentId(state, departmentId) {
      state.userDepartmentId = departmentId;
      localStorage.setItem('userDepartmentId', departmentId);
      console.log('Department ID set:', departmentId);
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem('userId', userId);
      console.log('User ID set:', userId);
    },
    setUsername(state, username) {
      state.username = username;
      localStorage.setItem('username', username);
      console.log('Username set:', username);
    },
    setUserRole(state, role) {
      state.userRole = role;
      localStorage.setItem('userRole', JSON.stringify(role));
      console.log('User role set:', role);
    },
    setUserManager(state, manager) {
      state.userManager = manager;
      localStorage.setItem('userManager', JSON.stringify(manager));
      console.log('User manager set:', manager);
    },
    setEmployeeDetails(state, employee) {
      state.employeeDetails = employee;
      localStorage.setItem('employeeDetails', JSON.stringify(employee));
      console.log('Employee details set:', employee);
    },
    setDepartment(state, department) {
      state.department = department;
      localStorage.setItem('department', JSON.stringify(department));
      console.log('Department set:', department);
    },
    setSubDepartment(state, subDepartment) {
      state.subDepartment = subDepartment;
      localStorage.setItem('subDepartment', JSON.stringify(subDepartment));
      console.log('Sub-department set:', subDepartment);
    }
  },
  getters: {
    getUserIdAndUsername: (state) => {
      return {
        userId: state.userId,
        username: state.username
      };
    },
    getUserRole: (state) => state.userRole,
    getUserManager: (state) => state.userManager,
    getEmployeeDetails: (state) => state.employeeDetails // Getter for employee details
  },
  actions: {},
  modules: {}
});

export default store;
