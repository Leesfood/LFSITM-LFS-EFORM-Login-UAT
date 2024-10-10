<template>
	<div class=" bg-[#a02022] h-full pb-5">
		<form @submit.prevent="submitForm">
			<div class="w-full bg-[#a02022]  ">
				<router-link to="/" class=" p-5 ">
					<i class="fa-solid fa-left-long text-white text-4xl mt-5  "></i>

				</router-link>
				<p class="py-10 text-2xl battambang-regular text-center uppercase  text-white">
					ពាក្យសុំអនុញ្ញាតិ​​ មិនបានស្កេន <br> Missed Scan Request form
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
								<n-input v-model:value="displayedEmail" type="text" placeholder="Enter your email" readonly
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
						<n-input v-model:value="form.LeaveType" type="text" placeholder="" readonly
							class="mt-3 font-bold text-black" />
					</div>


					<!-- Number of Days Requested -->
					<!-- <div>
						<label for="number-of-days-requested" class="pt-2 text-[16px]">Number of Requested / <span
								class="battambang-regular text-[16px]">ចំនូនដែលស្នើសុំ​ (ថ្ងៃ/ម៉ោង)</span></label>
						<n-input v-model:value="form.NumberOfDayrequested" type="text" class="mt-3" />
					</div> -->
					<!-- Reason for Leave -->
					<div>
						<label for="reason-for-leave" class="pt-2 text-[16px] ">Reason for Leave / <span
								class="battambang-regular text-[16px]">មូលហេតុនៃការសុំ</span></label>
						<n-input v-model:value="form.ReasonForLeave" type="textarea" class="mt-3" />
					</div>
					<div>
                        <label for="attachements" class="pt-2  battambang-regular text-[16px]">ឯកសារយោង/ Ref. documents</label>
						<n-upload class="mt-3"  v-model:value="form.Attachements"  directory-dnd :max="1"
                            @change="handleUploadChange" @finish="handleUploadFinish" @error="handleUploadError"
							:key="uploadKey"  :show-file-list="true" :on-error="handleUploadError">
                            <n-upload-dragger>
                                <div style="margin-bottom: 12px">
                                    <n-icon size="18" :depth="3">
                                        <ArchiveIcon />
                                    </n-icon>
                                </div>
                                <n-text style="font-size: 16px">
                                     Drag a file to this area to upload
                                </n-text>
                                
                            </n-upload-dragger>
                        </n-upload>
					</div>

				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<!-- Date and Time Fields -->
					<div>
						<label for="from-date" class="pt-2 text-[16px]">From Date / <span
								class="battambang-regular text-[16px]">ចាប់ពីថ្ងៃ</span></label>
						<n-date-picker v-model:value="form.FromDate" type="date" class="mt-3" :default-value="Date.now()" :is-date-disabled="dateDisabled" />
					</div>
					<div>
						<label for="from-time" class="pt-2 text-[16px]">From Time / <span
								class="battambang-regular text-[16px]">ចាប់ពីម៉ោង</span></label>
						<n-time-picker v-model:value="form.FromTime" format="h:mm a" class="mt-3" />
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
import { ref, onMounted, watch, computed } from 'vue';

import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useLoadingBar } from 'naive-ui';
import { NSpin } from 'naive-ui';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'

const displayedEmail = computed(() => {
	return form.value.Email === '0' ? 'Not have email' : form.value.Email;
});
// Form data
const form = ref({

	ReasonForLeave: "",
	NumberOfDayrequested: "0",
	Phone: "",
	Email: "",
	Gender: "",
	FromDate: null,
	FromTime: null,
	ToDate: null,
	ToTime:  null,
	BackDate:  null,
	BackTime:  null,
	RequestTitleEN: "Company Activity Request form",
	RequestTitleKH: "ពាក្យសុំអនុញ្ញាតិ ចុះបំពេញសកម្មភាពការងារក្រុមហ៊ុននៅខាងក្រៅការិយាល័យ",
	LeaveType: "មិនបានស្កេន/ Missed Scan Request",
	EmployeeID: "",
	EmployeeName: "",
	Site: "",
	Department: "",
	Position: "",
	Attachements: []
});

const employeeId = ref(null);
const employees = ref([]);
const leaveTypes = ref([]);
const options = ref([]);
const uploadKey = ref(Date.now()); 


// Gender options
const genderOptions = ref([
	{ label: 'ប្រុស', value: 'Male' },
	{ label: 'ស្រី', value: 'Female' },
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

		ReasonForLeave: "",
		NumberOfDayrequested: "0",
		Phone: "",
		Gender: null,
		FromDate: null,
		FromTime: null,
		ToDate: currentDate,
		ToTime:currentDate,
		BackDate:currentDate,
		BackTime: currentDate,
		RequestTitleEN: "Missed Scan Request form",
		RequestTitleKH: "ពាក្យសុំអនុញ្ញាតិ​​ មិនបានស្កេន",
		LeaveType: "មិនបានស្កេន/ Missed Scan Request",
		EmployeeID: "",
		EmployeeName: "",
		Site: "",
		Department: "",
		Position: "",
		Email: "",
		Approver: "",
		desinationlocation: null,
		Attachements: [],
		telegramchatid:"",
		telegramchatidApprover:"",
	};
	uploadKey.value = Date.now(); 
	if (selectedEmployee) {
		form.value.EmployeeID = selectedEmployee.EmployeeID;
		form.value.EmployeeName = selectedEmployee.EmployeeName;
		form.value.Email = selectedEmployee.Email === '0' ? '0' : selectedEmployee.Email;

		form.value.Department = selectedEmployee.Department;
		form.value.Position = selectedEmployee.Section;  // Assuming 'Section' is the position
		form.value.Site = selectedEmployee.Site;
		form.value.Approver = selectedEmployee.ApproverEmail;

		form.value.EmailApprover = selectedEmployee.ApproverEmail;
		form.value.EmailAcknowledge = selectedEmployee.AknowledgeBy;

		// Calculate the minSelectableDate based on AllowDate from the employee
		const allowDate = selectedEmployee.AllowDate || 0;
		const today = new Date();
		minSelectableDate.value = new Date(today.getFullYear(), today.getMonth(), today.getDate() - allowDate);
		console.log("AllowDate:", allowDate, "MinSelectableDate:", minSelectableDate.value);
	}
};
watch(employeeId, () => {
    onEmployeeChange(employeeId.value);
});
const minSelectableDate = ref(null);
const dateDisabled = (ts) => {
	if (minSelectableDate.value) {
		const date = new Date(ts);
		return date < minSelectableDate.value;
	}
	return false;
};
// Format date and time
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
    console.log('Upload event info:', info);
    if (!info.fileList || !Array.isArray(info.fileList)) {
        console.error('Expected fileList to be an array, received:', info.fileList);
        return; // Exit the function if fileList is not as expected
    }
    // Accessing the actual file object
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
    console.log('Upload finished for:', file.name);
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
    console.log('All uploaded files:', form.value.Attachements);
};
const handleUploadError = (error, file, fileList) => {
    console.error('Error uploading file:', file ? file.name : 'Unknown file', error);
    console.log('Current file list after error:', fileList);
};
const showModal = ref(false);
const loadingBar = useLoadingBar();
const loading = ref(false);
const currentDate = new Date();

onMounted(() => {
    const currentDate = new Date(); // Initialize currentDate here
    form.value.ToDate = currentDate;
    form.value.ToTime = currentDate;
    form.value.BackDate = currentDate;
    form.value.BackTime = currentDate;
});


const submitForm = async () => {
    if (
        !form.value.Email || 
		!form.value.FromDate || 
		!form.value.FromTime || 
		!form.value.ReasonForLeave || 
		!form.value.Phone || 
        !form.value.Gender || 
		!form.value.LeaveType || 
		!employeeId.value
    ) {
        Swal.fire("បរាជ័យ", "ត្រូវបំពេញព័ត៌មានសំខាន់ៗ​ទាំងអស់", "error");
        return;
    }
    // Prepare the confirmation message
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
            <p class="p-custom"><span class="custom-width">ចាប់ពីថ្ងៃ:</span><span class="custom-span">${formatDateWithTime(form.value.FromDate, form.value.FromTime)}</span></p>
        </div>`;

    // Show the confirmation dialog
    const { isConfirmed } = await Swal.fire({
        title: 'សូមពិនិត្យមើលម្តងទៀត​​មុនពេលបញ្ជូនសំណើរ',
        html: confirmMessage,
        showCancelButton: true,
        confirmButtonColor: '#008000',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        customClass: {
            popup: 'sweet-alert-custom',
            title: 'sweet-alert-title',
            icon: 'sweet-alert-icon'
        }
    });

    if (isConfirmed) {
        showModal.value = true;
        loadingBar.start();

        try {
            // Build the payload for the API
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
                EmailApprover: form.value.EmailApprover,
                EmailAcknowledge: form.value.EmailAcknowledge,
                Attachements: JSON.stringify(form.value.Attachements),
				telegramchatid:form.value.telegramchatid,
				telegramchatidApprover:form.value.telegramchatidApprover
            };

            // Submit the request to the API
            console.log("Payload being sent to the API:", payload);
            await axios.post(`https://prod-18.southeastasia.logic.azure.com/workflows/70cdee3d71174907ab7e079877c5e8ec/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QBaD-PHa4UT8IOy5nHGi5gyvbORVZrNeNTtv0X5LZTc`, payload);
			Swal.fire("Success", "ការស្នើរសុំរបស់អ្នកទទួលបានជោគជ័យ!", "success");

            // Clear the form after successful submission
            form.value = {
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
                EmployeeID: "",
                EmployeeName: "",
                Site: "",
                Approver: "",
                Department: "",
                Position: "",
                Attachements: []
            };
            employeeId.value = null;
            uploadKey.value = Date.now();
        } catch (error) {
            // Handle errors gracefully
            console.error("Error submitting leave request:", error);
            Swal.fire("Error", `ការស្នើរសុំរបស់អ្នកបរាជ័យ: ${error.message}`, "error");
        } finally {
            // Always stop the loading bar and hide the modal
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