function printImmediate(prn) {
  prn()
}

function printDelay(prn, timeout) {
  setTimeout(prn, timeout)
}

console.log(1)
setTimeout(() => console.log(2), 500)
console.log(3)

printImmediate(() => console.log("immediate"))
printDelay(() => console.log("delay"), 500)

// Callback Hell example
class UserStorage {
  loginUser(id, passwd, onSuccess, onError) {
    setTimeout(() => {
      if ((id === "ellie" && passwd === "dream") || (id === "coder" && passwd === "academy"))
        onSuccess(id)
      else onError(new Error("not found"))
    }, 500)
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") onSuccess({ name: "ellie", role: "admin" })
      else onError(new Error("get role failed"))
    }, 500)
  }
}

const userStorage = new UserStorage()
userStorage.loginUser(
  "ellie",
  "dream",
  (user) => {
    userStorage.getRoles(
      user,
      (userrole) => console.log(`Hello ${userrole.name}, you have a ${userrole.role} role`),
      (err) => console.log(err)
    )
  },
  (err) => console.log(err)
)
