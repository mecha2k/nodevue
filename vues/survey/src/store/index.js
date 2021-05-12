import { createStore } from "vuex"

export default createStore({
  state: {
    allUsers: [
      {
        id: "hoza123",
        email: "hoza12@gmail.com",
        password: "123",
        name: "Hoza",
        address: "Seoul"
      },
      {
        id: "max123",
        email: "max12@gmail.com",
        password: "453",
        name: "Maxi",
        address: "Busan"
      },
      {
        id: "lego123",
        email: "lego12@gmail.com",
        password: "67889",
        name: "Lego",
        address: "Paris"
      }
    ]
  },
  getters: {
    allUsersCount: () => state.allUsers.length,
    countOfSeoul: () => {
      let count = 0
      state.allUsers.forEach((user) => {
        if (user.address === "Seoul") count++
      })
      return count
    },
    percentOfS
  },
  mutations: {},
  actions: {},
  modules: {}
})
