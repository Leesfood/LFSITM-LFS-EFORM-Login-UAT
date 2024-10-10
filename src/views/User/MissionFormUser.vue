<template>
	<div class=" bg-[#a02022] h-full pb-5">
		<form @submit.prevent="submitForm">
			<div class="w-full bg-[#a02022]  ">
				<router-link to="/home" class=" p-5 ">
					<i class="fa-solid fa-left-long text-white text-4xl mt-5  "></i>
				</router-link>
				<p class="py-10 text-2xl battambang-regular text-center uppercase text-white">
					ពាក្យសុំអនុញ្ញាតិ ចុះបេសកកម្មការងារតាមខេត្ត <br>Mission Request form
				</p>
			</div>
			<div class="mx-4 md:mx-10 lg:mx-48 p-4 md:p-6 lg:p-10 bg-white rounded-xl shadow dark:border dark:bg-gray-800 dark:border-gray-700">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<!-- Employee ID -->
					<div>
						<label for="employee-id" class="pt-2 text-[16px]">Employee ID / <span class="battambang-regular text-[16px]"> លេខសម្គាល់បុគ្គលិក</span></label>
						<n-input v-model:value="form.EmployeeID" type="text" placeholder="" readonly class="mt-3 font-bold text-black" />
					</div>

					<!-- Name -->
					<div>
						<label for="name" class="pt-2 text-[16px]">Employee Name / <span class="battambang-regular text-[16px]">ឈ្មោះបុគ្គលិក</span></label>
						<n-input v-model:value="form.EmployeeName" type="text" placeholder="" readonly class="mt-3 font-bold text-black" />
					</div>

					<!-- Email -->
					<div>
						<label for="email" class="pt-2 text-[16px] ">Email / <span class="battambang-regular text-[16px]">អ៊ីមែល</span></label>
						<n-input v-model:value="form.Email" type="text" placeholder="Enter your email" readonly class="mt-3 font-bold text-black" />
					</div>

					<!-- Department -->
					<div>
						<label for="department" class="pt-2 text-[16px]">Department / <span class="battambang-regular text-[16px]">នាយកដ្ឋាន</span></label>
						<n-input v-model:value="form.Department" type="text" placeholder="" readonly class="mt-3 font-bold text-black" />
					</div>

					<!-- Position -->
					<div>
						<label for="position" class="pt-2 text-[16px]">Position / <span class="battambang-regular text-[16px]">តូនាទី</span></label>
						<n-input v-model:value="form.Position" type="text" placeholder="" readonly class="mt-3 font-bold text-black" />
					</div>

					<!-- Site -->
					<div>
						<label for="site" class="pt-2 text-[16px]">Site / <span class="battambang-regular text-[16px]">ទីតាំង</span></label>
						<n-input v-model:value="form.Site" type="text" placeholder="" readonly class="mt-3 font-bold text-black" />
					</div>

					<!-- Approver -->
					<div>
						<label for="approver" class="pt-2 text-[16px]">Line Manager Email</label>
						<n-input v-model:value="form.Approver" type="text" placeholder="" readonly class="mt-3 font-bold text-black" />
					</div>

					<!-- Phone -->
					<div>
						<label for="phone" class="pt-2 text-[16px] ">Phone / <span class="battambang-regular text-[16px]">លេខទូរស័ព្ទ</span></label>
						<n-input v-model:value="form.Phone" type="text" class="mt-3  " />
					</div>

					<!-- Gender -->
					<div>
						<label for="gender" class=" pt-2 text-[16px]">Gender / <span class="battambang-regular text-[16px]">ភេទ</span></label>
						<n-select v-model:value="form.Gender" :options="genderOptions" class="mt-3" />
					</div>

					<!-- Leave Type -->
					<div>
						<label for="leave-type">Leave Type / <span class="battambang-regular pt-2 text-[16px]">ប្រភេទការសុំច្បាប់</span></label>
						<n-input v-model:value="form.LeaveType" type="text" placeholder="" readonly class="mt-3 font-bold text-black" />
					</div>

					<!-- Number of Days Requested -->
					<div>
						<label for="number-of-days-requested" class="pt-2 text-[16px]">Number of Requested / <span class="battambang-regular text-[16px]">ចំនូនដែលស្នើសុំ​ (ថ្ងៃ/ម៉ោង)</span></label>
						<n-input v-model:value="form.NumberOfDayrequested" type="text" class="mt-3" />
					</div>

					<!-- Reason for Leave -->
					<div>
						<label for="reason-for-leave" class="pt-2 text-[16px] ">Reason for Leave / <span class="battambang-regular text-[16px]">មូលហេតុនៃការសុំ</span></label>
						<n-input v-model:value="form.ReasonForLeave" type="textarea" class="mt-3" />
					</div>

					<!-- attachment file or image -->
					<div>
						<label for="attachements" class="pt-2  battambang-regular text-[16px]">ឯកសារយោង/ Ref. documents</label>
						<n-upload class="mt-3" v-model:value="form.Attachements" directory-dnd :max="1" @change="handleUploadChange" @finish="handleUploadFinish" @error="handleUploadError" :key="uploadKey" :show-file-list="true" :on-error="handleUploadError">
							<n-upload-dragger>
								<div style="margin-bottom: 12px">
									<n-icon size="18" :depth="3">
										<ArchiveIcon />
									</n-icon>
								</div>
								<n-text style="font-size: 16px">Drag a file to this area to upload</n-text>
							</n-upload-dragger>
						</n-upload>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<!-- Date and Time Fields -->
					<div>
						<label for="from-date" class="pt-2 text-[16px]">From Date / <span class="battambang-regular text-[16px]">ចាប់ពីថ្ងៃ</span></label>
						<n-date-picker v-model:value="form.FromDate" type="date" class="mt-3" :is-date-disabled="dateDisabled" />
					</div>
					<div>
						<label for="from-time" class="pt-2 text-[16px]">From Time / <span class="battambang-regular text-[16px]">ចាប់ពីម៉ោង</span></label>
						<n-time-picker v-model:value="form.FromTime" format="h:mm a" class="mt-3" />
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<div>
						<label for="to-date" class="pt-2 text-[16px]">To Date / <span class="battambang-regular text-[16px]">រហូតដល់ថ្ងៃ</span></label>
						<n-date-picker v-model:value="form.ToDate" type="date" class="mt-3" :is-date-disabled="dateDisabled" />
					</div>
					<div>
						<label for="to-time" class="pt-2 text-[16px]">To Time / <span class="battambang-regular text-[16px]">រហូតដល់ម៉ោង</span></label>
						<n-time-picker v-model:value="form.ToTime" format="h:mm a" class="mt-3" />
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<div>
						<label for="back-date" class="pt-2 text-[16px]">Date back to work / <span class="battambang-regular text-[16px]">ថ្ងៃត្រឡប់មកធ្វើការវិញ</span></label>
						<n-date-picker v-model:value="form.BackDate" type="date" class="mt-3" :is-date-disabled="dateDisabled" />
					</div>
					<div>
						<label for="back-time" class="pt-2 text-[16px]">Time back to work / <span class="battambang-regular text-[16px]">ម៉ោងត្រឡប់មកធ្វើការវិញ</span></label>
						<n-time-picker v-model:value="form.BackTime" format="h:mm a" class="mt-3" />
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 my-5">
					<div class="pt-8 text-center">
						<button type="submit" class="w-1/2 text-lg py-2 px-4 bg-gray-300 text-blue-600 hover:text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#a02022] dark:bg-[#a02022] dark:hover:bg-[#a02022]">
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
import { format, subDays } from "date-fns";  
import { useLoadingBar } from 'naive-ui';
import { NSpin } from 'naive-ui';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

const form = ref({
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
	RequestTitleEN: "Mission Request form",
	RequestTitleKH: "ពាក្យសុំអនុញ្ញាតិ ចុះបេសកកម្មការងារតាមខេត្ត",
	LeaveType: "ចុះបេសកកម្មការងារតាមខេត្ត/Mission Request",
	EmployeeID: "",
	EmployeeName: "",
	Site: "",
	Department: "",
	Position: "",
	Attachements: [],
	telegramchatid: "",
	telegramchatidApprover: "",
	allowdate: "1", // Default allow date, assuming it's fetched later
});

const employeeId = ref(null);
const uploadKey = ref(Date.now());
const router = useRouter();
const genderOptions = ref([
	{ label: 'ប្រុស', value: 'Male' },
	{ label: 'ស្រី', value: 'Female' },
]);

const minSelectableDate = ref(null);

onMounted(async () => {
	const employeeData = JSON.parse(localStorage.getItem('employeeData'));

	if (employeeData) {
		form.value.EmployeeID = employeeData.employeeid;
		form.value.EmployeeName = employeeData.employeename;
		form.value.Email = employeeData.email;
		form.value.Approver = employeeData.approveremail;
		form.value.Department = employeeData.department;
		form.value.Position = employeeData.section;
		form.value.Site = employeeData.site;
		form.value.allowdate = employeeData.allowdate; 
		
		// Calculate the minimum selectable date based on allowdate
		minSelectableDate.value = subDays(new Date(), parseInt(form.value.allowdate) + 1);  
	} else {
		Swal.fire("Error", "No employee data found. Please log in again.", "error");
	}
});
const dateDisabled = (ts) => {
	const date = new Date(ts);
	return date < minSelectableDate.value;
};

const formatDateWithTime = (date, time) => {
	const formattedDate = format(date, 'EEEE, yyyy-MM-dd');
	const formattedTime = format(time, 'h:mma');
	return `${formattedDate} ${formattedTime}`;
};

const convertToBase64 = (file, callback) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => callback(reader.result);
	reader.onerror = (error) => console.error('Error: ', error);
};

const handleUploadChange = (info) => {
	if (!info.fileList || !Array.isArray(info.fileList)) {
		console.error('Expected fileList to be an array, received:', info.fileList);
		return;
	}
	info.fileList.forEach(fileItem => {
		const fileToConvert = fileItem.file;
		if (fileToConvert && fileToConvert instanceof Blob) {
			convertToBase64(fileToConvert, (base64) => {
				form.value.Attachements.push(base64);
			});
		} else {
			console.error('File is not a Blob:', fileToConvert);
		}
	});
};

const handleUploadFinish = ({ file, fileList }) => {
	fileList.forEach(fileItem => {
		const fileToConvert = fileItem.file;
		if (fileToConvert && fileToConvert instanceof Blob) {
			convertToBase64(fileToConvert, (base64) => {
				form.value.Attachements.push(base64);
			});
		} else {
			console.error('File is not a Blob:', fileToConvert);
		}
	});
};

const handleUploadError = (error, file, fileList) => {
	console.error('Error uploading file:', file ? file.name : 'Unknown file', error);
	console.log('Current file list after error:', fileList);
};

const showModal = ref(false);
const loadingBar = useLoadingBar();

const submitForm = async () => {
	if (!form.value.Email || !form.value.Phone || !form.value.Gender || !form.value.LeaveType || !form.value.FromDate || !form.value.FromTime || !form.value.ToDate || !form.value.ToTime || !form.value.BackDate || !form.value.BackTime || !form.value.ReasonForLeave || !form.value.NumberOfDayrequested || !form.value.EmployeeID) {
		Swal.fire("បរាជ័យ", "ត្រូវបំពេញព័ត៌មានសំខាន់ៗ​ទាំងអស់", "error");
		return;
	}

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
		cancelButtonText: 'Cancel',
		confirmButtonText: 'Submit',
	});

	if (isConfirmed) {
		showModal.value = true;
		loadingBar.start();
		try {
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
				FromDate: formatDateWithTime(form.value.FromDate, form.value.FromTime),
				FromTime: format(form.value.FromTime, 'hh:mm a'),
				ToDate: formatDateWithTime(form.value.ToDate, form.value.ToTime),
				ToTime: format(form.value.ToTime, 'hh:mm a'),
				BackDate: formatDateWithTime(form.value.BackDate, form.value.BackTime),
				BackTime: format(form.value.BackTime, 'hh:mm a'),
				EmailApprover: form.value.Approver,
				EmailAcknowledge: form.value.EmailAcknowledge,
				Attachements: JSON.stringify(form.value.Attachements),
				telegramchatid: form.value.telegramchatid,
				telegramchatidApprover: form.value.telegramchatidApprover,
			};

			const response = await axios.post(`https://prod-18.southeastasia.logic.azure.com/workflows/70cdee3d71174907ab7e079877c5e8ec/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QBaD-PHa4UT8IOy5nHGi5gyvbORVZrNeNTtv0X5LZTc`, payload);
			
			if (response.data.status === 'Sucessfully') {
				Swal.fire("Success", "ការស្នើរសុំរបស់អ្នកទទួលបានជោគជ័យ!", "success").then(() => {
					router.push({ name: '/home' });
				});
			} else {
				Swal.fire("Error", "ការស្នើរសុំរបស់អ្នកបរាជ័យ", "error");
			}
			
			employeeId.value = null;
			uploadKey.value = Date.now();
		} catch (error) {
			console.error("Error submitting leave request:", error);
			Swal.fire("Error", "មានបញ្ហាក្នុងការផ្ញើសំណើរបស់អ្នក", "error");
		} finally {
			showModal.value = false;
			loadingBar.finish();
		}
	} else {
		console.log('Form submission canceled');
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
