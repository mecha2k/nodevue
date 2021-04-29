// async & await
// clear style of using Promsie

// 1. Async : return new Promise((resolve, reject) => {})
async function fetchUser() {
  // do network request in 10 secs...
  return "ellie"
}

const user = fetchUser()
user.then(console.log)
console.log(user)

// 2. await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getApple() {
  await delay(1500)
  return "🍎"
}

async function getBanana() {
  await delay(1500)
  return "🍌"
}

async function pickFruits1() {
  const apple = await getApple()
  const banana = await getBanana()
  return `${apple} + ${banana} slow`
}

async function pickFruits2() {
  const applePromise = getApple()
  const bananaPromise = getBanana()
  const apple = await applePromise
  const banana = await bananaPromise
  return `${apple} + ${banana} fast`
}

function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then(
    (fruits) => fruits.join(" + ") + " Promise.all"
  )
}

function pickOneFruit() {
  return Promise.race([getApple(), getBanana()])
}

pickFruits1().then(console.log)
pickFruits2().then(console.log)
pickAllFruits().then(console.log)
pickOneFruit().then(console.log)
