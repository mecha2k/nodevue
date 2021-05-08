import { createApp } from "vue"
import axios from "axios"
import lodash from "lodash"

import App from "./App.vue"
import router from "./router"
import componentRegister from "./components/_global"

const app = createApp(App)

app.config.globalProperties.axios = axios
app.config.globalProperties.lodash = lodash

componentRegister(app)

app.use(router).mount("#app")
