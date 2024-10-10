<template>
	<div class=" bg-[#a02022] h-full pb-5">
		<form @submit.prevent="submitForm">
			<div class="w-full bg-[#a02022] ">
				<router-link to="/" class=" p-5 ">
					<i class="fa-solid fa-left-long text-white text-4xl mt-5  "></i>

				</router-link>
				<p class="py-10 text-2xl battambang-regular text-center uppercase  text-white">
					ពាក្យសុំច្បាប់ឈប់សម្រាកប្រចាំឆ្នាំ <br> Annual Leave form
				</p>
			</div>
			<div
				class="mx-4 md:mx-10 lg:mx-48 p-4 md:p-6 lg:p-10 bg-white rounded-xl shadow dark:border dark:bg-gray-800 dark:border-gray-700">

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
						<label for="email" class="pt-2 text-[16px] ">Email / <span
								class="battambang-regular text-[16px]">អ៊ីមែល</span></label>
						<n-input v-model:value="form.Email" type="text" placeholder="Enter your email" readonly
							class="mt-3 font-bold text-black" />

					</div>



					<!-- Department -->
					<div>
						<label for="department" class="pt-2 text-[16px]">Department / <span
								class="battambang-regular text-[16px]">នាយកដ្ឋាន</span></label>
						<n-input v-model:value="form.Department" type="text" placeholder="" readonly
							class="mt-3 font-bold text-black" />
					</div>

					<!-- Position -->
					<div>
						<label for="position" class="pt-2 text-[16px]">Position / <span
								class="battambang-regular text-[16px]">តូនាទី</span></label>
						<n-input v-model:value="form.Position" type="text" placeholder="" readonly
							class="mt-3 font-bold text-black" />
					</div>

					<!-- Site -->
					<div>
						<label for="site" class="pt-2 text-[16px]">Site / <span
								class="battambang-regular text-[16px]">ទីតាំង</span></label>
						<n-input v-model:value="form.Site" type="text" placeholder="" readonly
							class="mt-3 font-bold text-black" />
					</div>

					<!-- Approver -->
					<div>
						<label for="approver" class="pt-2 text-[16px]">Line Manager Email</label>
						<n-input v-model:value="form.Approver" type="text" placeholder="" readonly
							class="mt-3 font-bold text-black" />
					</div>
					<!-- Phone -->
					<div>
						<label for="phone" class="pt-2 text-[16px] ">Phone / <span
								class="battambang-regular text-[16px]">លេខទូរស័ព្ទ</span></label>
						<n-input v-model:value="form.Phone" type="text" class="mt-3  " />
					</div>

					<!-- Gender -->
					<div>
						<label for="gender" class=" pt-2 text-[16px]">Gender / <span
								class="battambang-regular text-[16px]">ភេទ</span></label>
						<n-select v-model:value="form.Gender" :options="genderOptions" class="mt-3" />
					</div>
					<!-- Leave Type -->
					<div>
						<label for="leave-type">Leave Type / <span
								class="battambang-regular pt-2 text-[16px]">ប្រភេទការសុំច្បាប់</span></label>
						<n-select v-model:value="form.LeaveTypeSelected" :options="leaveTypeOptions"
							@update:value="onLeaveTypeChange" class="mt-3   text-[16px]" />
					</div>


					<!-- Number of Days Requested -->
					<div>
						<label for="number-of-days-requested" class="pt-2 text-[16px]">Number of Requested / <span
								class="battambang-regular text-[16px]">ចំនូនដែលស្នើសុំ​ (ថ្ងៃ/ម៉ោង)</span></label>
						<n-input v-model:value="form.NumberOfDayrequested" type="text" class="mt-3" />
					</div>
					<!-- Reason for Leave -->
					<div>
						<label for="reason-for-leave" class="pt-2 text-[16px] ">Reason for Leave / <span
								class="battambang-regular text-[16px]">មូលហេតុនៃការសុំ</span></label>
						<n-input v-model:value="form.ReasonForLeave" type="textarea" class="mt-3" />
					</div>


				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<!-- Date and Time Fields -->
					<div>
						<label for="from-date" class="pt-2 text-[16px]">From Date / <span
								class="battambang-regular text-[16px]">ចាប់ពីថ្ងៃ</span></label>
						<n-date-picker v-model:value="form.FromDate" type="date" class="mt-3" />
					</div>
					<div>
						<label for="from-time" class="pt-2 text-[16px]">From Time / <span
								class="battambang-regular text-[16px]">ចាប់ពីម៉ោង</span></label>
						<n-time-picker v-model:value="form.FromTime" format="h:mm a" class="mt-3" />
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<div>
						<label for="to-date" class="pt-2 text-[16px] ">To Date / <span
								class="battambang-regular text-[16px]">រហូតដល់ថ្ងៃ</span></label>
						<n-date-picker v-model:value="form.ToDate" type="date" class="mt-3" />
					</div>
					<div>
						<label for="to-time" class="pt-2 text-[16px]">To Time / <span
								class="battambang-regular text-[16px]">រហូតដល់ម៉ោង</span></label>
						<n-time-picker v-model:value="form.ToTime" format="h:mm a" class="mt-3" />
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<div>
						<label for="back-date" class=" pt-2 text-[16px]">Date back to work / <span
								class="battambang-regular text-[16px]">ថ្ងៃត្រឡប់មកធ្វើការវិញ</span></label>
						<n-date-picker v-model:value="form.BackDate" type="date" class="mt-3" />
					</div>
					<div>
						<label for="back-time" class="pt-2 text-[16px]">Time back to work / <span
								class="battambang-regular text-[16px]">ម៉ោងត្រឡប់មកធ្វើការវិញ</span></label>
						<n-time-picker v-model:value="form.BackTime" format="h:mm a" class="mt-3" />
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 my-5">
					<div class="pt-8 text-center">
						<button type="submit"
							class="w-1/2  text-lg py-2 px-4 bg-gray-300 text-blue-600 hover:text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#a02022] dark:bg-[#a02022] dark:hover:bg-[#a02022]">
							Submit
						</button>
					</div>
				</div>
			</div>
			<div v-if="showModal" class="loading-overlay">
				<NSpin size="large" />
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useLoadingBar } from 'naive-ui';
import { NSpin } from 'naive-ui';

// Form data
const form = ref({
	LeaveTypeSelected: null,
	ReasonForLeave: "",
	NumberOfDayrequested: "",
	Phone: "",
	Email: "",
	Gender: "",
	FromDate: null,
	FromTime: null,
	ToDate: null,
	ToTime: null,
	BackDate: null,
	BackTime: null,
	RequestTitleEN: "",
	RequestTitleKH: "",
	LeaveType: "",
	EmployeeID: "",
	EmployeeName: "",
	Site: "",
	Department: "",
	Position: "",
});

const employeeId = ref(null);
const employees = ref([]);
const leaveTypes = ref([]);
const options = ref([]);

// Gender options
const genderOptions = ref([
	{ label: 'Male', value: 'Male' },
	{ label: 'Female', value: 'Female' },
]);

// Fetch data from the JSON file on component mount
onMounted(async () => {
	try {
		const response = await axios.get('/data.json'); // Update with the correct path to your JSON file
		leaveTypes.value = response.data.leaveTypes;
		employees.value = response.data.employee;
	} catch (error) {
		console.error("Error fetching data:", error);
		Swal.fire("Error", "Failed to load data", "error");
	}
});

// Map leave type options
const leaveTypeOptions = computed(() => {
	return leaveTypes.value
		.filter(item => [1, 2, 3, 4].includes(item.id)) // Exclude ids 1, 2, and 3
		.map(item => ({
			label: item.LeaveType,
			value: item.id,
		}));
});

onMounted(async () => {
	try {
		const response = await axios.get('/data.json'); // Update with the correct path to your JSON file
		leaveTypes.value = response.data.leaveTypes;

		if (!leaveTypes.value || leaveTypes.value.length === 0) {
			console.warn("No leave types found in the API response.");
		}

		employees.value = response.data.employee;
	} catch (error) {
		console.error("Error fetching data:", error);
		Swal.fire("Error", "Failed to load data", "error");
	}
});

// Handle leave type change
const onLeaveTypeChange = (selectedId) => {
	const selectedLeaveType = leaveTypes.value.find(item => item.id === selectedId);
	if (selectedLeaveType) {
		form.value.RequestTitleEN = selectedLeaveType.RequestTitleEN;
		form.value.RequestTitleKH = selectedLeaveType.RequestTitleKH;
		form.value.LeaveType = selectedLeaveType.LeaveType;
	} else {
		console.warn(`Leave type with id ${selectedId} not found.`);
		form.value.RequestTitleEN = "";
		form.value.RequestTitleKH = "";
		form.value.LeaveType = "";
	}
};

// Handle employee search in dropdown
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


const onEmployeeChange = (selectedEmployeeId) => {
	const selectedEmployee = employees.value.find(emp => emp.EmployeeID === selectedEmployeeId);
	// Clear the form values first
	form.value = {
		LeaveTypeSelected: null,
		ReasonForLeave: "",
		NumberOfDayrequested: "",
		Phone: "",
		Gender: null,
		FromDate: null,
		FromTime: null,
		ToDate: null,
		ToTime: null,
		BackDate: null,
		BackTime: null,
		RequestTitleEN: "",
		RequestTitleKH: "",
		LeaveType: "",
		EmployeeID: "",
		EmployeeName: "",
		Site: "",
		Department: "",
		Position: "",
		Email: "",
		Approver: "",
	};

	if (selectedEmployee) {
		form.value.EmployeeID = selectedEmployee.EmployeeID;
		form.value.EmployeeName = selectedEmployee.EmployeeName;
		form.value.Email = selectedEmployee.Email;
		form.value.Department = selectedEmployee.Department;
		form.value.Position = selectedEmployee.Section;  // Assuming 'Section' is the position
		form.value.Site = selectedEmployee.Site;
		form.value.Approver = selectedEmployee.ApproverEmail;

		form.value.EmailApprover = selectedEmployee.ApproverEmail;
		form.value.EmailAcknowledge = selectedEmployee.AknowledgeBy;
	}
};

// Format date and time
const formatDateWithTime = (date, time) => {
	const formattedDate = format(date, 'EEEE, yyyy-MM-dd');
	const formattedTime = format(time, 'h:mma');
	return `${formattedDate} ${formattedTime}`;
};
const showModal = ref(false);
const loadingBar = useLoadingBar();
const loading = ref(false);
const submitForm = async () => {
	// Check if all required fields are filled
	if (!form.value.FromDate || !form.value.FromTime || !form.value.ToDate || !form.value.ToTime || !form.value.BackDate || !form.value.BackTime || !form.value.ReasonForLeave || !form.value.NumberOfDayrequested || !form.value.Phone || !form.value.Gender || !form.value.LeaveTypeSelected || !employeeId.value) {
		Swal.fire("បរាជ័យ", "ត្រូវបំពេញព័ត៌មានសំខាន់ៗ​ទាំងអស់", "error");
		return;
	}

	// Proceed with confirmation message setup
	const confirmMessage = `
	  <div style="text-align: left;">
		<p class="p-custom"><span class="custom-width">លេខសម្គាល់បុគ្គលិក:</span><span class="custom-span">${form.value.EmployeeID}</span></p> 
		<p class="p-custom"><span class="custom-width">ឈ្មោះបុគ្គលិក: </span><span class="custom-span">${form.value.EmployeeName}</span></p>
		<p class="p-custom"><span class="custom-width">អ៊ីមែល:</span><span class="custom-span">${form.value.Email}</span></p>
		<p class="p-custom"><span class="custom-width">Line Manager:</span><span class="custom-span">${form.value.Approver}</span></p>
		<p class="p-custom"><span class="custom-width">លេខទូរស័ព្ទ: </span><span class="custom-span">${form.value.Phone}</span></p>
		<p class="p-custom"><span class="custom-width">ភេទ:</span><span class="custom-span">${form.value.Gender}</span></p>
		<p class="p-custom"><span class="custom-width">នាយកដ្ឋាន:</span><span class="custom-span">${form.value.Department}</span></p>
		<p class="p-custom"><span class="custom-width">តូនាទី:</span><span class="custom-span">${form.value.Position}</span></p>
		<p class="p-custom"><span class="custom-width">ទីតាំង: </span><span class="custom-span">${form.value.Site}</span></p>
		<p class="p-custom"><span class="custom-width">ប្រភេទការសុំច្បាប់:</span><span class="custom-span">${form.value.LeaveType}</span></p>
		<p class="p-custom"><span class="custom-width">មូលហេតុនៃការសុំ:</span><span class="custom-span">${form.value.ReasonForLeave}</span></p>
		<p class="p-custom"><span class="custom-width">ចំនូនដែលស្នើសុំ​ (ថ្ងៃ/ម៉ោង):</span><span class="custom-span">${form.value.NumberOfDayrequested}</span></p>
		<p class="p-custom"><span class="custom-width">ចាប់ពីថ្ងៃ:</span><span class="custom-span">${formatDateWithTime(form.value.FromDate, form.value.FromTime)}</span></p>
		<p class="p-custom"><span class="custom-width">រហូតដល់ថ្ងៃ:</span><span class="custom-span">${formatDateWithTime(form.value.ToDate, form.value.ToTime)}</span></p>
		<p class="p-custom"><span class="custom-width">ថ្ងៃត្រឡប់មកធ្វើការវិញ:</span><span class="custom-span">${formatDateWithTime(form.value.BackDate, form.value.BackTime)}</span></p> 
	  </div>`;

	const { isConfirmed } = await Swal.fire({
		title: 'សូមពិនិត្យមើលម្តងទៀត​​មុនពេលបញ្ជូនសំណើរ',
		html: confirmMessage,
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#FF0000',
		confirmButtonText: 'submit',
		cancelButtonText: 'Cancel',
		customClass: {
			popup: 'sweet-alert-custom',
			title: 'sweet-alert-title',
			icon: 'sweet-alert-icon'
		}
	});
	showModal.value = true;
	loadingBar.start();
	console.log("Starting loading bar");
	// Proceed with form submission if confirmed
	if (isConfirmed) {
		try {
			// Build the payload and make the API request
			const payload = {
				RequestType: "LIVE",
				EmployeeID: form.value.EmployeeID,
				EmployeeName: form.value.EmployeeName,
				EmailRequestor: form.value.Email,
				Gender: form.value.Gender,
				Site: form.value.Site,
				Department: form.value.Department,
				Position: form.value.Position,
				RequestTitleEN: form.value.RequestTitleEN,
				RequestTitleKH: form.value.RequestTitleKH,
				LeaveType: form.value.LeaveType,
				ReasonForLeave: form.value.ReasonForLeave,
				NumberOfDayrequested: form.value.NumberOfDayrequested,
				Phone: form.value.Phone,
				FromDate: formatDateWithTime(form.value.FromDate, form.value.FromTime), // Combined date and time
				FromTime: format(form.value.FromTime, 'hh:mm a'), // Separate time
				ToDate: formatDateWithTime(form.value.ToDate, form.value.ToTime), // Combined date and time
				ToTime: format(form.value.ToTime, 'hh:mm a'), // Separate time
				BackDate: formatDateWithTime(form.value.BackDate, form.value.BackTime), // Combined date and time
				BackTime: format(form.value.BackTime, 'hh:mm a'), // Separate time
				EmailApprover: form.value.EmailApprover,  // New field
				EmailAcknowledge: form.value.EmailAcknowledge,  // New field
			};
			console.log("Payload being sent to the API:", payload);
			await axios.post(`https://prod-18.southeastasia.logic.azure.com/workflows/70cdee3d71174907ab7e079877c5e8ec/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QBaD-PHa4UT8IOy5nHGi5gyvbORVZrNeNTtv0X5LZTc`, payload);
			Swal.fire("Success", "ការស្នើរសុំរបស់អ្នកទទួលបានជោគជ័យ!", "success");
			// Clear the form after successful submission
			form.value = {
				LeaveTypeSelected: null,
				ReasonForLeave: "",
				NumberOfDayrequested: "",
				Phone: "",
				Gender: "",
				Email: "",
				FromDate: null,
				FromTime: null,
				ToDate: null,
				ToTime: null,
				BackDate: null,
				BackTime: null,
				RequestTitleEN: "",
				RequestTitleKH: "",
				LeaveType: "",
				EmployeeID: "",
				EmployeeName: "",
				Site: "",
				Approver: "",
				Department: "",
				Position: "",
			};
		} catch (error) {
			console.error("Error submitting leave request:", error);
			Swal.fire("Error", "ការស្នើរសុំរបស់អ្នកបរាជ័យ", "error");
		}
		finally {
			showModal.value = false;
		}
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

.n-loading-bar {
	z-index: 9999 !important;
	/* Use a high value to ensure visibility */
}

.sweet-alert-custom {
	width: 600px !important;

	max-width: 90% !important;

}

.sweet-alert-title {
	color: red;
	font-size: 20px;
	font-family: "Battambang", system-ui;
	font-weight: 400;
	font-style: normal;
	font-weight: bold;
}

.p-custom {
	color: black;
	font-size: 15px;
	padding: 5px;
	font-family: "Battambang", system-ui;
	font-weight: 400;
	font-style: normal;
}

.custom-span {
	font-size: 16px;
	padding-left: 20px;
	color: green;
}

.sweet-alert-icon {
	width: 20px;
	height: 20px;
}

@media (max-width: 600px) {
	.sweet-alert-custom {
		width: 90% !important;
	}
}

.battambang-thin {
	font-family: "Battambang", system-ui;
	font-weight: 100;
	font-style: normal;
}

.battambang-light {
	font-family: "Battambang", system-ui;
	font-weight: 300;
	font-style: normal;
}

.battambang-regular {
	font-family: "Battambang", system-ui;
	font-weight: 400;
	font-style: normal;
}

.battambang-bold {
	font-family: "Battambang", system-ui;
	font-weight: 700;
	font-style: normal;
}

.battambang-black {
	font-family: "Battambang", system-ui;
	font-weight: 900;
	font-style: normal;
}
</style>