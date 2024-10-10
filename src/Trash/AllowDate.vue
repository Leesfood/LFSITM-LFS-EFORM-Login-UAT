<template>
	<div class="bg-[#a02022] h-full pb-5">
	  <form @submit.prevent="submitForm">
		<div class="w-full bg-[#a02022]">
		  <router-link to="/" class="p-5">
			<i class="fa-solid fa-left-long text-white text-4xl mt-5"></i>
		  </router-link>
		  <p class="py-10 text-2xl battambang-regular text-center uppercase text-white">
			ពាក្យសុំច្បាប់ឈប់សម្រាកប្រចាំឆ្នាំ <br> Annual Leave Request form
		  </p>
		</div>
  
		<div class="mx-4 md:mx-10 lg:mx-48 p-4 md:p-6 lg:p-10 bg-white rounded-xl shadow dark:border dark:bg-gray-800 dark:border-gray-700">
		  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<!-- Employee ID -->
			<div>
			  <label for="employee-id" class="pt-2 text-[16px]">Employee ID / <span
				  class="battambang-regular text-[16px]"> លេខសម្គាល់បុគ្គលិក</span></label>
			  <n-select v-model:value="employeeId" filterable placeholder="Search Employees"
				:options="options" :loading="loading" clearable remote @search="handleSearch"
				@update:value="onEmployeeChange" class="mt-3" />
			</div>
  
			<!-- Name -->
			<div>
			  <label for="name" class="pt-2 text-[16px]">Employee Name / <span
				  class="battambang-regular text-[16px]">ឈ្មោះបុគ្គលិក</span></label>
			  <n-input v-model:value="form.EmployeeName" type="text" placeholder="" readonly
				class="mt-3 font-bold text-black" />
			</div>
  
			<!-- Email -->
			<div>
			  <label for="email" class="pt-2 text-[16px]">Email / <span
				  class="battambang-regular text-[16px]">អ៊ីមែល</span></label>
			  <n-input v-model:value="displayedEmail" type="text" placeholder="Enter your email" readonly
				class="mt-3 font-bold text-black" />
			</div>
  
			<!-- Other fields... -->
  
			<!-- From Date -->
			<div>
			  <label for="from-date" class="pt-2 text-[16px]">From Date / <span
				  class="battambang-regular text-[16px]">ចាប់ពីថ្ងៃ</span></label>
			  <n-date-picker v-model:value="form.FromDate" type="date" class="mt-3"
				:default-value="Date.now()" :is-date-disabled="dateDisabled" />
			</div>
  
			<!-- To Date -->
			<div>
			  <label for="to-date" class="pt-2 text-[16px]">To Date / <span
				  class="battambang-regular text-[16px]">រហូតដល់ថ្ងៃ</span></label>
			  <n-date-picker v-model:value="form.ToDate" type="date" class="mt-3"
				:default-value="Date.now()" :is-date-disabled="dateDisabled" />
			</div>
  
			<!-- Back Date -->
			<div>
			  <label for="back-date" class="pt-2 text-[16px]">Date back to work / <span
				  class="battambang-regular text-[16px]">ថ្ងៃត្រឡប់មកធ្វើការវិញ</span></label>
			  <n-date-picker v-model:value="form.BackDate" type="date" class="mt-3"
				:default-value="Date.now()" :is-date-disabled="dateDisabled" />
			</div>
		  </div>
  
		  <!-- Submit button -->
		  <div class="grid grid-cols-1 gap-4 my-5">
			<div class="pt-8 text-center">
			  <button type="submit"
				class="w-1/2 text-lg py-2 px-4 bg-gray-300 text-blue-600 hover:text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#a02022] dark:bg-[#a02022] dark:hover:bg-[#a02022]">
				Submit
			  </button>
			</div>
		  </div>
  
		  <!-- Loading modal -->
		  <div v-if="showModal" class="loading-overlay">
			<NSpin size="large" />
		  </div>
		</div>
	  </form>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { NSpin } from 'naive-ui';
  
  // Reactive state
  const employeeId = ref(null);
  const employees = ref([]);
  const options = ref([]);
  const loading = ref(false);
  const showModal = ref(false); // Reactive variable for showing the loading spinner
  
  const form = ref({
	EmployeeID: "",
	EmployeeName: "",
	Email: "",
	Department: "",
	Position: "",
	Site: "",
	Approver: "",
	ReasonForLeave: "",
	NumberOfDayrequested: "",
	Phone: "",
	Gender: "",
	FromDate: null,
	FromTime: null,
	ToDate: null,
	ToTime: null,
	BackDate: null,
	BackTime: null,
	LeaveType: "Annual Leave",
	Attachements: []
  });
  
  // Computed property for displayed email
  const displayedEmail = computed(() => {
	return form.value.Email === '0' ? 'Not have email' : form.value.Email;
  });
  
  // Handle employee search
  const handleSearch = (query) => {
	loading.value = true;
	setTimeout(() => {
	  options.value = employees.value
		.filter(employee =>
		  employee.EmployeeName.toLowerCase().includes(query.toLowerCase()) ||
		  employee.EmployeeID.toLowerCase().includes(query.toLowerCase())
		)
		.map(employee => ({
		  label: `${employee.EmployeeID} - ${employee.EmployeeName}`,
		  value: employee.EmployeeID
		}));
	  loading.value = false;
	}, 1000);
  };
  
  // Fetch employee data from JSON
  onMounted(async () => {
	try {
	  const response = await axios.get('/data.json'); // Fetch employee data from JSON
	  employees.value = response.data.employee;
	} catch (error) {
	  console.error("Error fetching employee data:", error);
	  Swal.fire("Error", "Failed to load data", "error");
	}
  });
  
  // Handle employee change and calculate minSelectableDate
  const onEmployeeChange = (selectedEmployeeId) => {
	const selectedEmployee = employees.value.find(emp => emp.EmployeeID === selectedEmployeeId);
	if (selectedEmployee) {
	  form.value.EmployeeID = selectedEmployee.EmployeeID;
	  form.value.EmployeeName = selectedEmployee.EmployeeName;
	  form.value.Email = selectedEmployee.Email || 'N/A';
	  form.value.Department = selectedEmployee.Department;
	  form.value.Position = selectedEmployee.Section;
	  form.value.Site = selectedEmployee.Site;
	  form.value.Approver = selectedEmployee.ApproverEmail;
  
	  // Calculate the minSelectableDate based on AllowDate from the employee
	  const allowDate = selectedEmployee.AllowDate || 0;
	  const today = new Date();
	  minSelectableDate.value = new Date(today.getFullYear(), today.getMonth(), today.getDate() - allowDate);
	  console.log("AllowDate:", allowDate, "MinSelectableDate:", minSelectableDate.value);
	}
  };
  
  // Watch for employee change
  watch(employeeId, () => {
	onEmployeeChange(employeeId.value);
  });
  
  // Min selectable date
  const minSelectableDate = ref(null);
  const dateDisabled = (ts) => {
	if (minSelectableDate.value) {
	  const date = new Date(ts);
	  return date < minSelectableDate.value;
	}
	return false;
  };
  
  // Handle form submission
  const submitForm = async () => {
	if (!form.value.EmployeeID || !form.value.FromDate || !form.value.ToDate || !form.value.BackDate) {
	  Swal.fire("Error", "Please fill in all required fields", "error");
	  return;
	}
	try {
	  showModal.value = true; // Show loading spinner when submitting
  
	  // Prepare payload for submission
	  const payload = { ...form.value };
	  console.log("Form submission payload:", payload);
  
	  // Submit form via API (dummy API call for example)
	  await axios.post('https://your-api-url.com/submit', payload);
  
	  Swal.fire("Success", "Form submitted successfully", "success");
	} catch (error) {
	  console.error("Error during form submission:", error);
	  Swal.fire("Error", "Failed to submit form", "error");
	} finally {
	  showModal.value = false; // Hide loading spinner after submission
	}
  };
  </script>
  
  <style>
  .loading-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9999;
	display: flex;
	align-items: center;
	justify-content: center;
  }
  </style>
  