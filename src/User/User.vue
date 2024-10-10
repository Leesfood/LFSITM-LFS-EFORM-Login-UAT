
<template>
	<div class="bg-white h-screen">
		<p class="p-5 text-lg font-semibold underline text-black">User Management</p>
		<div class="flex justify-between px-5 py-3">
			<div>
				<div class="relative">
					<div class="absolute left-0 inset-y-0 pl-5 flex items-center">
						<svg class="fill-current h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path
								d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
						</svg>
					</div>
					<input v-model="searchQuery" @input="searchTable"
						class="w-full border pl-12 pr-4 py-2 rounded-full focus:border-blue-500 focus:shadow-outline outline-none"
						type="text" placeholder="Search..." />
				</div>
			</div>
			<div class="order-last">
				<button @click="openAddModal" class="px-4 py-2 ml-3 bg-[#e01a2e] text-white rounded">Add User</button>
			</div>
		</div>

		<div class="overflow-x-auto shadow-md sm:rounded-lg px-5 pb-5">
			<table class="w-full border-collapse border rounded-lg text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-50">
					<tr>
						<th class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">ID</th>
						<th class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							Username</th>
						<th class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							Email</th>
						<th class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							Role</th>
						<th class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							Employee</th>
						<th class="px-6 w-32 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis text-center">
							Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(user, index) in paginatedItems" :key="user.id"
						class="bg-white border border-gray-200 hover:bg-gray-50">
						<td class="w-[30px] px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 + (currentPage - 1) * itemsPerPage }}
						</td>
						<td class="px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ user.username }}
						</td>
						<td class="px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ user.email }}
						</td>
						<td class="px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ user.role.name }}
						</td>
						<td class="px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ user.employee.firstName }} {{ user.employee.lastName }}
						</td>
						<td class="flex justify-center px-6 py-4 text-center w-32 border-gray-200">
							<i class="fa-regular fa-pen-to-square text-blue-600 cursor-pointer"
								@click="openEditModal(user)"></i>
							<i class="fa-solid fa-trash-arrow-up px-5 text-red-600 cursor-pointer"
								@click="confirmDelete(user.id)"></i>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Pagination controls -->
		<div class="flex justify-between px-5 py-3">
			<button @click="previousPage" :disabled="currentPage === 1"
				class="px-4 py-2 bg-gray-200 text-gray-600 rounded">Previous</button>
			<span class="self-center">Page {{ currentPage }} of {{ totalPages }}</span>
			<button @click="nextPage" :disabled="currentPage === totalPages"
				class="px-4 py-2 bg-gray-200 text-gray-600 rounded">Next</button>
		</div>

		<!-- Add User Modal -->
		<div v-if="isAddModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white px-6 py-3 rounded-lg w-1/3">
				<p class="text-xl pb-5  text-red-500  font-bold text-center underline">Add User</p>
				<form @submit.prevent="handleAddSubmit">
					<div class="mb-4 flex">
						<label class="block text-gray-700 font-serif pr-3 pt-2 text-[18px]">Employee:</label>
						<select v-model="user.employeeId" class="w-full border px-3 py-2 rounded-lg" required>
							<option value="" disabled></option>
							<option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.firstName }} {{ employee.lastName }}</option>
						</select>
					</div>
					<div class="mb-4 flex">
						<label class="block text-gray-700 font-serif pr-3 pt-2 text-[18px]">Username</label>
						<input v-model="user.username" type="text" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4 relative flex">
						<label class="block text-gray-700  font-serif pr-3 pt-2 text-[18px]">Password</label>
						<input :type="showPassword ? 'text' : 'password'" v-model="user.password"
							class="w-full border px-3 py-2 rounded-lg ml-2" required />
						<i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
							class="absolute right-3 top-3 cursor-pointer  text-slate-300" @click="toggleShowPassword"></i>
					</div>
					<div class="mb-4 flex">
						<label class="block text-gray-700  font-serif pr-3 pt-2 text-[18px]">Email</label>
						<input disabled v-model="user.email" type="email" class="w-full ml-9 border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4 flex">
						<label class="block text-gray-700  font-serif pr-3 pt-2 text-[18px]">Role</label>
						<select v-model="user.roleId" class="w-full ml-12 border px-3 py-2 rounded-lg" required>
							<option value="" disabled>Select Role</option>
							<option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
						</select>
					</div>
					
					<div class="flex justify-end mb-3">
						<button type="button" @click="closeAddModal"
							class="px-4 py-2 bg-gray-300 text-gray-500 rounded mr-2">Cancel</button>
						<button type="submit" class="px-4 py-2 bg-[#e01a2e] text-white rounded">Add</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Edit User Modal -->
		<div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white p-6 rounded-lg w-1/3">
				<h2 class="text-xl mb-4">Edit User</h2>
				<form @submit.prevent="handleEditSubmit">
					<div class="mb-4">
						<label class="block text-gray-700">Username</label>
						<input v-model="user.username" type="text" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Email</label>
						<input disabled v-model="user.email" type="email" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Role</label>
						<select v-model="selectedRole" class="w-full border px-3 py-2 rounded-lg" required>
							<option value="" disabled>Select Role</option>
							<option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
						</select>
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Employee</label>
						<select v-model="selectedEmployee" class="w-full border px-3 py-2 rounded-lg" required>
							<option value="" disabled>Select Employee</option>
							<option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.firstName }} {{ employee.lastName }}</option>
						</select>
					</div>
					<div class="flex justify-end">
						<button type="button" @click="closeEditModal"
							class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
						<button type="submit" class="px-4 py-2 bg-[#e01a2e] text-white rounded">Update</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const users = ref([]);
const roles = ref([]);
const employees = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 8;
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const showPassword = ref(false);
const user = ref({
	id: null,
	username: '',
	password: '',
	email: '',
	roleId: null,
	employeeId: null
});
watch(() => user.value.employeeId, (newEmployeeId) => {
	const selectedEmployee = employees.value.find(emp => emp.id === newEmployeeId);
	if (selectedEmployee) {
		user.value.email = selectedEmployee.email; // Assume employee object has an email field
	}
});
const fetchUsers = async () => {
	try {
		const response = await axios.get(`${baseUrl}/users`);
		users.value = response.data;
	} catch (error) {
		console.error('Error fetching users:', error);
	}
};

const fetchRoles = async () => {
	try {
		const response = await axios.get(`${baseUrl}/roles`);
		roles.value = response.data;
	} catch (error) {
		console.error('Error fetching roles:', error);
	}
};

const fetchEmployees = async () => {
	try {
		const response = await axios.get(`${baseUrl}/employees`);
		employees.value = response.data;
	} catch (error) {
		console.error('Error fetching employees:', error);
	}
};

// Fetch users, roles, and employees when the component is mounted
onMounted(() => {
	fetchUsers();
	fetchRoles();
	fetchEmployees();
});

const filteredItems = computed(() => {
	return users.value.filter(item =>
		item.username.toLowerCase().includes(searchQuery.value.toLowerCase())
	);
});

const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return filteredItems.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(filteredItems.value.length / itemsPerPage);
});

const previousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};

const openAddModal = () => {
	user.value = {
		id: null,
		username: '',
		password: '',
		email: '',
		roleId: null,
		employeeId: null
	};
	isAddModalOpen.value = true;
};

const closeAddModal = () => {
	isAddModalOpen.value = false;
};

const closeEditModal = () => {
	isEditModalOpen.value = false;
};

const toggleShowPassword = () => {
	showPassword.value = !showPassword.value;
};

const handleAddSubmit = async () => {
	try {
		// Ensure roleId and employeeId are not null
		if (!user.value.roleId || !user.value.employeeId) {
			throw new Error('Role ID and Employee ID cannot be null.');
		}
		await axios.post(`${baseUrl}/users`, {
			username: user.value.username,
			password: user.value.password,
			email: user.value.email,
			role_id: user.value.roleId,  // Use role_id as per API requirement
			employee_id: user.value.employeeId  // Use employee_id as per API requirement
		});
		Swal.fire({
			icon: 'success',
			title: 'Added!',
			text: 'User has been added.',
		});
		fetchUsers();
		closeAddModal();
	} catch (error) {
		console.error('Error adding user:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message || 'Something went wrong!',
		});
	}
};

const selectedRole = ref(null);
const selectedEmployee = ref(null);

const openEditModal = (selectedUser) => {
	user.value = {
		id: selectedUser.id,
		username: selectedUser.username,
		email: selectedUser.email,
		password: '', // Keep password field blank
		roleId: selectedUser.role.id,
		employeeId: selectedUser.employee.id
	};
	selectedRole.value = user.value.roleId;
	selectedEmployee.value = user.value.employeeId;
	isEditModalOpen.value = true;
};

const handleEditSubmit = async () => {
	try {
		// Ensure roleId and employeeId are not null
		if (!selectedRole.value || !selectedEmployee.value) {
			throw new Error('Role ID and Employee ID cannot be null.');
		}
		await axios.put(`${baseUrl}/users/${user.value.id}`, {
			username: user.value.username,
			email: user.value.email,
			role_id: selectedRole.value,  // Use role_id as per API requirement
			employee_id: selectedEmployee.value  // Use employee_id as per API requirement
		});
		Swal.fire({
			icon: 'success',
			title: 'Updated!',
			text: 'User has been updated.',
		});
		fetchUsers();
		closeEditModal();
	} catch (error) {
		console.error('Error updating user:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message || 'Something went wrong!',
		});
	}
};

const confirmDelete = (id) => {
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			deleteUser(id);
		}
	});
};

const deleteUser = async (id) => {
	try {
		await axios.delete(`${baseUrl}/users/${id}`);
		Swal.fire({
			icon: 'success',
			title: 'Deleted!',
			text: 'User has been deleted.',
		});
		fetchUsers();
	} catch (error) {
		console.error('Error deleting user:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
		});
	}
};
</script>
