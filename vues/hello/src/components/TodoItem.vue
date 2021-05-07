<template>
  <div>
    <ul>
      <li>{{ fruit.id }} :: {{ fruit.item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    msg: String,
    fruit: {
      type: Object,
      required: true
    }
  }
}
</script>
