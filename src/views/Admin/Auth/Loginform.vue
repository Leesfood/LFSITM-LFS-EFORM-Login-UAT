<template>
  <div class="min-h-screen flex items-center justify-center bg-[#7a181a]">
    <div class="bg-white shadow-md rounded-lg p-5 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login E-FORM  REQUEST</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-8 ">
        
          <input v-model="form.EmployeeID" type="text" id="employeeID"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required
            placeholder="បញ្ជូលលេខកូដសម្គាល់បុគ្គលិក" />
        </div>
        <button type="submit"
          class="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from "axios";
import Swal from "sweetalert2";
import { useLoadingBar } from 'naive-ui';
import { useRouter } from 'vue-router';

const form = ref({
  Title: "UserLogin",
  EmployeeID: ""
});
const router = useRouter();

const loadingBar = useLoadingBar();

const submitForm = async () => {
  loadingBar.start();
  try {
    const payload = {
      Title: form.value.Title,
      EmployeeID: form.value.EmployeeID
    };

    const response = await axios.post('https://prod-38.southeastasia.logic.azure.com:443/workflows/016c690387e341e2902bdceb2fa8c49c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=W04gOMNbYEulhX-FeybpSvwO4g5YdbFtUxPKuTO_hX4', payload);
    const employeeData = response.data;

    localStorage.setItem('employeeData', JSON.stringify(employeeData));

    Swal.fire("ជោគជ័យ", `សូមស្វាគមន៍, ${employeeData.employeename}`, "success").then(() => {
      router.push({ name: '/home' });
    });

    form.value.EmployeeID = ""; // Reset the form
  } catch (error) {
   
    Swal.fire(`មិនត្រឹមត្រូវ`, `លេខសម្គាល់ដែលបញ្ជូល: ${form.value.EmployeeID}`, "error");
  } finally {
    loadingBar.finish();
  }
};
</script>

<style>
.battambang-regular {
  font-family: "Battambang", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
