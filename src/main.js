// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './store';
import { create, NButton, NSelect,NInput ,NDatePicker ,useMessage,NForm,NFormItem,NTimePicker,  NLoadingBarProvider, NUpload, NUploadDragger, NIcon, NText, NP} from 'naive-ui';


const naive = create({
  components: [NButton, NSelect,NInput,NDatePicker,useMessage,NForm,NFormItem,NTimePicker, NLoadingBarProvider ,NUpload,         // Register NUpload
    NUploadDragger,  // Register NUploadDragger
    NIcon,
    NText,
    NP]
});
const app = createApp(App)

app.use(router)
app.use(naive)
.use(store)
app.mount('#app')
