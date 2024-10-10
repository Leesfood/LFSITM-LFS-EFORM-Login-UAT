<template>
	<div class="bg-white h-screen">
		<p class="p-5 text-lg font-semibold underline text-black">Role Management</p>
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
				<button @click="openAddModal" class="px-4 py-2 ml-3 bg-[#e01a2e] text-white rounded">Add Role</button>
			</div>
		</div>

		<div class="overflow-x-auto shadow-md sm:rounded-lg px-5 pb-5">
			<table class="w-full border-collapse border rounded-lg text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-50">
					<tr>
						<th class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">ID
						</th>
						<th class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							Role Name</th>
						<th class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							Description</th>
						<th class="px-6 w-32 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis text-center">
							Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(role, index) in paginatedItems" :key="role.id"
						class="bg-white border border-gray-200 hover:bg-gray-50">
						<td
							class="w-[30px] px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 + (currentPage - 1) * itemsPerPage }}
						</td>
						<td class="px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ role.name }}
						</td>
						<td class="px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ role.description }}
						</td>
						<td class="flex justify-center px-6 py-4 text-center w-32 border-gray-200">
							<i class="fa-regular fa-pen-to-square text-blue-600 cursor-pointer"
								@click="openEditModal(role)"></i>
							<i class="fa-solid fa-trash-arrow-up px-5 text-red-600 cursor-pointer"
								@click="confirmDelete(role.id)"></i>
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

		<!-- Add Role Modal -->
		<div v-if="isAddModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white p-6 rounded-lg w-1/3">
				<h2 class="text-xl mb-4">Add Role</h2>
				<form @submit.prevent="handleAddSubmit">
					<div class="mb-4">
						<label class="block text-gray-700">Role Name</label>
						<input v-model="role.name" type="text" class="w-full border px-3 py-2 rounded-lg"
							required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Description</label>
						<input v-model="role.description" type="text" class="w-full border px-3 py-2 rounded-lg"
							/>
					</div>
					<div class="flex justify-end">
						<button type="button" @click="closeAddModal"
							class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
						<button type="submit" class="px-4 py-2 bg-[#e01a2e] text-white rounded">Add</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Edit Role Modal -->
		<div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white p-6 rounded-lg w-1/3">
				<h2 class="text-xl mb-4">Edit Role</h2>
				<form @submit.prevent="handleEditSubmit">
					<div class="mb-4">
						<label class="block text-gray-700">Role Name</label>
						<input v-model="role.name" type="text" class="w-full border px-3 py-2 rounded-lg"
							required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Description</label>
						<input v-model="role.description" type="text" class="w-full border px-3 py-2 rounded-lg"
							 />
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
import { ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const roles = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 8;
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const role = ref({
	id: null,
	name: '',
	description: '',
	status: true // Assuming status is true by default
});

const fetchRoles = async () => {
	try {
		const response = await axios.get(`${baseUrl}/roles`);
		roles.value = response.data;
	} catch (error) {
		console.error('Error fetching roles:', error);
	}
};

fetchRoles();

const filteredItems = computed(() => {
	return roles.value.filter(item =>
		item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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
	role.value = {
		id: null,
		name: '',
		description: '',
		status: true
	};
	isAddModalOpen.value = true;
};

const closeAddModal = () => {
	isAddModalOpen.value = false;
};

const closeEditModal = () => {
	isEditModalOpen.value = false;
};

const handleAddSubmit = async () => {
	try {
		await axios.post(`${baseUrl}/roles`, role.value);
		Swal.fire({
			icon: 'success',
			title: 'Added!',
			text: 'Role has been added.',
		});
		fetchRoles();
		closeAddModal();
	} catch (error) {
		console.error('Error adding role:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
		});
	}
};

const openEditModal = (selectedRole) => {
	role.value = {
		id: selectedRole.id,
		name: selectedRole.name,
		description: selectedRole.description,
		status: selectedRole.status
	};
	isEditModalOpen.value = true;
};

const handleEditSubmit = async () => {
	try {
		await axios.put(`${baseUrl}/roles/${role.value.id}`, {
			name: role.value.name,
			description: role.value.description,
			status: role.value.status
		});
		Swal.fire({
			icon: 'success',
			title: 'Updated!',
			text: 'Role has been updated.',
		});
		fetchRoles();
		closeEditModal();
	} catch (error) {
		console.error('Error updating role:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
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
			deleteRole(id);
		}
	});
};

const deleteRole = async (id) => {
	try {
		await axios.delete(`${baseUrl}/roles/${id}`);
		Swal.fire({
			icon: 'success',
			title: 'Deleted!',
			text: 'Role has been deleted.',
		});
		fetchRoles();
	} catch (error) {
		console.error('Error deleting role:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
		});
	}
};
</script>
