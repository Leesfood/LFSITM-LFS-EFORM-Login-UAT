<template>
	<div class="bg-[#FAFAFA]">
		<div class="grid grid-cols-5 gap-5 h-screen">
			<!-- sidebar -->
			<div class="bg-[#FFFFFF] custom-shadow-right">
				<div class="w-full h-auto flex justify-center cursor-pointer">
					<img class="w-[121px] h-[100px]"
						src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/032012/lees.ai_.png?itok=EBxFNstW"
						alt="">
				</div>

				<router-link to="/dashboard"
					class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-house-chimney text-[20px] text-blue-700"></i>
					</div>
					<div class="py-[10px] mx-[10px]">
						<p class="siemreap-regular text-[16px]">Dashboard </p>
					</div>
				</router-link>
				<!--v-if="role === 'Admin' || role === 'HR' || role === 'Head Department' || role === 'Line Manager'" -->
				<router-link  to="/employee"
					class="cursor-pointer mt-2 hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-users text-[20px] text-stone-400"></i>
					</div>
					<div class="py-[10px] mx-[10px]">
						<p class="siemreap-regular text-[16px]">Employee Management</p>
					</div>
				</router-link>

				<!-- E-Form Request with Dropdown -->
				<div v-if="role === 'Admin' || role === 'HR' || role === 'Head Department' | role === 'Line Manager'"
					@click="toggleEFormDropdown"
					class="cursor-pointer mt-2 text-black hover:text-white hover:bg-[#e01a2e] rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-boxes-packing text-[20px] text-red-400"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[16px]">E-Form Request</p>
						<i :class="['fa-solid', eFormDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
					</div>
				</div>
				<!-- Dropdown Content -->
				<div v-if="eFormDropdownOpen && (role === 'Admin' || role === 'HR' || role === 'Head Department' || role === 'Line Manager')"
					class="ml-[40px] mt-2">
					<router-link to="/leave-form"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Leave Form</p>
						</div>
					</router-link>
					<router-link to="/mission-form"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative mt-2">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Mission Form</p>
						</div>
					</router-link>
					<router-link to="/early-form"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Early Form</p>
						</div>
					</router-link>
					<router-link to="/late-form"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative mt-2">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Late Form</p>
						</div>
					</router-link>
					<router-link to="/miss-scan-form"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative mt-2">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Miss Scan Form</p>
						</div>
					</router-link>
					<router-link to="/company-activity-form"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative mt-2">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Company Activity</p>
						</div>
					</router-link>
				</div>

				<!-- Approval with Dropdown -->
				<div v-if="role === 'Admin' || role === 'HR' || role === 'Line Manager' || role === 'Head Department'" 
					@click="toggleApprovalDropdownsetting"
					class="cursor-pointer mt-2 text-black hover:text-white hover:bg-[#e01a2e] rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-bezier-curve text-[20px] text-green-500"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[16px]">Approval Management</p>
						<i :class="['fa-solid', ApprovalDropdownOpensetting ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
					</div>
				</div>
				<div v-if="ApprovalDropdownOpensetting" class="ml-[40px] mt-2">
					<!-- Line Manager Link -->
					<router-link v-if="role === 'Admin' || role === 'Line Manager'" to="/pending-request"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Pending</p>
						</div>
					</router-link>

					<!-- Head Department Link -->
					<router-link v-if="role === 'Admin' || role === 'Head Department'" to="/hr-pending"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">HR Pending</p>
						</div>
					</router-link>

					<!-- HR Link -->
					<router-link v-if="role === 'Admin' || role === 'HR'" to="/approved"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Approved</p>
						</div>
					</router-link>
					<router-link v-if="role === 'Admin' || role === 'HR'" to="/reject"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px] text-red-600 hover:text-white">Rejected</p>
						</div>
					</router-link>
				</div>

				<!-- Settings with Dropdown (only for Admins) v-if="role === 'Admin'" -->
				<div  @click="toggleEFormDropdownsetting"
					class="cursor-pointer mt-2 text-black hover:text-white hover:bg-[#e01a2e] rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-regular fa-sun text-[20px] text-cyan-600"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[16px]">Setting</p>
						<i :class="['fa-solid', eFormDropdownOpensetting ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
					</div>
				</div>
				<!--  -->
				<div  class="ml-[40px] mt-2" v-if="eFormDropdownOpensetting && role === 'Admin'">
					<router-link to="/department"
						class="cursor-pointer mt-2 hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Department</p>
						</div>
					</router-link>
					<router-link to="/section"
						class="cursor-pointer mt-2 hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Section</p>
						</div>
					</router-link>
					<router-link to="/position"
						class="cursor-pointer mt-2 hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Position</p>
						</div>
					</router-link>
					<router-link to="/site"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Site</p>
						</div>
					</router-link>
					<router-link to="/grad"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Grad</p>
						</div>
					</router-link>
					<router-link to="/leave-type"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Leave Type</p>
						</div>
					</router-link>
				</div>

				<!-- User Management with Dropdown (only for Admins)  v-if="role === 'Admin'"-->
				<div  @click="toggleUserDropdownsetting"
					class="cursor-pointer mt-2 text-black hover:text-white hover:bg-[#e01a2e] rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-user-lock text-[20px] text-lime-500"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[16px]">User Management</p>
						<i :class="['fa-solid', UserDropdownOpensetting ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
					</div>
				</div>

				<!--  -->
				<div  class="ml-[40px] mt-2" v-if="UserDropdownOpensetting && role === 'Admin'">
					<router-link to="/user"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Users</p>
						</div>
					</router-link>
					<router-link to="/role"
						class="cursor-pointer hover:bg-[#e01a2e] text-black hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-arrow-right-long text-[20px] text-green-400"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[16px]">Roles</p>
						</div>
					</router-link>
				</div>
			</div>

			<!-- content -->
			<div class="col-span-4">
				<div class="m-5 rounded-sm flex justify-between bg-white">
					<div class="flex gap-5 py-5 px-5">
						<p class="text-gray-800 text-[13px] hidden md:block font-semibold">{{ currentTime }}</p>
						<p class="text-gray-800 text-[13px] hidden md:block font-semibold">{{ currentDate }}</p>
						<p class="text-green-600 text-[13px] hidden md:block font-semibold">Update!!</p>
					</div>
					<div class="relative">
						<p @click="toggleDropdown"
							class="cursor-pointer pt-5 pr-5 text-blue-700 text-[13px] font-semibold">{{ username }}</p>

						<div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
							<router-link to="/profile"
								class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</router-link>
							<button @click="logout"
								class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
						</div>
					</div>
				</div>
				<div class="m-5 h-auto">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['username', 'userRole']), // Map Vuex state to computed properties
		role() {
			return this.userRole?.name || '';
		}
	},
	data() {
		return {
			currentTime: '',
			currentDate: '',
			showDropdown: false,
			eFormDropdownOpen: false,
			eFormDropdownOpensetting: false,
			UserDropdownOpensetting: false,
			ApprovalDropdownOpensetting: false,
		};
	},
	created() {
		this.updateTime();
		setInterval(this.updateTime, 1000);
	},
	methods: {
		updateTime() {
			const now = new Date();
			this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
			this.currentDate = now.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
		},
		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		},
		toggleEFormDropdown() {
			this.eFormDropdownOpen = !this.eFormDropdownOpen;
		},
		toggleEFormDropdownsetting() {
			this.eFormDropdownOpensetting = !this.eFormDropdownOpensetting;
		},
		toggleUserDropdownsetting() {
			this.UserDropdownOpensetting = !this.UserDropdownOpensetting;
		},
		toggleApprovalDropdownsetting() {
			this.ApprovalDropdownOpensetting = !this.ApprovalDropdownOpensetting;
		},
		logout() {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			this.$router.push('/');
		},
	}
};
</script>
