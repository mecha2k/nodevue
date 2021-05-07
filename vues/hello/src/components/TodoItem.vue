<template>
  <div>
    <h3>{{ msg }}</h3>
    <li>TodoItem list...</li>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    msg: String
  }
}
</script>
