// Promise is a JavaScript object for asynchronous operation.
// State: pending -> fulfilled or rejected
// Producer vs Consumer

// 1. Producer
// when new Promise is created, the executer runs automatically.
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log("doing something...")
  setTimeout(() => {
    if (true) resolve("ellie")
    else reject(new Error("no network"))
  }, 500)
})

// 2. Consumer: then, catch, finally
promise //
  .then(console.log)
  .catch(console.log)
  .finally(console.log)

// 3. Promise chaining
const fetchNum = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 500)
  console.log("1st resolve")
})

fetchNum
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 500)
      console.log("2nd resolve", num)
    })
  })
  .then((num) => console.log(num))

// Callback Hell example
class UserStorage {
  loginUser(id, passwd) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((id === "ellie" && passwd === "dream") || (id === "coder" && passwd === "academy"))
          resolve(id)
        else reject(new Error("not found"))
      }, 500)
    })
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      console.log(user)
      setTimeout(() => {
        if (user === "ellie") resolve({ name: "ellie", role: "admin" })
        else reject(new Error("get role failed"))
      }, 500)
    })
  }
}

const userStorage = new UserStorage()
userStorage
  .loginUser("ellie", "dream")
  .then((user) => {
    return userStorage.getRoles(user)
  })
  .then((user) => console.log(`Hello ${user.name}, you have a ${user.role} role.`))
  .catch(console.log)
