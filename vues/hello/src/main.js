import { createApp } from "vue"
import axios from "axios"
import lodash from "lodash"
import mitt from "mitt"

import App from "./App.vue"
import router from "./router"
import componentRegister from "./components/_register"

const app = createApp(App)

app.config.globalProperties.axios = axios
app.config.globalProperties.lodash = lodash
app.config.globalProperties.eventBus = new mitt()

componentRegister(app)
console.log(process.env.BASE_URL)

app.use(router).mount("#app")
