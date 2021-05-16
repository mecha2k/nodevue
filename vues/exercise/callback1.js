class Surprise {
  constructor(callback = null) {
    this.counter = 0
    this.callback = callback
  }

  increase() {
    this.counter++
    this.callback && this.callback(this.counter)
    if (this.callback === null) console.log(this.callback)
  }
}

function printSome(arg) {
  console.log(`printSome ${arg}`)
}

function alert(arg) {
  alert(arg)
}

const sur1 = new Surprise()

sur1.increase()
sur1.increase()

// 함수의 레퍼런스를 전달
// 클래스 내에서 함수를 받고 내부 인자를 넣어서 실행
const sur2 = new Surprise((arg) => {
  console.log(`another callback is ${arg}`)
})

sur2.increase()
sur2.increase()