import { createStore } from "vuex"

export default createStore({
  state: {
    allUsers: [
      {
        id: "hoza123",
        email: "hoza12@gmail.com",
        password: "123",
        name: "Hoza",
        address: "Seoul",
        src: "./img/people/beautiful-woman.jpg"
      },
      {
        id: "max123",
        email: "max12@gmail.com",
        password: "453",
        name: "Maxi",
        address: "Busan",
        src: "./img/people/susan-small.png"
      },
      {
        id: "lego123",
        email: "lego12@gmail.com",
        password: "67889",
        name: "Lego",
        address: "Paris",
        src: "./img/people/davenCao.png"
      }
    ],
    isAdmin: false
  },
  getters: {
    allUsersCount: (state) => state.allUsers.length,
    countOfSeoul: (state) => {
      let count = 0
      state.allUsers.forEach((user) => {
        if (user.address === "Seoul") count++
      })
      return count
    },
    percentOfSeoul: (state, getters) =>
      Math.round((getters.countOfSeoul / getters.allUsersCount) * 100)
  },
  mutations: {
    addUsers: (state, payload) => state.allUsers.push(payload),
    approveAdmin: (state, payload = null) => (state.isAdmin = true)
  },
  actions: {
    addUsers: (context, payload) => context.commit("addUsers", payload),
    approveAdmin: (context, payload = null) => context.commit("approveAdmin", payload)
  },
  modules: {}
})
