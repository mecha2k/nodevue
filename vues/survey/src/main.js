import { createApp } from "vue"
import axios from "axios"
import lodash from "lodash"
import mitt from "mitt"

import App from "./App.vue"
import router from "./router"
import store from "./store"
import componentRegister from "@/components/_register"
import { utils } from "@/mixins/utils"

const app = createApp(App)

app.config.productionTip = false
app.config.globalProperties.axios = axios
app.config.globalProperties.lodash = lodash
app.config.globalProperties.eventBus = new mitt()
app.mixin(utils)

componentRegister(app)

app.use(router).mount("#app")
